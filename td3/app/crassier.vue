<template>
  <GridLayout colums="200,*">
    <Label
      col="1"
      :class="{ 'line-through': groceryItem.done }"
      :text="groceryItem.name"
    ></Label>
    <Label col="0" style="width:200px" @tap="toggle" :text="statusText"></Label>
    <!-- <Label col="0" text="🗑"></Label> -->
    <!-- <GridLayout col="2" class="delete-container" @tap="deleteItem">
                <StackLayout>
                    <Label @tap="deleteItem" text="🗑"></Label>
                </StackLayout>
            </GridLayout> --> 
  </GridLayout> 
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
    toggle: function() {
      //this.status = this.status === 0 ? 1 : 0;
      this.$emit("toggleDone", this.groceryItem);
    }
  }
};
</script>
<style lang="scss" scoped>
page {
  label {
    color: red;
  }
  .line-through {
    text-decoration: line-through;
  }
}
</style>
<style>
label {
  background-color: aqua;
  /* background-color: white; */
}
</style>
