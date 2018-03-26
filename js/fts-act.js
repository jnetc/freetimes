let ivAdd = document.querySelectorAll('.iv-add');
let ivBtn = document.querySelectorAll('.iv-bt');
let numAdd = 1;
let numBtn = 1;

// Set attributes in animated block
for (let attr of ivAdd) {
  let attrAdd = attr.setAttribute("id", "tag"+numAdd);
  numAdd++;
}
// Set attributes buttons
for (let attr of ivBtn) {
  let attrBtn = attr.setAttribute("data-id", "tag"+numBtn);  
  numBtn++;
}
  
// Loop for buttons
for (const btn of ivBtn) {    
  btn.onclick = () => {
    btn.classList.toggle('pressed');
    let btnId = btn.getAttribute('data-id');
    
    // loop for blocks
    let arrayAdd = []; // create empty array
    
    for (let i = 0; i < ivAdd.length; i++) {    
      let addId = ivAdd[i].getAttribute('id'); // getting attributes
      arrayAdd.push(addId); // puting in array

      // Check for validate
      if (btnId == arrayAdd[i]) {
        console.log('done');
        ivAdd[i].classList.toggle('iv-soc-anim');  
      }
    }    
  }
}
