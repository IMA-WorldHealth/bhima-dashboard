import db from '../helpers/db.js';
import { parseDate } from '../helpers/parseDate.js';

export const dashboard = async (req, res, next) => {
  try {
    const params = parseDate(req.query);
    const sqlPercentage = `
    SELECT 
      depot_parent.text AS zone,
      depot_parent.total, COUNT(children.depot) AS children_total,
      ROUND(COUNT(children.depot) / depot_parent.total * 100.0) AS value,
      children.movement AS chilren_movement
    FROM
    (
      SELECT c.text, c.uuid, COUNT(d.parent_uuid) AS total
      FROM depot d
      JOIN depot c ON c.uuid = d.parent_uuid
      WHERE c.text LIKE '%BCZ%'
      GROUP BY d.parent_uuid
    ) AS depot_parent
    JOIN
    (
      SELECT d.text AS depot, d.parent_uuid, COUNT(s.depot_uuid) AS movement
      FROM stock_movement s
      JOIN depot d ON d.uuid = s.depot_uuid
      AND d.parent_uuid IS NOT NULL
      AND s.date >=  ? 
      AND s.date <= ?
      GROUP BY d.uuid
    ) AS children ON children.parent_uuid = depot_parent.uuid
    GROUP BY zone
    ORDER BY value DESC;
    `
    const data = await db.exec('CALL  GetBestBCZ(?, ?)', [params.start, params.end]);
    const hgr = await db.exec('CALL GetBestHGR(?, ?)', [params.start, params.end]);
    const healthZone = await db.exec('CALL GetHealthZoneMovements(?, ?)', [params.start, params.end]);
    const movements = await db.exec(sqlPercentage, [params.start, params.end]);
    return res.status(201).json({ bcz: data[0], hgr: hgr[0], fosa: healthZone[0], movements });
  } catch (error) {
    console.log(error);
    next(error);
  }
}