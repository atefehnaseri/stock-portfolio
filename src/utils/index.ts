export function createURLQueryParams(queryParams: any): string {

  let queries = 'query?'
  for (const queryParamKey in queryParams) {
    if (Object.prototype.hasOwnProperty.call(queryParams, queryParamKey)) {
      queries += queryParamKey + '=' + queryParams[queryParamKey] + '&'
    }
  }
  return queries.substring(0, queries.length - 1)
}

export function formatNumber(number: string, precision = 2) {
  const actualNumber= parseInt(number)
  const map = [
    { suffix: 'T', threshold: 1e12 },
    { suffix: 'B', threshold: 1e9 },
    { suffix: 'M', threshold: 1e6 },
    { suffix: 'K', threshold: 1e3 },
    { suffix: '', threshold: 1 },
  ];

  const found = map.find((x) => Math.abs(actualNumber) >= x.threshold);
  if (found) {
   return (actualNumber / found.threshold).toFixed(precision) + found.suffix;
  }

  return actualNumber;
}