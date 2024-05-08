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

const ZsMovement: React.FC<PropsHgr> = ({ data, loading }) => {
  const { t } = useTranslation();
  const series = [
    {
      name: 'Pourcentage des mouvements de structure',
      data: data.map((item) => item.value) 
      
    }
  ]

  const options = {
    chart: {
      height: 300,
      type: 'bar',
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        }
      }
    }],
    colors: ['#1E7CE0', '#51d28c', '#f7cc53', '#f34e4e', '#564ab1', '#5fd0f3'],
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: any) {
        return val + '%';
      }
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: data.map((item) => item.zone),
      labels: {
        style: {
          colors: ['#1E7CE0', '#51d28c', '#f7cc53', '#f34e4e', '#564ab1', '#5fd0f3'],
          fontSize: '11px'
        }
      }
    },
    yaxis: {
      labels: {
        show: true,
        formatter: function (val: any) {
          return val + '%';
        }
      }
    },
    title: {
      text: `${t('TEXT_PERCENTAGE')}`,
      align: 'center',
      floating: true,
      style: {
        fontWeight: 500
      }
    },
  };

  const columns = useMemo<Column<ZData>[]>(
    () => [
      {
        name: `${t('ZS')}`,
        key: 'zone'
      },
      {
        name: `${t('PERCENTAGE')}`,
        key: 'value',
        renderCell: ({ row }) => <span>{row.value + '%'}</span>
      }
    ], [t]
  );

  return (
    <div className="mt-2 card bg-slate-50 shadow-xl px-3 py-6">
    <div className="mt-2 mb-4 ms-2">
      <h2 className="mb-2" >{t('BCZ_MOVEMENT')}</h2>
      <p className=''>{t('TEXT_MOVEMENT')}</p>
    </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
        <EDataGrid
          columns={columns}
          rows={data}
          loading={loading}
          rowHeight={50}
          height={600}
        />
        <div className="card bg-white shadow-xl px-3 py-6" >
          <ReactApexChart dir="ltr" className="apex-charts" series={series} options={options as any} type="bar" height={500} />
        </div>
      </div>
    </div>
  );
};



export default ZsMovement;