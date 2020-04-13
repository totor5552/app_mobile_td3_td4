<template>
  <Page>
    <GridLayout colums="50, 50" rows="150,75">
      <Label col="0" row="0" :text="item.content"></Label>
      <Label col="1" row="0" style="width:200px;" @tap="toggle" :text="statusText" ></Label>
 <Label @tap="Delete(item)" text="🗑" width="30" height="50" />
      <Button row="1" style="width:100%; height:10%;" text="retour" @tap="onBackTap"></Button>
    </GridLayout>
   
  </Page>
</template>
<script>
import axios from "axios";
import * as btoa from 'btoa';
import {encode, decode} from "base-64";
import * as utf8 from "utf8";


export default {
  props: ["item"],

  data: function() {
    return {
      done: this.item.done
    };
  },
  computed: {
    statusText: function() {
      return this.done ? "Done" : "Not done";
    }
  },
  methods: {
    onBackTap() {
      this.$navigateBack();
    },
    toggle() {
      axios({
        method: "patch",
        url: "https://api.todolist.sherpa.one/users/"+localStorage.getItem('uuid')+"/todos/"+this.item.uuid,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
        data:{ "done":!this.item.done}
      })
      .then(result => {
        console.log(result.data);
        this.fait=!this.fait;
      })
      .catch(err => {
        console.error(err.response.request._response);   
        console.log(err);
      })
    },

    Delete: function(element) {
      confirm("Supprimer l'item " + element.content + " ?").then(result =>{
        if(result){
          element.deleted = true;
          this.$navigateBack();
        }
      });

    },
  }
};
</script>
