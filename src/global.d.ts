/* eslint-disable @typescript-eslint/no-explicit-any */
interface SearchType {
  filter: any;
  periode: any;
  displayValue: any;
}

interface ZData {
  zone: string;
  value: number;
}
interface BhiChartData {
  label: string;
  data: {
    value: number;
    text: string;
  }[];
}

interface Movement {
  zone: string;
  value: number;
  percentage: number;
  children_total: number;
}

interface BHServerData {
  bcz: ZData[];
  hgr: ZData[];
  fosa: ZData[];
  movements: Movement[];
}

interface PeriodBhi {
  key: string;
  translateKey: string;
  start?: string;
  end?: string;
  limit?: {
    start: () => string;
    end: () => string;
  };
  customPeriodStart?: string;
  customPeriodEnd?: string;
}

interface MvtDash {
  zone: string;
  value: number;
  nb_ess_mvt: number;
  nb_ess: number;
}