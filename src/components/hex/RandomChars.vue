<template>
  <v-container grid-list-md justify-start>
    <v-layout row wrap>
      <v-btn @click.native="selectChars(8)">
        <v-icon>mdi-dice-multiple</v-icon>
        <b>Gen Characters</b>
      </v-btn>
      <v-layout row wrap>
        <v-flex v-for="char in chars" :key="char.role">
          <v-chip color="indigo darken-3">
            <h2><b>{{char.race}}</b>  <i>{{char.role}}</i></h2>
          </v-chip>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    name: 'random-chars',
    mounted() {
      this.selectChars(8);
    },
    watch: {
    },
    methods: {
      selectChars: function (num) {
        this.chars = [];
        this.shuffle(this.roles);
        this.shuffle(this.races);
        let role = '';
        let race = '';

        for (let i = 0; i < num; i++) {
          role = this.roles[i];
          race = this.races[i];
          this.chars.push({'role': role, 'race': race});
        }
      }
    },
    data() {
      return {
        chars: [],
        roles: ['Apothecary', 'Beastmaster', 'Berserker', 'Brute', 'Cartographer', 'Elementalist', 'Divine One', 'Guardian', 'Hunter', 'Illusionist', 'Minstrel', 'Necromancer', 'Nomad', 'Oracle', 'Priest', 'Rabble Rouser', 'Scoundrel', 'Shaman', 'Sorcerer', 'Summoner', 'Tinkersmith', 'Trap Specialist', 'Weaponsmith', 'Wilder'],
        races: ['Minotaur', 'Kitsune', 'Leprechaun', 'Ursimar', 'Fallen One', 'Gremlin', 'Gray Dwarf', 'Human', 'Elf', 'Dwarf', 'Automaton', 'Shifter', 'Troll', 'Halfling', 'Ork', 'Gnome', 'Lizardman', 'Stonemar', 'Half Elf', 'Dryad', 'Pixie', 'Centaur', 'Demonborn', 'Ogre', 'Angelborn', 'Illumon', 'Goblin', 'Shade', 'Dragonkin', 'Half Giant']
      }
    }
  }
</script>

