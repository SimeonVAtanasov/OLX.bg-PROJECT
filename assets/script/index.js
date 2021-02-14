(() => {
  window.addEventListener("DOMContentLoaded", onHashChange);
  window.addEventListener("hashchange", onHashChange);

  const adsManager = new AdvertisementManager();

  // This code ads the test data
  arrOfAds.forEach(el => {
    let notice = new Advertisement(el.id, "Продавам", el.category, el.description, el.price, el.photo, el.city, el.fullName, el.email, el.promo, el.telNumber)

    adsManager.allAds.push(notice)
  });

  adsManager.promoAds = adsManager.allAds.filter(el => el.promo)

  // -------

  function onHashChange() {
    const indexPage = getById("indexPage");
    const adsContainer = getById("noticeContainer");
    const errorPage = getById("errorPage");

    let page = location.hash.slice(1);

    switch (page) {
      case "":
      case "index":
        indexPage.style.display = "block";
        adsContainer.style.display = "none";
        errorPage.style.display = "none";
        break;

      case "advertisments":
        indexPage.style.display = "none";
        adsContainer.style.display = "block";
        errorPage.style.display = "none";
        break;

      default:
        indexPage.style.display = "none";
        adsContainer.style.display = "none";
        errorPage.style.display = "block";
    }
  }

  function printCategories(categories) {
    let categoriesContainer = getById("categoriesContainer");

    for (let i = 0; i < categories.length; i++) {
      let currentCategory = categories[i];
      let categoryCard = createElement("div");

      categoryCard.className = "category-card";

      let imageContainer = createElement("div");

      imageContainer.style.backgroundColor =
        currentCategory["background-color"];
      imageContainer.className = "image-container";

      let categoryImage = createElement("img");

      categoryImage.src = currentCategory.image;

      let description = createElement("p", currentCategory.title);

      description.className = "title";
      imageContainer.append(categoryImage);
      categoryCard.append(imageContainer, description);
      categoriesContainer.append(categoryCard);

      categoryCard.addEventListener("click", function () {
        location.hash = "#advertisments";
        // TO DO Use functions to filter and print in the container
      });
    }
  }

  printCategories(categories);

  (function printPromoAds() {
    const promoContainer = getById("promoAdsContainer");

    promoContainer.innerHTML = "";

    const nameOfSection = createElement("h1",  'Промо Обяви')
    nameOfSection.id="nameOfSection"
    const listOfAds = createElement("ul");
    listOfAds.id = "noticeCardHolder"

    for (let i = 0; i < 16; i++) {
      const currentNotice = adsManager.promoAds[i];
      let noticeCard = createElement("li")
      let imgContainer = createElement('div');
      imgContainer.className = "img-container";
      let anchor = createElement('a');
      anchor.href = "";// TO DO!  Update the router function and make a new place to  show individual ad in the html  file
      let img = createElement("img");
      img.src = currentNotice.photo;
      img.className = 'notice-img';

      anchor.append(img);
      imgContainer.append(anchor);

      let secondDiv = createElement("div")
      let title = createElement("h4", currentNotice.title);
      let place = createElement("span", 'гр. ' + currentNotice.city);

      secondDiv.append(title, place);

      let priceHolder = createElement("div", currentNotice.price + ' лв.');
      let watchButton = createElement("button", '<i class="far fa-heart"></i>')

      priceHolder.append(watchButton);

      let popUpDiv = createElement('div', '<span>Наблюдавай</span> <i class="far fa-comment-alt"></i');

      noticeCard.append(imgContainer, secondDiv, priceHolder, popUpDiv)

      listOfAds.append(noticeCard)
    }
    promoContainer.append(nameOfSection,listOfAds);
  }());


  let googlePlay = getById("googlePlay");
  let appStore = getById("appStore");
  let appGalerry = getById("appGalerry");
  let downloadText = getById("downloadText");
  let downloadFrom = getById("downloadFromText");

  const boxesToChangeText = [googlePlay, appStore, appGalerry]

  boxesToChangeText.forEach(element => {
    element.addEventListener("mouseover", changeText)
    element.addEventListener("mouseout", changeText);
  });


  function checkTarget(ev) {
    if (ev.target === googlePlay) {
      downloadFrom.innerHTML = "Google Play";
    }
    if (ev.target === appStore) {
      downloadFrom.innerHTML = "AppStore";
    }
    if (ev.target === appGalerry) {
      downloadFrom.innerHTML = "AppGalerry";
    }
  }

  function changeText(ev) {
    if (ev.type === "mouseover") {
      downloadText.innerHTML = "Свали от";
      checkTarget(ev);
    }

    if (ev.type === "mouseout") {
      downloadText.innerHTML = "Свали приложението на OLX за твоя телефон!";
      downloadFrom.innerHTML = "";
    }
  }
})();
