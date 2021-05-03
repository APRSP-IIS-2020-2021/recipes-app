<template>
  <div class="recipes-wrapper">
    <div class="all-recipes">
      <div class="add-recipe-button-wrapper">
        <button @click="onAddIcon" type="button" class="btn btn-warning">
          Add new Recipe
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-plus-square"
            viewBox="0 0 16 16"
          >
            <path
              d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
            />
            <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
            />
          </svg>
        </button>
      </div>
      <div
        v-for="recipe in meatCollection"
        :key="recipe.id"
        class="single-recipe-card"
      >
        <h1 class="recipe-name">{{ recipe.name }}</h1>
        <br />
        <img class="recipe-img" :src="recipe.src" />
        <h4 @click="showInfo(recipe)" class="recipe-show-desc">
          Click here to read Recipe Description
        </h4>
        <div class="action-buttons">
          <svg
            @click="onUpdateIcon(recipe)"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-pencil-square"
            viewBox="0 0 16 16"
          >
            <path
              d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
            />
            <path
              fill-rule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
            />
          </svg>
          <svg
            @click="onDeleteIcon(recipe)"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-trash"
            viewBox="0 0 16 16"
          >
            <path
              d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
            />
            <path
              fill-rule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
        </div>
      </div>
    </div>
    <Modal v-model="showDeleteModal" modalClass="modal-wrapper">
      <h3>Removing Recipe: {{ itemForDelete.name }}</h3>
      <div class="delete-action-buttons">
        <button
          class="btn btn-primary"
          @click="confirmDelete(itemForDelete.id)"
        >
          Confirm
        </button>
        <button class="btn btn-danger" @click="closeDeleteModal">Cancel</button>
      </div>
    </Modal>
    <Modal v-model="showInfoModal" modalClass="modal-wrapper modal-info">
      <h1>{{ itemForInfo.name }}</h1>
      <br />
      <p>{{ itemForInfo.description }}</p>
    </Modal>
    <Modal v-model="showUpdateModal" modalClass="modal-wrapper">
      <h2 class="add__modal-title">Update Recipe</h2>
      <div class="modal-content">
        <img :src="itemForUpdate.src" class="preview-image" />
        <h3 class="modal-content-name">Recipe Name</h3>
        <input
          class="modal__recipe__name-input"
          type="text"
          :maxlength="25"
          v-model.lazy="itemForUpdate.name"
        />
        <h3 class="modal-content-desc">Recipe Description</h3>
        <textarea
          name="desc"
          class="modal__recipe__desc-textarea"
          placeholder="Enter Recipe Description"
          :maxlength="1350"
          v-model.lazy="itemForUpdate.description"
        >
        </textarea>
      </div>
      <div class="delete-action-buttons">
        <button class="btn btn-primary" @click="confirmUpdate(itemForUpdate)">
          Confirm
        </button>
        <button class="btn btn-danger" @click="closeUpdateModal">Cancel</button>
      </div>
    </Modal>
    <Modal v-model="showAddModal" modalClass="modal-wrapper">
      <h2 class="add__modal-title">Add new Recipe</h2>
      <div class="modal-content">
        <h3 class="modal-content-name">Recipe Name</h3>
        <input
          placeholder="Enter Recipe Name"
          class="modal__recipe__name-input"
          :maxlength="25"
          v-model="recipeAdded.name"
          type="text">
        <h3 class="modal-content-name">Recipe Image</h3>
        <img
          style="border: none"
          :src="recipeAdded.src">
        <button
          @click="onPickFile()"
          class="upload-image-btn btn btn-light">
            Upload Image
        </button>
        <input
          ref="fileInput"
          class="add__modal-image-btn"
          style="display: none"
          accept="image/*"
          type="file"
          @change="onFilePicked"
        />
        <h3 class="modal-content-name">Recipe Description</h3>
        <textarea
          placeholder="Enter Recipe Description"
          class="modal__recipe__desc-textarea"
          name="desc"
          id="desc"
          :maxlength="1350"
          v-model="recipeAdded.description"
        />
      </div>
      <div class="delete-action-buttons">
        <button class="btn btn-primary" @click="confirmAdd(recipeAdded)">
          Confirm
        </button>
        <button class="btn btn-danger" @click="closeAddModal">Cancel</button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      itemForDelete: {},
      itemForInfo: {},
      itemForUpdate: {},
      showDeleteModal: false,
      showInfoModal: false,
      showUpdateModal: false,
      showAddModal: false,
      showAddModal: false,
      copyOfItemForUpdate: {},
      copyOfItemForAdd: {},
      recipeAdded: {
        name: '',
        src: '',
        description: ''
      }
    };
  },
  methods: {
    onDeleteIcon(recipe) {
      this.itemForDelete = recipe;
      this.showDeleteModal = true;
    },
    onUpdateIcon(recipe) {
      this.itemForUpdate = recipe;
      this.showUpdateModal = true;
      this.copyOfItemForUpdate = Object.assign({}, recipe);
    },
    onAddIcon() {
      this.showAddModal = true;
    },
    confirmDelete(id) {
      this.$store.dispatch("deleteMeatRecipe", id);
      this.closeDeleteModal();
      this.$store.dispatch("getMeatCollection");
    },
    async confirmUpdate() {
      await this.$store.dispatch("updateMeatRecipe", this.itemForUpdate);
      this.showUpdateModal = false;
      alert("Recipe was updated!");
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
    },
    closeUpdateModal() {
      Object.assign(this.itemForUpdate, this.copyOfItemForUpdate);
      this.showUpdateModal = false;
    },
    showInfo(recipe) {
      this.itemForInfo = recipe;
      this.showInfoModal = true;
    },
  },
  computed: {
    ...mapState(["meatCollection"]),
  },
  mounted() {
    this.$store.dispatch("getMeatCollection");
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.recipes-wrapper {
  background: rgb(243, 233, 206);
  height: 91.5vh;
  width: 100%;
}
.all-recipes {
  padding: 50px 100px;
  padding-top: 200px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.add-recipe-button-wrapper {
  padding-top: 30px;
  margin-right: 15%;
}
.btn-warning {
  color: black;
  width: 150px !important;
  height: 100px !important;
  font-size: 20px;
  font-family: "Indie Flower", cursive;
  font-weight: bold;
}
.single-recipe-card {
  background: rgb(248, 192, 107);
  border: 2px solid black;
  margin: 0 30px 0 0;
  padding: 20px 20px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  height: 550px;
}
.recipe-name,
.recipe-show-desc {
  font-family: "Indie Flower", cursive;
}
.recipe-name {
  font-weight: bolder;
}
.recipe-show-desc {
  margin-top: 40px;
  font-size: 25px;
}
.recipe-show-desc:hover,
.bi {
  cursor: pointer;
}
.bi {
  width: 25px;
  height: 25px;
}
.recipe-img {
  width: 250px;
  height: 250px;
  border: 1px solid black;
}
.modal-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.action-buttons {
  margin-top: 15px;
}
.delete-action-buttons {
  align-self: center;
  text-align: center;
  padding: 20px 0;
}
.btn {
  width: 100px;
  height: 50px;
}
.modal-info h1 {
  font-family: "Indie Flower", cursive;
  text-align: center;
}
.modal-info p {
  font-family: sans-serif;
  text-align: justify;
}
.add__modal-title {
  text-align: center;
  margin-bottom: 5px;
  font-family: "Indie Flower", cursive;
  font-weight: bold;
}
.preview-image {
  border: 1px solid black;
  border-radius: 5px;
  margin-bottom: 10px;
}
.modal-content {
  border: none !important;
  padding: 10px 0;
}
.modal-content-name,
.modal-content-desc {
  font-family: "Indie Flower", cursive;
  text-align: center;
  margin-top: 20px;
}
.modal__recipe__name-input,
.modal__recipe__desc-textarea {
  padding: 5px;
  font-family: sans-serif;
}
.modal__recipe__desc-textarea {
  height: 200px;
}
.modal-content-desc {
  margin-top: 15px;
}
.upload-image-btn {
  width: 50%;
  margin-top: 10px;
  align-self: center;
}
</style>
