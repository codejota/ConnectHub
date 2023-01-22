const defaultBookmarks = [
  { name: "Google", link: "https://www.google.com", logo: "google-logo.png" },
  { name: "Youtube", link: "https://www.youtube.com", logo: "youtube-logo.png" },
  { name: "Github", link: "https://github.com", logo: "github-logo.png" },

  { name: "Google", link: "https://www.google.com", logo: "google-logo.png" },
  { name: "Youtube", link: "https://www.youtube.com", logo: "youtube-logo.png" },
  { name: "Github", link: "https://github.com", logo: "github-logo.png" },
  { name: "Google", link: "https://www.google.com", logo: "google-logo.png" },
  { name: "Youtube", link: "https://www.youtube.com", logo: "youtube-logo.png" },
  { name: "Github", link: "https://github.com", logo: "github-logo.png" },
  { name: "Google", link: "https://www.google.com", logo: "google-logo.png" },
  { name: "Youtube", link: "https://www.youtube.com", logo: "youtube-logo.png" },
  { name: "Github", link: "https://github.com", logo: "github-logo.png" },
];

const defaultBookmarksDiv = document.getElementById("default-bookmarks");
defaultBookmarks.forEach(bookmark => {
  const bookmarkLink = document.createElement("a");
  bookmarkLink.href = bookmark.link;

  const bookmarkImage = document.createElement("img");
  bookmarkImage.src = bookmark.logo;
  bookmarkLink.appendChild(bookmarkImage);

  const bookmarkName = document.createElement("span");
  bookmarkName.innerHTML = bookmark.name;
  bookmarkLink.appendChild(bookmarkName);

  defaultBookmarksDiv.appendChild(bookmarkLink);
});

const customBookmarksDiv = document.getElementById("custom-bookmarks");
const customBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
customBookmarks.forEach((bookmark, index) => {
    const bookmarkLink = document.createElement("a");
    bookmarkLink.href = bookmark.link;

    const bookmarkImage = document.createElement("img");
    bookmarkImage.src = "standard.png";
    bookmarkLink.appendChild(bookmarkImage);

    const bookmarkName = document.createElement("span");
    bookmarkName.innerHTML = bookmark.name;
    bookmarkLink.appendChild(bookmarkName);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "x";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => {
        customBookmarks.splice(index, 1);
        localStorage.setItem("bookmarks", JSON.stringify(customBookmarks));
        customBookmarksDiv.removeChild(bookmarkLink);
    });
    bookmarkLink.appendChild(deleteButton);

    customBookmarksDiv.appendChild(bookmarkLink);
});

const bookmarkForm = document.getElementById("bookmark-form");
bookmarkForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const link = document.getElementById("link").value;

  const bookmark = { name, link };
  customBookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(customBookmarks));

  const bookmarkLink = document.createElement("a");
  bookmarkLink.href = link;

  const bookmarkImage = document.createElement("img");
  bookmarkImage.src = "standard.png";
  bookmarkLink.appendChild(bookmarkImage);

  const bookmarkName = document.createElement("span");
  bookmarkName.innerHTML = name;
  bookmarkLink.appendChild(bookmarkName);

  customBookmarksDiv.appendChild(bookmarkLink);

  bookmarkForm.reset();
});
