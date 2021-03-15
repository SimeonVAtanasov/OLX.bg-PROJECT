const userManager = (function () {
  class User {
    constructor(
      email,
      password,
      isLogged = false
    ) {
      this.email = email;
      this.password = password;
      this.isLogged = isLogged;

        this.likedAds = [];
        this.favouriteSearches = [];
        this.addedAds = [];
      }
    }

  class UserManager {
    constructor() {
      if (localStorage.getItem("users")) {
        this.users = JSON.parse(localStorage.getItem("users"));
      } else {
        this.users = [];
        this.setUsers();
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
      this.currentUser = this.users[index];
      this.currentUser.isLogged = true;

      this.setUsers();

      return isUserLoggedIn;
    }

    setUsers() {
      localStorage.setItem("users", JSON.stringify(this.users));
    }

    logOut() {
      userManager.users.forEach((el) => (el.isLogged = false));

      this.setUsers();
    }

    checkLoggedUser() {
      let isLogged = this.users.some((user) => user.isLogged === true);

      if (isLogged) {
        let index = this.users.findIndex((el) => el.isLogged === true);

        this.login(
          userManager.users[index].email,
          userManager.users[index].password
        );

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
    likeAd(ad) {
      let isAlreadyLiked = false;
      if (this.currentUser.likedAds.length > 0) {
        for (let i = 0; i < this.currentUser.likedAds.length; i++) {
        if (this.currentUser.likedAds[i].id === ad.id) {
          isAlreadyLiked = true;
          break;
        }
      }
      }
      
      if (!isAlreadyLiked) {
        this.currentUser.likedAds.push(ad);
      }
    }

    removeFromLiked(ad) {
      let foundAdIndex;
      for (let i = 0; i < this.currentUser.likedAds.length; i++) {
        if (this.currentUser.likedAds[i].title === ad.title) {
          foundAdIndex = i;
          break;
        }
      }

      this.currentUser.likedAds.splice(foundAdIndex, 1);
    }

    isInLiked(id) {
      let isAlreadyLiked = false;
      for (let i = 0; i < this.currentUser.likedAds.length; i++) {
        if (this.currentUser.likedAds[i].id == id) {
          isAlreadyLiked = true;
          break;
        }
      }

      return isAlreadyLiked;
    }

    addAd(ad){
      this.currentUser.addedAds.push(ad);
    }
  }

  return new UserManager();
})();
