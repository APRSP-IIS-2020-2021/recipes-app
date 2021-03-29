import Home from '../components/Home.vue';
import About from '../components/About.vue';
import Recipes from '../components/recipes/Recipes.vue';
import MeatRecipe from '../components/recipes/MeatRecipes.vue';
import VeggieRecipe from '../components/recipes/VeggieRecipes.vue';
import PastaRecipe from '../components/recipes/PastaRecipes.vue';
import DessertsRecipe from '../components/recipes/DessertsRecipes.vue';

const routes = [
  {path: '/', component: Home},
  {path: '/home', component: Home},
  {path: '/about', component: About},
  {path: '/recipes', component: Recipes},
  {path: '/recipes/meat-recipes', component: MeatRecipe},
  {path: '/recipes/veggie-recipes', component: VeggieRecipe},
  {path: '/recipes/pastas-recipes', component: PastaRecipe},
  {path: '/recipes/desserts-recipes', component: DessertsRecipe}
];

export default routes;
