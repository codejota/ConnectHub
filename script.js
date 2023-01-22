// Default Bookmarks
const defaultBookmarks = [
  { name: "Google", link: "https://www.google.com", logo: "google-logo.png" },
  { name: "Youtube", link: "https://www.youtube.com", logo: "youtube-logo.png" },
  { name: "Google", link: "https://www.google.com", logo: "google-logo.png" },
  { name: "Youtube", link: "https://www.youtube.com", logo: "youtube-logo.png" },
  { name: "Google", link: "https://www.google.com", logo: "google-logo.png" },
  { name: "Youtube", link: "https://www.youtube.com", logo: "youtube-logo.png" },
  { name: "Google", link: "https://www.google.com", logo: "google-logo.png" },
  { name: "Youtube", link: "https://www.youtube.com", logo: "youtube-logo.png" },
  { name: "Google", link: "https://www.google.com", logo: "google-logo.png" },
  { name: "Youtube", link: "https://www.youtube.com", logo: "youtube-logo.png" },
  { name: "Github", link: "https://github.com", logo: "github-logo.png" }
  
];

const renderDefaultBookmarks = () => {
  const defaultBookmarksContainer = document.getElementById("default-bookmarks");
  defaultBookmarks.forEach(bookmark => {
      const div = document.createElement("div");
      div.classList.add("bookmark");

      const img = document.createElement("img");
      img.src = bookmark.logo;

      const a = document.createElement("a");
      a.href = bookmark.link;
      a.textContent = bookmark.name;

      div.appendChild(img);
      div.appendChild(a);

      defaultBookmarksContainer.appendChild(div);
  });
};

renderDefaultBookmarks();

// Custom Bookmarks
const customBookmarks = JSON.parse(localStorage.getItem("customBookmarks")) || [];

const renderCustomBookmarks = () => {
  const customBookmarksContainer = document.getElementById("custom-bookmarks");
  customBookmarksContainer.innerHTML = "";
  customBookmarks.forEach((bookmark, index) => {
      const div = document.createElement("div");
      div.classList.add("bookmark");

      const img = document.createElement("img");
      img.src = bookmark.logo || "standard.png";

      const a = document.createElement("a");
      a.href = bookmark.link;
      a.textContent = bookmark.name;

      div.appendChild(img);
      div.appendChild(a);

const deleteButton = document.createElement("div");
      deleteButton.classList.add("delete-button");
      deleteButton.textContent = "x";
      deleteButton.addEventListener("click", () => {
          customBookmarks.splice(index, 1);
          localStorage.setItem("customBookmarks", JSON.stringify(customBookmarks));
          renderCustomBookmarks();
      });
      div.appendChild(deleteButton);

      customBookmarksContainer.appendChild(div);
  });
};

renderCustomBookmarks();

// Form
const bookmarkForm = document.getElementById("bookmark-form");
const nameInput = document.getElementById("name");
const linkInput = document.getElementById("link");
const feedback = document.querySelector("#bookmark-form .feedback");

bookmarkForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = nameInput.value;
    const link = linkInput.value;

    const linkRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)/;

    if (!name || !link) {
        feedback.classList.add("error");
        feedback.textContent = "Please fill in all fields.";
        return;
    } else if (!link.match(linkRegex)) {
        feedback.classList.add("error");
        feedback.textContent = "Please enter a valid link.";
        return;
    }

    const newBookmark = {
        name,
        link
    };

    customBookmarks.push(newBookmark);
    localStorage.setItem("customBookmarks", JSON.stringify(customBookmarks));

    nameInput.value = "";
    linkInput.value = "";

    feedback.classList.remove("error");
    feedback.classList.add("success");
    feedback.textContent = "Bookmark added!";

    renderCustomBookmarks();
});

