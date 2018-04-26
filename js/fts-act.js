window.onload = () => {

  let themeBtn  = document.querySelector('.theme-btn'),
      menuBtn   = document.querySelector('.menu-btn'),
      menuList  = document.querySelector('ul.menu-list'),
      bodyEl    = document.querySelector('body'),
      patyAdd   = document.querySelectorAll('.paty-add'),
      plusBts   = document.querySelectorAll('.plus-bt'),
      moreBts   = document.querySelectorAll('.more-bt'),
      contents  = document.querySelectorAll('.paty-text'),
      eventBox  = document.querySelectorAll('.next-box'),
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

  
  menuBtn.addEventListener('click', menuShow);
  function menuShow () {
    menuList.classList.toggle('show-mlist');
    menuBtn.classList.toggle('hide-mlist');
  }
  menuList.addEventListener('mouseleave', menuHide);
  menuList.addEventListener('click', menuHide);
  function menuHide () {
    menuList.classList.remove('show-mlist');
    menuBtn.classList.remove('hide-mlist');
  }


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

  for (let i = 0; i < contents.length; i++) {
     
    let contHeight  = contents[i].offsetHeight;  // Content height
    let contChild   = contents[i].children; // Content paragraph child
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
          let contAtr = getComputedStyle(contents[i]).height; // Check height from style
           
          if ((contHeight+'px') == contAtr) {
            let log = contents[i].style.height = paragSum+"px";
            
          } else if ((contHeight+'px') < contAtr) {
            let log2 = contents[i].style.height = contHeight+"px";
          }
        }
      } else if (paragSum <= contHeight && i == k){
        moreBts[k].style.display = "none";
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



  
}