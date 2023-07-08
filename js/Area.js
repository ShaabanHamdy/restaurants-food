async function getArea() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  response = await response.json();
  displayArea(response.meals);
}
function displayArea(item) {
  let showData = "";
  for (let i = 0; i < item.length; i++) {
    showData += `
              <div class="col-md-3 col-Area">
                    <div onclick='detailsGetArea("${item[i].strArea}")' class="area text-center text-white  ">
                   
                       <i class="fa-solid fa-city fa-3x iconArea"></i>
                      <h3 class="ms-3 cursor ">${item[i].strArea}</h3>
                     
                   
                    </div>
              </div>
      
      `;
    arrayData.innerHTML = showData;
  }
  
}

let liArea = document.getElementById("liArea");
liArea.onclick = () => {
  getArea();
  document.getElementById('searchPage').innerHTML = " "
};

async function detailsGetArea(nameArea) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${nameArea}`
  );
  response = await response.json();
  displayDetailsGetArea(response.meals);
}

function displayDetailsGetArea(item) {
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

// =============================================================================================


// ==================================getIdDetails==========================================================

async function getIdDetails(mealId) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  response = await response.json();
  getMealDetails(response.meals[0]);
  console.log(response.meals[0]);
}

function getMealDetails(meal) {
  let ingredients = "";
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<span class="btn btn-info mx-1 my-1"> 
      ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</span>`;
    }
  }
  let tags = meal.strTags?.split(",");
  if (!tags) tags = ['Salad'];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += 
    `<span class="btn btn-info mx-1">${tags[i]}</span>`;
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
      ${ingredients}
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
