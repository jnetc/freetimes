window.onload = function () {

  let moreBtn = document.querySelector('.btn-more');
  let partyInfo = document.querySelector('.party-info');
  let winTop = window.pageYOffset; // Начальная позиция тела
  console.log(winTop);

  window.onscroll = function () {
    let winTop = window.pageYOffset; // Начальная позиция тела
    // console.log(winTop);
  };



  moreBtn.onclick = function () {
    partyInfo.classList.toggle('slide');
    this.classList.toggle('pressed');

    // Скролить элемент к верху при нажатии
    let iInterval = null; // Обнуляем
    let elTop = partyInfo.offsetParent.offsetTop; // Смещение эл. от верха
    let elHeight = partyInfo.offsetTop;
    let elScroll = elTop + elHeight;
    let iNum = 0; // Начало

    // Замена текста в кнопке
    if (this.classList.contains('pressed')) {
      this.innerHTML = "Свернуть";

      function incNum() {
        iNum += 10; // Шаги
        let y = winTop + iNum; // Прибавляем шаги от верха
        console.log(y);
        if (y > elScroll) {
          clearInterval(iInterval); // Прерываем счетчик
          return true;
        }
        scrollTo(0, y); // Скролим в заданное положение
      };
      iInterval = setInterval(incNum, 4); // Задаем интервал между шагами
    } else {
      this.innerHTML = "Узнать больше";
    }


  };





}
