/* eslint-disable @typescript-eslint/no-explicit-any */
import { debounce, orderBy } from "lodash";
import { useCallback, useEffect, useState } from "react";
import EFilterValue from '../components/EFilterValue';
import { Header } from '../components/Header';
import { useAppDispatch, useAppSelector } from '../hooks';
import { clearKeyDash } from '../store/actions/dashboard.action';
import HgrTable from "../components/HGR/HgrTable";
import ZsTable from "../components/ZS/ZsTable";
import { stats } from "../services/api.service";
import Loader from "../components/Loader";
import { parseFilter } from "../utils";
import ZsMovement from "../components/ZS/ZsMovement";
import notification from "../services/notification.service";
import { bcz } from "@/constants";

export function IndexPage() {
  const { _filters } = useAppSelector((state) => state.dashboardState);
  const dispatch = useAppDispatch();
  const [field, setFields] = useState<BHServerData>({
    bcz: [],
    hgr: [],
    fosa: [],
    movements: [],
  })
  const [movements, setMovements] = useState<MvtDash[]>([]);
  const [loading, setLoading] = useState(false);

  const onClear = (key: string) => {
    dispatch(clearKeyDash(key, () => { 
    }) as any);
  }


  const fetchData = useCallback(debounce(async () => {
    setLoading(true);
    try {
      const params = parseFilter(_filters.periode);
      const res = await stats(params);
      const [zs] = bcz;
      const movement = res.movements.map((mv) => {
        const label = mv.zone.toLowerCase().split(' ').join('_').replace('_-_', '_');
        const totalChildren = zs[label];
        const value = Math.round(mv.children_total / (totalChildren || mv.value) * 100.0);
        return { zone: mv.zone, value, nb_ess_mvt: mv.children_total, nb_ess: totalChildren || mv.value }
      });
      setMovements(orderBy(movement, ['value'], "desc"));
      setFields(res);
    } catch (err: any) {
      notification.handleError(err)
    } finally {
      setLoading(false);
    }
  }, 100), [_filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className=" bg-slate-100 pb-3" >
      <Header />
      <div className="container-fluid px-6 py-3">
        <EFilterValue displayValue={_filters.displayValue} filterLabel={undefined} onClear={onClear} periode={_filters.periode} />
        {loading ? (<div className="relative">
          <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2">
            <Loader />
          </div>
        </div>
        ) : (
          <div className="mt-2">
            <div className="mt-4">
              <ZsTable data={field.bcz} loading={false} />
            </div>
            <div className="mt-4">
              <HgrTable data={field.hgr} loading={false} />
            </div>
            <div className="mt-4">
              <ZsMovement data={movements} loading={false} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

