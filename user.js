const userInfoContainer = document.getElementById("user-info");
const userPostsContainer = document.getElementById("user-posts");
const userAlbumsContainer = document.getElementById("user-albums");

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userId");

async function fetchUserPosts() {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    const posts = await response.json();

    for (const post of posts) {
      const commentsResponse = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
      );
      const comments = await commentsResponse.json();

      const listItem = document.createElement("li");
      listItem.innerHTML = `<a href="post.html?postId=${post.id}">${post.title}</a> (${comments.length})`;
      userPostsContainer.appendChild(listItem);
    }
  } catch (error) {
    console.error("Klaida įkeliant vartotojo įrašus:", error);
    userPostsContainer.innerHTML =
      "<p>Klaida: vartotojo įrašų nepavyko įkelti.</p>";
  }
}

async function fetchUserAlbums() {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
    );
    const albums = await response.json();

    for (const album of albums) {
      const photosResponse = await fetch(
        `https://jsonplaceholder.typicode.com/albums/${album.id}/photos`
      );
      const photos = await photosResponse.json();

      const listItem = document.createElement("li");
      listItem.innerHTML = `<a href="album.html?albumId=${album.id}">${album.title}</a> (${photos.length})`;
      userAlbumsContainer.appendChild(listItem);
    }
  } catch (error) {
    console.error("Klaida įkeliant vartotojo albumus:", error);
    userAlbumsContainer.innerHTML =
      "<p>Klaida: vartotojo albumų nepavyko įkelti.</p>";
  }
}

fetchUserPosts();
fetchUserAlbums();
