window.addEventListener("DOMContentLoaded", onHashChange);
window.addEventListener("hashchange", onHashChange);
window.addEventListener("click", hideProfileMenu);




const adsManager = new AdvertisementManager();
const noticeContainer = getById("noticeContainer");
const loginBtn = getById("navLoginBtn");
const registrationBtn = getById("navRegistrationBtn");
// SearchBar elements
const searchContainer = getById("searchContainer")
const searchBar = getById("searchInput");
const citySearch = getById("citySearch");
const searchButton = getById("submitSearch");

//Profile Menu elements
let profileMenu = getById("profileMenu")
let profileDropdown = getById("profileDropdown");
let dropdownArrow = getById("arrow");
let profileUsername = getById("userName");

// This code ads the test data
arrOfAds.forEach((el) => {
  adsManager.addAdvertisement(el);
});

adsManager.promoAds = adsManager.allAds.filter((el) => el.promo);

// -------
const loginForm = getById("loginForm");
const registrationForm = getById("registrationForm");

printPromoAds();

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

function countLikeAds() {
  let counterLikes = getById("likeCounter");
  let counter = userManager.currentUser.likedAds.length;
  if (counter >= 1) {
    counterLikes.style.display = "inline-flex";
    counterLikes.innerHTML = counter;
  } else {
    counterLikes.style.display = "none";
  }
}



loginBtn.addEventListener("click", function (ev) {
  ev.preventDefault();
  loginForm.style.display = "flex";
  registrationForm.style.display = "none";
  registrationBtn.style.fontWeight = "normal";
  loginBtn.style.fontWeight = "bold";
});

registrationBtn.addEventListener("click", function (ev) {
  ev.preventDefault();
  loginForm.style.display = "none";
  registrationForm.style.display = "flex";
  loginBtn.style.fontWeight = "normal";
  registrationBtn.style.fontWeight = "bold";
});

searchContainer.addEventListener("input", function () {
  let inputValue = searchBar.value.toLowerCase().trim();
  let citySearched = citySearch.value.toLowerCase().trim();

  if (inputValue && citySearched) {

    adsManager.filterBy("title", inputValue);
    adsManager.filterBy("city", citySearched);

    showAdds(adsManager.filteredAds, noticeContainer);

  } else if (inputValue) {

    adsManager.filterBy("title", inputValue);
    showAdds(adsManager.filteredAds, noticeContainer);

  }
  else if(citySearched){
    adsManager.filterBy("city", citySearched);
    showAdds(adsManager.filteredAds, noticeContainer)
  }
   else { showAdds(adsManager.allAds, noticeContainer) }
});

citySearch.addEventListener("keyup", filterCities)

searchButton.addEventListener("click", function(ev){
  ev.preventDefault();
  location.hash = "advertisements";
})

showAdds(adsManager.allAds, noticeContainer);

let emailRegisterInput = getById("registerEmail");
let passwordRegisterInput = getById("registerPassword");
let emailLoginInput = getById("logEmail");
let passwordLoginInput = getById("loginPassword");

let emailRegMessage = getById("emailRegError");
let passwordRegMessage = getById("passwordRegError");

let emailLogMessage = getById("emailLogError");
let passwordLogMessage = getById("passwordLogError");

emailLoginInput.addEventListener("input", function () {
  validateEmail(emailLoginInput, emailLogMessage);
});

emailRegisterInput.addEventListener("input", function () {
  validateEmail(emailRegisterInput, emailRegMessage);
});

passwordRegisterInput.addEventListener("input", validatePassword);

function validateEmail(email, message) {
  let emailCheck = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email.value === "") {
    message.innerHTML = "Полето е задължително!";
    email.classList.add("active");
    return false;
  } else if (emailCheck.test(email.value)) {
    message.innerHTML = "";
    email.classList.remove("active");
    return true;
  } else {
    message.innerHTML = "Невалиден имейл адрес";
    email.classList.add("active");
    return false;
  }
}

function validatePassword() {
  let passwordCheck = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (passwordRegisterInput.value === "") {
    passwordRegMessage.innerHTML = "Полето е задължително!";
    passwordRegisterInput.classList.add("active");
    return false;
  } else if (passwordCheck.test(passwordRegisterInput.value)) {
    passwordRegMessage.innerHTML = "";
    passwordRegisterInput.classList.remove("active");
    return true;
  } else {
    passwordRegMessage.innerHTML =
      "Паролата трябва да е от поне 8 символа и да съдържа буква и цифра";
    passwordRegisterInput.classList.add("active");
    return false;
  }
}

function validateUser() {
  if (emailLoginInput.value === "" || passwordLoginInput.value === "") {
    validateEmail(emailLoginInput, emailLogMessage);
  } else if (
    !userManager.isRegistered(emailRegisterInput, passwordRegisterInput)
  ) {
    getById("invalidMessage").style.display = "block";
  }
}

