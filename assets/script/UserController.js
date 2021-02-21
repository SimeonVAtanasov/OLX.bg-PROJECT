



    const emailInputLogin = getById("logEmail");
    const passwordInputLogin = getById("loginPassword");
    const emailInputRegister = getById("registerEmail");
    const passwordInputRegister = getById("registerPassword");

    let loginButton = getById("loginButton");
    let registerBtn = getById("registerButton");

    

    loginButton.addEventListener("click", function (ev) {
        ev.preventDefault();
        const username = emailInputLogin.value;
        const password = passwordInputLogin.value;

       
        
        if (userManager.login(username, password)) {
           
         console.log("SIMO E SUPER ZLE I ME NAPRQGA");
          countLikeAds();
          printPromoAds();
          location.hash="index"; 
        }

      });
    
      registerBtn.addEventListener("click", function (ev) {
        ev.preventDefault();
    
        const username = emailInputRegister.value;
        const password = passwordInputRegister.value;
    
        userManager.register(username, password);
      });


