// fetch('https://mocki.io/v1/c51b5636-1305-4b9a-85cc-b0ecea03894f')
//    .then(response => response.json())
//    .then(posts => displayPosts(posts))
//    .catch(error => console.error('Error loading posts:', error));

fetch("posts.json")
    .then(response => response.json())
    .then(posts => displayPosts(posts))
    .catch(error => console.error("Error loading posts:", error));

function displayPosts(posts) {
    const container = document.querySelector(".content");

    posts.forEach(post => {
        const article = document.createElement("article");
        article.className = "post";

        article.innerHTML = `
        <div class="post-header">
            <img src="${post.avatar}" alt="User icon" class="user-icon">
            <p class="meta">
              <time datetime="${post.created_at}">
                ${new Date(post.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                })}
                </time> by <span class="author">${post.author}</span>
            </p>
        </div>
        ${
            post.image
                ? `<img src="${post.image}" alt="Post image" class="post-img">`
                : ""
        }
        <p>${post.content}</p>
        `;

        container.appendChild(article);
    });
}

let dropDown = document.getElementById("dropDown");

function toggleMenu() {
    dropDown.classList.toggle("open-menu");
}
