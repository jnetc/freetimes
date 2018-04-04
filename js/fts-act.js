window.onload = () => {

  let patyAdd   = document.querySelectorAll('.paty-add'),
      plusBts   = document.querySelectorAll('.plus-bt'),
      moreBts    = document.querySelectorAll('.more-bt'),
      contents  = document.querySelectorAll('.paty-text'),
      eventBox  = document.querySelectorAll('.next-box'),
      numAdd    = 1,
      numBtn    = 1;

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
    btn.onclick = () => {
      btn.classList.toggle('pressed-plus');
      let btnId = btn.getAttribute('data-id');
      
      // loop for blocks
      let arrayAdd = []; // create empty array
      
      for (let i = 0; i < patyAdd.length; i++) {    
        let addId = patyAdd[i].getAttribute('id'); // getting attributes
        arrayAdd.push(addId); // puting in array

        // Check for validate
        if (btnId == arrayAdd[i]) {
          // console.log('done');
          patyAdd[i].classList.toggle('action');  
        }
      }    
    }
  }

    // Loop for button "more info"
  for (let i = 0; i < contents.length; i++) {
     
    let contHeight  = contents[i].offsetHeight;  // Content height
    let contChild   = contents[i].childNodes; // Content paragraph child

      // Divide height paragraphs
    paragArr = [];
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
    eventBox[q].onclick = () => {
      eventBox[q].classList.toggle('show-info');
    }
    eventBox[q].onmouseleave = () => {
      eventBox[q].classList.remove('show-info');
    }
  }  
}




