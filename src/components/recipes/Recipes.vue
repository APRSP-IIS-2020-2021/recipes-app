<template>
  <div class="recipes-wrapper">
    <div class="recipes-title">
      <h1>Select Recipe Category to see all Recipes</h1>
    </div>
    <div class="single-recipes">
        <div @click="goToMeatRecipes" class="left-single-recipe meat-recipe">
          <h1 class="single-recipe-title">Meat Recipes</h1>
          <p class="single-recipe-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem laborum, reprehenderit at repellendus ea maxime eos blanditiis voluptate veritatis aperiam provident sunt?
             Nobis enim optio repellendus eum suscipit quo asperiores.
          </p>
        </div>
        <div @click="goToVeggieRecipes" class="right-single-recipe veggie-recipe">
          <h1 to="/recipes/veggie-recipes" class="single-recipe-title">Veggie Recipes</h1>
          <p class="single-recipe-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem laborum, reprehenderit at repellendus ea maxime eos blanditiis voluptate veritatis aperiam provident sunt?
             Nobis enim optio repellendus eum suscipit quo asperiores.
          </p>
        </div>
        <div @click="goToPastasRecipes" class="left-single-recipe pasta-recipe">
          <h1 class="single-recipe-title">Pastas Recipes</h1>
          <p class="single-recipe-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem laborum, reprehenderit at repellendus ea maxime eos blanditiis voluptate veritatis aperiam provident sunt?
             Nobis enim optio repellendus eum suscipit quo asperiores.
          </p>
        </div>
        <div @click="goToDessertsRecipes" class="right-single-recipe dessert-recipe">
          <h1 class="single-recipe-title">Desserts Recipes</h1>
          <p class="single-recipe-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem laborum, reprehenderit at repellendus ea maxime eos blanditiis voluptate veritatis aperiam provident sunt?
             Nobis enim optio repellendus eum suscipit quo asperiores.
          </p>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      goToMeatRecipes() {
        this.$router.push('/recipes/meat-recipes');
      },
      goToVeggieRecipes() {
        this.$router.push('/recipes/veggie-recipes');
      },
      goToPastasRecipes() {
        this.$router.push('/recipes/pastas-recipes');
      },
      goToDessertsRecipes() {
        this.$router.push('/recipes/desserts-recipes');
      }
    }
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .recipes-wrapper {
    width: 100%;
    height: 91.5vh;
    background: rgb(243, 233, 206);
    display: flex;
    flex-direction: column;
  }
  .recipes-title {
    font-family: 'Indie Flower', cursive;
    font-size: 35px;
    font-weight: bold;
    align-self: center;
    padding-top: 40px;
    padding-bottom: 10px;
    margin-bottom: 15px;
  }
  .single-recipes {
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .left-single-recipe {
    align-self: flex-start;
    width: 50%;
    height: 50%;
    border: 3px solid rgb(252, 215, 146);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0.85;
  }
  .right-single-recipe {
    align-self: flex-end;
    width: 50%;
    height: 50%;
    border: 3px solid rgb(252, 215, 146);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0.85;
  }
  .single-recipe-title {
    font-family: 'Indie Flower', cursive;
    font-weight: bold;
    color: white;
    text-shadow: 2px 2px black;
  }
  .single-recipe-desc {
    font-family: 'Indie Flower', cursive;
    text-align: center;
    width: 80%;
    font-size: 20px;
    color: white;
    text-shadow: 2px 2px black;
  }
  .meat-recipe {
    background-image: url("../../assets/meat-recipes.jpg");
    background-repeat: no-repeat;
    background-size: cover;
  }
  .veggie-recipe {
    background-image: url("../../assets/veggie-recipes.jpg");
    background-repeat: no-repeat;
    background-size: cover;
  }
  .pasta-recipe {
    background-image: url("../../assets/pastas-recipes.jpg");
    background-repeat: no-repeat;
    background-size: cover;
  }
  .dessert-recipe {
    background-image: url("../../assets/dessert-recipes.jpg");
    background-repeat: no-repeat;
    background-size: cover;
  }
  .left-single-recipe:hover {
    opacity: 100%;
    transition: 0.3s ease;
    cursor: pointer;
  }
  .right-single-recipe:hover {
    opacity: 100%;
    transition: 0.3s ease;
    cursor: pointer;
  }
</style>
