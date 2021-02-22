const userManager = (function () {
  class User {
    constructor(username, password, likedAds, favouriteSearches, addedAds) {
      this.username = username;
      this.password = password;

      if (likedAds) {
        this.likedAds = likedAds;
      } else {
        this.likedAds = [];
      }

      if (favouriteSearches) {
        this.favouriteSearches = favouriteSearches;
      } else {
        this.favouriteSearches = [];
      }

      if (addedAds) {
        this.addedAds = addedAds;
      } else {
        this.addedAds = [];
      }
    }

    likeAd(ad) {
      let isAlreadyLiked = false;
      for (let i = 0; i < this.likedAds.length; i++) {
        if (this.likedAds[i].id === ad.id) {
          isAlreadyLiked = true;
          break;
        }
      }
      if (ad instanceof Advertisement && !isAlreadyLiked) {
        this.likedAds.push(ad);
      }
    }

    removeFromLiked(ad) {
      let foundAdIndex;
      for (let i = 0; i < this.likedAds.length; i++) {
        if (this.likedAds[i].title === ad.title) {
          foundAdIndex = i;
          break;
        }
      }

      this.likedAds.splice(foundAdIndex, 1);
    }

    isInLiked(ad) {
      let isAlreadyLiked = false;
      for (let i = 0; i < this.likedAds.length; i++) {
        if (this.likedAds[i].id === ad.id) {
          isAlreadyLiked = true;
          break;
        }
      }

      return isAlreadyLiked;
    }
  }

  class UserManager {
    constructor() {
      if (localStorage.getItem("users")) {
        this.users = [];
        let localUsers = JSON.parse(localStorage.getItem("users"));
        localUsers.forEach(
          (el) => 
             {
              let userToPush = new User(
                el.username,
                el.password,
                el.likedAds,
                el.favouriteSearches,
                el.addedAds
              );
              this.users.push(userToPush);
            }
        );
      } else {
        this.users = [];
        localStorage.setItem("users", JSON.stringify(this.users));
      }
      this.currentUser = new User();

    }

    register(username, password) {
      this.users.push(new User(username, password));
      localStorage.setItem("users", JSON.stringify(this.users));
    }

    login(username, password) {
      const isUserLoggedIn = this.users.some(
        (user) => user["username"] === username && user['password'] === password
      );
      let index = this.users.findIndex(
        (el) => el["username"] === username && el["password"] === password
      );
      this.currentUser = this.users[index];
      
      return isUserLoggedIn;
    }

    validate(username, password) {
      if (username.trim().length > 3 && password.trim().length > 3) {
        return true;
      }

      return false;
    }
  }

  return new UserManager();
})();
