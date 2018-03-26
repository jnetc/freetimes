// import { create } from "domain";

window.onload = function () {

  // Add poster image
  let ivImgEl = document.querySelectorAll('.iv-box');
  // let ivDateEl = document.querySelectorAll('.iv-dat > span');
  // let ivTimeEl = document.querySelectorAll('.iv-dat > time');

  // Add data, time and caption
  let ivDateEls = document.querySelectorAll('.iv-dat');
  // let ivCapEl = document.querySelectorAll('.iv-content > h3');

  // Add ivent text paragraph
  let ivContEl = document.querySelectorAll('.iv-content > svg');
  // Add ivent price
  let ivPriceEl = document.querySelectorAll('.iv-tag');
  // Create ivent links 
  let ivLinkMap = document.querySelectorAll('.link-map');
  let ivLinkTel = document.querySelectorAll('.link-tel');
  let ivLinkSoc = document.querySelectorAll('.link-soc');
  // console.log(ivLinkMap);
  
  // Create new object, создаем новый объект
  let dataJson = new XMLHttpRequest();
  //  open( type, url/file, asunc);
  dataJson.open("GET", "../json/cart.json", true);
  dataJson.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let ourData = JSON.parse(dataJson.responseText);
      renderHtml(ourData);
    }
  };
  
  // sends request, отправляем запрос
  dataJson.send();
  
    //Цикл текущих мероприятий
  function renderHtml(data) {
    // console.log(data[0].ivDate);
    
    var keyArr = []; // Create empty array
    for (let key in data) {

      console.log(data[key].ivMap);
      keyArr.push(key); // Putting value in array

      var iArrKey = []; // Create empty array

      // Putting any selector, because it's same length
      // Кладем любой селектор в цикл т.к. кол-во дублирующих эл. одинаково
      for (let i = 0; i < ivImgEl.length; i++) {

        iArrKey.push(i); // Putting value in array
        // i.innerText = `${data[key].ivDate}`
        
        if (keyArr[key] == iArrKey[i]) {
          // insertAdjacentHTML ('position',  'text')
          ivImgEl[i].insertAdjacentHTML('afterbegin', `<img src="${data[key].ivImg}" alt="ivent">`)
          ivDateEls[i].insertAdjacentHTML('afterbegin', `<span>${data[key].ivDate}</span>`)
          ivDateEls[i].insertAdjacentHTML('beforeend', `<time>${data[key].ivTime}</time>`)
          ivDateEls[i].insertAdjacentHTML('afterend', `<h3>${data[key].ivCap}</h3>`)
          ivContEl[i].insertAdjacentHTML('afterend', `<p>${data[key].ivCont}</p>`)
          ivPriceEl[i].insertAdjacentHTML('beforeend', `<span>${data[key].ivPrice}<sup>€</sup></span>`)
          // Change just link in tag 'a' 
          ivLinkMap[i].href = `${data[key].ivMap}`
          ivLinkTel[i].href = `tel:${data[key].ivTel}`
          ivLinkSoc[i].href = `${data[key].ivSoc}`
        } 
      }
    }
    // console.log(iArrKey);
    
    // console.log(keyArr);
  }
}
