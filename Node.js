const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/content_management_tool', { useNewUrlParser: true, useUnifiedTopology: true });
const Blog = mongoose.model('Blog', { title: String, content: String, image: String, video: String });

app.post('/api/blogs', (req, res) => {
    const { title, content, image, video } = req.body;
    const blog = new Blog({ title, content, image, video });

    blog.save((err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send('Blog created successfully');
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
