const userInfoContainer = document.getElementById("user-info");
const userPostsContainer = document.getElementById("user-posts");
const userAlbumsContainer = document.getElementById("user-albums");

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userId");

async function fetchUserPosts() {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}&_embed=comments`
    );
    const posts = await response.json();

    for (const post of posts) {
      const comments = post.comments;

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
      `https://jsonplaceholder.typicode.com/albums?userId=${userId}&_embed=photos`
    );
    const albums = await response.json();
    console.log(albums);

    for (const album of albums) {
      const photos = album.photos;

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
