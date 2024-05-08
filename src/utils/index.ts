
export const parseFilter = (period: PeriodBhi) => {
  const params = {
    client_timestamp: new Date().toISOString(),
    periode: period.key || '',
    ...period
 }
  return params
};

export const parseQuery = (params?: unknown) => params
    ? Object.entries(params)
        .map(([keys, value]) => `${keys}=${value}`)
        .join('&')
    : '';