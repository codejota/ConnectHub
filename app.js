// Default Bookmarks
const defaultBookmarks = [
  { name: "LinkedIn", link: "https://www.linkedin.com/", logo: "src/img/linkedin.png" },
{ name: "Amazon", link: "https://www.amazon.com/", logo: "src/img/Amazon.png" },
{ name: "Google", link: "https://www.google.com/", logo: "src/img/google.png" },
{ name: "GitHub", link: "https://github.com/", logo: "src/img/github.png" },
{ name: "YouTube", link: "https://www.youtube.com/", logo: "src/img/youtube.png" },
{ name: "Facebook", link: "https://www.facebook.com/", logo: "src/img/facebook.png" },  
{ name: "Twitter", link: "https://twitter.com/", logo: "src/img/twitter.png" },
{ name: "Instagram", link: "https://www.instagram.com/", logo: "src/img/instagram.png" },
{ name: "TikTok", link: "https://www.tiktok.com/", logo: "src/img/tiktok.png" },
{ name: "Netflix", link: "https://www.netflix.com/", logo: "src/img/netflix.png" }

  ,

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
      a.target = "_blank";  
      a.textContent = bookmark.name;

      img.addEventListener("click", () => {
      window.open(bookmark.link, '_blank');
      });
  
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
      div.classList.add("bookmark2");
  
      const img = document.createElement("img");
      img.src = bookmark.logo || "src/img/standard.png";
  
      const a = document.createElement("a");
      a.href = bookmark.link;
      a.target = "_blank"; 
      a.textContent = bookmark.name;

      img.addEventListener("click", () => {
      window.open(bookmark.link, '_blank');
      });
  
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


 



const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('sidebar');
const body = document.querySelector('body');

sidebarToggle.addEventListener('click', function() {
  sidebar.classList.toggle('hidden');
});

body.addEventListener('click', function(event) {
  if (!sidebar.contains(event.target) && event.target !== sidebarToggle) {
    sidebar.classList.add('hidden');
 
  }});

  var c = document.getElementById("c");
        var ctx = c.getContext("2d");

        //making the canvas full screen
        c.height = window.innerHeight;
        c.width = window.innerWidth;

        //chinese characters - taken from the unicode charset
        var matrix = "ConnectHub";
        //converting the string into an array of single characters
        matrix = matrix.split("");

        var font_size = 10;
        var columns = c.width/font_size; //number of columns for the rain
        //an array of drops - one per column
        var drops = [];
        //x below is the x coordinate
        //1 = y co-ordinate of the drop(same for every drop initially)
        for(var x = 0; x < columns; x++)
            drops[x] = 2; 

        //drawing the characters
        function draw()
        {
            //Black BG for the canvas
            //translucent BG to show trail
            ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
            ctx.fillRect(0, 0, c.width, c.height);

            ctx.fillStyle = "#4C946F";//green text
            ctx.font = font_size + "px arial";
            //looping over drops
            for(var i = 0; i < drops.length; i++)
            {
                //a random chinese character to print
                var text = matrix[Math.floor(Math.random()*matrix.length)];
                //x = i*font_size, y = value of drops[i]*font_size
                ctx.fillText(text, i*font_size, drops[i]*font_size);

                //sending the drop back to the top randomly after it has crossed the screen
                //adding a randomness to the reset to make the drops scattered on the Y axis
                if(drops[i]*font_size > c.height && Math.random() > 0.975)
                    drops[i] = 0;

                //incrementing Y coordinate
                drops[i]++;
            }
        }

        setInterval(draw, 35);


        const apikey = "523a7189d84c9b88d3451ac17f4f55bc";
        const cities = [
          "São Bernardo do Campo, BR",
          "Ibirité, BR",
          "Santo Antônio da Patrulha, BR",
          "São José dos Pinhais, BR",
          "Joinville, BR",
          "Araquari, BR"
        ];
        
        // Função para obter a temperatura de uma cidade
        async function getTemperature(city) {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`);
          const data = await response.json();
          return data.main.temp;
        }
        
        // Atualiza o ícone de temperatura da cidade
        async function updateTemperature(city, elementId) {
          try {
            const temperature = await getTemperature(city);
            document.getElementById(elementId).innerHTML = `${temperature} °C`;
          } catch (error) {
            console.error(error);
            document.getElementById(elementId).innerHTML = "N/A";
          }
        }
        
        // Atualiza todos os ícones de temperatura
        async function updateAllTemperatures() {
          await Promise.all([
            updateTemperature("São Bernardo do Campo, BR", "temp-sao-bernardo"),
            updateTemperature("Ibirité, BR", "temp-ibirite"),
            updateTemperature("Santo Antônio da Patrulha, BR", "temp-santo-antonio"),
            updateTemperature("São José dos Pinhais, BR", "temp-sao-jose"),
            updateTemperature("Joinville, BR", "temp-joinville"),
            updateTemperature("Araquari, BR", "temp-araquari")
          ]);
        }
        
        updateAllTemperatures();
        setInterval(updateAllTemperatures, 600000); 


        setInterval(function() {
          var footer1 = document.getElementsByClassName("footer1");
          var footer2 = document.getElementsByClassName("footer2");
          
          if (footer1[0].style.display === "none") {
            footer1[0].style.display = "block";
            footer2[0].style.display = "none";
          } else {
            footer1[0].style.display = "none";
            footer2[0].style.display = "block";
          }
        }, 60000);
        