class Advertisement {
    constructor(title, category, description, photo, city, contactName, email, telephoneNumber) {
        this.title = title;
        this.category = category;
        this.description = description;
        this.photo = photo;
        this.city = city;
        this.contactName = contactName;
        this.email = email;
        this.telephoneNumber = telephoneNumber;
    }
}

class AdvertisementManage {
    constructor() {
        this.allAds = [];
        this.filteredAds = [];
    }

    addAdvertisment(notice) {
        if (notice instanceof Advertisement) {
            this.allAds.push(notice);
        }
    }

    filter(str) {
        if (typeof str !== "string" || str.trim().length === 0) {
            return this.allAds
        }

        const searchStr = str.toLowerCase().trim();

        this.filteredAds = this.allAds.filter(notice => notice.title.toLowerCase().includes(str))


        return this.filteredAds;
    }



}