/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Column } from 'react-data-grid';
import ReactApexChart from 'react-apexcharts';
import EDataGrid from '../EDataGrid';

interface PropsHgr {
  data: ZData[];
  loading: boolean;
} 

const FosaTable: React.FC<PropsHgr> = ({ data, loading }) => {
  const { t } = useTranslation();
  const series = [
    {
      name: 'Livraison aux patients',
      data: data.map((item) => item.value)
    }
  ];
  const options = {
    chart: {
      height: 300,
      type: 'bar',
    },
    colors: [
      '#1E7CE0',
      '#51d28c',
      '#f7cc53',
      '#f34e4e',
      '#564ab1',
      '#5fd0f3',
      '#0D1B1F',
      '#9DFF01',
      '#AE68C9',
      '#5F89F3',
      '#00347D',
      '#6500D2',
      '#FF5900',
      '#491D1D',
      '#842944',
      '#01301C',
      '#67681C',
      '#98007C',
      '#985C5C',
      '#003874',
    ],
    plotOptions: {
      bar: {
        columnWidth: '25%',
        distributed: true
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: data.map((item) => item.zone),
      labels: {
        style: {
          colors: [
            '#1E7CE0',
            '#51d28c',
            '#f7cc53',
            '#f34e4e',
            '#564ab1',
            '#5fd0f3',
            '#0D1B1F',
            '#8BC828',
            '#AE68C9',
            '#5F89F3',
            '#00347D',
            '#6500D2',
            '#FF5900',
            '#491D1D',
            '#842944',
            '#01301C',
            '#67681C',
            '#98007C',
            '#985C5C',
            '#003874',
          ],
          fontSize: '11px'
        }
      }
    },
    yaxis: {
      labels: {
        show: true,
      }
    }
  };

  const columns = useMemo<Column<ZData>[]>(
    () => [
      {
        name: `${t('FOSA')}`,
        key: 'zone'
      },
      {
        name: `${t('NUMBER_DELIVERY')}`,
        key: 'value'
      }
    ], [t]
  );

  return (
    <div className="mt-2 card bg-slate-50 shadow-xl px-3 py-6">
      <h2 className="mb-2 ms-2" >{t('BEST_FOSA')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
        <EDataGrid
          columns={columns}
          rows={data}
          loading={loading}
          rowHeight={50}
          height={400}
        />
        <div className="card bg-white shadow-xl px-3 py-6" >
          <ReactApexChart dir="ltr" className="apex-charts" series={series} options={options as any} type="bar" height={300} />
        </div>
      </div>
    </div>
  );
};



export default FosaTable;