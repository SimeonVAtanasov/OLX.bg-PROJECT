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
   printAdsBars(adsManager.filterBy("city", notice.city), noticeContainer);
  });
  let listCategory = createElement("li");
  listCategory.className = "breadcrumb-item";
  let linkCategory = createElement("a");
  linkCategory.href = "#advertisements";
  linkCategory.innerText = "Обяви в категория " + notice.category;
  linkCategory.addEventListener("click", function () {
    adsManager.filterBy("category", notice.category);
   printAdsBars(adsManager.filteredAds, noticeContainer);
  });

  listCategory.append(linkCategory);
  listCity.append(linkCity);
  listHome.append(linkHome);
  ul.append(listHome, listCity, listCategory);
  breadcrumb.append(ul);

  let offerContainer = createElement("div");
  offerContainer.className = "notice-wrapper";
  let imageContainer = createElement("div");
  let image = createElement("img");
  image.src = notice.photo;
  image.alt = notice.title;
  imageContainer.append(image);

  offerContainer.append(imageContainer);

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
  locationInfo.classList.add("justify-content-between");
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
  
  noticeWrapper.append(breadcrumb, offerContainer, informationContainer);
  noticeUserInformation.append(userContainer, locationContainer);
  addToCarousell();

}