<template>
  <v-container fluid grid-list-sm>
    <v-layout row wrap>
      <v-flex md4 sm4>
        <v-expansion-panel expand>
          <v-expansion-panel-content>
            <div slot="header">Chaos Bag</div>
            <chaos-bag/>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  /* eslint-disable space-before-function-paren */

  import ChaosBag from './arkham/ChaosBag'

  export default {
    components: {
      ChaosBag,
      'chaos-bag': ChaosBag
    },
    data() {
      return {
      }
    }

  }
</script>
