'use strict';

window.onload = function () {

  // Add poster image
  var ivImgEl = document.querySelectorAll('.iv-box');
  // Add data, time and caption
  var ivDateEls = document.querySelectorAll('.iv-dat');
  // Add ivent text paragraph
  // let ivContEl = document.querySelectorAll('.iv-content > svg');
  var ivContEl = document.querySelectorAll('.iv-text');
  // Add ivent price
  var ivPriceEl = document.querySelectorAll('.iv-tag');
  // Create ivent links 
  var ivLinkMap = document.querySelectorAll('.link-map');
  var ivLinkTel = document.querySelectorAll('.link-tel');
  var ivLinkSoc = document.querySelectorAll('.link-soc');
  // console.log(ivLinkMap);

  // Create new object
  var dataJson = new XMLHttpRequest();
  //  open( type, url/file, asunc);
  dataJson.open("GET", "../json/cart.json", true);
  dataJson.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var ourData = JSON.parse(dataJson.responseText);
      renderHtml(ourData);
    }
  };
  // send request
  dataJson.send();

  //Цикл текущих мероприятий
  var renderHtml = function renderHtml(data) {

    var keyArr = []; // Create empty array
    for (var key in data) {
      // console.log(data[key].ivCont[0]);
      keyArr.push(key); // Putting value in array

      var iArrKey = []; // Create empty array
      for (var i = 0; i < ivImgEl.length; i++) {
        // Putting any selector in loop, because it's same length
        iArrKey.push(i); // Putting value in array

        if (keyArr[key] == iArrKey[i]) {
          // insertAdjacentHTML ('position',  'text')
          ivImgEl[i].insertAdjacentHTML('afterbegin', '<img src="' + data[key].ivImg + '" alt="ivent">');
          ivDateEls[i].insertAdjacentHTML('afterbegin', '<span>' + data[key].ivDate + '</span>');
          ivDateEls[i].insertAdjacentHTML('beforeend', '<time>' + data[key].ivTime + '</time>');
          ivDateEls[i].insertAdjacentHTML('afterend', '<h3>' + data[key].ivCap + '</h3>');

          // Loop for paragraphs array
          var contentText = data[key].ivCont[0];
          for (var paragraph in contentText) {
            console.log(contentText[paragraph]);
            ivContEl[i].innerHTML += '<li>' + contentText[paragraph] + '</li>';
          }

          ivPriceEl[i].insertAdjacentHTML('beforeend', '<span>' + data[key].ivPrice + '<sup>\u20AC</sup></span>');
          ivLinkMap[i].href = '' + data[key].ivMap; // Change just link in tag 'a' 
          ivLinkTel[i].href = 'tel:' + data[key].ivTel;
          ivLinkSoc[i].href = '' + data[key].ivSoc;
        }
      }
    }
  };
};