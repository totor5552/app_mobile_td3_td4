import Vue from "nativescript-vue";

import Connexion from "./components/Connexion";



new Vue({
    components: { Connexion },
    template: `
<Frame>
<Connexion />
</Frame>`


    
    // render: function (h) {
    // }
    // render: h => h("frame", [h(App)])
}).$start();
