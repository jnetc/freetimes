window.onload = function () {

  let moreBtn = document.querySelector('.btn-more');
  let partyInfo = document.querySelector('.info');
  // let winTop = document.body.offsetTop; // Начальная позиция тела
  let winTop = window.scrollY; // Начальная позиция тела

  function toTop() {
    // Scroll the element into the visible area of the browser window
    // true = top, false = bottom
    partyInfo.scrollIntoView(true);
  }

  window.onscroll = function () {
    let winTop = window.scrollY; // Начальная позиция тела
    let z = partyInfo.offsetTop - window.scrollY;
    // console.log(winTop);
  };


  // Скролить элемент к верху при нажатии
  function showTxt() {
    let iInterval = null; // Обнуляем
    let elTop = partyInfo.offsetParent.offsetTop; // Смещение эл. от верха
    let elHeight = partyInfo.offsetTop;
    let elScroll = elTop + elHeight;
    let i = 0; // Начало
    // console.log(elScroll);
    function incNum() {
      i += 10; // Шаги
      let x = winTop + i; // Прибавляем шаги от верха
      // console.log(x);
      if (x > elScroll) {
        clearInterval(iInterval); // Прерываем счетчик

      }
      scrollTo(0, x); // Скролим в заданное положение
    };
    iInterval = setInterval(incNum, 4); // Задаем интервал между шагами
    return false;
  }

  // Кнопка для мероприятий
  moreBtn.onclick = function () {
    partyInfo.classList.toggle('slide');
    this.classList.toggle('pressed');
    // Замена текста в кнопке
    if (this.classList.contains('pressed')) {
      this.innerHTML = "Свернуть";
      toTop();
    } else {
      this.innerHTML = "Узнать больше";
      toTop();
      // showTxt();
    }
  };
}
