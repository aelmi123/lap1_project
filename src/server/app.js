const express = require('express')
const cors = require('cors')
const app = express()
// in server.js
const bodyParser = require('body-parser');
// after server has been declared
app.use(bodyParser.json());

const port = 8080

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World')
})

const fs = require('fs')
const Post = require("../models/Post");
app.post('/post', async (req, res) => {
    const newPost = req.body;
    fs.readFile('./src/server/posts.json', 'utf-8', (err, data) => {
        if(err) {
            console.log(err)
        }
        else {
            const postsData = JSON.parse(data)
            console.log('server:', postsData)
            postsData.posts.push(new Post(newPost.id, newPost.value))
            console.log('new posts: ', postsData )
            fs.writeFile('./src/server/posts.json', JSON.stringify(postsData, null, 2), err => {
                if (err){
                    console.log(err)
                }
                else {
                    console.log('success')
                }

            })
        }
    })
})

app.get('/posts', (req,res)=> {
    fs.readFile('./src/server/posts.json', 'utf-8', (err, data) => {
        if(err) {
            console.log(err)
        }
        else {
            const obj = JSON.parse(data)
            res.send(obj.posts)
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
