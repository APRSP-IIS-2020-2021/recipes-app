<template>
  <Modal v-model="showUpdateModal" modalClass="modal-wrapper">
    <h2 class="add__modal-title">Update Recipe</h2>
    <div class="modal-content">
      <img :src="itemForUpdate.src" class="image-preview" />
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
</template>

<script>
  export default {
    props: {
      showUpdateModal: Boolean,
      itemForUpdate: Object,
      copyOfItemForUpdate: Object
    },
    methods: {
      closeUpdateModal() {
        Object.assign(this.itemForUpdate, this.copyOfItemForUpdate);
        this.showUpdateModal = false;
        this.$emit('updateDialogClosed', this.showUpdateModal);
        this.$emit('originalRecipe', this.itemForUpdate);
      },
      async confirmUpdate() {
        await this.$store.dispatch("updatePastaRecipe", this.itemForUpdate);
        this.closeUpdateModal();
        this.$store.dispatch("getPastaCollection");
      },
    }
  };
</script>

<style scoped>
  @import '../../../assets/dialogs.css';
</style>
