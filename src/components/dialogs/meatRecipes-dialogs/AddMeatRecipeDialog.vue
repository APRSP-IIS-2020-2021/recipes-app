<template>
  <Modal v-model="showAddModal" modalClass="modal-wrapper">
    <h2 class="add__modal-title">Add new Recipe</h2>
    <div class="modal-content">
      <h3 class="modal-content-name">Recipe Name</h3>
      <input
        placeholder="Enter Recipe Name"
        class="modal__recipe__name-input"
        :maxlength="25"
        v-model="recipeAdded.name"
        type="text"
      />
      <h3 class="modal-content-name">Recipe Image</h3>
      <img class="image-preview" :src="recipeAdded.src" />
      <button @click="onPickFile()" class="upload-image-btn btn btn-light">
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
</template>

<script>
export default {
  data() {
    return {
      previewImage: null,
      recipeAdded: {
        name: "",
        src: "",
        description: "",
      },
    };
  },
  props: {
    showAddModal: Boolean,
  },
  methods: {
    onFilePicked(event) {
      const files = event.target.files;
      let fileName = files[0].name;
      if (fileName.lastIndexOf(".") <= 0) {
        alert("Please provide image");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.recipeAdded.src = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.previewImage = files[0];
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    async confirmAdd() {
      if(!this.previewImage) {
        alert('No image was selected!');
        return
      }
      const meatRecipe = {
        name: this.recipeAdded.name,
        src: this.previewImage,
        description: this.recipeAdded.description
      }
      await this.$store.dispatch('createMeatRecipe', meatRecipe);
      this.$store.dispatch('getMeatCollection');
      this.closeAddModal();
    },
    closeAddModal() {
      this.showAddModal = false;
      this.$emit('addDialogClosed', this.showAddModal);
    },
  },
};
</script>

<style scoped>
  @import '../../../assets/dialogs.css';
</style>
