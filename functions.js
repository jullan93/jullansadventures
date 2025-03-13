/* Menyikon som knapp för öppning av overlay meny */

function openNav() {
    document.getElementById("myNav").style.width = "100%";
  }
  
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }

  

  document.addEventListener('DOMContentLoaded', () => {
    const blogOverview = document.getElementById('blog-overview');

    // Fetch blog posts from the JSON file
    fetch('posts.json')
      .then(response => response.json())
      .then(posts => {
        // Sort posts by id in descending order (newest first)
        posts.sort((a, b) => b.id - a.id);

        posts.forEach(post => {
          // Create a blog post preview card
          const postPreview = document.createElement('div');
          postPreview.className = 'blog-post-preview';

          postPreview.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.excerpt}</p>
            <p><span style="display: flex; align-items: center;"><i class="fa-regular fa-clock" style="color: #b5b1aa;"></i>  ${post.date}</span></p>
            <p><span style="display: flex; align-items: center;"><i class="fa-solid fa-tag" style="color: #b5b1aa;"></i>  ${post.category}</span></p>
            <a href="post.html?id=${post.id}">Read more...</a>
          `;

          blogOverview.appendChild(postPreview);
        });
      })
      .catch(error => console.error('Error fetching blog posts:', error));
  });

  document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    fetch('posts.json')
      .then(response => response.json())
      .then(posts => {
        const post = posts.find(p => p.id === postId);

        if (post) {
          document.getElementById('post-title').textContent = post.title;
          document.getElementById('post-date').textContent = post.date;
          document.getElementById('post-category').textContent = post.category;
          document.getElementById('post-content').innerHTML = `<p>${post.content}</p>`;
        } else {
          document.getElementById('post-title').textContent = 'Post Not Found';
          document.getElementById('post-content').innerHTML = '<p>Sorry, this post does not exist.</p>';
        }
      })
      .catch(error => console.error('Error fetching post data:', error));
  });

  function loadPost(index) {
    if (index >= 0 && index < posts.length) {
      document.getElementById("post-title").innerText = posts[index].title;
      document.getElementById("post-content").innerText = posts[index].content;
      updateButtons(index);
    }
  }
  
  function updateButtons(index) {
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
  
    if (index > 0) {
      prevBtn.disabled = false;
      prevBtn.onclick = () => goToPost(posts[index - 1].id);
    } else {
      prevBtn.disabled = true;
    }
  
    if (index < posts.length - 1) {
      nextBtn.disabled = false;
      nextBtn.onclick = () => goToPost(posts[index + 1].id);
    } else {
      nextBtn.disabled = true;
    }
  }
  
  function goToPost(postId) {
    window.location.href = `blog.html?id=${postId}`;
  }