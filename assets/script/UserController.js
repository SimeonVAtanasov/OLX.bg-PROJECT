onHashChange();

let loginButton = getById("loginButton");
let registerBtn = getById("registerButton");

window.addEventListener("hashchange", onHashChange);
window.addEventListener("click", hideProfileMenu);
window.addEventListener("DOMContentLoaded", function () {
  
  if (userManager.checkLoggedUser()) {
    
    changeProfileFunctions(
      userManager.currentUser.email,
      userManager.currentUser.password
      );
    }
    countLikeAds();
    printPromoAds(adsManager.promoAds, promoContainer, 16);
  
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

loginBtn.addEventListener("click", function (ev) {
  ev.preventDefault();
  loginForm.style.display = "flex";
  registrationForm.style.display = "none";
  loginBtn.style.fontWeight = "bold";
  registrationBtn.style.fontWeight = "normal";
});

registrationBtn.addEventListener("click", function (ev) {
  ev.preventDefault();
  loginForm.style.display = "none";
  registrationForm.style.display = "flex";
  loginBtn.style.fontWeight = "normal";
  registrationBtn.style.fontWeight = "bold";
});

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

citySearch.addEventListener("keyup", filterCities);

searchButton.addEventListener("click", function (ev) {
  ev.preventDefault();
  location.hash = "advertisements";
});

// display preference on notice page

grid.addEventListener("click", () => {
  printPromoAds(adsManager.filteredAds, noticeContainer);
})

bars.addEventListener("click", () => {
  showAdds(adsManager.filteredAds, noticeContainer)
})

// preventing default on forms
let forms = Array.from(document.getElementsByTagName("form"));

forms.forEach(el => {
  el.addEventListener("submit", (e) => { e.preventDefault() })
})

sort.addEventListener("change", (ev) => {

  adsManager.sortByPrice(adsManager.filteredAds, ev.target.value);
  showAdds(adsManager.filteredAds, noticeContainer);

})

let debouncedSort = debounce(function(){
  let from  = getById("fromNum").value;
  let to = getById("toNum").value;

  adsManager.filterByPrice(adsManager.filteredAds, from, to);
  showAdds(adsManager.filteredByPrice, noticeContainer);
}, 500)

getById("fromTo").addEventListener("input", debouncedSort);

categoryFilter.addEventListener("change", ()=>{
  let category = categoryFilter.value

  showAdds(adsManager.filterBy("category",   category),  noticeContainer);
})

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


advertismentBtn.addEventListener("click",  (ev) => {
  ev.preventDefault
  if(userManager.currentUser.email)  {
    window.location.hash = "addAdvertisement"
  }else{
    window.location.hash= "profilePage"
  }
})