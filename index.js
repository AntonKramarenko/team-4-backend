const express = require('express')
const PORT = process.env.PORT || 3001
const objects = require('./routes/objects')
const mongoose = require('mongoose')
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(objects);

const uri = "mongodb+srv://admin:admin@cluster0.spcdnnn.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function runMongoDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}



async function start() {
  try {
    runMongoDB().catch(console.dir);

    await mongoose.connect(uri, { useNewUrlParser: true })

    app.listen(PORT, () => {
      console.log(`Server starting on port ${PORT}`);
    })
  } catch (error) {
    console.log(error);
  }
}

start()
