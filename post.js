const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');
const postTitle = document.getElementById('post-title');
const postMeta = document.getElementById('post-meta');
const postContent = document.getElementById('post-content');
const prevButton = document.getElementById('prev-post');
const nextButton = document.getElementById('next-post');

async function fetchPost() {
    const response = await fetch(`https://public-api.wordpress.com/wp/v2/sites/jullansadventures.wordpress.com/posts/${postId}?_embed`);
    const post = await response.json();
    
    const date = new Date(post.date).toLocaleDateString();
    const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Uncategorized';
    
    postTitle.innerHTML = post.title.rendered;
    postMeta.innerHTML = `${date} | ${category}`;
    // Removed the featured image assignment
    // postImage.src = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
    postContent.innerHTML = post.content.rendered;

    const allPostsResponse = await fetch(`https://public-api.wordpress.com/wp/v2/sites/jullansadventures.wordpress.com/posts?_embed`);
    const allPosts = await allPostsResponse.json();
    const postIndex = allPosts.findIndex(p => p.id == postId);

    if (postIndex > 0) {
        prevButton.style.display = 'inline-block';
        prevButton.onclick = () => window.location.href = `post.html?id=${allPosts[postIndex + 1].id}`;
    }
    if (postIndex < allPosts.length - 1) {
        nextButton.style.display = 'inline-block';
        nextButton.onclick = () => window.location.href = `post.html?id=${allPosts[postIndex - 1].id}`;
    }
}

fetchPost();
