function printAdsBars(arr, container) {
    if (arr.length === 0) {
      arr = adsManager.allAds;
    }
    if (arr.length > 0) {
      container.innerHTML = '';
      const source = document.getElementById("noticeTemplate").innerHTML;
      const template = Handlebars.compile(source);
      const html = template(arr);
  
      container.innerHTML = html;
  
      let btns = Array.from(document.getElementsByName("likebtn"));
      btns.forEach((el) =>
        el.addEventListener("click", function (ev) {
          let idNum = ev.target.id;
  
          if (userManager.isInLiked(idNum)) {
            let icon = getById(`${idNum}`);
            icon.className = "far fa-heart watched";
  
            let popDiv = document.getElementById(`p${idNum}`);
            popDiv.innerText = "Наблюдавай";
  
            let toRemove = userManager.currentUser.likedAds.filter(
              (el) => el.id == idNum
            );
            userManager.removeFromLiked(toRemove[0]);
  
            countLikeAds();
            userManager.setUsers();
          } else {
            let icon = getById(`${idNum}`);
            icon.className = "fas fa-heart";
            let popDiv = document.getElementById(`p${idNum}`);
            popDiv.innerText = "Премахни от наблюдавани";
            let addToLike = adsManager.allAds.filter((el) => el.id == idNum);
  
            userManager.likeAd(addToLike[0]);
  
            countLikeAds();
            userManager.setUsers();
          }
        })
      );
  
      let anchors = Array.from(document.getElementsByTagName("a"));
      anchors.forEach(el => {
        el.addEventListener('click', (ev) => {
          if (ev.target.dataset.id) {
            let offerToShow = adsManager.allAds.filter(el => el.id == ev.target.dataset.id);
            printNotice(offerToShow[0])
            userManager.setLastOpenedAd(offerToShow[0])
          }
        })
      })
  
    } else {
      container.innerHTML = "Няма намерени обяви";
    }
  }
  