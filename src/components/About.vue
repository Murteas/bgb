<template>
  <div>
   <v-container>
        <v-layout align-center>
          <v-flex text-xs-center>
            <h1 class="display-3">Board Game Buddy</h1>
            <h5>v.0.2.2a</h5>
          </v-flex>
            <v-btn color="red" dark v-if="!warning" @click="warning = true">Clear all Saved Data</v-btn>
          <v-alert type="warning" dismissible v-model="warning" >
            Are you sure you want to delete all saved data in Board Game Buddy?
            <v-btn color="deep-orange accent-3" @click="clearData()">YES</v-btn>
          </v-alert>
        </v-layout>
      </v-container>
  </div>
</template>

<script>
    export default {
      name: 'about',
      data: () => ({
        warning: false
      }),
      methods: {
        clearData() {
          localStorage.clear();
          this.warning = false;
        }
      }
    }
</script>
