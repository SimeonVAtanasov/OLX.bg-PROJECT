function printAdsGrid(arr, container, n = arr.length) {
    if (arr.length === 0) {
      arr = adsManager.allAds;
      n = arr.length;
    }
    container.innerHTML = "";
  
    const listOfAds = createElement("ul");
    listOfAds.id = "noticeCardHolder";
  
    for (let i = 0; i < n; i++) {
      const currentNotice = arr[i];

      if(currentNotice){

        let noticeCard = createElement("li");
      noticeCard.className = "offer-box";
      let imgContainer = createElement("div");
      imgContainer.className = "img-container";
      let anchor = createElement("a");
      anchor.href = "#offer";
      anchor.addEventListener("click", function () {
        printNotice(currentNotice);
        userManager.setLastOpenedAd(currentNotice)
      });
      let img = createElement("img");
      img.src = currentNotice.photo;
      img.alt = currentNotice.title;
      img.className = "notice-img";
  
      anchor.append(img);
      imgContainer.append(anchor);
  
      let descriptionContainer = createElement("div");
      descriptionContainer.className = "ad-description";
      let title = createElement("h4", currentNotice.title);
      descriptionContainer.append(title);
  
      let placeContainer = createElement("div");
      placeContainer.className = "city";
      let place = createElement("span", "гр. " + currentNotice.city);
      placeContainer.append(place);
  
      let priceContainer = createElement("div");
      priceContainer.className = "price-watch";
      let priceHolder = createElement("div", currentNotice.price + " лв.");
      priceHolder.className = "price-holder";
      let watchButton = createElement(
        "div",
        '<i class="far fa-heart watched"></i>'
      );
      watchButton.className = "watch-button";
  
      let pop = createElement("div", "<p>Наблюдавай</p>");
  
      pop.classList.add("pop-up-div", "message");
  
      let isAlreadyLiked = userManager.isInLiked(currentNotice.id);
      
      if (isAlreadyLiked) {
        pop.innerHTML = "<p>Премахни от наблюдавани</p>";
        watchButton.innerHTML = "<i class='fas fa-heart'></i>";
        watchButton.addEventListener("click", function () {
          userManager.removeFromLiked(currentNotice);
          countLikeAds();
          printAdsGrid(arr, container, n);
          console.log(arr,container,n);
          userManager.setUsers();
        });
      } else {
        pop.innerHTML = "<p>Наблюдавай </p>";
        watchButton.addEventListener("click", function () {
          userManager.likeAd(currentNotice);
          countLikeAds();
          printAdsGrid(arr, container, n);
          userManager.setUsers();
        });
      }
  
      watchButton.append(pop);
      priceContainer.append(priceHolder, watchButton);
      noticeCard.append(
        imgContainer,
        descriptionContainer,
        placeContainer,
        priceContainer
      );
  
      listOfAds.append(noticeCard);
      } else {
        continue;
      }
      
    }
    container.append(listOfAds);
  }