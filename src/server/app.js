const express = require('express')
const cors = require('cors')
const app = express()
// in server.js
const bodyParser = require('body-parser');
// after server has been declared
app.use(bodyParser.json());

// const port = process.PORT || 8090
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
            try {
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
            catch(err) {
                console.log(err)
            }
        }
    })
})

app.post('/comment', async (req, res) => {
    const newCom = req.body;
    fs.readFile('./src/server/posts.json', 'utf-8', (err, data) => {
        if(err) {
            console.log(err)
        }
        else {
            try {
                const postsData = JSON.parse(data)
                postsData.posts[newCom.postId -1].comments.push({id: newCom.id, comment: newCom.comment})
                fs.writeFile('./src/server/posts.json', JSON.stringify(postsData, null, 2), err => {
                    if (err){
                        console.log(err)
                    }
                    else {
                        console.log('success')
                    }
    
                })
            }
            catch (err) {
                console.log(err)
            }
        }
    })
})

app.post('/emoji', async (req, res) => {
    const newEmoji = req.body;
    fs.readFile('./src/server/posts.json', 'utf-8', (err, data) => {
        if(err) {
            console.log(err)
        }
        else {
            try {
                const postsData = JSON.parse(data)
                postsData.posts[newEmoji.postId -1].noLikes = newEmoji.noLikes
                postsData.posts[newEmoji.postId -1].noDislikes = newEmoji.noDislikes
                postsData.posts[newEmoji.postId -1].noEmojis = newEmoji.noEmojis
                fs.writeFile('./src/server/posts.json', JSON.stringify(postsData, null, 2), err => {
                    if (err){
                        console.log(err)
                    }
                    else {
                        console.log('success')
                    }
    
                })
            }
            catch (err) {
                console.log(err)
            }
        }
    })

})

app.post('/gifs', async (req, res) => {
    const newGif = req.body;
    fs.readFile('./src/server/posts.json', 'utf-8', (err, data) => {
        if(err) {
            console.log(err)
        }
        else {
            try {
                const postsData = JSON.parse(data)
                postsData.posts[newGif.postId -1].gifs.push(newGif.newGiffy)
                fs.writeFile('./src/server/posts.json', JSON.stringify(postsData, null, 2), err => {
                    if (err){
                        console.log(err)
                    }
                    else {
                        console.log('success')
                    }
    
                })
            }
            catch (err) {
                console.log(err)
            }
        }
    })
})
app.get('/posts', (req,res)=> {
    fs.readFile('./src/server/posts.json', 'utf-8', (err, data) => {
        if(err) {
            console.log(err)
        }
        else {
            try {
                const obj = JSON.parse(data)
                res.send(obj.posts)
            }
            catch (err) {
                console.log(err)
            }
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

