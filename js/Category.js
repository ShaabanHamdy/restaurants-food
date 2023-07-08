
async function getCategories() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();
  displayCategory(response.categories);
}
function displayCategory(item) {
  let showData = "";
  for (let i = 0; i < item.length; i++) {
    showData += `
         <div class="col-md-3">
                   <div onclick='detailsCategory("${
                     item[i].strCategory
                   }")' class="meal rounded-4 position-relative overflow-hidden">
                        <img class="w-100" src="${
                          item[i].strCategoryThumb
                        }" alt="">
                      <div class="overLayer text-center d-block">
                        <h3 class="ms-3">${item[i].strCategory}</h3>
                        <p>${item[i].strCategoryDescription
                          .split(" ")
                          .slice(0, 25)
                          .join(" ")}</p>
                      </div>
                    </div>   
         </div>
      `;
    arrayData.innerHTML = showData;
  }
 
}

let liCategory = document.getElementById("liCategory");
liCategory.onclick = () => {
  document.getElementById('searchPage').innerHTML = " "
  getCategories();
};

async function detailsCategory(nameCategory) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${nameCategory}`
  );
  response = await response.json();
  displayCategoryDetails(response.meals);
}

function displayCategoryDetails(item) {
  let showData = "";
  for (let i = 0; i < item.length; i++) {
    showData += `
            <div  onclick='getIdDetails("${item[i].idMeal}")'  class="col-md-3">
                  <div class="meal rounded-4 position-relative overflow-hidden">
                    <img class="w-100" src="${item[i].strMealThumb}" alt="">
                  <div class="overLayer">
                    <h3 class="ms-3">${item[i].strMeal}</h3>
                  </div>
                  </div>
            </div>
    
    `;
    arrayData.innerHTML = showData;

  }
}

// ==================================getIdDetails==========================================================

async function getIdDetails(mealId) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  response = await response.json();
  getMealDetails(response.meals[0]);
  
}

function getMealDetails(meal) {
  let ingrdens = "";
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingrdens += `<span class="btn btn-info mx-1 my-1"> 
      ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</span>`;
    }
  }
  let tags = meal.strTags?.split(",");
  if (!tags) tags = ["Salad"];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `<span class="btn btn-info mx-1">${tags[i]}</span>`;
  }
  // ---------------------------
  let getDataDetails = `
    <div class="col-md-5">
    <img class="w-100" src=${meal.strMealThumb}>
    <h2 class=" text-white text-center">${meal.strMeal}</h2>
  </div>
  <div class="col-md-7">
    <div class="text-white">
      <h2>Instructions</h2>
    <p class=' text-muted'>${meal.strInstructions}</p>
    <p> <span class=" fw-bolder">Area : </span>${meal.strArea} </p>
    <p> <span class=" fw-bolder">Category : </span>${meal.strCategory}</p>
    <h3>Recipes :</h3>
    <div class="my-2 m-1">
      ${ingrdens}
    </div>
    <h3>Tags : </h3>
    ${tagsStr}
    <br>
    <br>
    <a target='_blank' href="${meal.strSource}" class="btn btn-success">Source</a>
    <a target='_blank' href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>

    </div>
  </div>
    
    
    `;

  arrayData.innerHTML = getDataDetails;

}
