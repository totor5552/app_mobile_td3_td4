<template>
  <Page>
    <ActionBar title="Groceries">
      <ActionItem text="Accueil" @tap=""></ActionItem>
      <ActionItem text="Add" @tap="onAddTap"></ActionItem>
      <ActionItem text="Show all" @tap="showAll"></ActionItem>
    </ActionBar>
    <StackLayout>
      <GroceryList :items="items" />
    </StackLayout>
  </Page>
</template>

<script>
import GroceryList from "./GroceryList";
import groceryData from "../grocery-data.json";
import AddItem from "./AddItem";
import * as localStroage from "nativescript-localstorage";

export default {
  components: { GroceryList, AddItem },
  data() {""
    return {
      items: groceryData.groceryItems
    };
  },

  methods: {
    onAddTap() {
      const newId = new Date().getTime();
      this.$showModal(AddItem, { props: { id: newId } }).then(newItem => {
        if (newItem) {
          this.items.push(newItem);
          localStorage.setItem(newItem, JSON.stringify(this[newItem]))
        }
      });
    },

    showAll(){
      this.items.forEach(Element =>{
         Element.deleted = false;
      });
      },

    getTodos() {
      if (localStorage.getItem("items")) {
        this.items = JSON.parse(localStorage.getItem("items"));
      }
     }
  },

  mounted() {
    this.getTodos();
  },
  watch: {
    items: {
      handler: function(updatedList) {
        localStorage.setItem("items", JSON.stringify(updatedList));
      },
      deep: true
    }
  },
};
</script>

<style scoped lang="scss">
@import "~@nativescript/theme/scss/variables/blue";

// Custom styles
.fas {
  @include colorize($color: accent);
}

.info {
  font-size: 20;
  horizontal-align: center;
  vertical-align: center;
}
</style>
