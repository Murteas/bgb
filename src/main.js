// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '../node_modules/mdi/css/materialdesignicons.min.css'
Vue.use(Vuetify)

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    // from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    shuffle(array) {
      let currentIndex = array.length;
      let temporaryValue, randomIndex;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        Vue.set(array, currentIndex, array[randomIndex]);
        Vue.set(array, randomIndex, temporaryValue);
        array[randomIndex] = temporaryValue
      }
      return array
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
