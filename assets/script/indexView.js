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
      break;

    case "advertisements":
      indexPage.style.display = "none";
      searchForm.style.display = "block";
      adsContainer.style.display = "block";
      errorPage.style.display = "none";
      profilePage.style.display = "none";
      singleNoticeContainer.style.display = "none";
      addAdvertisementPage.style.display = "none";
      break;

    case "offer":
      indexPage.style.display = "none";
      searchForm.style.display = "none";
      adsContainer.style.display = "none";
      errorPage.style.display = "none";
      profilePage.style.display = "none";
      singleNoticeContainer.style.display = "block";
      addAdvertisementPage.style.display = "none";
      break;

    case "profilePage":
      indexPage.style.display = "none";
      searchForm.style.display = "none";
      adsContainer.style.display = "none";
      errorPage.style.display = "none";
      profilePage.style.display = "flex";
      singleNoticeContainer.style.display = "none";
      addAdvertisementPage.style.display = "none";
      break;

    case "addAdvertisementPage":
      indexPage.style.display = "none";
      searchForm.style.display = "none";
      adsContainer.style.display = "none";
      errorPage.style.display = "none";
      profilePage.style.display = "none";
      singleNoticeContainer.style.display = "none";
      addAdvertisementPage.style.display = "block";
      break;

    default:
      indexPage.style.display = "none";
      adsContainer.style.display = "none";
      searchForm.style.display = "none";
      errorPage.style.display = "block";
      addAdvertisementPage.style.display = "none";
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
  
    if(container === getById("addCategories") && i<=11){
      container.append(categoryCard);
    } else if(container == categoriesContainer){
      container.append(categoryCard);
    } else{
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

        let categoryTitle = createElement("p",currentCategory.title);

        imgContainer.append(img);
        chosenCategoryContainer.append(imgContainer, categoryTitle);
        getById("categoryBox").style.backgroundColor = currentCategory["background-color"];
        getById("selectCategory").style.display="none";
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

function printPromoAds(arr, container) {
  container.innerHTML = "";

  const listOfAds = createElement("ul");
  listOfAds.id = "noticeCardHolder";

  for (let i = 0; i < 16; i++) {
    const currentNotice = arr[i];
    let noticeCard = createElement("li");
    noticeCard.className = "offer-box";
    let imgContainer = createElement("div");
    imgContainer.className = "img-container";
    let anchor = createElement("a");
    anchor.href = "#offer";
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

    let isAlreadyLiked = userManager.currentUser.isInLiked(currentNotice.id);
    //
    if (isAlreadyLiked) {
      pop.innerHTML = "<p>Премахни от наблюдавани</p>";
      // pop.style.top = "-70px";
      watchButton.innerHTML = "<i class='fas fa-heart'></i>";
      watchButton.addEventListener("click", function () {
        userManager.currentUser.removeFromLiked(currentNotice);
        countLikeAds();
        printPromoAds(adsManager.promoAds, promoContainer);
        userManager.setUsers();
      });
    } else {
      pop.innerHTML = "<p>Наблюдавай </p>";
      watchButton.addEventListener("click", function () {
        userManager.currentUser.likeAd(currentNotice);
        countLikeAds();
        printPromoAds(adsManager.promoAds, promoContainer);
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
  if (arr.length > 0) {
    const source = document.getElementById("noticeTemplate").innerHTML;
    const template = Handlebars.compile(source);
    const html = template(arr);

    container.innerHTML = html;

    let btns = Array.from(document.getElementsByName("likebtn"));
    btns.forEach((el) =>
      el.addEventListener("click", function (ev) {
        let idNum = ev.target.id;

        if (userManager.currentUser.isInLiked(idNum)) {
          let icon = getById(`${idNum}`);
          icon.className = "far fa-heart watched";

          let popDiv = getById(`p${idNum}`);
          popDiv.innerText = "Наблюдавай";

          let toRemove = userManager.currentUser.likedAds.filter(
            (el) => el.id == idNum
          );
          userManager.currentUser.removeFromLiked(toRemove[0]);

          countLikeAds();
          userManager.setUsers();
        } else {
          let icon = getById(`${idNum}`);
          icon.className = "fas fa-heart";
          console.log(idNum);
          // Is working only when the all ads are displayed, when they are filtered ir does not work
          let popDiv = getById(`#p${idNum})`);
          popDiv.innerText = "Премахни от наблюдавани";
          let addToLike = adsManager.allAds.filter((el) => el.id == idNum);
          userManager.currentUser.likeAd(addToLike[0]);

          countLikeAds();
          userManager.setUsers();
        }
      })
    );
  } else {
    container.innerHTML = "Няма намерени обяви";
  }
}

function changeProfileFunctions(email, password) {
  if (!userManager.login(email, password)) {
    profileMenu.href = "#profilePage";
    profileMenu.style.display = "none";
    dropdownArrow.classList = "";
  } else {
    //change href when there is a page for my ads
    profileMenu.href = "#";
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
