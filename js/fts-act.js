let patyAdd = document.querySelectorAll('.paty-add');
let patyBtn = document.querySelectorAll('.paty-bt');
let numAdd = 1;
let numBtn = 1;

// Set attributes in animated block
for (let attr of patyAdd) {
  let attrAdd = attr.setAttribute("id", "tag"+numAdd);
  numAdd++;
}
// Set attributes buttons
for (let attr of patyBtn) {
  let attrBtn = attr.setAttribute("data-id", "tag"+numBtn);  
  numBtn++;
}
  
// Loop for buttons
for (const btn of patyBtn) {    
  btn.onclick = () => {
    btn.classList.toggle('pressed');
    let btnId = btn.getAttribute('data-id');
    
    // loop for blocks
    let arrayAdd = []; // create empty array
    
    for (let i = 0; i < patyAdd.length; i++) {    
      let addId = patyAdd[i].getAttribute('id'); // getting attributes
      arrayAdd.push(addId); // puting in array

      // Check for validate
      if (btnId == arrayAdd[i]) {
        console.log('done');
        patyAdd[i].classList.toggle('paty-soc-anim');  
      }
    }    
  }
}
