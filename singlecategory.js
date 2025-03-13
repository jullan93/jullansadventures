const params = new URLSearchParams(window.location.search);
        const category = params.get('category');
        document.getElementById('category-title').innerText = category;
        
        fetch(`https://public-api.wordpress.com/rest/v1.1/sites/jullansadventures.wordpress.com/posts/?category=${category}`)
            .then(response => response.json())
            .then(data => {
                const postList = document.getElementById('post-list');
                postList.innerHTML = '';

                data.posts.forEach(post => {
                    let postElement = document.createElement('div');
                    postElement.className = 'post-card';
                    postElement.innerHTML = `
                        <h2>${post.title}</h2>
                        <p>${post.excerpt}</p>
                        <a href="post.html?id=${post.ID}" class="read-more">Read more...</a>
                    `;
                    postList.appendChild(postElement);
                });
            })
        
        .catch(error => console.error("Error fetching posts:", error));