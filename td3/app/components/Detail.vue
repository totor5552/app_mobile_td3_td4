<template>
  <Page>
    <GridLayout colums="50, 50" rows="150,75">
      <Label col="0" row="0" :text="groceryItem.name"></Label>
      <Label
        col="1"
        row="0"
        style="width:200px;"
        @tap="toggle"
        :text="statusText"
      ></Label>
 <Label @tap="Delete(groceryItem)" text="🗑" width="30" height="50" />
      <Button
        row="1"
        style="width:100%; height:10%;"
        text="Go back"
        @tap="onBackTap"
      ></Button>
    </GridLayout>
   
  </Page>
</template>
<script>
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
    onBackTap() {
      this.$navigateBack();
    },
    toggle: function() {
      //this.status = this.status === 0 ? 1 : 0;
      this.groceryItem.done = !this.groceryItem.done;
      // this.$emit("toggleDone", this.groceryItem);
    },

    Delete: function(element) {
      confirm("Supprimer l'item " + element.name + " ?").then(result =>{
        if(result){
          element.deleted = true;
          this.$navigateBack();
        }
      });

    },
  }
};
</script>
