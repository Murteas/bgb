<template>
  <v-container grid-list-md justify-start>
    <v-layout row wrap>
      <v-btn @click.native="selectChars(8)">
        <v-icon>mdi-dice-multiple</v-icon>
        <b>Gen Characters</b>
      </v-btn>
      <v-layout row wrap>
        <v-flex v-for="char in chars" :key="char.role">
          <v-chip color="orange accent-2" outline text-color="white">
            <h2><span style="color:steelblue"><i>{{char.trait}}</i></span>      <span style="color:seagreen">{{char.race}}</span>      <b>{{char.role}}</b></h2>
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
        this.shuffle(this.traits);
        let role = '';
        let race = '';
        let trait = '';

        for (let i = 0; i < num; i++) {
          role = this.roles[i];
          race = this.races[i];
          trait = this.traits[i];
          this.chars.push({'role': role, 'race': race, 'trait': trait});
        }
      }
    },
    data() {
      return {
        chars: [],
        roles: ['Guardian', 'Historian', 'Minstrel', 'Nomad', 'Warden', 'Weaponsmith', 'Apothecary', 'Divine One', 'Floromancer', 'Oracle', 'Priest', 'Elementalist', 'Shaman', 'Sorcerer', 'Solipsist', 'Soul Reaver', 'Wilder', 'Berserker', 'Brute', 'Necromancer', 'Rabble Rouser', 'Stormcaller', 'Summoner', 'Beastmaster', 'Cartographer', 'Druid', 'Hunter', 'Illusionist', 'Scoundrel', 'Tinkersmith', 'Trap Specialist', 'Verdant Keeper', 'Beast Lord', 'Spellblade', 'Vagabond', 'Realm Crosser', 'Rune Master', 'Wellspring Channeler'],
        races: ['Minotaur', 'Kitsune', 'Leprechaun', 'Ursimar', 'Fallen One', 'Gremlin', 'Gray Dwarf', 'Human', 'Elf', 'Dwarf', 'Automaton', 'Shifter', 'Troll', 'Halfling', 'Ork', 'Gnome', 'Lizardman', 'Stonemar', 'Half Elf', 'Dryad', 'Pixie', 'Centaur', 'Demonborn', 'Ogre', 'Angelborn', 'Illumon', 'Goblin', 'Shade', 'Dragonkin', 'Half Giant', 'Angelborn', 'Automaton', 'Centaur', 'Demonborn', 'Dragonkin', 'Dryad', 'Dwarf', 'Elf', 'Gnome', 'Goblin', 'Gray Dwarf', 'Half Elf', 'Half Giant', 'Halfling', 'Human', 'Illumon', 'Lizardman', 'Ogre', 'Ork', 'Pixie', 'Shade', 'Shifter', 'Stonemar', 'Troll', 'Fallen One', 'Gremlin', 'Highlander', 'Kitsune', 'Leprechaun', 'Minotaur', 'Moor Gnome', 'Morlok', 'Ursimar', 'Sapphire Golem', 'Young Golden Dragon', 'Boggard', 'Briarkin', 'Brownie', 'Den Troll', 'Fairy', 'Faun', 'Forestborn', 'Korrigan', 'Nixie', 'Sídhe', 'Sprite', 'Wood Elf', 'Forest Guardian', 'Ivy Knight', 'Moon Elf', 'Shroomer', 'Spiderkin', 'Treant', 'Feathered Dragon'],
        traits: ['','','','Gluttonous', 'Headstrong', 'Hypersomniac', 'Leader', 'Reckless', 'Spirited', 'Stingy', 'Strong-Willed', 'Thrifty', 'Tough', 'Vengeful', 'Wrathful', 'Aggressive', 'Analytical', 'Gentle', 'Guide', 'Heroic', 'Resilient', 'Scavenger', 'Skilled', 'Stealthy', 'Survivalist', 'Wild', 'Vigorous']
      }
    }
  }
</script>

