<template>
  <v-container fluid grid-list-sm secondary>
    <v-layout>
      <v-expansion-panel expand>
        <v-expansion-panel-content v-for="(item,i) in 5" :key="i" v-bind:value="item === 2">
          <div slot="header">Item</div>
          <v-card>
            <v-card-text class="grey lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-layout>
  </v-container>

</template>

<script>
  /* eslint-disable space-before-function-paren */

  export default {
    methods: {
    },
    data() {
      return {}
    }
  }
</script>
