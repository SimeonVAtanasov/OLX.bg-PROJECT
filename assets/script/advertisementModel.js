class Advertisement {
  constructor(
    id,
    title,
    category,
    description,
    price,
    photo,
    city,
    contactName,
    email,
    promo,
    telephoneNumber
  ) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.description = description;
    this.price = price;
    this.photo = photo;
    this.city = city;
    this.country = "Bulgaria";
    this.contactName = contactName;
    this.email = email;
    this.promo = promo;
    this.telephoneNumber = telephoneNumber;
  }
}

class AdvertisementManager {
  constructor() {
    this.allAds = [];
    this.filteredAds = [];
    this.promoAds = [];
  }

  addAdvertisement(ad) {

    this.allAds.push(ad);
    
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
        const categorytype = optionA;

        this.filteredAds = this.allAds.filter(
          (notice) => notice.category === optionA
        );

        return this.filteredAds;
      case "city":
        if (this.filteredAds.length > 0) {
          const filteringStr = optionA.toLowerCase().trim();

          this.filteredAds = this.filteredAds.filter(notice =>
            notice.city.toLowerCase().includes(filteringStr)
          );
           
          return this.filteredAds;
        } else {
          const filteringStr = optionA.toLowerCase().trim();

        this.filteredAds = this.allAds.filter(notice =>
          notice.city.toLowerCase().includes(filteringStr)
        );

        return this.filteredAds;
        }

      default:
        return this.allAds
    }
  }
  sortByPrice(a, b, decending) {
    if (a && b) {
      this.filteredAds = this.allAds.filter(
        (notice) => notice.price >= optionA && notice.price <= optionB
      );
      return this.filteredAds;
    } else if (a && !b) {
      this.filteredAds = this.allAds.filter(
        (notice) => notice.price >= optionA
      );
      return this.filteredAds;
    } else {
      this.filteredAds = this.allAds.filter(
        (notice) => notice.price <= optionB
      );
      return this.filteredAds;
    }
  }
}

