// /api/new-meetup
// POST /api/new-meetup
import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017/";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    let client;
    try {
      client = await MongoClient.connect(uri);
    } catch (error) {
      res.status(500).json({ message: "Could not connect to database." });
      return;
    }

    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    try {
      const result = await meetupsCollection.insertOne(data);
      console.log(result);
      res.status(201).json({ message: "Meetup inserted!" });
    } catch (error) {
      res.status(500).json({ message: "Inserting meetup failed." });
    } finally {
      client.close();
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
