
/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

interface EFilterProps {
  displayValue: any;
  filterLabel: any;
  periode: any;
  onClear: (key: string) => void;
  labelPeriod?: string;
}

const EFilterValue: React.FC<EFilterProps> =
  ({ displayValue, filterLabel, periode, onClear, labelPeriod }) => {
  const { t } = useTranslation();

    const formatValue = (value: any) => {
      if (typeof value === 'boolean') {
        return value ? 'OUI' : 'NON';
      }
      return value;
    };

    return (
      <div className="flex gap-0 flex-wrap align-items-center mt-2 mb-1">
        {periode !== undefined &&
          <div className="flex gap-1 bg-blue-600 text-white fw-bold fs-12 px-4 rounded" style={{ height: 25 }}>
            <span>
              <i className="mdi mdi-filter text-white"></i> {t(labelPeriod || 'PERIODE')}:
            </span>
            <span>{t(periode.translateKey)}</span>
          </div>
        }
        {periode?.key === 'custom' && (
          <>
            {periode?.customPeriodStart && periode?.customPeriodEnd && (
              <>
                <div
                  className="flex gap-1 align-items-center bg-blue-600 text-white fw-bold fs-12 px-4 rounded"
                  style={{ height: 25 }}
                >
                  <span>
                    <i className="mdi mdi-filter text-white"></i>
                    {t('START')}
                    <small className="m-1 fw-bold">{'>'}</small>
                    {moment(periode?.customPeriodStart).format('DD/MM/YYYY')}
                  </span>
                </div>
                <div
                  className="flex gap-1 align-items-center bg-blue-600 text-white fw-bold fs-12 px-4 rounded"
                  style={{ height: 25 }}
                >
                  <span>
                    <i className="mdi mdi-filter text-white"></i>
                    {t('END')}
                    <small className="m-1 fs-12 fw-bold">{'<'}</small>
                    {moment(periode?.customPeriodEnd).format('DD/MM/YYYY')}
                  </span>
                </div>
              </>
            )}
          </>
        )}
        {periode !== undefined && displayValue !== undefined && Object.keys(displayValue).length > 0 && <hr className="e-border-left m-1" />}
        <div className="flex align-items-center">
          <div className="flex align-items-center flex-wrap gap-2">
            {displayValue !== undefined &&
              Object.keys(displayValue).length > 0 &&
              Object.keys(displayValue).map((key, index) => (
                <Fragment key={index}>
                  {filterLabel[key]?.name &&
                    <div className="bg-info flex align-items-center text-white fs-12 fw-bold rounded p-1" style={{ height: 25 }}>
                      <span className="">
                        {`${t(filterLabel[key].name)}`} : {`${formatValue(displayValue[key])}`}
                      </span>
                      <i role="none" className="mdi mdi-close-circle fw-bold fs-14 pointer-close ms-1" onClick={() => onClear(key)}></i>
                    </div>
                  }
                </Fragment>
              ))}
          </div>
        </div>
      </div>
    );
};

export default EFilterValue;
