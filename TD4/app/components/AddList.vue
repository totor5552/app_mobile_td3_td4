<template>
    <StackLayout>
      <Label text="nouvelle liste"></Label>
      <TextField v-model="content" hint="nom"></TextField>
      <Button text="Save" @tap="onSaveTap"></Button>
    </StackLayout>
</template>
<script>
export default {
  props: ["id"],
  data: function() {
    return {
      content: ""
    };
  },
  methods: {
    onSaveTap() {
      const newItem = {
        id: this.id,
        content: this.content
      };
      this.$modal.close(newItem);
    }
  }
};
</script>
