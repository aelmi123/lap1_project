const express = require('express')
const cors = require('cors')
const app = express()
const port = 8080

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World')
})

const fs = require('fs')
app.post('/posts', (req, res) => {
    fs.readFile('./posts.json', 'utf-8', (err, data) => {
        if(err) {
            console.log(err)
        }
        else {
            const obj = JSON.parse(data)
            console.log(req)
            obj.post.push(req.body)
            fs.writeFile('./posts.json', JSON.stringify(obj, null, 2), err => {
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
    fs.readFile('./posts.json', 'utf-8', (err, data) => {
        if(err) {
            console.log(err)
        }
        else {
            const obj = JSON.parse(data)
            res.send(obj.post)
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
