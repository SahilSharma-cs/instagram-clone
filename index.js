import { posts } from  "./data.js"

const postBlock = document.getElementById('post-block')

document.addEventListener('click',function(e){
    if(e.target.dataset.like){
        handleClickLike(e.target.dataset.like)
    }
})

function handleClickLike(postId){
    const targetObj = posts.filter(function(post){
        return post.uuid === postId
    })[0]

    if(targetObj.isLiked){
        targetObj.likes--
    }
    else{
        targetObj.likes++
    }
    targetObj.isLiked = !targetObj.isLiked
    render()
}

function getPostHtml(){
    let postHtml = ''

    posts.forEach(function(post){
        let heartClass = 'fa-regular'
        let likeIconClass=''
        if(post.isLiked){
            heartClass = 'fa-solid'
            likeIconClass = 'liked'
        }

        postHtml+= `<div class="post-header">
            <img class="profile-logo" 
                src="${post.avatar}">
                <div class="profile-text">
                    <h2>${post.name}</h2>
                    <p>${post.location}</p>
                </div>
        </div>
            <div class="post-image">
                <img src="${post.post}">
            </div>
            <div class="post-actions">
                <i class='${heartClass} fa-heart ${likeIconClass}' data-like="${post.uuid}"></i>
                <i class='fa-regular fa-comment'></i>
                <i class='fa-regular fa-paper-plane'></i>
            </div>
            <div class="post-info">
                <h3>${post.likes} likes</h3>
                <p><span class="bold-text">${post.username}</span>${post.comment}</p>
        </div>
        `
    })
    return postHtml
}

function render(){
    postBlock.innerHTML = getPostHtml()
}
render()