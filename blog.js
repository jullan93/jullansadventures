const blogContainer = document.getElementById('blog-container');
const loadMoreBtn = document.getElementById('load-more');
let page = 1;

async function fetchPosts() {
    try {
        const response = await fetch(`https://public-api.wordpress.com/wp/v2/sites/jullansadventures.wordpress.com/posts?page=${page}&per_page=8&_embed`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const posts = await response.json();

        // Debugging: Log the full API response
        console.log("Fetched Posts Data:", posts);

        posts.forEach(post => {
            console.log("Single Post Data:", post); // Log each post
            
            const postElement = document.createElement('div');
            postElement.classList.add('blog-post');

            // Extract featured image correctly
            let featuredImage = null;
            if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
                featuredImage = post._embedded['wp:featuredmedia'][0].source_url;
            }

            console.log("Featured Image Data:", post._embedded?.['wp:featuredmedia']); // Debug media array
            console.log("Extracted Featured Image URL:", featuredImage); // Debug the final URL

            const excerpt = post.excerpt?.rendered || '';
            const date = new Date(post.date).toLocaleDateString();
            const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Uncategorized';

            postElement.innerHTML = `
                <div class="post-image-container">
                    ${featuredImage ? `<img src="${featuredImage}" alt="${post.title.rendered}" class="post-image">` 
                    : '<p class="no-image">No image available</p>'}
                </div>
                <h2><a href="post.html?id=${post.id}">${post.title.rendered}</a></h2>
                <p class="post-meta">${category} | ${date}</p>
                <p>${excerpt}</p>
                <a href="post.html?id=${post.id}" class="read-more">Read more...</a>
            `;

            blogContainer.appendChild(postElement);
        });

        page++; // Increase page for next load

    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}

// Load more posts on button click
loadMoreBtn.addEventListener('click', fetchPosts);

// Initial load
fetchPosts();
