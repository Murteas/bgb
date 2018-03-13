<template>
  <v-layout>
    <v-card>
      <v-card-title>Loot Deck</v-card-title>
      <v-btn flat icon color="light-green">
        <v-icon>mdi-cards</v-icon>
      </v-btn>
      <v-carousel>
        <v-carousel-item v-for="(item,i) in items" v-bind:src="item.src" :key="i"></v-carousel-item>
      </v-carousel>
    </v-card>

  </v-layout>
</template>

<script>
  export default {
    name: 'loot-deck',
    data () {
      return {
        items: [
          {
            src: '/static/img/heroes/Bandido.png'
          },
          {
            src: '/static/img/heroes/Gunslinger.png'
          },
          {
            src: '/static/img/heroes/Indian Scout.png'
          },
          {
            src: '/static/img/heroes/Preacher.png'
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
