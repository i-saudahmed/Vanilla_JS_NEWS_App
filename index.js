const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");
let apiKey = "5c8e27d3c2674adab4928a9b19ecda54";
const country = "us";

const options = [
  "general",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

let requestURL;

// create cards from data
const generateUI = (articles) => {
  container.innerHTML = "";
  for (let item of articles) {
    let imageUrl = item.urlToImage ? item.urlToImage : "placeholder.jpg";
    let title = item.title ? item.title : "No Title Available";
    let description =
      item.description || item.content || "Description not available.";

    let card = document.createElement("div");
    card.classList.add("news-card");
    card.innerHTML = `<div class="news-image-container">
        <img src="${imageUrl}" alt="">
      </div>

      <div class="news-content">
        <div class="news-title">
            ${title}
        </div>
        <div class="news-description">
            ${description}
        </div>
        <a href="${item.url}" target="_blank" class="view-button">Read More</a>
      </div>`;
    container.appendChild(card);
  }
};

const getNews = async () => {
  //   container.innerHTML = "<p>Loading...</p>";
  try {
    let response = await fetch(requestURL);
    if (!response.ok) {
      alert("Error while loading the data!");
      return false;
    }
    let data = await response.json();
    console.log("Fetched data:", data); // Debugging log
    generateUI(data.articles);
  } catch (error) {
    console.error("Fetch error:", error);
    alert("There was a problem fetching the data.");
  }
};

// category selection

const selectCategory = (e, category) => {
  let options = document.querySelectorAll(".option");
  options.forEach((curElem) => {
    curElem.classList.remove("active");
  });
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
  e.target.classList.add("active");
  getNews();
};

// option buttons
// const createOptions = () => {
//   for (let i of options) {
//     optionsContainer.innerHTML += `<button class="option ${
//       i == "general" ? "active" : ""
//     }" onclick="selectCategory(event ,'${i}')">${i}</button>`;
//   }
// };
const createOptions = () => {
  optionsContainer.innerHTML = ""; // Clear the options before adding new ones
  for (let i of options) {
    const button = document.createElement("button");
    button.classList.add("option");
    button.textContent = i.charAt(0).toUpperCase() + i.slice(1); // Capitalize category name
    button.onclick = (e) => selectCategory(e, i); // Bind category selection
    if (i === "general") {
      button.classList.add("active"); // Set the default category as active
    }
    optionsContainer.appendChild(button);
  }
};

const init = () => {
  createOptions();
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
  getNews();
};

window.onload = () => {
  init();
};
