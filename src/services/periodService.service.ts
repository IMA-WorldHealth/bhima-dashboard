/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import _ from 'lodash';
import Moment from 'moment';

const dateFormat = 'DD/MM/YYYY';
export type Period =
  | 'today'
  | 'week'
  | 'month'
  | 'year'
  | 'yesterday'
  | 'lastWeek'
  | 'lastMonth'
  | 'lastYear'
  | 'custom';

class PeriodService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {}

  periods = {
    today: {
      key: 'today',
      translateKey: 'PERIODS_TODAY',
      limit: this.calculatePeriodLimit('date'),
    },
    week: {
      key: 'week',
      translateKey: 'PERIODS_THIS_WEEK',
      limit: this.calculatePeriodLimit('week'),
    },
    month: {
      key: 'month',
      translateKey: 'PERIODS_THIS_MONTH',
      limit: this.calculatePeriodLimit('month'),
    },
    year: {
      key: 'year',
      translateKey: 'PERIODS_THIS_YEAR',
      limit: this.calculatePeriodLimit('year'),
    },
    yesterday: {
      key: 'yesterday',
      translateKey: 'PERIODS_YESTERDAY',
      limit: this.calculatePeriodLimit('date', -1),
    },
    lastWeek: {
      key: 'lastWeek',
      translateKey: 'PERIODS_LAST_WEEK',
      limit: this.calculatePeriodLimit('week', -1),
    },
    lastMonth: {
      key: 'lastMonth',
      translateKey: 'PERIODS_LAST_MONTH',
      limit: this.calculatePeriodLimit('month', -1),
    },
    lastYear: {
      key: 'lastYear',
      translateKey: 'PERIODS_LAST_YEAR',
      limit: this.calculatePeriodLimit('year', -1),
    },

    // components will make an exception for all time - no period has to be selected
    // on the server this simply removes the WHERE condition
    // allTime: {
    //   key: 'allTime',
    //   translateKey: 'PERIODS_ALL_TIME',
    //   limit: undefined,
    // },

    custom: {
      key: 'custom',
      translateKey: 'CUSTOM',
      limit: undefined,
    },
  };
  categories = {
    THIS: [this.periods.today, this.periods.week, this.periods.month, this.periods.year],
    LAST: [this.periods.yesterday, this.periods.lastWeek, this.periods.lastMonth,
    this.periods.lastYear],
    // OTHER: [this.periods.allTime],
  };

  definition(key: Period) {
    let instance = _.cloneDeep(this.periods[key]);
    const calculate = instance.limit;
    if (calculate) {
      instance = { ...instance, start: calculate.start(), end: calculate.end() } as any;
    }
    return instance;
  }

  public index = this.periods;

  calculatePeriodLimit(periodKey: Moment.unitOfTime.All, modifier?: number) {
    const dateModifier = modifier || 0;
    const currentPeriod = Moment().get(periodKey as any);

    return {
      start() {
        return Moment()
          .set(periodKey, currentPeriod + dateModifier)
          .startOf(periodKey as any)
          .format(dateFormat);
      },
      end() {
        return Moment()
          .set(periodKey, currentPeriod + dateModifier)
          .endOf(periodKey as any)
          .format(dateFormat);
      },
    };
  }

  processFilterChanges(period: any) {
    const periodChanges = [];

    if (period === this.periods.custom) {
      // ensure period key is empty
      periodChanges.push({ key: 'period', value: period.key, displayValue: period.translateKey });

      // populate custom values
      periodChanges.push({ key: 'custom_period_start', value: period.customPeriodStart });
      periodChanges.push({ key: 'custom_period_end', value: period.customPeriodEnd });
    } else {
      // ensure custom period options are removed
      periodChanges.push({ key: 'custom_period_start', value: null });
      periodChanges.push({ key: 'custom_period_end', value: null });

      periodChanges.push({ key: 'period', value: period.key, displayValue: period.translateKey });
    }

    return periodChanges;
  }
  defaultFilters() {
    const defaultPeriod = this.periods.today;
    return [
      { key: 'period', value: defaultPeriod.key, displayValue: defaultPeriod.translateKey },
      { key: 'custom_period_start', value: null },
      { key: 'custom_period_end', value: null },
    ];
  }
}

export default PeriodService;
