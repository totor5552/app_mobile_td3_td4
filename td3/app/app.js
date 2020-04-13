import Vue from "nativescript-vue";

import App from "./components/App";

new Vue({
    components: { App },
    template: `
<Frame>
<App />
</Frame>`

    
    // render: function (h) {
    // }
    // render: h => h("frame", [h(App)])
}).$start();
