(() => {
  window.addEventListener("DOMContentLoaded", onHashChange);
  window.addEventListener("hashchange", onHashChange);

  const adsManager = new AdvertisementManager();

  // This code ads the test data
  arrOfAds.forEach((el) => {
    let notice = new Advertisement(
      el.id,
      el.title,
      el.category,
      el.description,
      el.price,
      el.photo,
      el.city,
      el.fullName,
      el.email,
      el.promo,
      el.telNumber
    );

    adsManager.allAds.push(notice);
  });

  adsManager.promoAds = adsManager.allAds.filter((el) => el.promo);

  // -------

  function onHashChange() {
    const indexPage = getById("indexPage");
    const adsContainer = getById("noticeContainer");
    const errorPage = getById("errorPage");
    const singleNoticeContainer = getById("singleNoticeContainer");
    const searchForm = getById("searchForm");

    let page = location.hash.slice(1);

    switch (page) {
      case "":
      case "index":
        indexPage.style.display = "block";
        searchForm.style.display = "block";
        adsContainer.style.display = "none";
        errorPage.style.display = "none";
        singleNoticeContainer.style.display = "none";
        break;

      case "advertisments":
        indexPage.style.display = "none";
        searchForm.style.display = "block";
        adsContainer.style.display = "block";
        errorPage.style.display = "none";
        singleNoticeContainer.style.display = "none";
        break;

      case "offer":
        indexPage.style.display = "none";
        searchForm.style.display = "none";
        adsContainer.style.display = "none";
        errorPage.style.display = "none";
        singleNoticeContainer.style.display = "block";
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

    const nameOfSection = createElement("h1", "Промо Обяви");
    nameOfSection.id = "nameOfSection";
    const listOfAds = createElement("ul");
    listOfAds.id = "noticeCardHolder";

    for (let i = 0; i < 16; i++) {
      const currentNotice = adsManager.promoAds[i];
      let noticeCard = createElement("li");
      noticeCard.className = "offer-box";
      let imgContainer = createElement("div");
      imgContainer.className = "img-container";
      let anchor = createElement("a");
      anchor.href = "#offer"; // TO DO!  Update the router function and make a new place to  show individual ad in the html  file
      let img = createElement("img");
      img.src = currentNotice.photo;
      img.className = "notice-img";
      img.style.width = "100%";
      img.style.height = "165px";

      anchor.append(img);
      imgContainer.append(anchor);

      let descriptionContainer = createElement("div");
      descriptionContainer.className = "ad-description";
      let title = createElement("h4", currentNotice.title);
      descriptionContainer.append(title);

      let placeContainer = createElement("div");
      placeContainer.className = "ad-place";
      let place = createElement("span", "гр. " + currentNotice.city);
      placeContainer.append(place);

      let priceContainer = createElement("div");
      priceContainer.className = "price-watch";
      let priceHolder = createElement("div", currentNotice.price + " лв.");
      priceHolder.className = "price-holder";
      let watchButton = createElement("div", '<i class="far fa-heart"></i>');
      watchButton.className = "watch-button";

      let pop = createElement("div", "<p>Наблюдавай</p>");
      pop.classList.add("pop-up-div", "message");

      watchButton.append(pop);
      priceContainer.append(priceHolder, watchButton);
      noticeCard.append(
        imgContainer,
        descriptionContainer,
        placeContainer,
        priceContainer
      );

      listOfAds.append(noticeCard);
    }
    promoContainer.append(nameOfSection, listOfAds);
  })();

  let googlePlay = getById("googlePlay");
  let appStore = getById("appStore");
  let appGalerry = getById("appGalerry");
  let downloadText = getById("downloadText");
  let downloadFrom = getById("downloadFromText");

  const boxesToChangeText = [googlePlay, appStore, appGalerry];

  boxesToChangeText.forEach((element) => {
    element.addEventListener("mouseover", changeText);
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

  const searchMenu = getById("searchInput");
})();
