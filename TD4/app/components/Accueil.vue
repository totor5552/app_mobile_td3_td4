<template>
  <Page>
    <ActionBar title="Todo">
      <ActionItem text="ajouter item" @tap="onAddTap"></ActionItem>
    </ActionBar>
    <StackLayout>
      <ListView for="todo in todos" @itemTap="accessDetail">
        <v-template>
          <StackLayout orientation="horizontal" width="500" height="50" >
            <Label :text="todo.content" :class="{ 'line-through': todo.done }" width="100"/>
          </StackLayout>
        </v-template>
      </ListView>
      
    </StackLayout>
  </Page>
</template>

<script>

import * as btoa from 'btoa';
import {encode, decode} from "base-64";
import * as utf8 from "utf8";


import Detail from "./Detail";
import Connexion from "./Connexion";
import AddList from "./AddList";
import * as localStorage from "nativescript-localstorage";

const axios = require("axios");

export default {
  components: { AddList, Connexion, Detail },
  data() {
    return {
      todos:[],
    };
  },

  methods: {

    testlocalstorage(){
      console.log("token: "+localStorage.getItem('token'))
      console.log("------------------------")
      console.log("uuid: "+localStorage.getItem('uuid'))
    },

    accessDetail(args){
      this.$navigateTo(Detail, {
        props: { item: args.item }
      });
    },

    onToggleDone(item) {
      axios({
        method: "patch",
        url: "https://api.todolist.sherpa.one/users/"+localStorage.getItem('uuid')+"/todos/"+item.uuid,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`
        },
    data:{ "content": item.name, "done":!item.done}
      })
        .then(result => {
          console.log(result.data);

        })
        .catch(err => {
          console.error(err.response.request._response);
       
                 console.log(err);
        })
        .finally(() => {
        this.getTodos();
        });  
    },

    onAddTap() {
      const newId = new Date().getTime();
      this.$showModal(AddList, { props: { id: newId } }).then(newItem => {
        if (newItem) {
          axios({
          method: "post",
          url: "https://api.todolist.sherpa.one/users/"+localStorage.getItem('uuid')+"/todos",
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}`
          }, data:{ "content": newItem.content}
          })
          .then(result => {
            console.log(result.data);
          })
          .catch(err => {
            console.error(err.response.request._response);
          })
          .finally(() => {
          this.getTodos();
          });    

        }
      });
    },


    getTodos(){
      axios({
        method: "get",
        url: "https://api.todolist.sherpa.one/users/"+localStorage.getItem('uuid')+"/todos",
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
      })
      .then(result => {
        this.todos=result.data.todos;
          console.log(result.data.todos);
      })
      .catch(err => {
        console.error(err.response.request._response);
      })
    },

  },

  mounted() {
    this.testlocalstorage();
    this.getTodos();

    if(!global.btoa) {
      global.btoa = encode;
    }
  },
  watch: {

  },
};
</script>

<style scoped lang="scss">
@import "~@nativescript/theme/scss/variables/blue";

// Custom styles

.connexion {
  background-color: white;
}

.fas {
  @include colorize($color: accent);
}

.info {
  font-size: 20;
  horizontal-align: center;
  vertical-align: center;
}
</style>
