import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, './build')));
app.use(bodyParser.json());

const withDb = async (func, res) => {
    try {

        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });

        const db = client.db('BlogDb');

        await func(db);

        client.close();
    } catch (error) {
        res.status(500).json({ Message: 'Error occured', error: error });
    }
}

app.get('/api/articles/:name', async (req, res) => {
    withDb(async (db) => {
        const articleName = req.params.name;

        const articleInfo = await db.collection('articles').findOne({ name: articleName });

        res.status(200).json(articleInfo);
    }, res)
});

app.post('/api/articles/:name/upvote', async (req, res) => {
    withDb(async (db) => {
        const articleName = req.params.name;

        const articleInfo = await db.collection('articles').findOne({ name: articleName });

        await db.collection('articles').updateOne({ name: articleName }, {
            $set: {
                upvotes: articleInfo.upvotes + 1
            }
        });

        const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName });

        res.status(200).json(updatedArticleInfo);
    }, res)
});

app.post('/api/articles/:name/add-comment', (req, res) => {
    withDb(async (db) => {
        const articleName = req.params.name;
        const { text, username } = req.body;

        const articleInfo = await db.collection('articles').findOne({ name: articleName });

        await db.collection('articles').updateOne({ name: articleName }, {
            $set: {
                comments: articleInfo.comments.concat({ text, username })
            }
        });

        const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName });

        res.status(200).json(updatedArticleInfo);
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + './build/index.html'));
})

app.listen(8000, () => console.log('Listening on port 8000'));

