"use strict";

/*
File name: app.ts
Author's name: Kyle Duffy
web site name: Personal Portfolio site
file description: This is the main Ts file that get compiled into app.js and contains all the logic for swapping pages among other things. 
*/
(function () {
  //define+populate projects, services and about content
  let projects = {
    0: {
      Title: "Story-Maker js Assignment",
      URL: "https://kduffy93.github.io/comp1073Labs/assignment1/index.html",
      Description:
        "A web application built using HTML, CSS, and Vanilla JS to replicate/expand-upon a physical game built in the 90's for children.",
      repo: "https://github.com/kDuffy93/comp1073Labs/tree/main/COMP1054assignment1",
    },
    1: {
      Title: "Cocktail App",
      URL: "https://kduffy93.github.io/comp1073Labs/assignment4/index.html",
      Description:
        "A web application built using HTML, CSS, and Vanilla JS and utilizing an API to retrieve data and display cocktail ingredients for various drinks based on the users input.  .",
      repo: "https://github.com/kDuffy93/comp1073Labs/tree/main/assignment4",
    },
    2: {
      Title: "Ramara Training App",
      URL: "https://ramaratraining.herokuapp.com/",
      Description:
        "A data driven Web-application to track employee health and safety certificates as well as contractors. Technologies Used: Node, Express, EJS, MongoDB, Bootstrap, Css, and more.",
      repo: "https://github.com/kDuffy93/ramaraApp2019",
    },
    3: {
      Title: "Rocketship game",
      URL: "https://kduffy93.github.io/comp1073Labs/lab4/lab-4-start.html",
      Description:
        "A fun little rocket-ship game for any device with access to a browser. built using HTML, CSS and vanilla javascript.",
      repo: "https://github.com/kDuffy93/comp1073Labs/tree/main/lab4",
    },
  };

  let services = {
    0: {
      type: "technology",
      name: "HTML 5",
      imgSrc: "./Assets/html5.1.png",
    },
    1: {
      type: "service",
      name: "Website Development",
      imgSrc: "./Assets/webDev.png",
    },
    2: {
      type: "service",
      name: "Mobile Development",
      imgSrc: "./Assets/mobileDev.png",
    },
    3: {
      type: "service",
      name: "General Programming",
      imgSrc: "./Assets/generalDev.png",
    },
    4: {
      type: "service",
      name: "Database Design",
      imgSrc: "./Assets/dbDesign.png",
    },
    5: {
      type: "service",
      name: "Data Analysis",
      imgSrc: "./Assets/dataAnalysis.png",
    },
    6: {
      type: "technology",
      name: "CSS 3",
      imgSrc: "./Assets/css3.png",
    },
    7: {
      type: "technology",
      name: "Javascript (ES-5 to ES-Next)",
      imgSrc: "./Assets/js.png",
    },
    8: {
      type: "technology",
      name: "SQL",
      imgSrc: "./Assets/sql.png",
    },

    9: {
      type: "technology",
      name: "NODE",
      imgSrc: "./Assets/node.png",
    },
    10: {
      type: "technology",
      name: "Express",
      imgSrc: "./Assets/express.png",
    },
    11: {
      type: "technology",
      name: "MongoDB",
      imgSrc: "./Assets/mongo.jpg",
    },
    12: {
      type: "technology",
      name: "EJS",
      imgSrc: "./Assets/ejs.png",
    },
    13: {
      type: "technology",
      name: "Power BI",
      imgSrc: "./Assets/powerBi.png",
    },
    14: {
      type: "technology",
      name: "Java",
      imgSrc: "./Assets/java.png",
    },
    15: {
      type: "technology",
      name: "Unreal Engine 4",
      imgSrc: "./Assets/ue4.png",
    },
    16: {
      type: "technology",
      name: "JSON",
      imgSrc: "./Assets/json.png",
    },
    17: {
      type: "technology",
      name: "ASP.NEt",
      imgSrc: "./Assets/aspNet.jpg",
    },
    18: {
      type: "technology",
      name: "C#",
      imgSrc: "./Assets/cSharp.jpg",
    },
    19: {
      type: "technology",
      name: "Python",
      imgSrc: "./Assets/python.jpg",
    },
    20: {
      type: "technology",
      name: "GIT",
      imgSrc: "./Assets/git.png",
    },
    21: {
      type: "technology",
      name: "SQL Server",
      imgSrc: "./Assets/sqlServer.png",
    },
  };


let aboutContent = "Intermediate level computer programmer with an interest in data driven applications, full stack development, data analytics and microcontrollers. ";





// function to lead the header
  async function LoadHeader() {
    await $.get("./views/components/header.html", function (html_data) {
      //change title
      $("header").html(html_data);
      $("li>a#Home").addClass("active");

      $("li>a").on("click", function (event) {
        event.preventDefault();
        document.title = $(this).prop("id") as string;
        //change url
        history.pushState({}, "", "/" + document.title);
        $("li>a").each(function () {
          $(this).removeClass("active");
        });
        $("li>a#" + document.title).addClass("active");
        LoadContent();
      });
    });
  }
// function to load the footer
  async function LoadFooter() {
    await $.get("./views/components/footer.html", function (html_data) {
      $("footer").html(html_data);
    });
  }
//function to load content 
  async function LoadContent() {
    let contentLink = document.title.toLowerCase();
    await $.get(`./views/content/${contentLink}.html`, function (html_data) {
      $("main").html(html_data);

      $("li>a").each(function () {
                $(this).removeClass("active");
              });
              $("li>a#" + document.title).addClass("active");

      // this is for the links in main content as opposed to nav
      // loops through all links with a data-linkid set, type checks, adds listners to all links in main which when clicked set the document title, update history, update acitive classes and reloads main content > repeating this whole process by adding new click events for any new links loaded that have a data-linkid
      let links = document.querySelectorAll("main a");
      for (const link of links) {
        if (link instanceof HTMLElement) {
          if (link.dataset.linkid) {
            link.addEventListener("click", function (event) {
              event.preventDefault();
              document.title = link.dataset.linkid as string;
              //change url
              history.pushState({}, "", "/" + document.title);
              $("li>a").each(function () {
                $(this).removeClass("active");
              });
              $("li>a#" + document.title).addClass("active");
              LoadContent();
            });
          }
        }
      }
// try to load the contact form( if case were on the contacts page)
     
    }); 

    if (contentLink == "contact") {

        let form = document.getElementById("contactForm");
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          document.title = "About";
              LoadContent();
        });
      }
        
//check if were on any of the following pages - if so run the corrosponding function. 
    if (contentLink == "services") {
      await populateservicesPage();
    }
    if (contentLink == "projects") {
      await populateProjectsPage();
    }
 if (contentLink == "about") {
   await populateAboutPage();
 }

  }
// populates the About page when loading
  async function populateAboutPage() {
//for the text content
let aboutContentSection = document.querySelector("#aboutContent>article:last-of-type>p") as  HTMLElement;
  aboutContentSection.textContent = aboutContent;
//for the logo
  let logo = document.querySelector("#aboutContent>article:last-of-type>img") as HTMLImageElement;
  logo.src = "./Assets/personalLogo.png";
  //for the main photo
  let photo = document.querySelector("#aboutContent>article:first-of-type>img") as HTMLImageElement;
  photo.src = "./Assets/recentPhoto1.png";



  }
  //populates service page
// loop through each service we have in services. wait until we append a service card to the right area . populate the card, then change the ids so a new one can be added and continue until none are left.
  async function populateservicesPage() {
    let iterator = 0;
    for (const service in services) {
      if (Object.prototype.hasOwnProperty.call(services, service)) {
        const element = services[service];
        //wait until we append a new card
        await $.get(
          `./views/components/servicesCards.html`,
          function (html_data1) {
            if (element.type == "service") {
              $("#servicesSection").append(html_data1);
            }
            if (element.type == "technology") {
              $("#technologiesSection").append(html_data1);
            }
          }
        );

        // populate new card

        let img = document.getElementById("tempimg") as HTMLImageElement;
        img.src = element.imgSrc;

        let textBox = document.getElementById("temptext") as HTMLElement;
        textBox.textContent = element.name;
        //change new card id'd
        let card = document.getElementById("tempsection") as HTMLElement;
        textBox.id = "servicesCard" + iterator;
        img.id = `${element.name}Src` + iterator;
        card.id = "serviceCard" + iterator;

        // increment iterator
        iterator++;
      }
    }
  }

  async function populateProjectsPage() {
    let iterator = 0;
    // loop through projects - building out each new project card
    for (const project in projects) {
      if (Object.prototype.hasOwnProperty.call(projects, project)) {
        const element = projects[project];

        // append a new project card for the next project in the loop
        await $.get(
          `./views/components/projectCard.html`,
          function (html_data1) {
            $("#content").append(html_data1);
          }
        );

        //set all the relevant details in the new project card
        let projectCard = document.getElementById("projectCard") as HTMLElement;
        let url = document.getElementById("tempurl") as HTMLLinkElement;
        url.href = element.URL;

        let iframeContainer = document.getElementById("iframeContainer");
        let iframe = document.createElement("iframe");
        iframe.src = element.URL;
        iframeContainer.appendChild(iframe);

        let name = document.getElementById("tempname") as HTMLElement;
        name.textContent = element.Title;

        let repo = document.getElementById("temprepo") as HTMLLinkElement;
        repo.href = element.repo;

        let desc = document.getElementById("tempdescription") as HTMLElement;
        desc.textContent = element.Description;
        // change the new project card Id's
        projectCard.id += iterator;
        iframeContainer.id = "iframeContainer" + iterator;
        name.id = "name" + iterator;
        url.id = "url" + iterator;
        repo.id = "repo" + iterator;
        desc.id = "description" + iterator;
        //increment for the next loop to use in new id names
        iterator++;
      }
    }
  }

  // set function to be called when onpopstate is triggerd by the window(forward or back clicked)
  let LoadContentBackwards = (backLink): void => {
    document.title = backLink;
    LoadContent();
  };

  // setup the window.onpopstate event to get the path and pass it to loadContentBackwards with the path as a parameter when it does.
  window.onpopstate = () => {
    let index = String(document.location).indexOf("/", 10);
    let url = String(document.location).slice(index + 1);
    LoadContentBackwards(url);
  };

  //function to be run on startup
  function Start() {
    console.log("App Started!");
    document.title = "Home";
    history.pushState({}, "", "/Home");
    LoadContent();
    LoadHeader();
    LoadFooter();
  }
  // adds an event listner to run the start function when the window loads.
  window.addEventListener("load", Start);
})();
