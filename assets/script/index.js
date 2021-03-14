window.addEventListener("hashchange", onHashChange);

// This code ads the test data
arrOfAds.forEach((el) => {
  adsManager.addAdvertisement(el);
});

adsManager.promoAds = adsManager.allAds.filter((el) => el.promo);

// -------

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


showAdds(adsManager.allAds, noticeContainer);

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

inputsToFocus.forEach((element) => {
  element.addEventListener("focus", showMessage);
  element.addEventListener("focusout", hideMessage);
});


function showMessage(e) {
  let target = e.target;

  if (target === adTitleInput) {
    showElement(suggestMessageTitle);
  } else if (e.target === adDescriptionInput) {
    showElement(suggestMessageDescription);
  } else if (e.target === adCityInput) {
    showElement(suggestMessageDescription);
  } else {
    showElement(suggestMessageNumber);
  }
}

function hideMessage(e) {
  let target = e.target;

  if (target === adTitleInput) {
    hideElement(suggestMessageTitle);
  } else if (e.target === adDescriptionInput) {
    hideElement(suggestMessageDescription);
  } else if (e.target === adCityInput) {
    hideElement(suggestMessageCity);

  } else {
    hideElement(suggestMessageNumber);

  }
}


function previewFile() {
  const file = document.querySelector("input[type=file]").files[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    function () {
      // convert image file to base64 string
      addNewAd(reader.result)
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}



