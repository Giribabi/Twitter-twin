const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3030;

app.use(
    cors({
        origin: ["http://localhost:3000", "https://twitter-twin.vercel.app"],
        optionsSuccessStatus: 200,
    })
);

app.use(express.json());
const ObjectId = mongoose.Types.ObjectId;

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
        const commentsCollection = client.db("database").collection("comments");

        console.log("You successfully connected to MongoDB!");

        //get
        app.get("/post", async (req, res) => {
            const post = (await postsCollection.find().toArray()).reverse();
            res.send(post);
        });

        app.get("/user", async (req, res) => {
            const user = await usersCollection.find().toArray();
            res.send(user);
        });

        app.get("/loggedUser", async (req, res) => {
            const email = req.query.email;
            const user = await usersCollection.find({ email: email }).toArray();
            res.send(user);
        });

        app.get("/myPosts", async (req, res) => {
            const email = req.query.email;
            const post = (
                await postsCollection.find({ email: email }).toArray()
            ).reverse();
            res.send(post);
        });

        //post
        app.post("/post", async (req, res) => {
            const post = req.body;
            post.createdAt = new Date();
            const result = await postsCollection.insertOne(post);
            res.send(result);
        });

        app.post("/posts/:id/all-comments", async (req, res) => {
            try {
                const { id } = req.params;
                const result = (
                    await commentsCollection.find({ postId: id }).toArray()
                ).reverse();
                res.status(200).send(result);
            } catch (error) {
                console.error("Error posting comment:", error);
                res.status(500).json({ message: "Server error" });
            }
        });

        app.post("/posts/:id/comment", async (req, res) => {
            try {
                const comment = req.body;
                comment.createdAt = new Date();
                const result = await commentsCollection.insertOne(comment);
                res.status(200).send(result);
            } catch (error) {
                console.error("Error posting comment:", error);
                res.status(500).json({ message: "Server error" });
            }
        });

        app.post("/posts/:id/like", async (req, res) => {
            try {
                const post = await postsCollection.findOne({
                    _id: new ObjectId(req.params.id),
                });
                if (!post) {
                    return res.status(404).send("Post not found");
                }

                const { email } = req.body;
                const user = usersCollection.findOne({ email });
                if (!user) {
                    return res.status(404).send("Invalid User");
                }
                const updateQuery = req.body.liked
                    ? { $addToSet: { likes: email } } // add the user's like
                    : { $pull: { likes: email } }; // remove the user's like

                const updatedPost = await postsCollection.findOneAndUpdate(
                    { _id: new ObjectId(req.params.id) },
                    updateQuery,
                    { new: true }
                );

                res.status(200).send(updatedPost);
            } catch (error) {
                console.error("Error liking the post:", error);
                res.status(500).send("Server error");
            }
        });

        //register user
        app.post("/register", async (req, res) => {
            try {
                const user = req.body;
                const { email } = user;
                const userExists = await usersCollection.findOne({ email });
                if (userExists) {
                    res.status(400).send("User exists");
                }
                const result = await usersCollection.insertOne(user);
                res.send(result);
            } catch (error) {
                console.log(error);
            }
        });

        //patch
        app.patch("/profile/update/:email", async (req, res) => {
            const filter = req.params;
            const profile = req.body;
            const options = { upsert: true };
            const updateDoc = { $set: profile };
            const result = await usersCollection.updateOne(
                filter,
                updateDoc,
                options
            );
            res.send(result);
        });
    } catch (error) {
        console.log(error);
    }
}
run().catch(console.dir);

console.log("Your server started");

app.get("/", function (req, res) {
    res.send("Hello World, this is my Twitter-twin API");
});

app.listen(PORT);
