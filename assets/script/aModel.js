class Advertisement {
  constructor(
    id,
    title,
    category,
    description,
    price,
    photo,
    city,
    fullName,
    email,
    promo,
    telephoneNumber,
    viewCounter
  ) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.description = description;
    this.price = price;
    this.photo = photo;
    this.city = city;
    this.country = "Bulgaria";
    this.fullName = fullName;
    this.email = email;
    this.promo = promo;
    this.telephoneNumber = telephoneNumber;
    this.viewCounter = viewCounter;
  }
}

class AdvertisementManager {
  constructor() {
    this.filteredAds = [];
    this.filteredByPrice = [];
    this.promoAds = [];
    if (localStorage.getItem("advertisements")) {
      this.allAds = [];
      this.allAds = JSON.parse(localStorage.getItem("advertisements"));
    } else {
      this.allAds = [];
    }
  }

  addAdvertisement(ad) {
    this.allAds.push(ad);
  }

  setAds() {
    localStorage.setItem("advertisements", JSON.stringify(this.allAds));
  }

  filterBy(type, optionA) {
    if (typeof type !== "string") {
      return this.allAds;
    }

    switch (type) {
      case "title":
        const filteringStr = optionA.toLowerCase().trim();

        this.filteredAds = this.allAds.filter((notice) =>
          notice.title.toLowerCase().includes(filteringStr)
        );
        return this.filteredAds;
      case "category":
        this.filteredAds = this.allAds.filter(
          (notice) => notice.category === optionA
        );

        return this.filteredAds;
      case "city":
        if (this.filteredAds.length > 0) {
          const filteringStr = optionA.toLowerCase().trim();

          this.filteredAds = this.filteredAds.filter((notice) =>
            notice.city.toLowerCase().includes(filteringStr)
          );

          return this.filteredAds;
        } else {
          const filteringStr = optionA.toLowerCase().trim();

          this.filteredAds = this.allAds.filter((notice) =>
            notice.city.toLowerCase().includes(filteringStr)
          );

          return this.filteredAds;
        }

      default:
        return this.allAds;
    }
  }

  filterByPrice(arr, a, b) {
    if (arr.length === 0) {
      arr = this.allAds;
    }
    if (a && b) {
      this.filteredByPrice = arr.filter(
        (notice) => notice.price >= a && notice.price <= b
      );
      return this.filteredByPrice;
    } else if (a && !b) {
      this.filteredByPrice = arr.filter((notice) => notice.price >= a);
      return this.filteredByPrice;
    } else {
      this.filteredByPrice = arr.filter((notice) => notice.price <= b);
    }
  }

  sortByPrice(arr, decending) {
    if (arr.length === 0) {
      arr = this.allAds;
    }

    if (decending) {
      this.filteredAds = arr.sort((a, b) => a.price - b.price).reverse();

      return;
    }

    this.filteredAds = arr.sort((a, b) => a.price - b.price);
  }
}
