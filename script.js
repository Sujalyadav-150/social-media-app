const postForm = document.getElementById("postForm");
const postLink = document.getElementById("postLink");
const postDescription = document.getElementById("postDescription");
const postsContainer = document.getElementById("postsContainer");

let posts = [];

function renderPosts() {
    postsContainer.innerHTML = "";

    if (posts.length === 0) {
        postsContainer.innerHTML = '<p class="empty">No posts yet.</p>';
        return;
    }

    posts.forEach((post, index) => {
        const card = document.createElement("div");
        card.className = "post-card";

        const image = document.createElement("img");
        image.src = post.link;
        image.alt = "Post image";
        image.onerror = () => {
            image.alt = "Unable to load image";
        };

        const description = document.createElement("div");
        description.className = "post-description";
        description.textContent = "User - " + post.description;

        const heading = document.createElement("div");
        heading.className = "comment-heading";
        heading.textContent = "💬 Comment";

        const commentBox = document.createElement("div");
        commentBox.className = "comment-box";

        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Write a Comment";

        const sendButton = document.createElement("button");
        sendButton.textContent = "Send";

        sendButton.addEventListener("click", () => {
            const text = input.value.trim();

            if (!text) {
                return;
            }

            post.comments.push(text);
            input.value = "";
            renderPosts();
        });

        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                sendButton.click();
            }
        });

        const comments = document.createElement("div");
        comments.className = "comments";

        post.comments.forEach(commentText => {
            const comment = document.createElement("div");
            comment.className = "comment";

            const user = document.createElement("strong");
            user.textContent = "Anonymous - ";

            const text = document.createElement("span");
            text.textContent = commentText;

            comment.appendChild(user);
            comment.appendChild(text);
            comments.appendChild(comment);
        });

        commentBox.appendChild(input);
        commentBox.appendChild(sendButton);

        card.appendChild(image);
        card.appendChild(description);
        card.appendChild(heading);
        card.appendChild(commentBox);
        card.appendChild(comments);

        postsContainer.appendChild(card);
    });
}

postForm.addEventListener("submit", (event) => {
    event.preventDefault();

    posts.push({
        link: postLink.value.trim(),
        description: postDescription.value.trim(),
        comments: []
    });

    postForm.reset();
    renderPosts();
});

renderPosts();
