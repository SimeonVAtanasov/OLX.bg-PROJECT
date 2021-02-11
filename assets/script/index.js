function printCategories(categories) {
  let categoriesContainer = document.getElementById("categoriesContainer");
  for (let i = 0; i < categories.length; i++) {
    let currentCategory = categories[i];
    let categoryCard = document.createElement("div");
    categoryCard.className="category-card";
    let imageContainer = document.createElement("div");
    imageContainer.style.backgroundColor = currentCategory['background-color'];
    imageContainer.className="image-container"
    let categoryImage = document.createElement("img");
    categoryImage.src = currentCategory.image;
    let description = document.createElement("p");
    description.innerText = currentCategory.title;
    description.className="title";
    imageContainer.append(categoryImage);
    categoryCard.append(imageContainer,description);
    categoriesContainer.append(categoryCard);
  }
}

printCategories(categories);