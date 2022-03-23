const thumbUp = document.getElementById('thumbsUp');
const numThumbUp = document.getElementById('countThumbUp');
const postBox = document.getElementById('post-Box');
const share = document.getElementById('share');
const postText = document.getElementById('postText');
const gif = document.getElementById('gif');
const laughFace = document.getElementById('laughFace');
const numLaughFace = document.getElementById('countLaughFace');
const thumbDown = document.getElementById('thumbsDown');
const numThumbDown = document.getElementById('countThumbDown');
const sendComment = document.getElementById('sendComment');
const commentBox = document.getElementById('commentsBox');
const gifImage = document.getElementById("gifImage")

const posts = [];


// Load Posts
addEventListener('load', async (e) => {
    const postsJson = await fetch('http://localhost:8080/posts');
    posts.push(...await postsJson.json());
})
const ul = document.getElementById('commentList')
const container = document.getElementById('container')
addEventListener('load', async (e) => {
    let resp = await fetch('http://localhost:8080/posts');
    let data = await resp.json()
    for (i = 0; i < data.length; i++) {
        if (data[i].id === data.length){
            let post = data[i].value
            postText.textContent = post
            let comment = data[i].comments
            if (comment !== []){
                comment.forEach(item => {
                    let li = document.createElement('li')
                    li.textContent = item.comment
                    ul.appendChild(li)
                });
            }
            numLaughFace.textContent = data[i].noEmojis
            numThumbUp.textContent = data[i].noLikes
            numThumbDown.textContent = data[i].noDislikes
            let giffys = data[i].gifs
            if (giffys !== []){
                giffys.forEach(item => {
                    let img = document.createElement('img')
                    img.setAttribute('src', item)
                    ul.appendChild(img)
                });
            }
        }
        // else {
            //     let div = document.createElement('div')
            //     div.className = "blogbox rounded"
            //     let para = document.createElement('p')
            //     para.textContent = data[i].value
            //     div.appendChild(para)
            //     let form = document.createElement('form')
            //     let comments = document.createElement('input')
            //     comments.type = "text"
            //     comments.placeholder = "Leave a comment"
            //     comments.maxLength = "200"
            //     comments.size = "50"
            //     form.appendChild(comments)
            //     let buttons =document.createElement('div')
            //     buttons.className = "row"
            //     let button1 = document.createElement('div')
            //     button1.className = "col-sm-2"
            //     let emoji1 = document.createElement('input')
            //     emoji1.type = "button"
            //     emoji1.value = "&#128077"
            //     button1.appendChild(emoji1)
            //     buttons.appendChild(button1)
            //     form.appendChild(buttons)
            //     div.appendChild(form)
            //     container.appendChild(div)
            
            // }
        }
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
 
sendComment.addEventListener('click', async(e)=> {
    let resp = await fetch('http://localhost:8080/posts');
    let data = await resp.json();
    let postId = data.find(post => postText.textContent === post.value).id;
    if (commentBox.value){
        let newId = data[postId-1].comments.length + 1;
        posts[postId - 1].comments.push({id: newId, comment: commentBox.value});
        const response = await fetch('http://localhost:8080/comment',
        {
            headers: {'Content-Type': 'application/json'},
            method: "POST",
            body: JSON.stringify({ postId: postId, id: newId, comment: commentBox.value})
        });
    }
    else {
        let url = gifImage.getAttribute('src')
        posts[postId -1].gifs.push(url)
        const response = await fetch('http://localhost:8080/gifs',
        {
            headers: {'Content-Type': 'application/json'},
            method: "POST",
            body: JSON.stringify({postId: postId, newGiffy: url})
        });
    }
});

thumbUp.addEventListener('click', async()=> {
    let resp = await fetch('http://localhost:8080/posts');
    let data = await resp.json();
    let postId = data.find(post => postText.textContent === post.value).id;
    let countThumbUp = posts[postId - 1].noLikes
    clickUp(countThumbUp)
});

let clickCountUp=0;
function clickUp(countThumbUp){
    clickCountUp ++;
    if(clickCountUp % 2 !== 0){
        countThumbUp++
    }
    else {
        countThumbUp--
     }  numThumbUp.textContent = countThumbUp;
}

let countLaughFace = 0

thumbDown.addEventListener('click', async()=> {
    let resp = await fetch('http://localhost:8080/posts');
    let data = await resp.json();
    let postId = data.find(post => postText.textContent === post.value).id;
    let countThumbDown = posts[postId - 1].noDislikes
    clickDown(countThumbDown)
});

let clickCountDown=0;
function clickDown(countThumbDown){
    clickCountDown ++;
    if(clickCountDown % 2 != 0){
        countThumbDown ++;
    }
    else {
        countThumbDown --;
     }  numThumbDown.textContent = countThumbDown;
}


laughFace.addEventListener('click', async()=> {
    let resp = await fetch('http://localhost:8080/posts');
    let data = await resp.json();
    let postId = data.find(post => postText.textContent === post.value).id;
    let countLaughFace = posts[postId - 1].noEmojis
    clickLaugh(countLaughFace)
});

let clickCountLaugh=0;
function clickLaugh(countLaughFace){
    clickCountLaugh ++;
    if(clickCountLaugh % 2 != 0){
        countLaughFace ++;
    }
    else {
        countLaughFace --;
     }  numLaughFace.textContent = countLaughFace;
}

thumbUp.addEventListener('mouseleave', async(e)=> {
    let resp = await fetch('http://localhost:8080/posts');
    let data = await resp.json();
    let postId = data.find(post => postText.textContent === post.value).id;
    posts[postId - 1].noLikes = parseInt(numThumbUp.textContent);
    posts[postId - 1].noDislikes = parseInt(numThumbDown.textContent);
    posts[postId - 1].noEmojis = parseInt(numLaughFace.textContent);
    const response = await fetch('http://localhost:8080/emoji',
    {
        headers: {'Content-Type': 'application/json'},
        method: "POST",
        body: JSON.stringify({ postId: postId, noLikes: parseInt(numThumbUp.textContent), noDislikes: parseInt(numThumbDown.textContent), noEmojis: parseInt(numLaughFace.textContent)})
    });
});
thumbDown.addEventListener('mouseleave', async(e)=> {
    let resp = await fetch('http://localhost:8080/posts');
    let data = await resp.json();
    let postId = data.find(post => postText.textContent === post.value).id;
    posts[postId - 1].noLikes = parseInt(numThumbUp.textContent);
    posts[postId - 1].noDislikes = parseInt(numThumbDown.textContent);
    posts[postId - 1].noEmojis = parseInt(numLaughFace.textContent);
    const response = await fetch('http://localhost:8080/emoji',
    {
        headers: {'Content-Type': 'application/json'},
        method: "POST",
        body: JSON.stringify({ postId: postId, noLikes: parseInt(numThumbUp.textContent), noDislikes: parseInt(numThumbDown.textContent), noEmojis: parseInt(numLaughFace.textContent)})
    });
});
laughFace.addEventListener('mouseleave', async(e)=> {
    let resp = await fetch('http://localhost:8080/posts');
    let data = await resp.json();
    let postId = data.find(post => postText.textContent === post.value).id;
    posts[postId - 1].noLikes = parseInt(numThumbUp.textContent);
    posts[postId - 1].noDislikes = parseInt(numThumbDown.textContent);
    posts[postId - 1].noEmojis = parseInt(numLaughFace.textContent);
    const response = await fetch('http://localhost:8080/emoji',
    {
        headers: {'Content-Type': 'application/json'},
        method: "POST",
        body: JSON.stringify({ postId: postId, noLikes: parseInt(numThumbUp.textContent), noDislikes: parseInt(numThumbDown.textContent), noEmojis: parseInt(numLaughFace.textContent)})
    });
});

const characterCount = document.querySelector('#post-Box');
characterCount.addEventListener('keyup', charCount)
function charCount(e){
    if(e.key){
        document.querySelector('#current').textContent=document.querySelector('#post-Box').value.length

    }
}

function sendApiRequest() {
    let userInput = document.getElementById("gif").value
    console.log(userInput)

    const giphyApiKey = "4qsIN2L7YbHr9wkQfLXylyEPXoG0Z6nZ"
    const giphyApiURL = `http://api.giphy.com/v1/gifs/search?q=${userInput}&rating=g&api_key=${giphyApiKey}`

    fetch(giphyApiURL).then(function(data) {
        return data.json()
    })
    .then(function(json){
        const index = Math.floor(Math.random() * json.data.length)
        console.log(json.data[index].images.fixed_height.url)
        let imgPath = json.data[index].images.fixed_height.url
        let gifImage=document.querySelector("#gifImage")
        // let img = document.createElement("img")
        gifImage.setAttribute("src", imgPath)
        // document.body.appendChild(img)
    })
}


