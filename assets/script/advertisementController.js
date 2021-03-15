adTitleInput.addEventListener("input", function () {
    let length = adTitleInput.value.length;
    getById("titleSymbols").innerText = 70 - length;
  });


  adDescriptionInput.addEventListener("input", function () {
    let length = adDescriptionInput.value.length;
    getById("descriptionSymbols").innerText = 9000 - length;
  });

  categoryBtn.addEventListener("click", function (ev) {
    ev.preventDefault();
    getById("selectCategory").style.display = "block";
  });

  getById("closeCategoryForm").addEventListener("click", function (e) {
    getById("selectCategory").style.display = "none";
  });

  function addNewAd(photo) {
  
    let adId = `ad${Math.floor(Math.random() * 5640)}`;
    let adTitle = getById("adTitle").value;
    let name = getById("nameContact").value;
    let email = userManager.currentUser.email;
    let adPrice = getById("adPrice").value;
    let adCity = getById("contactsCity").value;
    let adPhoto = photo;
  
    let adPromo = false;
    let telNumber = getById("contactsNumber").value;
    let adCategory = getById("chosenCategoryContainer").lastChild.innerText;
    let adDescription = getById("adDescription").value;
  
    let advertisement = new Advertisement(
      adId,
      adTitle,
      adCategory,
      adDescription,
      adPrice,
      adPhoto,
      adCity,
      name,
      email,
      adPromo,
      telNumber
    );
  

    userManager.addAd(advertisement);
    adsManager.addAdvertisement(advertisement);
    userManager.setUsers();
    showAdds(userManager.currentUser.addedAds, getById("myAdsContainer"));
  }
  

getById("addAdvertisementButton").addEventListener("click", previewFile);

arrOfAds.forEach((el) => {
  adsManager.addAdvertisement(el);
});

adsManager.promoAds = adsManager.allAds.filter((el) => el.promo);

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



