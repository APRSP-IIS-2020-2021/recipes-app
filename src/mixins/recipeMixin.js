export const recipeMixin = {
  data() {
    return {
      filterText: '',
      itemForDelete: {},
      itemForInfo: {},
      itemForUpdate: {},
      showDeleteModal: false,
      showInfoModal: false,
      showUpdateModal: false,
      showAddModal: false,
      showAddModal: false,
      copyOfItemForUpdate: {}
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
    showInfo(recipe) {
      this.itemForInfo = recipe;
      this.showInfoModal = true;
    },
    loggedUser(recipe) {
      let userId = this.userProfile.id;
      return userId===recipe.userId ? true : false;
    }
  }
}
