'use strict';

var patyBox = document.querySelectorAll('.paty-box'),
    // Add poster image
patyDateEls = document.querySelectorAll('.paty-dat'),
    // Add data, time and caption
patyTimeEls = document.querySelectorAll('.paty-time'),
    // Add data, time and caption
patyContEl = document.querySelectorAll('.paty-content'),
    patyParagEl = document.querySelectorAll('.paty-text'),
    // Add event text paragraph
patyPriceEl = document.querySelectorAll('.paty-tag'),
    // Add event price
patyAddBtn = document.querySelectorAll('.paty-add'),
    // Create event links
nextBlocks = document.querySelectorAll('.next-blk'),
    // Dynamically generate next event boxes
coursesDom = document.querySelector('.course-blk'),
    // Dynamically generate courses
ourTeamDom = document.querySelector('.team-blk'),
    // Dynamically generate teammate
mainTitle = document.querySelector('title'),
    // main.json
mainTitleOg = document.querySelector('meta[property="og:title"]'),
    // main.json
mainSiteNameOg = document.querySelector('meta[property="og:site_name"]'),
    // main.json
mainDescriptOg = document.querySelector('meta[property="og:description"]'),
    // main.json
mainDescript = document.querySelector('meta[name="description"]'),
    // main.json
mainLinks = document.querySelectorAll('.menu-list li'),
    // main.json
mainH2 = document.querySelectorAll('h2'),
    // main.json
mainIn = document.querySelectorAll('.paty-tag span:nth-of-type(1)'),
    // main.json
partnerLinks = document.querySelector('.link-blk'); // Dynamically generate partners link

// CREATE NEW AJAX FOR EVENTS - events.json
var eventsData = new XMLHttpRequest();
//  open( type, url/file, asunc);
eventsData.open("GET", "../json/cards.json", true);
eventsData.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var evenParse = JSON.parse(eventsData.responseText);
    renderEvents(evenParse);
    renderEventParagraphs(evenParse);
    renderComingEvents(evenParse);
    renderEventBtns(evenParse);
    addEventBtnVal(evenParse);

    // createSocBtns(evenParse);
  }
};
// send request
eventsData.send();

// Create main dynamic elements
var renderEvents = function renderEvents(data) {
  data.forEach(function (item, i, data) {
    patyBox[i].insertAdjacentHTML('afterbegin', '<img src="' + item.img + '" alt="poster" title="poster">');
    patyDateEls[i].innerText = item.date;
    patyDateEls[i].insertAdjacentHTML('beforeend', '<span>' + item.month + '</span>');
    patyTimeEls[i].innerText = item.time;
    patyContEl[i].insertAdjacentHTML('afterbegin', '<h3>' + item.capt + '</h3>');
    patyPriceEl[i].insertAdjacentHTML('beforeend', '<span>' + item.price + '<sup>\u20AC</sup></span>');
  });
  // Add class for theme
  patyContEl[0].querySelector('h3').className = 'night-capt';
  patyContEl[1].querySelector('h3').className = 'day-capt';
};

// Create Paragraphs
var renderEventParagraphs = function renderEventParagraphs(getList) {
  getList.forEach(function (item, i, getList) {
    for (var graph in item.text[0]) {
      patyParagEl[i].setAttribute("style", "height: 200px");
      patyParagEl[i].innerHTML += '<li class="liTxt">' + item.text[0][graph] + '</li>';
    }
  });
};
// Create event contact buttons
var renderEventBtns = function renderEventBtns(getButtons) {
  getButtons.forEach(function (item, i, getButtons) {
    var createBtns = '';
    for (var btn in item.btns[0]) {
      createBtns += '<a href="' + item.btns[0][btn] + '" title="' + item.btns[0][btn] + '">\n          <svg role="img" class="icon-svg">\n            <use xlink:href="./img/svg/icons.svg#' + btn + '"></use>\n        </svg>\n      </a>';
    }
    patyAddBtn[i].innerHTML = createBtns;
  });
};

// Create event extra adds for contact buttons
var addEventBtnVal = function addEventBtnVal(extAdds) {
  extAdds.forEach(function (item, i, extAdds) {
    var eventBtnAdd = patyAddBtn[i].querySelectorAll('a');
    eventBtnAdd.forEach(function (add, j, eventBtnAdd) {
      // Take value form title
      var titleVal = add.getAttribute('title');
      // Add 'mailto' to mail links
      if (titleVal.search("@") != -1) {
        add.href = 'mailto:' + item.btns[0].mail;
      }
      // Add 'tel' to phone links
      if (titleVal.search("358") != -1) {
        add.href = 'tel:' + item.btns[0].tel;
      }
    });
  });
};

// Create coming events
var renderComingEvents = function renderComingEvents(data) {
  data.forEach(function (item, i, data) {
    var eventsObj = data[i].events[0];
    var createComeEvents = '';
    for (var eventNum in eventsObj) {
      createComeEvents += '\n      <div class="next-box" style="background-image: url(' + eventsObj[eventNum][0].ePoster + ')">\n        <span class="next-date">' + eventsObj[eventNum][0].eDate + '\n          <span>' + eventsObj[eventNum][0].eMonth + '</span>\n        </span>\n        <div>\n          <h5>' + eventsObj[eventNum][0].eCap + '</h5>\n          <span class="next-btn">' + eventsObj[eventNum][0].eBtn + '</span>\n          <p>' + eventsObj[eventNum][0].eCont + '</p>\n        </div>\n      </div>';
    }
    nextBlocks[i].innerHTML = createComeEvents;
  });
  // Add class for element's
  addClassNextDates();
  addClassNextButtons();
};

// Add class for theme dates
var addClassNextDates = function addClassNextDates() {
  nextBlocks.forEach(function (item, i, nextBlocks) {
    var elms = nextBlocks[i].querySelectorAll('.next-date');
    for (var j = 0; j < elms.length; j++) {
      if (i == 0) {
        elms[j].className += ' night-next';
      }if (i == 1) {
        elms[j].className += ' day-next';
      }
    }
  });
};
// Add class for theme buttons
var addClassNextButtons = function addClassNextButtons() {
  nextBlocks.forEach(function (item, i, nextBlocks) {
    var elms = nextBlocks[i].querySelectorAll('.next-btn');
    for (var j = 0; j < elms.length; j++) {
      if (i == 0) {
        elms[j].className += ' show-night-btn';
      }if (i == 1) {
        elms[j].className += ' show-day-btn';
      }
    }
  });
};

// CREATE NEW AJAX FOR COURSES - course.json
var coursesData = new XMLHttpRequest();
coursesData.open("GET", "../json/courses.json", true);
coursesData.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var crsParse = JSON.parse(coursesData.responseText);
    renderCourses(crsParse);
    renderCourseParagraphs(crsParse);
    renderCourseBtns(crsParse);
    addExtraCourseVal(crsParse);

    // createSocBtns(crsParse);
  }
};
coursesData.send();

//Create DOM courses boxes
var renderCourses = function renderCourses(data) {
  var createCourses = '';
  data.forEach(function (item, i, data) {
    createCourses += '<div class="flex-crs">\n      <div class="crs-dat">\n        <span class="crs-day">' + item.days + '</span>\n        <span class="crs-time">' + item.time + '</span>\n        <svg role="img" class="crs-svg">\n          <use xlink:href="./img/svg/icons.svg#clock"></use>\n        </svg>\n      </div>\n      <div class="crs-img">\n        <span class="crs-cls">' + item.cls + '</span> \n        <img src="' + item.img + '" alt="courses" title="poster">\n      </div>\n      <div class="crs-cont">\n        <h4>' + item.name + '</h4>\n        <ul class="crs-graphs" style="max-height: 115px"></ul>\n      </div>\n      <div class="crs-opt">\n        <div class="crs-btns"></div>\n        <div class="crs-more">\n          <span class="night-bt"></span>\n        </div>\n        <div class="for-price">\n          <span class="crs-tip">' + item.period + '</span>\n          <span class="crs-price">' + item.price + '<sup>\u20AC</sup></span>\n        </div>\n      </div>\n    </div>';
  });
  coursesDom.innerHTML += createCourses;
};

// Create course paragraphs
var renderCourseParagraphs = function renderCourseParagraphs(getList) {
  var coursesList = document.querySelectorAll('.crs-graphs');
  getList.forEach(function (item, i, getList) {
    for (var key in item.txt[0]) {
      coursesList[i].innerHTML += '<li>' + item.txt[0][key] + '</li>';
    }
  });
};

// Create course buttons
var renderCourseBtns = function renderCourseBtns(getButtons) {
  var coursesButtons = document.querySelectorAll('.crs-btns');
  getButtons.forEach(function (item, i, getButtons) {
    var createBtns = '';
    for (var btn in item.btns[0]) {
      createBtns += '<a href="' + item.btns[0][btn] + '" title="' + item.btns[0][btn] + '">\n            <svg role="img" class="crs-svg">\n              <use xlink:href="./img/svg/icons.svg#' + btn + '"></use>\n          </svg>\n        </a>';
    }
    coursesButtons[i].innerHTML = createBtns;
  });
};

// Create event extra adds for contact buttons
var addExtraCourseVal = function addExtraCourseVal(extAdds) {
  var coursesButtons = document.querySelectorAll('.crs-btns');
  extAdds.forEach(function (item, i, extAdds) {
    var specialAdd = coursesButtons[i].querySelectorAll('a');
    specialAdd.forEach(function (add, j, specialAdd) {
      // Take value form title
      var titleVal = add.getAttribute('title');
      // Add 'mailto' to mail links
      if (titleVal.search("@") != -1) {
        add.href = 'mailto:' + item.btns[0].mail;
      }
      // Add 'tel' to phone links
      if (titleVal.search("358") != -1) {
        add.href = 'tel:' + item.btns[0].tel;
      }
    });
  });
};

// CREATE NEW AJAX FOR TEAM - team.json
var teamData = new XMLHttpRequest();
teamData.open("GET", "../json/team.json", true);
teamData.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var teamParse = JSON.parse(teamData.responseText);
    renderTeam(teamParse);
    renderTeamBtns(teamParse);
    addExtraTeamVal(teamParse);
  }
};
teamData.send();

//Create DOM teammate boxes
var renderTeam = function renderTeam(data) {
  var createTeam = '';
  data.forEach(function (teammate, i, data) {
    createTeam += '<div class="teammate">\n      <div class="team-img">\n        <img src="' + teammate.img + '" alt="' + teammate.name + '" title="' + teammate.name + '">\n        <svg role="img" class="team-img-svg">\n          <use xlink:href="./img/svg/fts-elem.svg#border-up"></use>\n        </svg>\n        <svg role="img" class="team-img-svg">\n          <use xlink:href="./img/svg/fts-elem.svg#border-down"></use>\n        </svg>\n      </div>\n      <span class="about-me">' + teammate.about + '</span>\n      <h5>' + teammate.name + '</h5>\n      <h6>' + teammate.post + '</h6>\n      <svg role="img" class="stars">\n        <use xlink:href="./img/svg/fts-elem.svg#stars"></use>\n      </svg>\n      <div class="team-btns"></div>\n    </div>';
  });
  ourTeamDom.innerHTML = createTeam;
};

// Create teammate buttons
var renderTeamBtns = function renderTeamBtns(getButtons) {
  getButtons.forEach(function (item, i, getButtons) {
    var buttons = document.querySelectorAll('.team-btns');
    var createBtns = '';
    for (var btn in item.btns[0]) {
      createBtns += '<a href="' + item.btns[0][btn] + '" title="' + item.btns[0][btn] + '">\n            <svg role="img" class="crs-svg">\n              <use xlink:href="./img/svg/icons.svg#' + btn + '"></use>\n          </svg>\n        </a>';
    }
    buttons[i].innerHTML = createBtns;
  });
};

// Create team extra adds for contact buttons
var addExtraTeamVal = function addExtraTeamVal(extAdds) {
  var coursesButtons = document.querySelectorAll('.team-btns');
  extAdds.forEach(function (item, i, extAdds) {
    var specialAdd = coursesButtons[i].querySelectorAll('a');
    specialAdd.forEach(function (add, j, specialAdd) {
      // Take value form title
      var titleVal = add.getAttribute('title');
      // Add 'mailto' to mail links
      if (titleVal.search("@") != -1) {
        add.href = 'mailto:' + item.btns[0].mail;
      }
      // Add 'tel' to phone links
      if (titleVal.search("358") != -1) {
        add.href = 'tel:' + item.btns[0].tel;
      }
    });
  });
};

// CREATE NEW AJAX FOR LINKS - main.json
var linksData = new XMLHttpRequest();
linksData.open("GET", "../json/main.json", true);
linksData.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var linksParse = JSON.parse(linksData.responseText);
    renderLinks(linksParse);
  }
};
linksData.send();

// Create text main-json
var renderLinks = function renderLinks(data) {
  partnerLinks.innerHTML = createLinks;
  mainTitle.innerText = data.title;
  mainTitleOg.innerText = data.title;
  mainSiteNameOg.innerText = data.site_name;
  mainDescriptOg.innerText = data.description;
  mainDescript.innerText = data.description;
  for (var i = 0; i < mainLinks.length; i++) {
    var getLinks = data.menu;
    for (var j in getLinks) {
      if (i.toString() == j.substring(4)) {
        mainLinks[i].innerText = getLinks[j];
      }
    }
  }
  for (var _i = 0; _i < mainH2.length; _i++) {
    var getH2 = data.h2;
    for (var _j in getH2) {
      if (_i.toString() == _j.substring(4)) {
        mainH2[_i].innerText = getH2[_j];
      }
    }
  }
  for (var _i2 = 0; _i2 < mainIn.length; _i2++) {
    mainIn[_i2].innerText = data.in;
  }
  // Create DOM partner links
  var createLinks = '';
  var partner = data.partner[0];
  for (var _i3 in partner) {
    var links = partner[_i3][0];
    createLinks += '<a href="' + links.href + '">\n        <img src="' + links.img + '" alt="' + links.href + '">\n     </a>';
  }
  partnerLinks.innerHTML = createLinks;
};