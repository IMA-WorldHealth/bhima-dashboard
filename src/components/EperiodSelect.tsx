/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import PeriodService, { Period } from '../services/periodService.service';
import EDateRange from './EDateRange';

interface PeriodSelectProps {
  defaultPeriod: Period;
  periodFilter: any;
  label?: string;
  onSelect: (period: any) => void;
  required?: boolean;
}

const EPeriodsSelect: React.FC<PeriodSelectProps> = ({ defaultPeriod, label = 'PERIOD', onSelect, required, periodFilter }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [customExpanded, setCustomEx] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [periodKey, setPeriodKey] = useState(defaultPeriod || 'today');
  const Periods = new PeriodService();
  const [period, setPeriod] = useState(Periods.definition(periodKey)) as any;
  // const NO_PERIOD_LIMIT_KEY = 'today';
  const CUSTOM_PERIOD_KEY = 'custom';

  const [customSelection, setCustomSelect] = useState({
    from: new Date(),
    to: new Date(),
  });
  const dateFormat = 'DD/MM/YYYY';

  const toggleSelectionOptions = () => setExpanded(!expanded);


  function selectPeriod(key: Period, togglable?: boolean) {
    const periods = Periods.definition(key);
    // setCustomEx(false);
    onSelect({ period: periods });
    // should not toggle in custom mode , as explained in at this point : ctrl.toggleCustomSelection()
    if (!togglable) {
      toggleSelectionOptions();
    }
    setPeriod(periods);
  }

  const customPeriodChanges = () => {
    const _period = Periods.index.custom as any;
    _period.customPeriodStart = customSelection.from;
    _period.customPeriodEnd = customSelection.to;
    onSelect({ period: _period });
    setPeriod(_period);
  };

  const onInit = useCallback(() => {
    if (periodKey === CUSTOM_PERIOD_KEY) {
      setCustomSelect({
        from: periodFilter.customPeriodStart || new Date(),
        to: periodFilter.customPeriodEnd || new Date(),
      });
    }
  }, [setPeriodKey]);

  useEffect(() => {
    onInit();
  }, [onInit]);

  return (
    <div className="form-group text-blue-400">
      <label className="form-label">
        <span>{required ? `${t('PERIOD_OPTIONAL')}` : t(label)}</span>
      </label>
      <p className="flex gap-2">
        <span>{t(period.translateKey)}</span>
        {period.key !== CUSTOM_PERIOD_KEY && (
          <span>
            {`(${period.start}) `} - {` (${period.end})`}
          </span>
        )}
        {period.customPeriodStart && period.customPeriodEnd && (
          <span>{`${`(${moment(customSelection.from).format(dateFormat)}) - (${moment(customSelection.to).format(dateFormat)})`}`}</span>
        )}
      </p>

      <a href="#" onClick={toggleSelectionOptions} className="pointer">
        <span className="d-flex">
          {' '}
          <i className={`me-1 mdi ${!expanded ? 'mdi-calendar-plus' : 'mdi-calendar-minus'}`}></i> {t('PERIOD_SELECT_PERIOD')}
        </span>
      </a>
      {expanded && (
        <div>
          <hr />
          <div className="grid grid-cols-2">
            <div className="">
              <ul>
                {Periods.categories.THIS.map((p, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      role="button"
                      onClick={() => selectPeriod(p.key as Period)}
                      className="pointer text-primary">
                      <span>{`${t(p.translateKey)}`}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col">
              <ul>
                {Periods.categories.LAST.map((p, index) => (
                  <li key={index}>
                    <a href="#" onClick={() => selectPeriod(p.key as Period)} className="pointer text-primary">
                      <span>{`${t(p.translateKey)}`}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="col">
              {/* <ul>
                {Periods.categories.OTHER.map((p, index) => (
                  <li key={index}>
                    <a href="#" onClick={() => selectPeriod(p.key as Period)} className="pointer text-primary">
                      <span>{`${t(p.translateKey)}`}</span>
                    </a>
                  </li>
                ))}
              </ul> */}

              <ul>
                <li>
                  <a
                    href="#"
                    onClick={() => {
                      setCustomEx(!customExpanded);
                    }}
                    className="pointer text-primary"
                  >
                    <span>{t('CUSTOM')}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {expanded && customExpanded && (
        <div>
          <div className="grid grid-cols-2 gap-3">
            <div className="col">
              <label className="form-label me-1">{t('CUSTOM_FROM')}</label>
              <EDateRange
                id="modal-date-from"
                mode="single"
                className="form-control"
                required
                value={customSelection.from}
                onChange={(value) => {
                  setCustomSelect({
                    ...customSelection,
                    from: moment(value[0]).toISOString() as any,
                  });
                  customPeriodChanges();
                }}
              />
            </div>
            <div className="col gap-2">
              <label className="form-label me-1">{t('CUSTOM_TO')}</label>
              <EDateRange
                id="modal-date-to"
                mode="single"
                className="ms-2"
                required
                value={customSelection.to}
                onChange={(value) => {
                  setCustomSelect({
                    ...customSelection,
                    to: moment(value[0]).toISOString() as any,
                  });
                  customPeriodChanges();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EPeriodsSelect;
