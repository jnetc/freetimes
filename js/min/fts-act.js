'use strict';

window.onload = function () {

  var bodyEl = document.querySelector('body'),
      themeBtn = document.querySelector('.theme-btn'),
      menuBtn = document.querySelector('.menu-btn'),
      menuBox = document.querySelector('.menu-box'),
      menuList = document.querySelector('.menu-list'),
      patyAdd = document.querySelectorAll('.paty-add'),
      plusBts = document.querySelectorAll('.plus-bt'),
      moreBts = document.querySelectorAll('.more-bt'),
      patyCont = document.querySelectorAll('.paty-text'),
      eventBox = document.querySelectorAll('.next-box'),
      crsMore = document.querySelectorAll('.crs-more span'),
      crsCont = document.querySelectorAll('.crs-graphs'),
      teammate = document.querySelectorAll('.teammate'),
      numAdd = 1,
      numBtn = 1;

  // LOCAL STORAGE
  var theme = localStorage.getItem('theme');
  // First open site insert key theme
  if (localStorage.getItem('theme', 'dark-theme') == null) {
    localStorage.setItem('theme', 'dark-theme');
    bodyEl.classList.add('dark-theme');
  }
  // Cheking LocalStorage for key
  if (theme == 'light-theme') {
    bodyEl.classList.add('' + theme + '');
  } else if (theme == 'dark-theme') {
    bodyEl.classList.add('' + theme + '');
  }
  // Theme change button
  themeBtn.addEventListener('click', changeTheme);
  function changeTheme() {
    if (bodyEl.classList.contains('dark-theme')) {
      bodyEl.classList.add('light-theme');
      bodyEl.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light-theme');
    } else if (bodyEl.classList.contains('light-theme')) {
      bodyEl.classList.add('dark-theme');
      bodyEl.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark-theme');
    }
  }

  // Menu buttons & scroll Animation
  menuBtn.addEventListener('click', menuShow);
  function menuShow() {
    menuBox.classList.toggle('focused');
    menuBtn.classList.toggle('mbt-focus');
    themeBtn.classList.toggle('tbt-anim');
    bodyEl.style.overflow = bodyEl.style.overflow === 'hidden' ? '' : 'hidden';
  }
  menuList.addEventListener('click', menuHide);
  function menuHide() {
    menuBox.classList.remove('focused');
    menuBtn.classList.remove('mbt-focus');
    themeBtn.classList.remove('tbt-anim');
    bodyEl.style.overflow = bodyEl.style.overflow === 'hidden' ? '' : 'hidden';
  }
  // Get elem's arrays
  var menuBtns = document.querySelectorAll('.menu-list li'),
      boxEl = document.querySelectorAll('.box-scroll');
  // Loop for buttons & get "value" attr.

  var _loop = function _loop(j) {
    menuBtns[j].addEventListener('click', function () {
      var btnVal = menuBtns[j].getAttribute('value');
      // Loop & push  elem's to array
      var boxArr = [];
      for (var i = 0; i < boxEl.length; i++) {
        boxArr.push(boxEl[i]);
      }
      // Get attr for elem's
      var boxElId = boxArr[j].getAttribute('id');
      // Check & get offset elem's (add animate)
      if (btnVal + (j + 1) == boxElId) {
        var currentHeight = boxArr[j].offsetTop;
        scrollTo(currentHeight, 1000);
      }
    });
  };

  for (var j = 0; j < menuBtns.length; j++) {
    _loop(j);
  }
  // Animate js get from internet & little changes
  var scrollTo = function scrollTo(to, duration) {
    var element = document.scrollingElement || document.documentElement,
        start = element.scrollTop,
        change = to - start,
        startNum = performance.now(),

    // t = current time     // b = start value
    // c = change in value  // d = duration
    easeInOutQuad = function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    },
        animateScroll = function animateScroll() {
      var scrollNum = performance.now();
      var currentNum = scrollNum - startNum;
      element.scrollTop = parseInt(easeInOutQuad(currentNum, start, change, duration));
      if (currentNum < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        element.scrollTop = to;
      }
    };
    animateScroll();
  };

  // Set attributes in animated block
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = patyAdd[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var attr = _step.value;

      var attrAdd = attr.setAttribute("id", "tag" + numAdd);
      numAdd++;
    }
    // Set attributes buttons
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = plusBts[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _attr = _step2.value;

      var attrBtn = _attr.setAttribute("data-id", "tag" + numBtn);
      numBtn++;
    }

    // Loop for button "plus contact"
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var _loop2 = function _loop2(btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      btn.classList.toggle('pressed-plus');
      var btnId = btn.getAttribute('data-id');
      // loop for blocks
      var arrayAdd = []; // create empty array
      for (var i = 0; i < patyAdd.length; i++) {
        var addId = patyAdd[i].getAttribute('id'); // getting attributes
        arrayAdd.push(addId); // puting in array
        // Check for validate
        if (btnId == arrayAdd[i]) {
          patyAdd[i].classList.toggle('action');
        }
      }
    });
  };

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = plusBts[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var btn = _step3.value;

      _loop2(btn);
    }

    // Loop for button "more info"
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  var _loop3 = function _loop3(i) {

    var contHeight = patyCont[i].offsetHeight; // Content height
    var contChild = patyCont[i].children; // Content paragraph child
    // Divide height paragraphs
    var paragArr = [];
    for (var j = 0; j < contChild.length; j++) {
      var paragHeigths = contChild[j].offsetHeight;
      paragArr.push(paragHeigths);
    }
    // Math height paragraps
    var paragSum = paragArr.reduce(function (a, b) {
      return a + b;
    });

    var _loop6 = function _loop6(k) {
      // ToDo if paragraphs more than 435px or not
      if (contHeight < paragSum && i == k) {
        moreBts[k].onclick = function () {

          moreBts[k].classList.toggle('pressed-more');
          var contAtr = getComputedStyle(patyCont[i]).height; // Check height from style

          if (contHeight + 'px' == contAtr) {
            var log = patyCont[i].style.height = paragSum + "px";
          } else if (contHeight + 'px' < contAtr) {
            var log2 = patyCont[i].style.height = contHeight + "px";
          }
        };
      } else if (paragSum <= contHeight && i == k) {
        moreBts[k].style.display = "none";
      }
    };

    for (var k = 0; k < moreBts.length; k++) {
      _loop6(k);
    }
  };

  for (var i = 0; i < patyCont.length; i++) {
    _loop3(i);
  }

  var _loop4 = function _loop4(i) {

    var contHeight = crsCont[i].offsetHeight; // Content height
    var contChild = crsCont[i].children; // Content paragraph child 

    // Divide height paragraphs
    var paragArr = [];
    for (var j = 0; j < contChild.length; j++) {
      var paragHeigths = contChild[j].offsetHeight;
      paragArr.push(paragHeigths);
    }
    // Math height paragraps
    var paragSum = paragArr.reduce(function (a, b) {
      return a + b;
    });

    var _loop7 = function _loop7(k) {
      // ToDo if paragraphs more than 435px or not
      if (contHeight < paragSum && i == k) {
        crsMore[k].onclick = function () {
          crsMore[k].classList.toggle('pressed-more');
          var contAtr = getComputedStyle(crsCont[i]).height; // Check height from style

          if (contHeight + 'px' == contAtr) {
            var log = crsCont[i].style.maxHeight = paragSum + "px";
          } else if (contHeight + 'px' < contAtr) {
            var log2 = crsCont[i].style.maxHeight = contHeight + "px";
          }
        };
      } else if (paragSum <= contHeight && i == k) {
        crsMore[k].style.display = "none";
      }
    };

    for (var k = 0; k < crsMore.length; k++) {
      _loop7(k);
    }
  };

  for (var i = 0; i < crsCont.length; i++) {
    _loop4(i);
  }

  // Show events info

  var _loop5 = function _loop5(q) {
    var eventBoxBnt = eventBox[q].querySelector('.next-btn');
    eventBoxBnt.addEventListener('click', function () {
      eventBox[q].classList.toggle('show-info');
    });
    eventBox[q].addEventListener('mouseleave', function () {
      eventBox[q].classList.remove('show-info');
    });
  };

  for (var q = 0; q < eventBox.length; q++) {
    _loop5(q);
  }

  // footer getYear
  var footerYear = document.querySelector('footer span');
  var year = new Date().getFullYear();
  footerYear.innerText += ' ' + year + ' All rights reserved';

  // Preloader Page
  // let preloader = document.querySelector('#preloader');
  // let imgPreload = document.querySelectorAll('img[alt="preload"]');
  // setTimeout(() => {
  //   if (!preloader.classList.contains('.done')) {
  //     preloader.classList.add('done');
  //     bodyEl.classList.remove('hidden');
  //     for (let i = 0; i < imgPreload.length; i++) {
  //       imgPreload[i].remove();
  //     }
  //   }
  // }, 1000,);

};