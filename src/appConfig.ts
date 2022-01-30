export const getAppConfig = (): {
  catFactsUrl: string;
  interval: number;
  maxRequests?: number;
} => {
  const catFactsUrl = process.env.CAT_FACTS_URL;
  const intervalString = process.env.REQUEST_INTERVAL_MS;
  const maxRequestsString = process.env.MAX_REQUESTS;

  if (!catFactsUrl) throw "CAT_FACTS_URL environment variable not set";
  if (!intervalString) throw "REQUEST_INTERVAL_MS environment variable not set";

  const interval = parseInt(intervalString);
  if (interval === NaN) throw "REQUEST_INTERVAL_MS not a number";

  const maxRequests =
    maxRequestsString === undefined ? NaN : parseInt(maxRequestsString);
  if (maxRequests === NaN) throw "MAX_REQUESTS not a number";

  return { catFactsUrl, interval, maxRequests };
};
