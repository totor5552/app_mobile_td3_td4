<template>
  <page>
    <ActionBar title="Connexion">
      <ActionItem text="Sign up" @tap="modalSignUp"></ActionItem>
      <!-- <ActionItem text="Password forget" @tap="test"></ActionItem> -->
    </ActionBar>
    <StackLayout class="form">
      <StackLayout class="input-field">
        <TextField v-model="email" hint="Email"></TextField>
      </StackLayout>

      <StackLayout class="input-field">
        <TextField v-model="password" hint="password" secure="false"></TextField>
      </StackLayout>

      <Button text="Log In" @tap="SignIn"></Button>
    </StackLayout>
  </page>
</template>

<script>
//mail laik@gmail.com
//password WyXSKHUS+c
//uuid a472c800-62e5-11ea-a27d-cb085bb44065

// JS: { email: 'laik@gmail.com',
// JS:   password: 'WyXSKHUS+c',
// JS:   uuid: 'a472c800-62e5-11ea-a27d-cb085bb44065' }


import * as btoa from 'btoa';
import {encode, decode} from "base-64";
import * as utf8 from "utf8";
import Accueil from "./Accueil";
import SignUp from "./SignUp";

const axios = require("axios");

export default {

  props : ["connected"],

  data() {
    return {
      email:"",
      password:"",
      token:"",
      uuid:""
    };
  },

  methods: {
    SignIn(){
      axios({
        method: "post",
        url: "https://api.todolist.sherpa.one/users/signin",
        auth: {
          "username": this.email,
          "password": this.password
        }
      })
      .then(result => {
        // console.log(result.data);
        this.token=result.data.token;
        this.uuid=result.data.user.uuid;
        localStorage.setItem("token", this.token);
        localStorage.setItem("uuid", this.uuid);
        this.connected = true;
        this.$navigateTo(Accueil);
        // this.$navigateTo(Accueil ,{
        //   props: {
        //     token: JSON.stringify(this.token),
        //     uuid: JSON.stringify(this.uuid),
        //   }} );
      })
      .catch(err => {
        console.error(err);
        alert("Identification impossible");
      });
    },

    modalSignUp(){
      this.$showModal(SignUp);
    },


  },

  mounted(){
    if(!global.btoa) {
      global.btoa = encode;
    }
  }

};
</script>

<style scoped lang="scss">


</style>