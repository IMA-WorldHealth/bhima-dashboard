const moment = require("moment");
const PeriodService = require("./period");

const dateFormat = 'YYYY-MM-DD';
exports.parseDate = (params) => {
  const period = new PeriodService(params.client_timestamp);
  const targetPeriod = period.lookupPeriod(params.periode);

  let filter = {
    start: '',
    end: ''
  };
  if (params.key === 'custom') {
    filter.start = moment(new Date(params.customPeriodStart)).format(dateFormat);
    filter.end = moment(new Date(params.customPeriodEnd)).format(dateFormat);
  } else {
    filter.start = moment(new Date(targetPeriod.limit.start())).format(dateFormat);
    filter.end = moment(new Date(targetPeriod.limit.end())).format(dateFormat);
  }

  return filter;
}