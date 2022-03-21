const thumbUp = document.getElementById('thumbsUp')
const numThumbUp = document.getElementById('countThumbUp')

 
let countThumbUp = 0
thumbUp.addEventListener('click', (e)=>{
    e.preventDefault()
    countThumbUp++
    numThumbUp.textContent = countThumbUp
})

const thumbDown = document.getElementById('thumbsDown')
const numThumbDown = document.getElementById('countThumbDown')

let countThumbDown = 0
thumbDown.addEventListener('click', ()=>{
    countThumbDown++
    numThumbDown.textContent = countThumbDown
})

const laughFace = document.getElementById('laughFace')
const numLaughFace = document.getElementById('countLaughFace')

 let countLaughFace = 0
 laughFace.addEventListener('click', ()=>{
     countLaughFace ++
     numLaughFace.textContent = countLaughFace
 })


 // Posts

const postText = document.getElementById('postText')
const gif = document.getElementById('gif')

addEventListener('load', (e) => {
    fetch('http://localhost:8080/posts').then(resp => resp.json()).then( data => postText.textContent = data)
})
 
 const string = document.getElementById('postBox')

 const share = document.getElementById('share')
 share.addEventListener('click', (e) => {
     console.log(string.value)
})
 

 

 
