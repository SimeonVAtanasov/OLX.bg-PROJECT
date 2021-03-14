



let loginButton = getById("loginButton");
let registerBtn = getById("registerButton");

window.addEventListener("click", hideProfileMenu);


window.addEventListener("DOMContentLoaded", function () {
  
  if (userManager.checkLoggedUser()) {
    
    changeProfileFunctions(
      userManager.currentUser.email,
      userManager.currentUser.password
      );
    }
    onHashChange();
    countLikeAds();
    
    
    printPromoAds(adsManager.promoAds, promoContainer, 16);
    
    
  console.log(userManager.currentUser);
  console.log(adsManager);
  
});

loginButton.addEventListener("click", function (ev) {
  ev.preventDefault();
  const email = emailLoginInput.value;
  const password = passwordLoginInput.value;
  
  validateUser();
  
  if (userManager.login(email, password)) {
    countLikeAds();
    printPromoAds(adsManager.promoAds, promoContainer,16);
    changeProfileFunctions(email,password);
    getById("emailContact").value = email;
    location.hash = "index";
    
  }
  
  
});

registerBtn.addEventListener("click", function (ev) {
  ev.preventDefault();
  
  const email = emailRegisterInput;
  const password = passwordRegisterInput;
  
  if (!validateEmail(email, emailRegMessage) || !validatePassword()) {
    registrationForm.reset();
    return;
  } else {
    userManager.register(email.value, password.value);
    loginForm.style.display = "flex";
    registrationForm.style.display = "none";
    registrationBtn.style.fontWeight = "normal";
    loginBtn.style.fontWeight = "bold";
    registrationForm.reset();
  }
});


logOut.addEventListener("click", function () {
  userManager.logOut();
  location.reload();
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



emailLoginInput.addEventListener("input", function () {
  validateEmail(emailLoginInput, emailLogMessage);
});

emailRegisterInput.addEventListener("input", function () {
  validateEmail(emailRegisterInput, emailRegMessage);
});

passwordRegisterInput.addEventListener("input", validatePassword);

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
