const thumbUp = document.getElementById('thumbsUp');
const numThumbUp = document.getElementById('countThumbUp');
const postBox = document.getElementById('postBox');
const share = document.getElementById('share');
const postText = document.getElementById('postText');
const gif = document.getElementById('gif');
const laughFace = document.getElementById('laughFace');
const numLaughFace = document.getElementById('countLaughFace');
const thumbDown = document.getElementById('thumbsDown');
const numThumbDown = document.getElementById('countThumbDown');

const posts = [];


// get postText input field and update value

thumbUp.addEventListener('click', (e)=>{
    e.preventDefault()
    countThumbUp++
    numThumbUp.textContent = countThumbUp
});

thumbDown.addEventListener('click', ()=>{
    /*
    * todo get current likes for chosen post by
    * e.g. posts.find((post) => post.id === giveId)
    * given ID comes from the post that is liked
    * increment that
    * push that to the server
    * server finds the post and changes the value and writes again on posts.json
    * */

    countThumbDown++
    numThumbDown.textContent = countThumbDown
});


 laughFace.addEventListener('click', ()=>{
     countLaughFace ++
     numLaughFace.textContent = countLaughFace
 })


// Load Posts
addEventListener('load', async (e) => {
    const postsJson = await fetch('http://localhost:8080/posts');
    posts.push(...await postsJson.json());
    console.log(posts);
})
 

share.addEventListener('click', async (e) => {
    const newId = posts.length + 1;
    posts.push({ id: newId, value: postBox.value })
    const response = await fetch('http://localhost:8080/post',
        {
            headers: {'Content-Type': 'application/json'},
            method: "POST",
            body: JSON.stringify({ id: newId, value: postBox.value})
        });
})
 

 

 
