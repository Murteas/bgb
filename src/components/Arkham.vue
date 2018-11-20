<template>
  <v-container fluid grid-list-sm>
    <v-layout row wrap>
      <v-flex md4 sm4>
        <v-expansion-panel expand>
          <v-expansion-panel-content>
            <div slot="header">Build the Chaos Bag</div>
            <build-bag/>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
      <v-flex md6 sm6>
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
  import BuildBag from './arkham/BuildBag'

  export default {
    components: {
      ChaosBag,
      'chaos-bag': ChaosBag,
      BuildBag,
      'build-bag': BuildBag
    },
    data() {
      return {
      }
    }

  }
</script>
