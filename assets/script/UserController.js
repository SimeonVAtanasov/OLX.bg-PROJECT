const emailInputLogin = getById("logEmail");
const passwordInputLogin = getById("loginPassword");
const emailInputRegister = getById("registerEmail");
const passwordInputRegister = getById("registerPassword");



let loginButton = getById("loginButton");
let registerBtn = getById("registerButton");


loginButton.addEventListener("click", function (ev) {
  ev.preventDefault();
  const email = emailInputLogin.value;
  const password = passwordInputLogin.value;

  validateUser();
  
  if (userManager.login(email, password)) {
    countLikeAds();
    printPromoAds(adsManager.promoAds, promoContainer);
    changeProfileFunctions(email,password);
    getById("emailContact").value = email;
    location.hash = "index";

  }

  
});

registerBtn.addEventListener("click", function (ev) {
  ev.preventDefault();

  const email = emailInputRegister;
  const password = passwordInputRegister;

  if (!validateEmail(email, password) || !validatePassword()) {
    registerForm.reset();
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



