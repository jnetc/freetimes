let patyBox = document.querySelectorAll('.paty-box'), // Add poster image
    patyDateEls = document.querySelectorAll('.paty-dat'), // Add data, time and caption
    patyContEl = document.querySelectorAll('.paty-content'),
    patyParagEl = document.querySelectorAll('.paty-text'), // Add event text paragraph
    patyPriceEl = document.querySelectorAll('.paty-tag'), // Add event price
    patyAddBtn = document.querySelectorAll('.paty-add'), // Create event links
    nextBlocks = document.querySelectorAll('.next-blk'), // Dynamically generate next event boxes
    coursesDom = document.querySelector('.courses'); // Dynamically generate courses

  // CREATE NEW OBJECT FOR EVENTS
let eventsData = new XMLHttpRequest();
  //  open( type, url/file, asunc);
eventsData.open("GET", "../json/cards.json", true);
eventsData.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    let evenParse = JSON.parse(eventsData.responseText);
    renderEvents(evenParse);
    renderParagraphs(evenParse);
    renderComingEvents(evenParse);
    renderContactBtn(evenParse);
    addEventBtnVal(evenParse);
  }
};
// send request
eventsData.send();

  // Create main dynamic elements
let renderEvents = data => {
  data.forEach((item, i, data) => {
    patyBox[i].insertAdjacentHTML('afterbegin',
      `<img src="${item.img}" alt="poster" title="poster">`)
    patyDateEls[i].insertAdjacentHTML('afterbegin',
      `<span>${item.date}</span>
       <time>${item.time}</time>`)
    patyContEl[i].insertAdjacentHTML('afterbegin',
      `<h3>${item.capt}</h3>`)
    patyPriceEl[i].insertAdjacentHTML('beforeend',
      `<span>${item.price}<sup>€</sup></span>`)
  })
}

  // Create Paragraphs
let renderParagraphs = getList => {
  getList.forEach((item, i, getList) => {
    for (let graph in item.text[0]) {
      patyParagEl[i].setAttribute("style", "height: 200px");
      patyParagEl[i].innerHTML += `<li class="liTxt">${item.text[0][graph]}</li>`
    }
  })
}
  // Create event contact buttons
let renderContactBtn = getButtons => {
  getButtons.forEach((item, i, getButtons) => {
    let btnCreate = '';
    for (let btn in item.btns[0]) {
      btnCreate += 
      `<a href="${item.btns[0][btn]}" title="${item.btns[0][btn]}">
          <svg role="img" class="icon-svg">
            <use xlink:href="./img/icons/icons.svg#${btn}"></use>
        </svg>
      </a>`;
    }
    patyAddBtn[i].innerHTML = btnCreate; 
  })
}

  // Create event extra adds for contact buttons
let addEventBtnVal = extAdds => {
  extAdds.forEach((btns, i, extAdds) => {
    let eventBtnAdd = patyAddBtn[i].querySelectorAll('a');
    eventBtnAdd.forEach((add, j, eventBtnAdd) => {
        // Take value form title
      let titleVal = add.getAttribute('title');
        // Add 'mailto' to mail links
      if (titleVal.search("@") != -1) {
        add.href = 'mailto:' + btns.btns[0].mail;
      }
      // Add 'tel' to phone links
      if (titleVal.search("358") != -1) {
        add.href = 'tel:' + btns.btns[0].tel;        
      } 
    })
  })
}

  // Create coming events
let renderComingEvents = data => {
  data.forEach((item, i, data) => {
    const eventsObj = data[i].events[0];
    let eventsDom = '';
    for ( let eventNum in eventsObj) {
      eventsDom += `
      <div class="next-box" style="background-image: url(${eventsObj[eventNum][0].eventPoster})">
        <span class="next-date">
          <span>${eventsObj[eventNum][0].eventDate}</span>${eventsObj[eventNum][0].eventMonth}
        </span>
        <h5>${eventsObj[eventNum][0].eventCap}</h5>
        <span class="next-btn">${eventsObj[eventNum][0].eventBtn}</span>
        <p>${eventsObj[eventNum][0].eventCont}</p> 
      </div>`
    }
    nextBlocks[i].innerHTML = eventsDom;
  })
}


  // CREATE NEW OBJECT FOR COURSES
let coursesData = new XMLHttpRequest();
coursesData.open("GET", "../json/courses.json", true);
coursesData.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
  let crsParse = JSON.parse(coursesData.responseText);
    renderDom(crsParse);
    renderLi(crsParse);
    renderBtns(crsParse);
    addExtraVal(crsParse);
  }
};
coursesData.send();

  //Create DOM courses boxes
let renderDom = data => {
  let mainBox = '';
  data.forEach((item, i, data) => {
    mainBox +=
    `<div class="flex-crs">
      <div class="crs-dat">
        <span class="crs-cls">${item.Cls}</span> 
        <img src="${item.Img}" alt="courses" title="poster">
      </div>
      <div class="crs-cont">
        <h4 class="crs-name">${item.Name}</h4>
        <ul class="crs-graphs"></ul>
      </div>
      <div class="crs-opt">
        <div class="crs-btns"></div>
        <div class="for-price">
          <span class="crs-tip">${item.Period}</span>
          <span class="crs-price">${item.Price}<sup>€</sup></span>
        </div>
      </div>
    </div>`;
  });
  coursesDom.innerHTML += mainBox;
}

  // Create course paragraphs
let renderLi = getList => {
  let coursesList = document.querySelectorAll('.crs-graphs');
  getList.forEach((parag, i, getList) => {
      for (let key in parag.Txt[0]) {
        coursesList[i].innerHTML += `<li>${parag.Txt[0][key]}</li>`;
      }
  });
}

  // Create course paragraphs
let renderBtns = getButtons => {
  let coursesButtons = document.querySelectorAll('.crs-btns');
  getButtons.forEach((btns, i, getButtons) => {
    let buttonsDom = '';
      for (let btn in btns.Btns[0]) {
        buttonsDom += 
        `<a href="${btns.Btns[0][btn]}" title="${btns.Btns[0][btn]}">
            <svg role="img" class="crs-svg">
              <use xlink:href="./img/icons/icons.svg#${btn}"></use>
          </svg>
        </a>`;
      }
      coursesButtons[i].innerHTML = buttonsDom;     
  });  
}

  // Create event extra adds for contact buttons
let addExtraVal = extAdds => {
  let coursesButtons = document.querySelectorAll('.crs-btns');
  extAdds.forEach((btns, i, extAdds) => {
    let specialAdd = coursesButtons[i].querySelectorAll('a');
    specialAdd.forEach((add, j, specialAdd) => {
        // Take value form title
      let titleVal = add.getAttribute('title');
        // Add 'mailto' to mail links
      if (titleVal.search("@") != -1) {
        add.href = 'mailto:' + btns.Btns[0].mail;
      }
      // Add 'tel' to phone links
      if (titleVal.search("358") != -1) {
        add.href = 'tel:' + btns.Btns[0].tel;        
      } 
    })
  })
}