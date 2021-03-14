function onHashChange() {
  let page = location.hash.slice(1);

  switch (page) {
    case "":
    case "index":

      indexPage.style.display = "block";
      searchForm.style.display = "block";
      adsContainer.style.display = "none";
      errorPage.style.display = "none";
      profilePage.style.display = "none";
      singleNoticeContainer.style.display = "none";
      addAdvertisementPage.style.display = "none";
      myAdsPage.style.display = "none";
      break;

    case "advertisements":
      indexPage.style.display = "none";
      searchForm.style.display = "block";
      adsContainer.style.display = "block";
      errorPage.style.display = "none";
      profilePage.style.display = "none";
      singleNoticeContainer.style.display = "none";
      addAdvertisementPage.style.display = "none";
      myAdsPage.style.display = "none";
      break;

    case "offer":
      indexPage.style.display = "none";
      searchForm.style.display = "none";
      adsContainer.style.display = "none";
      errorPage.style.display = "none";
      profilePage.style.display = "none";
      singleNoticeContainer.style.display = "block";
      addAdvertisementPage.style.display = "none";
      myAdsPage.style.display = "none";
      break;

    case "profilePage":
      indexPage.style.display = "none";
      searchForm.style.display = "none";
      adsContainer.style.display = "none";
      errorPage.style.display = "none";
      profilePage.style.display = "flex";
      singleNoticeContainer.style.display = "none";
      addAdvertisementPage.style.display = "none";
      myAdsPage.style.display = "none";
      break;

    case "addAdvertisementPage":
      indexPage.style.display = "none";
      searchForm.style.display = "none";
      adsContainer.style.display = "none";
      errorPage.style.display = "none";
      profilePage.style.display = "none";
      singleNoticeContainer.style.display = "none";
      addAdvertisementPage.style.display = "block";
      myAdsPage.style.display = "none";
      break;

    case "myAds":
      indexPage.style.display = "none";
      searchForm.style.display = "none";
      adsContainer.style.display = "none";
      errorPage.style.display = "none";
      profilePage.style.display = "none";
      singleNoticeContainer.style.display = "none";
      addAdvertisementPage.style.display = "none";
      showAdds(userManager.currentUser["addedAds"], getById("myAdsContainer"));
      myAdsPage.style.display = "block";

      break;

    default:
      indexPage.style.display = "none";
      adsContainer.style.display = "none";
      searchForm.style.display = "none";
      addAdvertisementPage.style.display = "none";
      profilePage.style.display = "none";
      singleNoticeContainer.style.display = "none";
      myAdsPage.style.display = "none";
      errorPage.style.display = "block";
  }
}

let categoriesContainer = getById("categoriesContainer");
let categoriesFormContainer = getById("addCategories");

function printCategories(categories, container) {
  for (let i = 0; i < categories.length; i++) {
    let currentCategory = categories[i];
    let categoryCard = createElement("div");

    categoryCard.className = "category-card";

    let imageContainer = createElement("div");

    imageContainer.style.backgroundColor = currentCategory["background-color"];
    imageContainer.className = "image-container";

    let categoryImage = createElement("img");

    categoryImage.src = currentCategory.image;
    categoryImage.alt = currentCategory.title;

    let description = createElement("p", currentCategory.title);

    description.className = "title";
    imageContainer.append(categoryImage);
    categoryCard.append(imageContainer, description);

    if (container === getById("addCategories") && i <= 11) {
      container.append(categoryCard);
    } else if (container == categoriesContainer) {
      container.append(categoryCard);
    } else {
      continue;
    }

    let chosenCategoryContainer = getById("chosenCategoryContainer");
    if (container === getById("addCategories")) {
      categoryCard.addEventListener("click", function () {
        chosenCategoryContainer.innerHTML = "";

        let imgContainer = createElement("div");
        imgContainer.style.backgroundColor =
          currentCategory["background-color"];
        imgContainer.className = "image-container";

        let img = createElement("img");
        img.src = currentCategory.image;
        img.alt = currentCategory.title;

        let categoryTitle = createElement("p", currentCategory.title);

        imgContainer.append(img);
        chosenCategoryContainer.append(imgContainer, categoryTitle);
        getById("categoryBox").style.backgroundColor =
          currentCategory["background-color"];
        getById("selectCategory").style.display = "none";
      });
    }

    if (container === categoriesContainer) {
      categoryCard.addEventListener("click", function () {
        
        showAdds(
          adsManager.filterBy("category", currentCategory.title),
          noticeContainer
        );
        location.hash = "#advertisements";
      });
    }
  }
}

printCategories(categories, categoriesContainer);
printCategories(categories, categoriesFormContainer);

function printPromoAds(arr, container, n = arr.length) {
  if (arr.length === 0) {
    arr = adsManager.allAds;
    n = arr.length;
  }
  container.innerHTML = "";

  const listOfAds = createElement("ul");
  listOfAds.id = "noticeCardHolder";

  for (let i = 0; i < n; i++) {
    const currentNotice = arr[i];
    let noticeCard = createElement("li");
    noticeCard.className = "offer-box";
    let imgContainer = createElement("div");
    imgContainer.className = "img-container";
    let anchor = createElement("a");
    anchor.href = "#offer";
    anchor.addEventListener("click", function () {
      printNotice(currentNotice);
    });
    let img = createElement("img");
    img.src = currentNotice.photo;
    img.alt = currentNotice.title;
    img.className = "notice-img";

    anchor.append(img);
    imgContainer.append(anchor);

    let descriptionContainer = createElement("div");
    descriptionContainer.className = "ad-description";
    let title = createElement("h4", currentNotice.title);
    descriptionContainer.append(title);

    let placeContainer = createElement("div");
    placeContainer.className = "city";
    let place = createElement("span", "гр. " + currentNotice.city);
    placeContainer.append(place);

    let priceContainer = createElement("div");
    priceContainer.className = "price-watch";
    let priceHolder = createElement("div", currentNotice.price + " лв.");
    priceHolder.className = "price-holder";
    let watchButton = createElement(
      "div",
      '<i class="far fa-heart watched"></i>'
    );
    watchButton.className = "watch-button";

    let pop = createElement("div", "<p>Наблюдавай</p>");

    pop.classList.add("pop-up-div", "message");

    let isAlreadyLiked = userManager.isInLiked(currentNotice.id);
    //
    if (isAlreadyLiked) {
      pop.innerHTML = "<p>Премахни от наблюдавани</p>";
      watchButton.innerHTML = "<i class='fas fa-heart'></i>";
      watchButton.addEventListener("click", function () {
        userManager.removeFromLiked(currentNotice);
        countLikeAds();
        printPromoAds(arr, container, n);
        userManager.setUsers();
      });
    } else {
      pop.innerHTML = "<p>Наблюдавай </p>";
      watchButton.addEventListener("click", function () {
        userManager.likeAd(currentNotice);
        countLikeAds();
        printPromoAds(arr, container, n);
        userManager.setUsers();
      });
    }

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
  container.append(listOfAds);
}

function showAdds(arr, container) {
  if (arr.length === 0) {
    arr = adsManager.allAds;
  }
  if (arr.length > 0) {
    const source = document.getElementById("noticeTemplate").innerHTML;
    const template = Handlebars.compile(source);
    const html = template(arr);

    container.innerHTML = html;

    let btns = Array.from(document.getElementsByName("likebtn"));
    btns.forEach((el) =>
      el.addEventListener("click", function (ev) {
        let idNum = ev.target.id;

        if (userManager.isInLiked(idNum)) {
          let icon = getById(`${idNum}`);
          icon.className = "far fa-heart watched";

          let popDiv = document.getElementById(`p${idNum}`);
          popDiv.innerText = "Наблюдавай";

          let toRemove = userManager.currentUser.likedAds.filter(
            (el) => el.id == idNum
          );
          userManager.removeFromLiked(toRemove[0]);

          countLikeAds();
          userManager.setUsers();
        } else {
          let icon = getById(`${idNum}`);
          icon.className = "fas fa-heart";
          let popDiv = document.getElementById(`p${idNum}`);
          popDiv.innerText = "Премахни от наблюдавани";
          let addToLike = adsManager.allAds.filter((el) => el.id == idNum);

          userManager.likeAd(addToLike[0]);

          countLikeAds();
          userManager.setUsers();
        }
      })
    );
  } else {
    container.innerHTML = "Няма намерени обяви";
  }
}

function changeProfileFunctions(email) {
  if (!userManager.currentUser["email"]) {
    profileMenu.href = "#profilePage";
    profileMenu.style.display = "none";
    dropdownArrow.classList = "";
  } else {
    //change href when there is a page for my ads
    profileMenu.href = "#myAds";
    profileUsername.innerText = email;
    dropdownArrow.classList.add("fas", "fa-chevron-down");

    profileMenu.addEventListener("mouseover", showProfileMenu);
    profileDropdown.addEventListener("mouseleave", hideProfileMenu);
  }
}

function showProfileMenu(e) {
  profileDropdown.style.display = "block";
}

function hideProfileMenu(e) {
  if (
    e.target === getById("userCard") ||
    e.target === getById("text1") ||
    e.target === getById("text2") ||
    e.target === getById("userImage") ||
    e.target === getById("userName")
  ) {
    return;
  }
  setTimeout(() => {
    profileDropdown.style.display = "none";
  }, 1000);
}

function printFileUploads() {
  let uploadImagesContainer = getById("uploadImages");

  for (let i = 0; i < 11; i++) {
    let liImage = createElement("li");
    liImage.className = "add-file";

    let inputFile = createElement("input");
    inputFile.type = "file";
    inputFile.className = "file-input";

    let imageIcon = createElement("i");
    imageIcon.classList.add("fas");
    imageIcon.classList.add("fa-camera");

    liImage.append(inputFile, imageIcon);
    uploadImagesContainer.append(liImage);
  }
}

printFileUploads();

function printNotice(notice) {
  noticeWrapper.innerHTML = "";
  noticeUserInformation.innerHTML = "";
  let breadcrumb = createElement("div");
  breadcrumb.className = "breadcrumbContainer";
  let ul = createElement("ul");
  ul.className = "breadcrumb";
  let listHome = createElement("li");
  listHome.className = "breadcrumb-item";
  let linkHome = createElement("a");
  linkHome.href = "#index";
  linkHome.innerText = "Заглавна страница";
  let listCity = createElement("li");
  listCity.className = "breadcrumb-item";
  let linkCity = createElement("a");
  linkCity.href = "#advertisements";
  linkCity.innerText = "Обяви в град " + notice.city;
  linkCity.addEventListener("click", function () {
    showAdds(adsManager.filterBy("city", notice.title), noticeContainer);
  });
  let listCategory = createElement("li");
  listCategory.className = "breadcrumb-item";
  let linkCategory = createElement("a");
  linkCategory.href = "#advertisements";
  linkCategory.innerText = "Обяви в категория " + notice.category;
  linkCategory.addEventListener("click", function () {
    showAdds(adsManager.filterBy("category", notice.title), noticeContainer);
  });

  listCategory.append(linkCategory);
  listCity.append(linkCity);
  listHome.append(linkHome);
  ul.append(listHome, listCity, listCategory);
  breadcrumb.append(ul);

  let noticeContainer = createElement("div");
  noticeContainer.className = "notice-wrapper";
  let imageContainer = createElement("div");
  let image = createElement("img");
  image.src = notice.photo;
  image.alt = notice.title;
  imageContainer.append(image);

  noticeContainer.append(imageContainer);

  let informationContainer = createElement("div");
  informationContainer.className = "information-wrapper";

  let titleContainer = createElement("div");
  let title = createElement("p", notice.title);
  title.className = "notice-titl";
  let priceContainer = createElement("div");
  let price = createElement("h1", notice.price + " лв");
  price.className = "notice-price";
  let promoContainer = createElement("div");
  promoContainer.className = "promWrapp";
  let promoLabel = createElement(
    "div",
    '<i class="far fa-bookmark"></i> <span> Промотирай </span>'
  );

  let refresh = createElement(
    "div",
    '<i class="fas fa-redo"></i> <span>Обнови</span>'
  );

  let labelsContainer = createElement("div");
  labelsContainer.className = "labels-cont";
  let label1 = createElement("span", "Бизнес");
  let label2 = createElement("span", "Доставката се поема от: купувача");
  let label3 = createElement("span", "Състояние: ново");

  let descriptionContainer = createElement("div");
  descriptionContainer.className = "description-cont";
  let descriptionHeader = createElement("h1", "Описание");
  let description = createElement("div", `<p> ${notice.description} </p>`);

  let userContainer = createElement("div");
  userContainer.className = "notice-user";
  let userHeader = createElement("div", "<p> Потребител </p>");
  let userInfo = createElement("div");
  userInfo.className = "notice-user-info";
  let userImg = createElement("img");
  userImg.src = "./images/user.png";
  userImg.alt = "user avatar";
  let userName = createElement("p", notice.fullName);

  let btnContainer = createElement("div");
  btnContainer.className = "notice-user-btns";
  let btnCall = createElement("button", "Обади се");
  btnCall.className = "notice-user-btn";
  let btnMessage = createElement("button", "Съобщение");

  let locationContainer = createElement("div");
  locationContainer.className = "notice-user";
  let locationHeader = createElement("div", "<p>Локация</p>");
  let locationInfo = createElement("div");
  locationInfo.className = "notice-user-info";
  let location = createElement("div", `<i class="fas fa-map-marker-alt"></i> <p>${notice.city}</p>`);
  location.className = "notice-location";
  let map = createElement("div", '<div class="mapouter"><div class="gmap_canvas"><iframe width="210" height="125" id="gmap_canvas" src="https://maps.google.com/maps?q=sofia%20center&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://soap2day-to.com">soap2day</a><br><style>.mapouter{position:relative;text-align:right;height:125px;width:210px;}</style><a href="https://www.embedgooglemap.net">google map html generator</a><style>.gmap_canvas {overflow:hidden;background:none!important;height:125px;width:210px;}</style></div></div>');


  let infoBottomContainer = createElement("div", "<hr></hr>");
  infoBottomContainer.style.width = "100%";
  let additionalInfo = createElement("div", `<p>Преглеждания: </p> <p> ID: ${notice.id} </p>`);
  additionalInfo.className = "additional-info";

  infoBottomContainer.append(additionalInfo);

  btnContainer.append(btnCall, btnMessage);
  userInfo.append(userImg, userName);
  userContainer.append(userHeader, userInfo, btnContainer);
  descriptionContainer.append(descriptionHeader, description);
  labelsContainer.append(label1, label2, label3);
  titleContainer.append(title);
  priceContainer.append(price);
  promoContainer.append(promoLabel, refresh);

  locationInfo.append(location, map);
  locationContainer.append(locationHeader, locationInfo);

  informationContainer.append(
    titleContainer,
    priceContainer,
    promoContainer,
    labelsContainer,
    descriptionContainer,
    infoBottomContainer
  );
  noticeWrapper.append(breadcrumb, noticeContainer, informationContainer);
  noticeUserInformation.append(userContainer, locationContainer);
  addToCarousell();

}
