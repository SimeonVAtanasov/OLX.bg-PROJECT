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



function addToCarousell() {
    let carousel1 = getById("carousel1");
    let carousel2 = getById("carousel2");
    let carousel3 = getById("carousel3");
    let promoArr1 = [];
    let promoArr2 = [];
    let promoArr3 = [];
  
    for (let i = 5; i < 10; i++) {
      promoArr1.push(adsManager.promoAds[i]);
    }
  
    for (let i = 10; i < 15; i++) {
      promoArr2.push(adsManager.promoAds[i]);
    }
  
    for (let i = 20; i < 25; i++) {
      promoArr3.push(adsManager.promoAds[i]);
    }
  
    printPromoAds(promoArr1, carousel1, 4);
    printPromoAds(promoArr2, carousel2, 4);
    printPromoAds(promoArr3, carousel3, 4);
  
  }
  
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
