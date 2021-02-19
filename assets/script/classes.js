class Advertisement {
    constructor(id, title, category, description, price, photo, city, contactName, email, promo, telephoneNumber) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.description = description;
        this.price = price
        this.photo = photo;
        this.city = city;
        this.country = "Bulgaria"
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

    addAdvertisment(notice) {
        if (notice instanceof Advertisement) {
            this.allAds.push(notice);
        }
    }

    filterBy(type, optionA, optionB) {
        if (!type || typeof str !== "string" || str.trim().length === 0) {
            return this.allAds;
        }

        switch (type) {
            case "title":
                const filteringStr = optionA.toLowerCase().trim();

                this.filteredAds = this.allAds.filter(notice => notice.title.toLowerCase().includes(filteringStr))

                return this.filteredAds;
            case "category":
                const categorytype = optionA;

                this.filteredAds = this.allAds.filter(notice => notice.category === optionA);

                return this.filteredAds
            case "price":
                if (optionA && optionB) {

                    this.filteredAds = this.allAds.filter(notice => notice.price >= optionA && notice.price <= optionB)
                    return this.filteredAds

                } else if (optionA && !optionB) {

                    this.filteredAds = this.allAds.filter(notice => notice.price >= optionA)
                    return this.filteredAds

                } else {

                    this.filteredAds = this.allAds.filter(notice => notice.price <= optionB)
                    return this.filteredAds

                }

        }

    }

}