const postsList = document.getElementById("posts-list");

async function fetchPosts() {
  try {
    const postsResponse = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const posts = await postsResponse.json();

    for (const post of posts) {
      const userResponse = await fetch(
        `https://jsonplaceholder.typicode.com/users/${post.userId}`
      );
      const user = await userResponse.json();

      const commentsResponse = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
      );
      const comments = await commentsResponse.json();

      const listItem = document.createElement("li");
      listItem.innerHTML = `<a href="post.html?postId=${post.id}">${post.title} (${comments.length})</a> - <a href="user.html?userId=${user.id}">${user.name}</a>`;
      postsList.appendChild(listItem);
    }
  } catch (error) {
    postsList.innerHTML = "<p>Klaida: nepavyko įkelti postų.</p>";
    console.error("Klaida:", error);
  }
}

fetchPosts();
