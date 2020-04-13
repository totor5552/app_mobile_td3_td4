<template>
 <StackLayout
    orientation="horizontal"
    width="5000"
    height="50"
  >
    <Label :text="groceryItem.name" width="100" height="50" />
    <Label @tap="toggle" :text="statusText" width="100" height="50" style="margin-right:600px;" />
    <Label @tap="Delete(groceryItem)" text="🗑" width="30" height="50" />
  </StackLayout>
</template> 
<script>
// import DeleteItem from "./DeleteItem";

export default {
  props: ["groceryItem"],

  data: function() {
    return {
      status: 0
    };
  },
  computed: {
    statusText: function() {
      return this.groceryItem.done ? "Done" : "Not done";
    }
  },
  methods: {
    toggle: function() {
      //this.status = this.status === 0 ? 1 : 0;
      this.$emit("toggleDone", this.groceryItem);
    },

    Delete: function(element) {
      confirm("Supprimer l'item " + element.name + " ?").then(result =>{
        if(result){
          element.deleted = true;
        }
      });

    },

  }
};
</script>
<style lang="scss" scoped>
page {
  label {
    color: white;
  }
  .line-through {
    text-decoration: line-through;
  }
}
</style>
<style>
label {
  background-color: transparent;
  /* background-color: aqua; */
  /* background-color: white; */
}
</style>
