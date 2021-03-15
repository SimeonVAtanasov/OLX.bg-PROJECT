function printCategories(categories, container) {
      for (let i = 0; i < categories.length; i++) {
        let currentCategory = categories[i];
        let categoryCard = createElement("div");
    
        categoryCard.className = "category-card";
    
        let imageContainer = createElement("div");
    
        imageContainer.style.backgroundColor = currentCategory["background-color"];
        imageContainer.className = "image-container";
    
        let categoryImage = createElement("img");
    
        categoryImage.src = currentCategory.image;
        categoryImage.alt = currentCategory.title;
    
        let description = createElement("p", currentCategory.title);
    
        description.className = "title";
        imageContainer.append(categoryImage);
        categoryCard.append(imageContainer, description);
    
        if (container === getById("addCategories") && i <= 11) {
          container.append(categoryCard);
        } else if (container == categoriesContainer) {
          container.append(categoryCard);
        } else {
          continue;
        }
    
        let chosenCategoryContainer = getById("chosenCategoryContainer");
        if (container === getById("addCategories")) {
          categoryCard.addEventListener("click", function () {
            chosenCategoryContainer.innerHTML = "";
    
            let imgContainer = createElement("div");
            imgContainer.style.backgroundColor =
              currentCategory["background-color"];
            imgContainer.className = "image-container";
    
            let img = createElement("img");
            img.src = currentCategory.image;
            img.alt = currentCategory.title;
    
            let categoryTitle = createElement("p", currentCategory.title);
    
            imgContainer.append(img);
            chosenCategoryContainer.append(imgContainer, categoryTitle);
            getById("categoryBox").style.backgroundColor =
              currentCategory["background-color"];
            getById("selectCategory").style.display = "none";
          });
        }
    
        if (container === categoriesContainer) {
          categoryCard.addEventListener("click", function () {
    
            printAdsBars(
              adsManager.filterBy("category", currentCategory.title),
              noticeContainer
            );
            location.hash = "#advertisements";
          });
        }
      }
    }
    
    printCategories(categories, categoriesContainer);
    printCategories(categories, categoriesFormContainer);