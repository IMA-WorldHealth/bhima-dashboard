DELIMITER $$

-- Procedure for calculation

DROP PROCEDURE IF EXISTS GetHealthZoneMovements $$
CREATE PROCEDURE GetHealthZoneMovements(
        IN dateFrom VARCHAR(10),
        IN dateTo VARCHAR(10)
)
BEGIN

        -- global variables
        DECLARE v_zone VARCHAR(127);
        DECLARE v_value INTEGER;

        -- cursor position variable
        DECLARE cursor_health_zone_finished INTEGER DEFAULT 0;

        -- cursor declaration
        DECLARE cursor_health_zone CURSOR FOR
                SELECT SUBSTR(depot.`text`, 7) AS zone FROM depot WHERE depot.`text` LIKE "BCZ - %";

        -- cursor end detection
        DECLARE CONTINUE HANDLER FOR NOT FOUND SET cursor_health_zone_finished = 1;

        -- open the cursor
        OPEN cursor_health_zone;

        CREATE TEMPORARY TABLE temp_health_zone_facility_movemented (zone VARCHAR(127), value INTEGER);

        hz: LOOP
                FETCH cursor_health_zone INTO v_zone;

                IF cursor_health_zone_finished = 1 THEN
                LEAVE hz;
        END IF;
    SET v_value = (
                SELECT DISTINCT COUNT(*)
                FROM (
                        SELECT sm.depot_uuid
                        FROM stock_movement sm
                        JOIN depot d ON d.uuid = sm.depot_uuid
                        WHERE d.`text` LIKE CONCAT("FOSA - %", v_zone COLLATE utf8mb4_general_ci, "%") AND DATE(sm.date) BETWEEN dateFrom AND dateTo
                        GROUP BY sm.depot_uuid
                ) AS movemented
        );

        -- output 
        INSERT INTO temp_health_zone_facility_movemented VALUES (v_zone, v_value);

        END LOOP;

        SELECT * FROM temp_health_zone_facility_movemented;

        DROP TABLE temp_health_zone_facility_movemented;

        CLOSE cursor_health_zone; -- close the cursor 

END $$

-- Get the best health zone office 
DROP PROCEDURE IF EXISTS GetBestBCZ $$
CREATE PROCEDURE GetBestBCZ (
        IN dateFrom VARCHAR(10),
        IN dateTo VARCHAR(10)
)
BEGIN

        -- global variables
        DECLARE v_zone VARCHAR(127);
        DECLARE v_value INTEGER;

        -- cursor position variable
        DECLARE cursor_health_zone_finished INTEGER DEFAULT 0;

        -- cursor declaration
        DECLARE cursor_health_zone CURSOR FOR
                SELECT SUBSTR(depot.`text`, 7) AS zone FROM depot WHERE depot.`text` LIKE "BCZ - %";

        -- cursor end detection
        DECLARE CONTINUE HANDLER FOR NOT FOUND SET cursor_health_zone_finished = 1;

        -- open the cursor
        OPEN cursor_health_zone;

        CREATE TEMPORARY TABLE temp_health_zone_facility_movemented (zone VARCHAR(127), value INTEGER);

        hz: LOOP
                FETCH cursor_health_zone INTO v_zone;

                IF cursor_health_zone_finished = 1 THEN
                LEAVE hz;
        END IF;
         SET v_value = (
                SELECT DISTINCT COUNT(*)
                FROM (
                        SELECT sm.depot_uuid
                        FROM stock_movement sm
                        JOIN depot d ON d.uuid = sm.depot_uuid
                        JOIN depot d2 ON d2.uuid = sm.entity_uuid
                        WHERE
                                d2.`text` LIKE CONCAT("FOSA - %", v_zone COLLATE utf8mb4_general_ci, "%")
                                AND DATE(sm.date) BETWEEN dateFrom AND dateTo
                                AND sm.flux_id = 8 AND sm.is_exit = 1
                        GROUP BY d2.uuid
                ) AS movemented
        );

        -- output 
        INSERT INTO temp_health_zone_facility_movemented VALUES (v_zone, v_value);

        END LOOP;

        SELECT * FROM temp_health_zone_facility_movemented ORDER BY value DESC;

        DROP TABLE temp_health_zone_facility_movemented;

        CLOSE cursor_health_zone; -- close the cursor 
END $$

-- Get the best hospital zone office 
DROP PROCEDURE IF EXISTS GetBestHGR $$
CREATE PROCEDURE GetBestHGR (
        IN dateFrom VARCHAR(10),
        IN dateTo VARCHAR(10)
)
BEGIN

        -- global variables
        DECLARE v_zone VARCHAR(127);
        DECLARE v_value INTEGER;

        -- cursor position variable
        DECLARE cursor_hospital_finished INTEGER DEFAULT 0;

        -- cursor declaration
        DECLARE cursor_hospital CURSOR FOR
                SELECT depot.`text` AS zone FROM depot WHERE depot.`text` LIKE "HGR - %";

        -- cursor end detection
        DECLARE CONTINUE HANDLER FOR NOT FOUND SET cursor_hospital_finished = 1;

        -- open the cursor
        OPEN cursor_hospital;

        CREATE TEMPORARY TABLE t_view (zone VARCHAR(127), value INTEGER);

        hospital: LOOP
                FETCH cursor_hospital INTO v_zone;

                IF cursor_hospital_finished = 1 THEN
                LEAVE hospital;
        END IF;
        SET v_value = (
                SELECT DISTINCT COUNT(*)
                FROM (
                        SELECT sm.document_uuid
                        FROM stock_movement sm
                        JOIN depot d ON d.uuid = sm.depot_uuid
                        WHERE
                                d.`text` LIKE v_zone COLLATE utf8mb4_general_ci
                                AND (DATE(sm.date) BETWEEN dateFrom AND dateTo)
                                AND sm.flux_id = 9 AND sm.is_exit = 1
                        GROUP BY sm.document_uuid
                ) AS movemented
        );

        -- output 
        INSERT INTO t_view VALUES (v_zone, v_value);

        END LOOP;

        SELECT * FROM t_view ORDER BY value DESC;

        DROP TABLE t_view;

        CLOSE cursor_hospital; -- close the cursor 
END $$

DELIMITER ;
