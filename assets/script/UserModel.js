const userManager = (function () {
  class User {
    constructor(email, password, isLogged = false, likedAds, favouriteSearches, addedAds) {
      this.email = email;
      this.password = password;
      this.isLogged = isLogged;

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

    isInLiked(id) {
      let isAlreadyLiked = false;
      for (let i = 0; i < this.likedAds.length; i++) {
        if (this.likedAds[i].id == id) {
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
        localUsers.forEach((el) => {
          let userToPush = new User(
            el.email,
            el.password,
            el.isLogged,
            el.likedAds,
            el.favouriteSearches,
            el.addedAds,

          );
          this.users.push(userToPush);
        });
      } else {
        this.users = [];
        localStorage.setItem("users", JSON.stringify(this.users));
      }
      this.currentUser = new User();
    }

    register(email, password) {
      this.users.push(new User(email, password));
      localStorage.setItem("users", JSON.stringify(this.users));
    }

    login(email, password) {
      const isUserLoggedIn = this.users.some(
        (user) => user["email"] === email && user["password"] === password
      );
      let index = this.users.findIndex(
        (el) => el["email"] === email && el["password"] === password
      );
      // this.users.forEach(el => el.isLogged = false)
      this.currentUser = this.users[index];
      this.currentUser.isLogged = true;

      this.setUsers();

      return isUserLoggedIn;
    }

    setUsers() {
      localStorage.setItem("users", JSON.stringify(userManager.users));
    }

    logOut() {
      userManager.users.forEach(el => el.isLogged = false);

      this.setUsers();
    }

    checkLoggedUser() {
      let isLogged = this.users.some(
        user => user.isLogged === true);

      if (isLogged) {
        let index = this.users.findIndex(
          (el) => el.isLogged === true);

        this.login(userManager.users[index].email, userManager.users[index].password);

        return true;
      }

      return false;

    }

    

    isRegistered(email, password) {
      const isUserRegistered = this.users.some(
        (user) => user["email"] === email && user["password"] === password
      );

      return isUserRegistered;
    }

  }

  return new UserManager();
})();
