/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Column } from 'react-data-grid';
import ReactApexChart from 'react-apexcharts';
import EDataGrid from '../EDataGrid';

interface PropsHgr {
  data: MvtDash[];
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
    colors: [
      '#1E7CE0',
      '#51d28c',
      '#f7cc53',
      '#f34e4e',
      '#564ab1',
      '#5fd0f3',
      '#0D1B1F',
      '#77A52C',
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
        columnWidth: '55%',
        distributed: true
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: any) {
        return val + '%';
      },
      style: {
        fontSize: '10px',
        color: '#5F6369'
      }
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
            '#75A32B',
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
          fontSize: '10px'
        }
      }
    },
    yaxis: {
      labels: {
        show: true,
        formatter: function (val: any) {
          return val + '%';
        },
      }
    },
    title: {
      text: `${t('TEXT_PERCENTAGE')}`,
      align: 'center',
      floating: true,
      style: {
        fontWeight: 500,
      }
    },
  };

  const columns = useMemo<Column<MvtDash>[]>(
    () => [
      {
        name: `${t('ZS')}`,
        key: 'zone'
      },
      {
        name: `${t('PERCENTAGE')}`,
        key: 'value',
        renderCell: ({ row }) => <span>{row.value + '%'}</span>
      },
      {
        name: `${t('NBRE_MVT')}`,
        key: 'nb_ess_mvt'
      },
      {
        name: `${t('NBRE_ESS')}`,
        key: 'nb_ess'
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