const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://localhost:27017';
const dbName = 'yourDatabaseName';

async function performJoin() {
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db(dbName);

    const result = await db.collection('orders').aggregate([
      {
        $lookup: {
          from: 'customers',
          localField: 'customerId',
          foreignField: '_id',
          as: 'customer'
        }
      }
    ]).toArray();

    console.log(result);
  } catch (error) {
    console.error('Error performing join:', error);
  } finally {
    client.close();
  }
}

performJoin();
