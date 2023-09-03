"use strict";
//?==================================HTML Variables
const imagCategory = document.getElementById("imagCategory");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userPhone = document.getElementById("userPhone");
const userAge = document.getElementById("userAge");
const userPass = document.getElementById("userPass");
const userRePass = document.getElementById("userRePass");
const submitBtn = document.getElementById("submitBtn");
const serchByName = document.getElementById("serchByName");
const serchByFiltter = document.getElementById("serchByFLetter");
const mainImage = document.getElementById("mainImage");
const mealName = document.getElementById("mealName");
const mealDeta = document.getElementById("mealDetail");
const ares = document.getElementById("ares");
const categ = document.getElementById("categ");
const tages = document.getElementById("tages");
const sourceBtn = document.getElementById("sourceBtn");
const YoutubeBtn = document.getElementById("YoutubeBtn");
const recipes14 = document.getElementById("#recipes14");

//?===============>loading-page
$(document).ready(function () {
  $(".loader").fadeOut(2000, function () {
    $(".loading-page").fadeOut(1000, function () {
      $("body").css("overflow", "auto");
      $(".loading-page").remove();
      displayHome();
    });
  });
});
//!========================================================================
//?===============>Menue
$("#barMenue , #menueList li a").click(function () {
  $("#menueDetails").animate({ width: "toggle" }, 1000, function () {
    ///
    $("#menueList li").slideDown(400);
  });
});

//?===============>API
let containerMeals = [];
let containerArea = [];
let containerCateg = [];
let containeringred = [];
let containeringredFilter = [];
let containerSearchName = [];
let containerSearchFletter = [];
let containerAreaMeals = [];
let containermealDetail = [];
let containermealsCatgory = [];
//?================================================== Home
async function Home() {
  let myApi = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  let mealData = await myApi.json();
  let finalMeal = mealData.meals;
  containerMeals = finalMeal;
  // console.log(finalMeal);
  // console.log("================================================");
}
async function category() {
  //-----------category
  let myApiCategory = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  let categoryData = await myApiCategory.json();
  let finaCategory = categoryData.categories;
  containerCateg = finaCategory;
  // console.log(containerCateg);
  // console.log("================================================");
}

async function area() {
  //-----------area
  let myApiArea = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  let AreaData = await myApiArea.json();
  let finalArea = AreaData.meals;
  containerArea = finalArea;
  // console.log(containerArea);
  // console.log("================================================");
}
//?================================================== areaMeals

async function areaMeals(areaMeal) {
  //-----------area
  let myApiAreaMeals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaMeal}&`
  );
  let AreaMealsData = await myApiAreaMeals.json();
  let finalAreaMeals = AreaMealsData.meals;
  containerAreaMeals = finalAreaMeals;
  // console.log(containerAreaMeals);
  // console.log("================================================");
  displayAreaMeals();
}
//?================================================== ingredients

async function ingredients() {
  //-----------ingredients
  let myApiIngred = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  let ingredData = await myApiIngred.json();
  let finaIngred = ingredData.meals;
  containeringred = finaIngred;
  // console.log(containeringred);
  // console.log("================================================");
}
//?================================================== filterMeals

async function filterMeals(meal) {
  //-----------ingredientsFilter
  let myApiIngredFilter = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${meal}`
  );
  let ingredFilterData = await myApiIngredFilter.json();
  let finaIngredFilter = ingredFilterData.meals;
  containeringredFilter = finaIngredFilter;
  // console.log(containeringredFilter);
  // console.log("================================================");
}
//?==================================================Meal Details

async function mealDetail(mealID) {
  let myApimealDetail = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  let mealDetailData = await myApimealDetail.json();
  let finamealDetail = mealDetailData.meals;
  containermealDetail = finamealDetail;
  // console.log(containermealDetail);
  // console.log("================================================");
  displayMealDetails();
}

//?================================================== Ctegory Meal
async function categMeals(Ctegory) {
  let myApimealCateg = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${Ctegory}`
  );
  let mealCatglData = await myApimealCateg.json();
  let finalmealCatgl = mealCatglData.meals;
  containermealsCatgory = finalmealCatgl;
  // console.log(containermealsCatgory);
  // console.log("================================================");
  displayMealCAtegory();
}

//*==================================================
async function getAllData() {
  await Home();
  await category();
  await ingredients();
  await area();
}
getAllData();
//!========================================================================
//?========================================================================>serch by name
async function serchName(maelName) {
  //-----------serch By Name
  let myApisercName = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${maelName}`
  );
  let serchNameData = await myApisercName.json();
  let finaSerchName = serchNameData.meals;
  containerSearchName = finaSerchName;
  // console.log(containerSearchName);
  // console.log("================================================");
  displaySearcName();
}
serchByName.addEventListener("input", function () {
  let searchNAmeValue = serchByName.value;
  serchName(searchNAmeValue);
});

//?========================================================================>serch by firstLetter
async function serchFirstLetter(letter) {
  //-----------serch By Name
  let myApisercfirstLetter = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  let serchFlettereData = await myApisercfirstLetter.json();
  let finaSerchName = serchFlettereData.meals;
  containerSearchFletter = finaSerchName;
  // console.log(containerSearchFletter);
  // console.log("================================================");
  displaySearchLetter();
}

serchByFiltter.addEventListener("input", function () {
  let serchFletterValue = serchByFiltter.value;
  serchFirstLetter(serchFletterValue);
});

//!========================================================================
//?=============================>display Home Page

function displayHome() {
  let container = "";
  for (let i = 0; i < containerMeals.length; i++) {
    container += `
               <div class="col-md-3 text-center categ-part position-relative" onclick="datailMHome(${i})">
             <img class="w-100" src=${containerMeals[i].strMealThumb}  alt="imag-category" />
              <div class="layer-category">
              <h3>${containerMeals[i].strMeal}</h3>

              </div>
            </div>
           `;
  }
  document.getElementById("homeDisp").innerHTML = container;
}

//?=============================>display area
function displayArea() {
  let container = "";
  for (let i = 0; i < containerArea.length; i++) {
    container += `
            <div class="col-md-3 text-center" onclick="areaMealsshow(${i})">
              <span><i class="fa-solid fa-house-laptop"></i></span>
              <p>${containerArea[i].strArea}</p>
            </div>
    `;
  }
  document.getElementById("areaDisp").innerHTML = container;
}
//?=============================>display Category

function displayCategory() {
  let container = "";
  for (let i = 0; i < containerCateg.length; i++) {
    let as = containerCateg[i].strCategoryDescription;
    let parg = as.slice(0, 105);
    container += `
               <div class="col-md-3 text-center categ-part position-relative"  >
             <img class="w-100" src=${containerCateg[i].strCategoryThumb}  alt="imag-category" />
              <div class="layer-category" onclick="mealOfCatg(${i})">
              <h3>${containerCateg[i].strCategory}</h3>
                <P calss="px-2 w-100 m-auto text-center">${parg}</P>
              </div>
            </div>
           `;
  }
  document.getElementById("catgDisp").innerHTML = container;
}

//?=============================>display Meal Of Category

function mealOfCatg(categoryId) {
  let categName = containerCateg[categoryId].strCategory;
  $("section ,.home").css("display", "none");
  $("#MealsCateg").css("display", "block");
  categMeals(categName);
}

//?=============================>display ingredients

function displayingred() {
  let container = "";
  for (let i = 0; i < 20; i++) {
    let as = containeringred[i].strDescription;
    let parg = as.slice(0, 105);
    container += `
            <div class="col-md-3 text-center text-center" onclick="ingredFilter(${i})" >
              <span><i class="fa-solid fa-drumstick-bite"></i></span>
              <h3>${containeringred[i].strIngredient}</h3>
              <p>${parg}</p>
            </div>
    `;
  }
  document.getElementById("ingredDisp").innerHTML = container;
}
//?=============================>display ingredientsFilter -part
async function ingredFilter(mealsfilter) {
  let mealsFilterName = containeringred[mealsfilter].strIngredient;
  // console.log(mealsFilterName);
  await filterMeals(mealsFilterName);
  $("section ,.home").css("display", "none");
  $("#infil").css("display", "block");
  displayIngredFilter();
}

//?=============================>display ingredientsFilter
function displayIngredFilter() {
  let container = "";
  for (let i = 0; i < containeringredFilter.length; i++) {
    container += `
               <div class="col-md-3 text-center categ-part position-relative" onclick="mealDta(${i})">
             <img class="w-100" src=${containeringredFilter[i].strMealThumb}  alt="imag-category" />
              <div class="layer-category">
              <h3>${containeringredFilter[i].strMeal}</h3>
              </div>
            </div>
           `;
  }
  document.getElementById("ingredFilterDis").innerHTML = container;
}
//?=============================>Area Meals
function displayAreaMeals() {
  let container = "";
  for (let i = 0; i < containerAreaMeals.length; i++) {
    container += `
               <div class="col-md-3 text-center categ-part position-relative" onclick="datailMA(${i})">
             <img class="w-100" src=${containerAreaMeals[i].strMealThumb}  alt="imag-category" />
              <div class="layer-category">
              <h3>${containerAreaMeals[i].strMeal}</h3>

              </div>
            </div>
           `;
  }
  document.getElementById("areaMealsDisp").innerHTML = container;
}
//?=============================>area Meals show
async function areaMealsshow(mealsfilter) {
  let mealsareaName = containerArea[mealsfilter].strArea;
  // console.log(mealsareaName);
  await areaMeals(mealsareaName);
  $("section ,.home").css("display", "none");
  $("#areaMeals").css("display", "block");
  displayAreaMeals();
}
//?=============================>display Search By Name
function displaySearcName() {
  let container = "";
  for (let i = 0; i < containerSearchName.length; i++) {
    container += `
               <div class="col-md-3 text-center categ-part position-relative"  onclick="detailMSN(${i})">
             <img class="w-100" src=${containerSearchName[i].strMealThumb}  alt="imag-category" />
              <div class="layer-category">
              <h3>${containerSearchName[i].strMeal}</h3>
              </div>
            </div>
           `;
  }
  document.getElementById("SearchNameDisp").innerHTML = container;
}
//?=============================>display Search By letter
function displaySearchLetter() {
  let container = "";
  for (let i = 0; i < containerSearchFletter.length; i++) {
    container += `
               <div class="col-md-3 text-center categ-part position-relative" onclick="detailMSL(${i})">
             <img class="w-100" src=${containerSearchFletter[i].strMealThumb}  alt="imag-category" />
              <div class="layer-category">
              <h3>${containerSearchFletter[i].strMeal}</h3>
              </div>
            </div>
           `;
  }
  document.getElementById("SearchNameDisp").innerHTML = container;
}
//?=============================>display Meal of category
function displayMealCAtegory() {
  let container = "";
  for (let i = 0; i < containermealsCatgory.length; i++) {
    container += `
               <div class="col-md-3 categ-part position-relative" onclick="datailMC(${i})">
             <img class="w-100" src=${containermealsCatgory[i].strMealThumb}  alt="imag-category" />
              <div class="layer-category">
              <h3>${containermealsCatgory[i].strMeal}</h3>

              </div>
            </div>
           `;
  }
  document.getElementById("areaMealsCateg").innerHTML = container;
}
//?=============================>mealDetail
function displayMealDetails() {
  mainImage.setAttribute("src", containermealDetail[0].strMealThumb);
  mealName.innerHTML = containermealDetail[0].strMeal;
  mealDeta.innerHTML = containermealDetail[0].strInstructions;
  ares.innerHTML = containermealDetail[0].strArea;
  categ.innerHTML = containermealDetail[0].strCategory;
  if (containermealDetail[0].strTags != null) {
    tages.innerHTML = containermealDetail[0].strTags;
  } else {
    tages.innerHTML = "NoTags";
  }
  YoutubeBtn.setAttribute("href", containermealDetail[0].strYoutube);
  sourceBtn.setAttribute("href", containermealDetail[0].strSource);
  $("#recipes1").html(containermealDetail[0].strMeasure1);
  $("#recipes2").html(containermealDetail[0].strMeasure2);
  $("#recipes3").html(containermealDetail[0].strMeasure3);
  $("#recipes4").html(containermealDetail[0].strMeasure4);
  $("#recipes5").html(containermealDetail[0].strMeasure5);
  $("#recipes6").html(containermealDetail[0].strMeasure6);
  if (containermealDetail[0].strMeasure7 != " ") {
    $("#recipes7").removeClass("d-none");
    $("#recipes7").html(containermealDetail[0].strMeasure7);
  }
  if (containermealDetail[0].strMeasure8 != " ") {
    $("#recipes8").removeClass("d-none");
    $("#recipes8").html(containermealDetail[0].strMeasure8);
  }
  if (containermealDetail[0].strMeasure9 != " ") {
    $("#recipes9").removeClass("d-none");
    $("#recipes9").html(containermealDetail[0].strMeasure9);
  }
  if (containermealDetail[0].strMeasure10 != " ") {
    $("#recipes10").removeClass("d-none");
    $("#recipes10").html(containermealDetail[0].strMeasure10);
  }
}

//&=====================================
function mealDta(index) {
  let mealID = containeringredFilter[index].idMeal;
  $("section ,.home").css("display", "none");
  $("#mealDeatails").css("display", "block");
  mealDetail(mealID);
}
//&=====================================
function datailMC(index) {
  let mealID = containermealsCatgory[index].idMeal;
  $("section ,.home").css("display", "none");
  $("#mealDeatails").css("display", "block");
  mealDetail(mealID);
}
//&=====================================
function datailMA(index) {
  let mealID = containerAreaMeals[index].idMeal;
  $("section ,.home").css("display", "none");
  $("#mealDeatails").css("display", "block");
  mealDetail(mealID);
}
//&=====================================
function datailMHome(index) {
  let mealID = containerMeals[index].idMeal;
  $("section ,.home").css("display", "none");
  $("#mealDeatails").css("display", "block");
  mealDetail(mealID);
}
//&=====================================
function detailMSL(index) {
  let mealID = containerSearchFletter[index].idMeal;
  $("section ,.home").css("display", "none");
  $("#mealDeatails").css("display", "block");
  mealDetail(mealID);
}
//&=====================================
function detailMSN(index) {
  let mealID = containerSearchName[index].idMeal;
  $("section ,.home").css("display", "none");
  $("#mealDeatails").css("display", "block");
  mealDetail(mealID);
}
//?=============================>MenueRouting
$("a").on("click", function ({ target }) {
  let lingHref = $(target).attr("href");
  if (lingHref == "#area") {
    $("section ,.home").css("display", "none");
    $(lingHref).css("display", "block");
    $(".loader-3").fadeOut(1000, function () {
      $(".loading-area").fadeOut(1000, function () {
        $("body").css("overflow", "auto");
      });
    });
    displayArea();
  } else if (lingHref == "#category") {
    $("section ,.home").css("display", "none");
    $(lingHref).css("display", "block");
    $(".loader-4").fadeOut(1000, function () {
      $(".loading-categ").fadeOut(1000, function () {
        $("body").css("overflow", "auto");
      });
    });
    displayCategory();
  } else if (lingHref == "#ingredients") {
    $("section ,.home").css("display", "none");
    $(lingHref).css("display", "block");
    $(".loader-2").fadeOut(1000, function () {
      $(".loading-ingerd").fadeOut(1000, function () {
        $("body").css("overflow", "auto");
      });
    });
    displayingred();
  } else if (lingHref == "#contcatUs") {
    $("section ,.home").css("display", "none");
    $("#contcatUs").css("display", "flex");
  } else if (lingHref == "#areaMeals") {
    $("section ,.home").css("display", "none");
    $(lingHref).css("display", "flex");
  } else {
    $("section ,.home").css("display", "none");
    $("#search").css("display", "block");
  }
});
$("#logo").click(function () {
  // displayHome();
  $(".home").css("display", "block");
  $("section").css("display", "none");
});
//?=============================>validation Inputs

function validationName() {
  let regexpattern = /^[a-zA-Z\-\s?]+$/;
  let text = userName.value;
  if (regexpattern.test(text)) {
    // console.log("true name");
    document.getElementById("alerName").classList.add("d-none");
    return true;
  } else {
    document.getElementById("alerName").classList.remove("d-none");
    // console.log("false");
    return false;
  }
}
function validationEmail() {
  let regexpattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let text = userEmail.value;
  if (regexpattern.test(text)) {
    // console.log("true");
    document.getElementById("alerEmail").classList.add("d-none");
    return true;
  } else {
    // console.log("false");
    document.getElementById("alerEmail").classList.remove("d-none");

    return false;
  }
}
function validationAge() {
  let regexpattern = /^([1-7][0-7])$/;
  let text = userAge.value;
  if (regexpattern.test(text)) {
    // console.log("true");
    document.getElementById("alerAge").classList.add("d-none");

    return true;
  } else {
    // console.log("false");
    document.getElementById("alerAge").classList.remove("d-none");

    return false;
  }
}
function validationPhone() {
  let regexpattern = /^(010|011|012|015)[0-9]{8}$/;
  let text = userPhone.value;
  if (regexpattern.test(text)) {
    // console.log("true");
    document.getElementById("alerPhone").classList.add("d-none");

    return true;
  } else {
    // console.log("false");
    document.getElementById("alerPhone").classList.remove("d-none");

    return false;
  }
}
function validationPass() {
  let regexpattern = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  let text = userPass.value;
  if (regexpattern.test(text)) {
    // console.log("true");
    document.getElementById("alerPass").classList.add("d-none");

    return true;
  } else {
    // console.log("false");
    document.getElementById("alerPass").classList.remove("d-none");
    return false;
  }
}
function validationRePass() {
  let regexpattern = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  let text = userRePass.value;
  if (regexpattern.test(text)) {
    // console.log("true");
    document.getElementById("alerRePass").classList.add("d-none");
    return true;
  } else {
    document.getElementById("alerRePass").classList.remove("d-none");
    // console.log("false");
    return false;
  }
}
userName.addEventListener("input", function () {
  validationName();
  validation();
});
userAge.addEventListener("input", function () {
  validationAge();
});
userEmail.addEventListener("input", function () {
  validationEmail();
  validation();
});
userPhone.addEventListener("input", function () {
  validationPhone();
  validation();
});
userPass.addEventListener("input", function () {
  validationPass();
  validation();
});
userRePass.addEventListener("input", function () {
  validationRePass();
  validation();
});

function validation() {
  if (
    validationName() &&
    validationAge() &&
    validationEmail() &&
    validationPhone &&
    validationPass() &&
    validationRePass() &&
    userPass.value === userRePass.value
  ) {
    submitBtn.removeAttribute("disabled");
    // console.log("succeded");
  } else {
    submitBtn.setAttribute("disabled", true);
    // console.log("false");
  }
}
