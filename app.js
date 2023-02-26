// Default Bookmarks
const defaultBookmarks = [
{ name: "Fluig", link: "http://cspsfluigvm01.magna.global:8081/", logo: "src/images/fluig.png" },
{ name: "Senior", link: "https://platform.senior.com.br/", logo: "src/images/senior.png" },
{ name: "Peoplenet", link: "https://hcm17.sapsf.com/sf/", logo: "src/images/people.png" },
{ name: "CPMP Magna", link: "https://cpmp.magna.global/", logo: "src/images/magnaico.png" },
{ name: "Crystal", link: "http://10.108.24.58:8010/default.aspx", logo: "src/images/favoritos.png" },
{ name: "Relatorios Logix", link: "http://10.108.27.121:8080/gerenciadorelatorios", logo: "src/images/relatorio.png" },
{ name: "Sharepoint ", link: "https://magna.sharepoint.com/sites/magnet", logo: "src/images/sharepoint.png" },
{ name: "BMW B2B", link: "https://b2b-sso.bmw.com/", logo: "src/images/bmw.png" },
{ name: "PC Factory JVL", link: "http://10.108.28.90:1234/pcfui#/page/Login", logo: "src/images/pcfactory.png" },
{ name: "Matrix", link: "https://itserviceportal.magna.global/wm", logo: "src/images/matrix.png" },
{ name: "Power BI", link: "https://app.powerbi.com/groups/me/groupWelcome", logo: "src/images/powerbi.png" },
{ name: "BCLegal", link: "http://10.108.4.10/bclegal", logo: "src/images/legalbc.png" },
{ name: "Overtime", link: "https://manager.overtimecontrol.com.br/login", logo: "src/images/overtime.png" },
{ name: "Visio", link: "http://10.108.24.29:8024/xmlvisio/index.php", logo: "src/images/Visio.png" },
{ name: "SQTCM Tools", link: "https://apps.powerapps.com/play/2a3b959b-9b03-414d-8606-7478aac53f3b?tenantId=c760270c-f3da-4cfa-9737-03808ef5579f&source=portal&screenColor=rgba(0%2C%20134%2C%20208%2C%201)", logo: "src/images/Magnaico.png"},
{ name: "Best Practices", link: "https://magna.sharepoint.com/teams/Cosma-Brazil/SitePages/Best-Praticies-Cosma.aspx", logo: "src/images/bestpra.png" }

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
      img.src = bookmark.logo || "src/img/standard.png";
  
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


 
// Define o nome do cookie
const cookieName = 'lastNotificationDate';

// Obtém a referência para o widget
const notificationWidget = document.getElementById('notification-widget');

// Obtém a referência para o botão de atualizar
const updateButton = document.querySelector('.update-button');

// Obtém a referência para o botão de fechar
const closeButton = document.querySelector('.close-button');

// Função que exibe o widget de notificação
function showNotification() {
  // Obtém a data da última vez que a notificação foi exibida a partir do cookie
  const lastNotificationDate = new Date(document.cookie.replace(/(?:(?:^|.*;\s*)lastNotificationDate\s*\=\s*([^;]*).*$)|^.*$/, "$1"));

  // Verifica se já se passaram 7 dias desde a última notificação
  if (isNaN(lastNotificationDate) || Date.now() - lastNotificationDate.getTime() >= 7 * 24 * 60 * 60 * 1000) {
    // Define a data da última notificação como a data atual
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${cookieName}=${new Date().toUTCString()};expires=${expires};path=/`;
    
    // Exibe o widget
    notificationWidget.classList.remove('hidden');
    
    // Define o foco no botão de atualizar
    updateButton.focus();
    
    // Desfoca o restante da página
    document.body.classList.add('blur');
  }
}

// Função que oculta o widget de notificação
function hideNotification() {
  // Oculta o widget
  notificationWidget.classList.add('hidden');
  
  // Remove o desfoque do restante da página
  document.body.classList.remove('blur');
}

// Adiciona um evento de clique no botão de atualizar
updateButton.addEventListener('click', function() {
  // Abre a tela do Windows Update
  window.location.href = 'ms-settings:windowsupdate?activationSource=SMC-IA-4027667';
  
  // Define a data do cookie de notificação como a data atual
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${cookieName}=${new Date().toUTCString()};expires=${expires};path=/`;
  
  // Oculta o widget
  hideNotification();
});

// Adiciona um evento de clique no botão de fechar
closeButton.addEventListener('click', function() {
  // Remove a data do cookie de notificação
  document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
  
  // Oculta o widget
  hideNotification();
});

// Exibe a notificação após 3 segundos
setTimeout(showNotification, 2000);


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
        var matrix = "Magna";
        //converting the string into an array of single characters
        matrix = matrix.split("");

        var font_size = 10;
        var columns = c.width/font_size; //number of columns for the rain
        //an array of drops - one per column
        var drops = [];
        //x below is the x coordinate
        //1 = y co-ordinate of the drop(same for every drop initially)
        for(var x = 0; x < columns; x++)
            drops[x] = 1; 

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