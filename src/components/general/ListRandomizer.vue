<template>
  <v-container grid-list-sm secondary>
      <v-layout align-center column >
        <v-flex>
          <h1>List Randomizer</h1>
        </v-flex>
        <v-layout row>
          <v-flex sm6 md6>
            <v-text-field v-model="currentList" textarea rows="10"
                          label="Original List" placeholder="1 item per line">
            </v-text-field>
          </v-flex>
          <v-flex sm6 md6>
            <v-text-field v-model="shuffleResults" box readonly textarea rows="10"
                          color="green" label="Shuffled List">
            </v-text-field>
          </v-flex>
        </v-layout>
        <v-btn @click.native="shuffleList()">
          <v-icon>mdi-shuffle</v-icon>
          <b>Shuffle</b>
        </v-btn>
      </v-layout>
  </v-container>
</template>
<script>
  /* eslint-disable space-before-function-paren */
  export default {
    name: 'list-randomizer',
    mounted() {
      if (localStorage.getItem('list_rdm_current')) {
        this.currentList = localStorage.getItem('list_rdm_current');
      }
      if (localStorage.getItem('list_rdm_results')) {
        this.shuffleResults = localStorage.getItem('list_rdm_results');
      }
    },
    methods: {
      shuffleList: function () {
        localStorage.setItem('list_rdm_current', this.currentList);
        this.objects = this.currentList.split('\n');
        this.shuffle(this.objects);
        this.shuffleResults = this.objects.join('\n');
        localStorage.setItem('list_rdm_results', this.shuffleResults);
      }
    },
    data() {
      return {
        currentList: '',
        shuffleResults: '',
        numResults: 3,
        objects: []
      }
    }

  }
</script>
