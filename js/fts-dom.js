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
    renderCourses(crsParse);
    // console.log(crsParse);
    // let btnJsonParse = document.querySelector('#btJsonParse');
    // btnJsonParse.addEventListener('click', function () {
    //   let crsBnt = renderCourses(crsParse);   
    // });  
  }
};
coursesData.send();


let renderCourses = crs => {
  keyArr = [];
  for (let key in crs) {
    // console.log(key);
    keyArr.push(key);
        // Create main DOM of courses
      coursesDom.innerHTML += 
      `<div class="flex-crs">
        <div class="crs-dat">
          <span class="crs-cls">${crs[key].Cls}</span> 
          <img src="${crs[key].Img}" alt="courses">
        </div>
        <div class="crs-cont">
          <h4 class="crs-name">${crs[key].Name}</h4>
          <ul class="crs-graphs"></ul>
        </div>
        <div class="crs-opt">
          <div class="crs-btns"></div>
          <div class="for-price">
            <span class="crs-tip">${crs[key].Period}</span>
            <span class="crs-price">${crs[key].Price}<sup>€</sup></span>
          </div>
        </div>
      </div>`;
    
      // Create course paragraphs
    let coursesList = document.querySelectorAll('.crs-graphs');
    let coursesTxt = crs[key].Txt[0]; // Get obj paragraphs from JSON
    let listArr = []; // Array
    for (let i = 0; i < coursesList.length; i++) {
      listArr.push(i);
      if (listArr[i] == keyArr[key]) {
        for (let paragraph in coursesTxt) {
          coursesList[i].innerHTML += `<li>${coursesTxt[paragraph]}</li>`;
        }
      }
    }
      // Create social icons
    let coursesBtns = document.querySelectorAll('.crs-btns');
    let coursesSocBtns = crs[key].Btns[0]; // Get obj btns from JSON
    let btnArr = []; // Array
    for (let i = 0; i < coursesBtns.length; i++) {
      btnArr.push(i);
      if (btnArr[i] == keyArr[key]) {
        for (let contactBtn in coursesSocBtns) {
          // console.log(contactBtn);
          coursesBtns[i].innerHTML += 
          `<a href="${coursesSocBtns[contactBtn]}">
            <svg role="img" class="crs-svg">
              <use xlink:href="./img/icons/icons.svg#${contactBtn}"></use>
            </svg>
          </a>`;
        }
      }
    }  
  }
  // console.log(keyArr);
  
}

let x = 0;
let getNum = () => x += 10;
let btnJsonParse = document.querySelector('#btJsonParse');
btnJsonParse.addEventListener('click', function () {
  z =  getNum();

  console.log( z );
}); 


