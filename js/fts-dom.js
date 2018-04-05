let patyImgEl = document.querySelectorAll('.paty-box'), // Add poster image
    patyDateEls = document.querySelectorAll('.paty-dat'), // Add data, time and caption
    patyContEl = document.querySelectorAll('.paty-text'), // Add event text paragraph
    patyPriceEl = document.querySelectorAll('.paty-tag'), // Add event price
    patyLinkMap = document.querySelectorAll('.link-map'), // Create event links
    patyLinkTel = document.querySelectorAll('.link-tel'), // ---
    patyLinkSoc = document.querySelectorAll('.link-soc'), // ---
    nextBlocks = document.querySelectorAll('.next-blk'), // Dynamically generate next event boxes
    coursesDom = document.querySelector('.courses'); // Dynamically generate courses

  // Create new object for events
let eventsData = new XMLHttpRequest();
  //  open( type, url/file, asunc);
eventsData.open("GET", "../json/cards.json", true);
eventsData.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    let evenParse = JSON.parse(eventsData.responseText);
    renderEvents(evenParse);
  }
};
// send request
eventsData.send();

let renderEvents = data => {
  
  keyArr = []; // Create empty array
  for (let key in data) {
    // console.log(data[key].patyEvents[0]);
    keyArr.push(key); // Putting value in array

    let iArrKey = []; // Create empty array
    for (let i = 0; i < patyImgEl.length; i++) { // Putting any selector in loop, because it's same length
      iArrKey.push(i); // Putting value in array
      
      if (keyArr[key] == iArrKey[i]) {
        // insertAdjacentHTML ('position',  'text')
        patyImgEl[i].insertAdjacentHTML('afterbegin', `<img src="${data[key].patyImg}" alt="patyent">`)
        patyDateEls[i].insertAdjacentHTML('afterbegin', `<span>${data[key].patyDate}</span>`)
        patyDateEls[i].insertAdjacentHTML('beforeend', `<time>${data[key].patyTime}</time>`)
        patyDateEls[i].insertAdjacentHTML('afterend', `<h3>${data[key].patyCap}</h3>`)
        
          // Loop for paragraphs array
        let contentText = data[key].patyCont[0];
        // console.log(contentText);
        
          for (let paragraph in contentText) {
            patyContEl[i].setAttribute("style", "height: 345px");
            patyContEl[i].innerHTML += `<li class="liTxt">${contentText[paragraph]}</li>`
          }

        patyPriceEl[i].insertAdjacentHTML('beforeend', `<span>${data[key].patyPrice}<sup>€</sup></span>`)
        patyLinkMap[i].href = `${data[key].patyMap}` // Change just link in tag 'a' 
        patyLinkTel[i].href = `tel:${data[key].patyTel}`
        patyLinkSoc[i].href = `${data[key].patySoc}`
        
          // EVENT BOXES
        let eventsEl = data[key].patyEvents[0];
        for (let eventNum in eventsEl) {
          nextBlocks[i].innerHTML += `
          <div class="next-box">
            <span class="next-date">
              <span>${eventsEl[eventNum][0].eventDate}</span>${eventsEl[eventNum][0].eventMonth}
            </span>
            <figure>
              <img src="${eventsEl[eventNum][0].eventPoster}" alt="next event">
            </figure>
            <h5>${eventsEl[eventNum][0].eventCap}</h5>
            <span class="next-btn">${eventsEl[eventNum][0].eventBtn}</span>
            <p>${eventsEl[eventNum][0].eventCont}</p> 
          </div>`
        }
      } 
    }
  }
}

  // Create new object for courses
let coursesData = new XMLHttpRequest();
coursesData.open("GET", "../json/courses.json", true);
coursesData.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
  let crsParse = JSON.parse(coursesData.responseText);
    renderDom(crsParse);
    renderLi(crsParse);
    renderBtns(crsParse);
    // let btnJsonParse = document.querySelector('#btJsonParse');
    // btnJsonParse.addEventListener('click', function () {
    //   let crsBnt = renderCourses(crsParse);   
    // });  
  }
};
coursesData.send();

  //Create DOM courses boxes
let renderDom = dom => {
  dom.forEach(function (item, i, dom) {
    let mainHtml = '';
    coursesDom.innerHTML +=
    `<div class="flex-crs">
      <div class="crs-dat">
        <span class="crs-cls">${item.Cls}</span> 
        <img src="${item.Img}" alt="courses">
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
}

  // Create course paragraphs
let renderLi = getList => {
  let coursesList = document.querySelectorAll('.crs-graphs');
  getList.forEach(function (parag, i, getList) {
    for (let key in parag.Txt[0]) {
      coursesList[i].innerHTML += `<li>${parag.Txt[0][key]}</li>`;
    }
  });
}

  // Create course paragraphs
let renderBtns = getButtons => {
  let coursesButtons = document.querySelectorAll('.crs-btns');
  getButtons.forEach(function (btns, i, getButtons) {
    for (let btn in btns.Btns[0]) {
      coursesButtons[i].innerHTML += 
      `<a href="${btns.Btns[0][btn]}">
          <svg role="img" class="crs-svg">
            <use xlink:href="./img/icons/icons.svg#${btn}"></use>
        </svg>
      </a>`;
    }
  });
}

let x = 0;
let getNum = () => x += 10;
let btnJsonParse = document.querySelector('#btJsonParse');
btnJsonParse.addEventListener('click', function () {
  z =  getNum();
  if (z < 22) {
    console.log( z );
  }
  else {
    console.log( 'done' );
  }

  
}); 


