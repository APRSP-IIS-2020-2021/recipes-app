import Home from '../components/Home.vue';
import About from '../components/About.vue';
import Recipes from '../components/recipes/Recipes.vue';
import MeatRecipe from '../components/recipes/MeatRecipes.vue';
import VeggieRecipe from '../components/recipes/VeggieRecipes.vue';
import PastaRecipe from '../components/recipes/PastaRecipes.vue';
import DessertsRecipe from '../components/recipes/DessertsRecipes.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';

const routes = [
  {path: '/', component: Home},
  {path: '/home', component: Home},
  {path: '/about', component: About},
  {path: '/recipes', component: Recipes, meta: {requiresAuth: true}},
  {path: '/recipes/meat-recipes', component: MeatRecipe, meta: {requiresAuth: true}},
  {path: '/recipes/veggie-recipes', component: VeggieRecipe, meta: {requiresAuth: true}},
  {path: '/recipes/pastas-recipes', component: PastaRecipe, meta: {requiresAuth: true}},
  {path: '/recipes/desserts-recipes', component: DessertsRecipe, meta: {requiresAuth: true}},
  {path: '/login', component: Login},
  {path: '/register', component: Register}
];

export default routes;
