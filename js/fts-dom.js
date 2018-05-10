let patyBox = document.querySelectorAll('.paty-box'), // Add poster image
    patyDateEls = document.querySelectorAll('.paty-dat'), // Add data, time and caption
    patyTimeEls = document.querySelectorAll('.paty-time'), // Add data, time and caption
    patyContEl = document.querySelectorAll('.paty-content'),
    patyParagEl = document.querySelectorAll('.paty-text'), // Add event text paragraph
    patyPriceEl = document.querySelectorAll('.paty-tag'), // Add event price
    patyAddBtn = document.querySelectorAll('.paty-add'), // Create event links
    nextBlocks = document.querySelectorAll('.next-blk'), // Dynamically generate next event boxes
    coursesDom = document.querySelector('.course-blk'), // Dynamically generate courses
    ourTeamDom = document.querySelector('.team-blk'), // Dynamically generate teammate
    mainTitle = document.querySelector('title'), // main.json
    mainTitleOg = document.querySelector('meta[property="og:title"]'), // main.json
    mainSiteNameOg = document.querySelector('meta[property="og:site_name"]'), // main.json
    mainDescriptOg = document.querySelector('meta[property="og:description"]'), // main.json
    mainDescript = document.querySelector('meta[name="description"]'), // main.json
    mainLinks = document.querySelectorAll('.menu-list li'), // main.json
    mainH2 = document.querySelectorAll('h2'), // main.json
    mainIn = document.querySelectorAll('.paty-tag span:nth-of-type(1)'), // main.json
    partnerLinks = document.querySelector('.link-blk'); // Dynamically generate partners link

  // CREATE NEW AJAX FOR EVENTS - events.json
let eventsData = new XMLHttpRequest();
  //  open( type, url/file, asunc);
eventsData.open("GET", "../json/cards.json", true);
eventsData.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    let evenParse = JSON.parse(eventsData.responseText);
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
let renderEvents = data => {
  data.forEach((item, i, data) => {
    patyBox[i].insertAdjacentHTML('afterbegin',
      `<img src="${item.img}" alt="poster" title="poster">`)
    patyDateEls[i].innerText = item.date;
    patyDateEls[i].insertAdjacentHTML('beforeend',
  `<span>${item.month}</span>`)
    patyTimeEls[i].innerText = item.time;
    patyContEl[i].insertAdjacentHTML('afterbegin',
      `<h3>${item.capt}</h3>`)
    patyPriceEl[i].insertAdjacentHTML('beforeend',
      `<span>${item.price}<sup>€</sup></span>`)
  })
    // Add class for theme
  patyContEl[0].querySelector('h3').className = 'night-capt';
  patyContEl[1].querySelector('h3').className = 'day-capt';  
}

  // Create Paragraphs
let renderEventParagraphs = getList => {
  getList.forEach((item, i, getList) => {
    for (let graph in item.text[0]) {
      patyParagEl[i].setAttribute("style", "height: 200px");
      patyParagEl[i].innerHTML += `<li class="liTxt">${item.text[0][graph]}</li>`
    }
  })
}
  // Create event contact buttons
let renderEventBtns = getButtons => {
  getButtons.forEach((item, i, getButtons) => {
    let createBtns = '';
    for (let btn in item.btns[0]) {
      createBtns += 
      `<a href="${item.btns[0][btn]}" title="${item.btns[0][btn]}">
          <svg role="img" class="icon-svg">
            <use xlink:href="./img/svg/icons.svg#${btn}"></use>
        </svg>
      </a>`
    }
    patyAddBtn[i].innerHTML = createBtns; 
  })
}

  // Create event extra adds for contact buttons
let addEventBtnVal = extAdds => {
  extAdds.forEach((item, i, extAdds) => {
    let eventBtnAdd = patyAddBtn[i].querySelectorAll('a');
    eventBtnAdd.forEach((add, j, eventBtnAdd) => {
        // Take value form title
      let titleVal = add.getAttribute('title');
        // Add 'mailto' to mail links
      if (titleVal.search("@") != -1) {
        add.href = 'mailto:' + item.btns[0].mail;
      }
      // Add 'tel' to phone links
      if (titleVal.search("358") != -1) {
        add.href = 'tel:' + item.btns[0].tel;        
      } 
    })
  })
}

  // Create coming events
let renderComingEvents = data => {
  data.forEach((item, i, data) => {
    const eventsObj = data[i].events[0];
    let createComeEvents = '';
    for ( let eventNum in eventsObj) {
      createComeEvents += `
      <div class="next-box" style="background-image: url(${eventsObj[eventNum][0].ePoster})">
        <span class="next-date">${eventsObj[eventNum][0].eDate}
          <span>${eventsObj[eventNum][0].eMonth}</span>
        </span>
        <div>
          <h5>${eventsObj[eventNum][0].eCap}</h5>
          <span class="next-btn">${eventsObj[eventNum][0].eBtn}</span>
          <p>${eventsObj[eventNum][0].eCont}</p>
        </div>
      </div>`
    }
    nextBlocks[i].innerHTML = createComeEvents;
  })
    // Add class for element's
    addClassNextDates();
    addClassNextButtons();
}

  // Add class for theme dates
let addClassNextDates = () => {
  nextBlocks.forEach((item, i, nextBlocks) => {
    let elms = nextBlocks[i].querySelectorAll('.next-date');
    for (let j = 0; j < elms.length; j++) {
      if (i == 0) {      
        elms[j].className += ' night-next';
      } if (i == 1) {
        elms[j].className += ' day-next';
      }
    }
  }) 
}
  // Add class for theme buttons
let addClassNextButtons = () => {
  nextBlocks.forEach((item, i, nextBlocks) => {
    let elms = nextBlocks[i].querySelectorAll('.next-btn');
    for (let j = 0; j < elms.length; j++) {
      if (i == 0) {      
        elms[j].className += ' show-night-btn';
      } if (i == 1) {
        elms[j].className += ' show-day-btn';
      }
    }
  }) 
}  

  // CREATE NEW AJAX FOR COURSES - course.json
let coursesData = new XMLHttpRequest();
coursesData.open("GET", "../json/courses.json", true);
coursesData.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
  let crsParse = JSON.parse(coursesData.responseText);
    renderCourses(crsParse);
    renderCourseParagraphs(crsParse);
    renderCourseBtns(crsParse);
    addExtraCourseVal(crsParse);

    // createSocBtns(crsParse);
  }
};
coursesData.send();

  //Create DOM courses boxes
let renderCourses = data => {
  let createCourses = '';
  data.forEach((item, i, data) => {
    createCourses +=
    `<div class="flex-crs">
      <div class="crs-dat">
        <span class="crs-day">${item.days}</span>
        <span class="crs-time">${item.time}</span>
        <svg role="img" class="crs-svg">
          <use xlink:href="./img/svg/icons.svg#clock"></use>
        </svg>
      </div>
      <div class="crs-img">
        <span class="crs-cls">${item.cls}</span> 
        <img src="${item.img}" alt="courses" title="poster">
      </div>
      <div class="crs-cont">
        <h4>${item.name}</h4>
        <ul class="crs-graphs" style="max-height: 115px"></ul>
      </div>
      <div class="crs-opt">
        <div class="crs-btns"></div>
        <div class="crs-more">
          <span class="night-bt"></span>
        </div>
        <div class="for-price">
          <span class="crs-tip">${item.period}</span>
          <span class="crs-price">${item.price}<sup>€</sup></span>
        </div>
      </div>
    </div>`
  });
  coursesDom.innerHTML += createCourses; 
}

  // Create course paragraphs
let renderCourseParagraphs = getList => {
  let coursesList = document.querySelectorAll('.crs-graphs');
  getList.forEach((item, i, getList) => {
      for (let key in item.txt[0]) {
        coursesList[i].innerHTML += `<li>${item.txt[0][key]}</li>`;
      }
  });
}

  // Create course buttons
let renderCourseBtns = getButtons => {
  let coursesButtons = document.querySelectorAll('.crs-btns');
  getButtons.forEach((item, i, getButtons) => {
    let createBtns = '';
      for (let btn in item.btns[0]) {
        createBtns += 
        `<a href="${item.btns[0][btn]}" title="${item.btns[0][btn]}">
            <svg role="img" class="crs-svg">
              <use xlink:href="./img/svg/icons.svg#${btn}"></use>
          </svg>
        </a>`
      }
      coursesButtons[i].innerHTML = createBtns;     
  });  
}

  // Create event extra adds for contact buttons
let addExtraCourseVal = extAdds => {
  let coursesButtons = document.querySelectorAll('.crs-btns');
  extAdds.forEach((item, i, extAdds) => {
    let specialAdd = coursesButtons[i].querySelectorAll('a');
    specialAdd.forEach((add, j, specialAdd) => {
        // Take value form title
      let titleVal = add.getAttribute('title');
        // Add 'mailto' to mail links
      if (titleVal.search("@") != -1) {
        add.href = 'mailto:' + item.btns[0].mail;
      }
      // Add 'tel' to phone links
      if (titleVal.search("358") != -1) {
        add.href = 'tel:' + item.btns[0].tel;        
      } 
    })
  })
}

  // CREATE NEW AJAX FOR TEAM - team.json
let teamData = new XMLHttpRequest();
teamData.open("GET", "../json/team.json", true);
teamData.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
  let teamParse = JSON.parse(teamData.responseText);
    renderTeam(teamParse);
    renderTeamBtns(teamParse);
    addExtraTeamVal(teamParse);
  }
};
teamData.send();

  //Create DOM teammate boxes
let renderTeam = data => {
  let createTeam = '';
  data.forEach((teammate, i, data) => {
    createTeam += 
    `<div class="teammate">
      <div class="team-img">
        <img src="${teammate.img}" alt="${teammate.name}" title="${teammate.name}">
        <svg role="img" class="team-img-svg">
          <use xlink:href="./img/svg/fts-elem.svg#border-up"></use>
        </svg>
        <svg role="img" class="team-img-svg">
          <use xlink:href="./img/svg/fts-elem.svg#border-down"></use>
        </svg>
      </div>
      <span class="about-me">${teammate.about}</span>
      <h5>${teammate.name}</h5>
      <h6>${teammate.post}</h6>
      <svg role="img" class="stars">
        <use xlink:href="./img/svg/fts-elem.svg#stars"></use>
      </svg>
      <div class="team-btns"></div>
    </div>`
  })
  ourTeamDom.innerHTML = createTeam;
}

  // Create teammate buttons
let renderTeamBtns = getButtons => {
  getButtons.forEach((item, i, getButtons) => {
    let buttons = document.querySelectorAll('.team-btns');
    let createBtns = '';
      for (let btn in item.btns[0]) {      
        createBtns += 
        `<a href="${item.btns[0][btn]}" title="${item.btns[0][btn]}">
            <svg role="img" class="crs-svg">
              <use xlink:href="./img/svg/icons.svg#${btn}"></use>
          </svg>
        </a>`
      }
      buttons[i].innerHTML = createBtns;     
  });
}
  
  // Create team extra adds for contact buttons
let addExtraTeamVal = extAdds => {
  let coursesButtons = document.querySelectorAll('.team-btns');
  extAdds.forEach((item, i, extAdds) => {
    let specialAdd = coursesButtons[i].querySelectorAll('a');
    specialAdd.forEach((add, j, specialAdd) => {
        // Take value form title
      let titleVal = add.getAttribute('title');
        // Add 'mailto' to mail links
      if (titleVal.search("@") != -1) {
        add.href = 'mailto:' + item.btns[0].mail;
      }
      // Add 'tel' to phone links
      if (titleVal.search("358") != -1) {
        add.href = 'tel:' + item.btns[0].tel;        
      } 
    })
  })
}

  // CREATE NEW AJAX FOR LINKS - main.json
let linksData = new XMLHttpRequest();
linksData.open("GET", "../json/main.json", true);
linksData.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
  let linksParse = JSON.parse(linksData.responseText);
    renderLinks(linksParse);
  }
};
linksData.send();

  // Create text main-json
let renderLinks = data => {
  partnerLinks.innerHTML = createLinks;
  mainTitle.innerText = data.title;
  mainTitleOg.innerText = data.title;
  mainSiteNameOg.innerText = data.site_name;
  mainDescriptOg.innerText = data.description;
  mainDescript.innerText = data.description;
  for (let i = 0; i < mainLinks.length; i++) {
    let getLinks = data.menu;
    for (let j in getLinks) {
      if (i.toString() == j.substring(4)) {
        mainLinks[i].innerText = getLinks[j];
      }
    }
  }
  for (let i = 0; i < mainH2.length; i++) {
    let getH2 = data.h2;
    for (let j in getH2) {    
      if (i.toString() == j.substring(4)) {
        mainH2[i].innerText = getH2[j];
      }
    }
  }
  for (let i = 0; i < mainIn.length; i++) {
    mainIn[i].innerText = data.in;
  }
   // Create DOM partner links
  let createLinks = '';
  let partner = data.partner[0];
  for (let i in partner) {
    const links = partner[i][0];  
    createLinks += 
    `<a href="${links.href}">
        <img src="${links.img}" alt="${links.href}">
     </a>`
  }
  partnerLinks.innerHTML = createLinks;
}