/*
  MODERN MUSICIAN - DOM PRACTICE VERSION

  This project uses the JavaScript concepts from the shared class examples:
  variables, functions, objects, loops, strings, arrays/HTMLCollections,
  DOM selection, styles, attributes, createElement(), appendChild(),
  parentElement, and click/input/change/keydown/submit events.

  No framework is used. Read the numbered sections alongside DOM_GUIDE.md.
*/

// --------------------------------------------------
// 1. SMALL HELPERS TO ADD / REMOVE CSS CLASSES
// --------------------------------------------------
// This uses getAttribute(), setAttribute(), hasAttribute(), split(),
// indexOf(), loops, and removeAttribute() from the DOM/string lessons.

function hasCssClass(element, className) {
  if (element == null || !element.hasAttribute("class")) {
    return false;
  }

  var classNames = element.getAttribute("class").split(" ");
  return classNames.indexOf(className) !== -1;
}

function addCssClass(element, className) {
  if (element != null && !hasCssClass(element, className)) {
    var oldClasses = element.getAttribute("class");

    if (oldClasses == null || oldClasses === "") {
      element.setAttribute("class", className);
    } else {
      element.setAttribute("class", oldClasses + " " + className);
    }
  }
}

function removeCssClass(element, className) {
  if (element != null && element.hasAttribute("class")) {
    var oldClasses = element.getAttribute("class").split(" ");
    var newClasses = "";

    for (var i = 0; i < oldClasses.length; i++) {
      if (oldClasses[i] !== "" && oldClasses[i] !== className) {
        if (newClasses !== "") {
          newClasses = newClasses + " ";
        }
        newClasses = newClasses + oldClasses[i];
      }
    }

    if (newClasses === "") {
      element.removeAttribute("class");
    } else {
      element.setAttribute("class", newClasses);
    }
  }
}

// --------------------------------------------------
// 2. SELECT ELEMENTS + MOBILE NAVIGATION
// --------------------------------------------------
// The page has one menu button and one navigation list.
var menuToggleItems = document.getElementsByClassName("menu-toggle");
var menuToggle = menuToggleItems[0];
var navLinks = document.getElementById("nav-links");
var navLinkItems = document.getElementsByClassName("nav-link");

function closeMenu() {
  if (menuToggle != null && navLinks != null) {
    removeCssClass(navLinks, "open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    removeCssClass(document.body, "menu-open");
  }
}

if (menuToggle != null && navLinks != null) {
  menuToggle.addEventListener("click", function () {
    if (hasCssClass(navLinks, "open")) {
      closeMenu();
    } else {
      addCssClass(navLinks, "open");
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute("aria-label", "Close navigation menu");
      addCssClass(document.body, "menu-open");
    }
  });
}

for (var a = 0; a < navLinkItems.length; a++) {
  navLinkItems[a].addEventListener("click", closeMenu);
}

// If the browser window becomes wider while the menu is open, close it.
window.addEventListener("resize", function () {
  if (window.innerWidth > 700) {
    closeMenu();
  }
});

// Mark the current page by reading each link's data-page attribute.
var pageName = window.location.pathname.split("/").pop();
if (pageName === "" || pageName == null) {
  pageName = "index.html";
}

for (var b = 0; b < navLinkItems.length; b++) {
  if (navLinkItems[b].getAttribute("data-page") === pageName) {
    addCssClass(navLinkItems[b], "active");
    navLinkItems[b].setAttribute("aria-current", "page");
  } else {
    removeCssClass(navLinkItems[b], "active");
    if (navLinkItems[b].hasAttribute("aria-current")) {
      navLinkItems[b].removeAttribute("aria-current");
    }
  }
}

// --------------------------------------------------
// 3. MAKE THE PAGE CONTENT VISIBLE
// --------------------------------------------------
// CSS handles the appearance. This loop adds the class expected by the CSS.
var revealItems = document.getElementsByClassName("reveal");
for (var c = 0; c < revealItems.length; c++) {
  addCssClass(revealItems[c], "is-visible");
}


// Load homepage announcements from the local JSON file through Express.
var updatesList = document.getElementById("updates-list");
if (updatesList != null) {
  fetch("/api/updates").then(function (response) { return response.json(); }).then(function (updates) {
    updatesList.innerHTML = "";
    for (var u = 0; u < updates.length; u++) {
      var card = document.createElement("article");
      card.className = "update-card";
      var category = document.createElement("p"); category.className = "eyebrow"; category.textContent = updates[u].category;
      var heading = document.createElement("h3"); heading.textContent = updates[u].title;
      var description = document.createElement("p"); description.textContent = updates[u].description;
      var date = document.createElement("small"); date.textContent = updates[u].date;
      card.appendChild(category); card.appendChild(heading); card.appendChild(description); card.appendChild(date);
      updatesList.appendChild(card);
    }
  }).catch(function () { updatesList.textContent = "Updates are temporarily unavailable."; });
}



// --------------------------------------------------
// 6. FILTER TOUR DATES
// --------------------------------------------------
var tourFilterButtons = document.getElementsByClassName("filter-chip");
var tourEvents = document.getElementsByClassName("tour-event");

function filterTours(selectedFilter) {
  for (var g = 0; g < tourEvents.length; g++) {
    var eventStatus = tourEvents[g].getAttribute("data-status");

    if (selectedFilter === "all" || eventStatus === selectedFilter) {
      tourEvents[g].style.display = "";
    } else {
      tourEvents[g].style.display = "none";
    }
  }

  for (var h = 0; h < tourFilterButtons.length; h++) {
    if (tourFilterButtons[h].getAttribute("data-tour-filter") === selectedFilter) {
      addCssClass(tourFilterButtons[h], "active");
    } else {
      removeCssClass(tourFilterButtons[h], "active");
    }
  }
}

for (let i = 0; i < tourFilterButtons.length; i++) {
  tourFilterButtons[i].addEventListener("click", function () {
    var selectedFilter = tourFilterButtons[i].getAttribute("data-tour-filter");
    filterTours(selectedFilter);
  });
}



// Display tour records created in MongoDB. Existing sample cards remain as fallback.
var tourList = document.getElementById("tour-list");
if (tourList != null) {
  fetch("/api/tour").then(function (response) { return response.json(); }).then(function (events) {
    if (!Array.isArray(events) || events.length === 0) return;
    tourList.innerHTML = "";
    for (var t = 0; t < events.length; t++) {
      var eventCard = document.createElement("article"); eventCard.className = "tour-event"; eventCard.setAttribute("data-status", events[t].status);
      var date = new Date(events[t].date);
      var dateBox = document.createElement("div"); dateBox.className = "tour-date";
      var month = document.createElement("span"); month.textContent = date.toLocaleString("en", { month: "short" }).toUpperCase();
      var day = document.createElement("strong"); day.textContent = date.getDate();
      var year = document.createElement("small"); year.textContent = date.getFullYear();
      dateBox.appendChild(month); dateBox.appendChild(day); dateBox.appendChild(year);
      var main = document.createElement("div"); main.className = "tour-event-main";
      var heading = document.createElement("h3"); heading.textContent = events[t].eventName;
      var venue = document.createElement("p"); venue.textContent = events[t].city + " · " + events[t].venue;
      main.appendChild(heading); main.appendChild(venue);
      var status = document.createElement("span"); status.className = "event-state"; status.textContent = events[t].status;
      eventCard.appendChild(dateBox); eventCard.appendChild(main); eventCard.appendChild(status);
      if (events[t].ticketLink) { var ticket = document.createElement("a"); ticket.className = "button button-outline"; ticket.href = events[t].ticketLink; ticket.target = "_blank"; ticket.rel = "noopener"; ticket.textContent = "Tickets ↗"; eventCard.appendChild(ticket); }
      tourList.appendChild(eventCard);
    }
  }).catch(function () { /* Keep the original sample tour cards visible if the API is unavailable. */ });
}
