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
const sendComment = document.getElementById('sendComment');
const commentBox = document.getElementById('commentsBox');

const posts = [];

// let countLaughFace = 0
// let countThumbDown = 0
// let countThumbUp = 0

// // get postText input field and update value
// thumbUp.addEventListener('click', clickUp);

// var clickCountUp=0;
// function clickUp(event){
//     clickCountUp ++;
//     if(clickCountUp % 2 != 0){
//         countThumbUp ++;
//     }
//     else {
//         countThumbUp --;
//      }  numThumbUp.textContent = countThumbUp;
// }



// thumbDown.addEventListener('click', clickDown);

// var clickCountDown=0;
// function clickDown(event){
//     clickCountDown ++;
//     if(clickCountDown % 2 != 0){
//         countThumbDown ++;
//     }
//     else {
//         countThumbDown --;
//      }  numThumbDown.textContent = countThumbDown;
// }


// laughFace.addEventListener('click', clickLaugh);

// var clickCountLaugh=0;
// function clickLaugh(event){
//     clickCountLaugh ++;
//     if(clickCountLaugh % 2 != 0){
//         countLaughFace ++;
//     }
//     else {
//         countLaughFace --;
//      }  numLaughFace.textContent = countLaughFace;
// }




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
            //     let giffy = document.createElement('input')
            //     giffy.type ="button"
            //     giffy.value = "GIF"
            //     form.append(giffy)
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
    

    
sendComment.addEventListener('click', async(e)=> {
    let resp = await fetch('http://localhost:8080/posts');
    let data = await resp.json();
    let postId = data.find(post => postText.textContent === post.value).id;
    let newId = data[postId-1].comments.length + 1;
    posts[postId - 1].comments.push({id: newId, comment: commentBox.value});
    const response = await fetch('http://localhost:8080/comment',
    {
        headers: {'Content-Type': 'application/json'},
        method: "POST",
        body: JSON.stringify({ postId: postId, id: newId, comment: commentBox.value})
    });
});
    
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
 


 
