import express from 'express';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';
import cors from 'cors';
import { User, useAuth0 } from "@auth0/auth0-react";
dotenv.config()

// Connecting to the MongoDB Client
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
client.connect();

// App & Database
const dbName = 'passwords'
const app = express()
const port = 3000 

// Middleware
app.use(bodyParser.json())
app.use(cors())


app.get('/', async (req, res) => {
    const { email } = req.query;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({ email }).toArray();
    res.json(findResult);
});

// Save a password
app.post('/', async (req, res) => { 
    const { email, ...password } = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne({ email, ...password });
    res.send({ success: true, result: findResult });
});

// Delete a password by id
app.delete('/', async (req, res) => { 
    const { email, id } = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne({ email, id });
    res.send({ success: true, result: findResult });
});

app.listen(port, () => {
    console.log(`Example app listening on  http://localhost:${port}`)
})