import cron from 'node-cron';

let response: any;

const apiKey: string = process.env.NEXT_PUBLIC_LIVE_COIN_API_KEY || '';

export function getResponse() {
  return response;
}

async function getStocks() {
  console.log("API Invocation started at: ", new Date());
  console.log(apiKey);
  

  const res = await fetch('https://api.livecoinwatch.com/exchanges/list', {
    cache: "no-store",
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
      'x-api-key': apiKey
    }),
    body: JSON.stringify({
      currency: 'USD',
      sort: 'visitors',
      order: 'descending',
      offset: 0,
      limit: 1,
      meta: true
    })
  })
  const headers = res.headers;
  // console.log(headers);

  const json = await res.json();
  // console.log();
  // console.log("api response");
  // console.log(json);
  // console.log();

  response = json;
  console.log("API Invocation completed at: ", new Date());

}

// export function startCron() {
//   // getStocks();
// }
// getStocks();
cron.schedule('0 */1 * * * *', getStocks);
