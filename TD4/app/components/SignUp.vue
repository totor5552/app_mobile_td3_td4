<template>
    <StackLayout>
        <Label text="Create an account"></Label>
        <TextField v-model="Email" hint="Email"></TextField>
        <TextField v-model="FirstName" hint="firstname"></TextField>
        <TextField v-model="LastName" hint="lastname"></TextField>
        <Button text="Sign up" @tap="onSaveTap"></Button>
    </StackLayout>
</template>
<script>
const axios = require("axios");

export default {
    props: ["id"],
    data: function() {
        return {
            Email: "",
            FirstName: "",
            LastName: "",
            Reponse: "",
            passwordkk:"",
            connected : false,
        };
    },


    methods: {
        onSaveTap() {
            axios({
            method: "post",
            url: "https://api.todolist.sherpa.one/users/signup",
            data: {
                email: this.Email,
                firstname: this.FirstName,
                lastname: this.LastName,
                gender: "male"
            }
            })
            .then(result => {
                this.Reponse = result.data;
                console.log(result.data);
                this.passwordkk = result.data.password;
                alert("Votre mot de passe : " + this.passwordkk);
            })
            .catch(err => {
                this.Reponse = err.message;
                console.error(err.message);
            })
            .finally(() => {
                this.$modal.close(this.passwordkk);
            });
        },
    },
};
</script>
