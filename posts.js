const postsList = document.getElementById("posts-list");

async function fetchPosts() {
  try {
    const postsResponse = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_expand=user&_embed=comments"
    );
    const posts = await postsResponse.json();
    console.log(posts);

    for (const post of posts) {
      const user = post.user;
      const comments = post.comments;

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
