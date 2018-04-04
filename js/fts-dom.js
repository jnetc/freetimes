let patyImgEl = document.querySelectorAll('.paty-box'), // Add poster image
    patyDateEls = document.querySelectorAll('.paty-dat'), // Add data, time and caption
    patyContEl = document.querySelectorAll('.paty-text'), // Add event text paragraph
    patyPriceEl = document.querySelectorAll('.paty-tag'), // Add event price
    patyLinkMap = document.querySelectorAll('.link-map'), // Create event links
    patyLinkTel = document.querySelectorAll('.link-tel'), // ---
    patyLinkSoc = document.querySelectorAll('.link-soc'), // ---
    nextBlocks = document.querySelectorAll('.next-blk'); // Dynamically generate next event boxes 

  // Create new object
let dataJson = new XMLHttpRequest();
  //  open( type, url/file, asunc);
dataJson.open("GET", "../json/cart.json", true);
dataJson.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    let ourData = JSON.parse(dataJson.responseText);
    renderHtml(ourData);
  }
};
// send request
dataJson.send();

let renderHtml = data => {
  
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
