function onHashChange() {
  let page = location.hash.slice(1);

  switch (page) {
    case "":
    case "index":
      indexPage.style.display = "block";
      searchForm.style.display = "block";
      adsContainer.style.display = "none";
      errorPage.style.display = "none";
      profilePage.style.display = "none";
      singleNoticeContainer.style.display = "none";
      addAdvertisementPage.style.display = "none";
      myAdsPage.style.display = "none";

      break;

    case "advertisements":
      indexPage.style.display = "none";
      searchForm.style.display = "block";
      adsContainer.style.display = "block";
      errorPage.style.display = "none";
      profilePage.style.display = "none";
      singleNoticeContainer.style.display = "none";
      addAdvertisementPage.style.display = "none";
      myAdsPage.style.display = "none";
      break;

    case "offer":
      indexPage.style.display = "none";
      searchForm.style.display = "none";
      adsContainer.style.display = "none";
      errorPage.style.display = "none";
      profilePage.style.display = "none";
      singleNoticeContainer.style.display = "block";
      addAdvertisementPage.style.display = "none";
      myAdsPage.style.display = "none";
      break;

    case "profilePage":
      indexPage.style.display = "none";
      searchForm.style.display = "none";
      adsContainer.style.display = "none";
      errorPage.style.display = "none";
      profilePage.style.display = "flex";
      singleNoticeContainer.style.display = "none";
      addAdvertisementPage.style.display = "none";
      myAdsPage.style.display = "none";
      break;

    case "addAdvertisementPage":
      indexPage.style.display = "none";
      searchForm.style.display = "none";
      adsContainer.style.display = "none";
      errorPage.style.display = "none";
      profilePage.style.display = "none";
      singleNoticeContainer.style.display = "none";
      addAdvertisementPage.style.display = "block";
      myAdsPage.style.display = "none";
      break;

    case "myAds":
      indexPage.style.display = "none";
      searchForm.style.display = "none";
      adsContainer.style.display = "none";
      errorPage.style.display = "none";
      profilePage.style.display = "none";
      singleNoticeContainer.style.display = "none";
      addAdvertisementPage.style.display = "none";
      showAdds(userManager.currentUser["addedAds"], getById("myAdsContainer"));
      myAdsPage.style.display = "block";

      break;

    default:
      indexPage.style.display = "none";
      adsContainer.style.display = "none";
      searchForm.style.display = "none";
      addAdvertisementPage.style.display = "none";
      profilePage.style.display = "none";
      singleNoticeContainer.style.display = "none";
      myAdsPage.style.display = "none";
      errorPage.style.display = "block";
  }
}