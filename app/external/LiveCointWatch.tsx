import { MongoClient } from 'mongodb';
import cron from 'node-cron';
import { Response } from './Response';

const apiKey: string = process.env.NEXT_PUBLIC_LIVE_COIN_API_KEY || '';
const db_url: string = process.env.NEXT_PUBLIC_MONGODB_URI || '';

export async function getResponse() {
  const client = new MongoClient(db_url);
  try {
    await client.connect();
    const database = client.db("fomo_factory");
    const collection = database.collection("stocks");

    const res = collection.find().sort({ timestamp: -1 }).limit(20).toArray();
    console.log("Data fetched successfully!");
    return await res;
  } catch (error) {
    console.log("Something went wrong!");
    console.log(error);
  } finally {
    await client.close();
  }
  return [];
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
  const json: Response[] = await res.json();

  console.log("API Invocation completed at: ", new Date());
  await storeStocks(json);
  console.log("Storing completed");
}

cron.schedule('*/10 * * * * *', getStocks);

async function storeStocks(data: Response[]) {
  const client = new MongoClient(db_url);
  try {
    await client.connect();
    const database = client.db("fomo_factory");
    const collection = database.collection("stocks");

    await collection.insertMany(data.map(d => {
      return { ...d, timestamp: Date.now() };
    }));

    console.log("Data saved successfully!");
  } catch (error) {
    console.log("Something went wrong while storing data!");
    console.log(error);

  } finally {
    await client.close();
  }
}
