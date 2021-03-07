window.addEventListener("DOMContentLoaded", function () {
  onHashChange();
  if (userManager.checkLoggedUser()) {
    changeProfileFunctions(
      userManager.currentUser.email,
      userManager.currentUser.password
    );
  }
});
window.addEventListener("hashchange", onHashChange);
window.addEventListener("click", hideProfileMenu);

logOut.addEventListener("click", function () {
  userManager.logOut();
  location.reload();
});

// This code ads the test data
arrOfAds.forEach((el) => {
  adsManager.addAdvertisement(el);
});

adsManager.promoAds = adsManager.allAds.filter((el) => el.promo);

// -------

printPromoAds(adsManager.promoAds, promoContainer);

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
  } else if (citySearched) {
    adsManager.filterBy("city", citySearched);
    showAdds(adsManager.filteredAds, noticeContainer);
  } else {
    showAdds(adsManager.allAds, noticeContainer);
  }
});

citySearch.addEventListener("keyup", filterCities);

searchButton.addEventListener("click", function (ev) {
  ev.preventDefault();
  location.hash = "advertisements";
});

showAdds(adsManager.allAds, noticeContainer);

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

let debouncedMakeNavBarSticky = debounce(makeNavBarSticky, 150);

window.addEventListener("scroll", debouncedMakeNavBarSticky);

let sticky = window.pageYOffset;

function makeNavBarSticky() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
    sticky = window.pageYOffset;
  } else {
    navbar.classList.remove("sticky");
    sticky = window.pageYOffset;
  }
}

inputsToFocus.forEach((element) => {
  element.addEventListener("focus", showMessage);
  element.addEventListener("focusout", hideMessage);
});

function showMessage(e) {
  let target = e.target;
  if (target === adTitleInput) {
    getById("suggestMessageTitle").style.display = "block";
  } else if (e.target === adDescriptionInput) {
    getById("suggestMessageDescription").style.display = "block";
  } else if (e.target === adCityInput) {
    getById("suggestMessageCity").style.display = "block";
  } else {
    getById("suggestMessageNumber").style.display = "block";
  }
}

function hideMessage(e) {
  let target = e.target;
  if (target === adTitleInput) {
    getById("suggestMessageTitle").style.display = "none";
  } else if (e.target === adDescriptionInput) {
    getById("suggestMessageDescription").style.display = "none";
  } else if (e.target === adCityInput) {
    getById("suggestMessageCity").style.display = "none";
  } else {
    getById("suggestMessageNumber").style.display = "none";
  }
}

adTitleInput.addEventListener("input", function () {
  let length = adTitleInput.value.length;
  getById("titleSymbols").innerText = 70 - length;
});

adDescriptionInput.addEventListener("input", function () {
  let length = adDescriptionInput.value.length;
  getById("descriptionSymbols").innerText = 9000 - length;
});

categoryBtn.addEventListener("click", function () {
  getById("selectCategory").style.display = "block";
});

getById("closeCategoryForm").addEventListener("click", function (e) {
  getById("selectCategory").style.display = "none";
});
