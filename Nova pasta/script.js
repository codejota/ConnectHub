

const defaultBookmarks = [
  { name: "Google", link: "https://www.google.com", logo: "google-logo.png" },
  { name: "Youtube", link: "https://www.youtube.com", logo: "youtube-logo.png" },
  { name: "Github", link: "https://github.com", logo: "github-logo.png" },
 
];

const customBookmarks = JSON.parse(localStorage.getItem("customBookmarks")) || [];

const defaultBookmarkContainer = document.querySelector("#default-bookmarks");
const customBookmarkContainer = document.querySelector("#custom-bookmarks");

// Create elements for default bookmarks and append to container
defaultBookmarks.forEach(bookmark => {
  const img = document.createElement("img");
  img.src = bookmark.logo;
  img.setAttribute("data-link", bookmark.link);
  img.classList.add("img-thumbnail");
  defaultBookmarkContainer.appendChild(img);
  
});

// Create elements for custom bookmarks and append to container
customBookmarks.forEach(bookmark => {
  const img = document.createElement("img");
  img.src = "standard.png";
  img.setAttribute("data-link", bookmark.link);
  img.classList.add("img-thumbnail");
  const button = document.createElement("button");
  button.classList.add("delete");
  button.textContent = "X";
  customBookmarkContainer.appendChild(img);
  customBookmarkContainer.appendChild(button);
});



// Add click event listener to add button
document.querySelector("#add-button").addEventListener("click", event => {
  const link = document.querySelector("#link-input").value;
if (!link) return; // return if link input is empty

const img = document.createElement("img");
img.src = "standard.png";
img.setAttribute("data-link", link);
img.classList.add("img-thumbnail");

const button = document.createElement("button");
button.classList.add("delete");
button.textContent = "X";

customBookmarkContainer.appendChild(img);
customBookmarkContainer.appendChild(button);

// Add link to customBookmarks array and update localStorage
customBookmarks.push({ link });
localStorage.setItem("customBookmarks", JSON.stringify(customBookmarks));

// Clear link input
document.querySelector("#link-input").value = "";
});

// Add click event listener to default bookmarks
defaultBookmarkContainer.addEventListener("click", event => {
if (event.target.tagName === "IMG") {
window.open(event.target.getAttribute("data-link"), "_blank");
}
});

// Add click event listener to custom bookmarks
customBookmarkContainer.addEventListener("click", event => {
if (event.target.tagName === "IMG") {
window.open(event.target.getAttribute("data-link"), "_blank");
}
});

// Add click event listener to delete buttons
const deleteButtons = document.querySelectorAll(".delete");
deleteButtons.forEach(button => {
button.addEventListener("click", event => {
// code to delete bookmark
const img = button.previousElementSibling; // get the img element
const link = img.getAttribute("data-link"); // get the link associated with the img
// remove the img and button from the DOM
img.remove();
button.remove();

// remove the link from the customBookmarks array
const index = customBookmarks.findIndex(bookmark => bookmark.link === link);
customBookmarks.splice(index, 1);

// update the customBookmarks in localStorage
localStorage.setItem("customBookmarks", JSON.stringify(customBookmarks));
});
});

document.querySelector("#add-button").addEventListener("click", event => {
  const link = document.querySelector("#link-input").value;
  const name = document.querySelector("#name-input").value; // Obtain value of name input
  if (!link) return; // return if link input is empty



});

const label = document.createElement("label");
label.textContent = name;
img.appendChild(label);
