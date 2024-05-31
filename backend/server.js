const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 3030;

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.sgucunb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        // Connect the client to the server
        await client.connect();
        const postsCollection = client.db("database").collection("posts");
        const usersCollection = client.db("database").collection("users");

        console.log("You successfully connected to MongoDB!");

        //get
        app.get("/post", async (req, res) => {
            const post = await postsCollection.find().toArray();
            res.send(post);
        });

        //post
        app.post("/post", async (req, res) => {
            const post = req.body;
            const result = await postsCollection.insertOne(post);
            res.send(result);
        });
    } catch (error) {
        console.log(error);
    }
}
run().catch(console.dir);

console.log("Your server started");

app.get("/", function (req, res) {
    res.send("Hello World");
});

app.listen(PORT);
