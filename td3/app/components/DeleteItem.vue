<template>
  <!-- <Page style=""> -->
    <StackLayout>
      <Label text="Supprimer l'item"></Label>
     
      <Button text="Supprimer"></Button>
      <Button text="Retour"></Button>
    </StackLayout>
  <!-- </Page> -->
</template>
<script>
export default {
  props: ["item"],
  data: function() {
    return {
      name: " "
    };
  },
  methods: {
    onDeleteTap() {
        
    },
  }
};
</script>
