import { MongoClient } from 'mongodb';
import cron from 'node-cron';
import { Response } from './Response';

let response: Response[];

const apiKey: string = process.env.NEXT_PUBLIC_LIVE_COIN_API_KEY || '';
const db_url:string = process.env.NEXT_PUBLIC_MONGODB_URI || '';

export function getResponse() {
  return response;
}

async function getStocks() {
  console.log("API Invocation started at: ", new Date());

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
      limit: 5,
      meta: true
    })
  })
  const headers = res.headers;
  // console.log(headers);

  const json: Response[] = await res.json();
  // console.log();
  // console.log("api response");
  console.log(json);
  // console.log();

  response = json;
  console.log("API Invocation completed at: ", new Date());
  await storeStocks(response);
  console.log("Storing completed");
}

// export function startCron() {
//   // getStocks();
// }
getStocks();
cron.schedule('0 */1 * * * *', getStocks);

async function storeStocks(data: Response[]) {
  const client = new MongoClient(db_url);
  try {
    await client.connect();

    // Choose a name for your database
    const database = client.db("fomo_factory");

    // Choose a name for your collection
    const collection = database.collection("stocks");

    await collection.insertMany(data);

    console.log("Data saved successfully!");
  } catch (error) {
    console.log("Something went wrong!");
  } finally {
    await client.close();
  }
}
