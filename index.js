const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;


// middle wares
app.use(cors());
app.use(express.json());


// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASSWORD);


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.1ndgjy2.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {

        const postCollection = client.db('myBook').collection('allPost')


        app.post('/allPost', async (req, res) => {
            const totalPost = req.body;
            const result = await postCollection.insertOne(totalPost)
            console.log(result);
            res.send(result)
        });

        app.get('/allPost', async (req, res) => {
            const query = {}
            const cursor = postCollection.find(query)
            const posts = await cursor.toArray();
            res.send(posts);
        });

        app.get('/allPost/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const posts = await postCollection.findOne(query)
            res.send(posts);
        });

       

    }
    finally {

    }
}
run().catch(error => console.error(error))



app.get('/', (req, res) => {
    res.send('myBook server is running')
})

app.listen(port, () => {
    console.log(`myBook server is running on ${port}`);
})