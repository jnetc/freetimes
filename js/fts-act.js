window.onload = () => {

  let bodyEl    = document.querySelector('body'),
      themeBtn  = document.querySelector('.theme-btn'),
      menuBtn   = document.querySelector('.menu-btn'),
      menuBox   = document.querySelector('.menu-box'),
      menuList  = document.querySelector('.menu-list'),
      patyAdd   = document.querySelectorAll('.paty-add'),
      plusBts   = document.querySelectorAll('.plus-bt'),
      moreBts   = document.querySelectorAll('.more-bt'),
      patyCont  = document.querySelectorAll('.paty-text'),
      eventBox  = document.querySelectorAll('.next-box'),
      crsMore   = document.querySelectorAll('.crs-more span'),
      crsCont   = document.querySelectorAll('.crs-graphs'),
      teammate  = document.querySelectorAll('.teammate'),
      numAdd    = 1,
      numBtn    = 1;
      
    // LOCAL STORAGE
  let theme = localStorage.getItem('theme');
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
  function changeTheme () {
    if (bodyEl.classList.contains('dark-theme')) {
      bodyEl.classList.add('light-theme');
      bodyEl.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light-theme');
    }
    else if (bodyEl.classList.contains('light-theme')) {
      bodyEl.classList.add('dark-theme');
      bodyEl.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark-theme');
    }
  }

    // Menu buttons & scroll Animation
  menuBtn.addEventListener('click', menuShow);
  function menuShow () {
    menuBox.classList.toggle('focused');
    menuBtn.classList.toggle('mbt-focus');
    themeBtn.classList.toggle('tbt-anim');
    bodyEl.style.overflow = bodyEl.style.overflow === 'hidden' ? '' : 'hidden';

  }
  menuList.addEventListener('click', menuHide);
  function menuHide () {
    menuBox.classList.remove('focused');
    menuBtn.classList.remove('mbt-focus');
    themeBtn.classList.remove('tbt-anim');
    bodyEl.style.overflow = bodyEl.style.overflow === 'hidden' ? '' : 'hidden';
  }
    // Get elem's arrays
  let menuBtns = document.querySelectorAll('.menu-list li'),
  boxEl = document.querySelectorAll('.box-scroll');
  // Loop for buttons & get "value" attr.
    for (let j = 0; j < menuBtns.length; j++) {
      menuBtns[j].addEventListener('click', () => { 
      let btnVal = menuBtns[j].getAttribute('value');
        // Loop & push  elem's to array
      let boxArr = [];
      for (let i = 0; i < boxEl.length; i++) {
        boxArr.push( boxEl[i] );
      }
        // Get attr for elem's
      let boxElId = boxArr[j].getAttribute('id');
        // Check & get offset elem's (add animate)
      if ((btnVal + (j+1)) ==  boxElId){
        let currentHeight = boxArr[j].offsetTop;
        scrollTo(currentHeight, 1000);
      }
    })
  }
  // Animate js get from internet & little changes
  let scrollTo  = function(to, duration) {
    let element = document.scrollingElement || document.documentElement,
        start = element.scrollTop,
        change = to - start,
        startNum = performance.now(),
      // t = current time     // b = start value
      // c = change in value  // d = duration
        easeInOutQuad = (t, b, c, d) => {
          t /= d/2;
          if (t < 1) return c/2*t*t + b;
          t--;
          return -c/2 * (t*(t-2) - 1) + b;
        },
        animateScroll = () => {
          let scrollNum = performance.now();
          let currentNum = scrollNum - startNum;
          element.scrollTop = parseInt(easeInOutQuad(currentNum, start, change, duration));
          if(currentNum < duration) {
              requestAnimationFrame(animateScroll);
          }
          else {
              element.scrollTop = to;
          }
        };
    animateScroll();
  };

    // Set attributes in animated block
  for (let attr of patyAdd) {
    let attrAdd = attr.setAttribute("id", "tag"+numAdd);
    numAdd++;
  }
    // Set attributes buttons
  for (let attr of plusBts) {
    let attrBtn = attr.setAttribute("data-id", "tag"+numBtn);  
    numBtn++;
  }
    
    // Loop for button "plus contact"
  for (const btn of plusBts) {    
    btn.addEventListener('click', e => {
      e.preventDefault();
      btn.classList.toggle('pressed-plus');
      let btnId = btn.getAttribute('data-id');
      // loop for blocks
      let arrayAdd = []; // create empty array
      for (let i = 0; i < patyAdd.length; i++) {    
        let addId = patyAdd[i].getAttribute('id'); // getting attributes
        arrayAdd.push(addId); // puting in array
        // Check for validate
        if (btnId == arrayAdd[i]) {
          patyAdd[i].classList.toggle('action');  
        }
      }    
    })
  }

  // Loop for button "more info"
  for (let i = 0; i < patyCont.length; i++) {
     
    let contHeight  = patyCont[i].offsetHeight;  // Content height
    let contChild   = patyCont[i].children; // Content paragraph child
      // Divide height paragraphs
    let paragArr = [];
    for (let j = 0; j < contChild.length; j++) {
      let paragHeigths = contChild[j].offsetHeight;    
      paragArr.push(paragHeigths);
    }
      // Math height paragraps
    let paragSum = paragArr.reduce( (a, b) => {return a + b;})

    for (let k = 0; k < moreBts.length; k++) {
        // ToDo if paragraphs more than 435px or not
      if (contHeight < paragSum && i == k) {
        moreBts[k].onclick = () => {

          moreBts[k].classList.toggle('pressed-more');
          let contAtr = getComputedStyle(patyCont[i]).height; // Check height from style
           
          if ((contHeight+'px') == contAtr) {
            let log = patyCont[i].style.height = paragSum+"px";
            
          } else if ((contHeight+'px') < contAtr) {
            let log2 = patyCont[i].style.height = contHeight+"px";
          }
        }
      } else if (paragSum <= contHeight && i == k){
        moreBts[k].style.display = "none";
      }
    }
  }

  for (let i = 0; i < crsCont.length; i++) {
     
    let contHeight  = crsCont[i].offsetHeight;  // Content height
    let contChild   = crsCont[i].children; // Content paragraph child 

      // Divide height paragraphs
    let paragArr = [];
    for (let j = 0; j < contChild.length; j++) {
      let paragHeigths = contChild[j].offsetHeight;    
      paragArr.push(paragHeigths);
    }
      // Math height paragraps
    let paragSum = paragArr.reduce( (a, b) => {return a + b;})

    for (let k = 0; k < crsMore.length; k++) {
        // ToDo if paragraphs more than 435px or not
      if (contHeight < paragSum && i == k) {
        crsMore[k].onclick = () => {        
          crsMore[k].classList.toggle('pressed-more');
          let contAtr = getComputedStyle(crsCont[i]).height; // Check height from style
           
          if ((contHeight+'px') == contAtr) {
            let log = crsCont[i].style.maxHeight = paragSum+"px";
            
          } else if ((contHeight+'px') < contAtr) {
            let log2 = crsCont[i].style.maxHeight = contHeight+"px";
          }
        }
      } else if (paragSum <= contHeight && i == k){
        crsMore[k].style.display = "none";
      }
    }
  }

    // Show events info
  for (let q = 0; q < eventBox.length; q++) {
    let eventBoxBnt = eventBox[q].querySelector('.next-btn');   
    eventBoxBnt.addEventListener('click', () => { 
      eventBox[q].classList.toggle('show-info');
    })
    eventBox[q].addEventListener('mouseleave', () => {
      eventBox[q].classList.remove('show-info');
    })
  }



    // footer getYear
  let footerYear = document.querySelector('footer span');
  let year = new Date().getFullYear();
  footerYear.innerText += ' ' + year + ' All rights reserved';



    // Preloader Page
  let preloader = document.querySelector('#preloader');
  let imgPreload = document.querySelectorAll('img[alt="preload"]');
  setTimeout(() => {
    if (!preloader.classList.contains('.done')) {
      preloader.classList.add('done');
      bodyEl.classList.remove('hidden');
      for (let i = 0; i < imgPreload.length; i++) {
        imgPreload[i].remove();
        removePreload();
      }
    }
  }, 1000);
  let removePreload = () => {
    setTimeout(() => {
      preloader.remove();
      bodyEl.classList.add('hidden');
    }, 1000);
  }

  



  
}