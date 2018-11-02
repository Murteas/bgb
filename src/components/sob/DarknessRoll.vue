<template>
  <v-container fluid grid-list-sm>
    <v-layout row wrap>
      <v-btn @click.native="DarknessRoll()">
        <v-icon>mdi-dice-multiple</v-icon>
        <b>Roll</b>
      </v-btn>
      <v-btn :color="locationColor" @click.native="nextWorld()">{{currentLocation}}</v-btn>
      <h1>{{die1}} + {{die2}} = {{rollSum}} </h1>
      <v-flex xs12>{{currentEffect}}</v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    name: 'darkness-roll',
    mounted() {
      this.DarknessRoll();
    },
    methods: {
      DarknessRoll() {
        this.die1 = this.rollDice(1, 6);
        this.die2 = this.rollDice(1, 6);
        this.rollSum = this.die1 + this.die2;
        this.UpdateEventText();
      },
      UpdateEventText() {
        if (this.die1 !== this.die2) {
          this.currentEffect = 'No event'
        } else {
          let dieRoll = this.die1 - 1;
          switch (this.currentLocation) {
            case 'Mines':
              this.currentEffect = 'Mines: ' + this.Mines[dieRoll].description;
              break;
            case 'Targa':
              this.currentEffect = 'Targa: ' + this.Targa[dieRoll].description;
              break;
            case 'Jargono':
              this.currentEffect = 'Jargono: ' + this.Jargono[dieRoll].description;
              break;
            case 'Cynder':
              this.currentEffect = 'Cynder: ' + this.Cynder[dieRoll].description;
              break;
            case 'Trederra':
              this.currentEffect = 'Trederra: ' + this.Trederra[dieRoll].description;
              break;
            case 'DerelictShip':
              this.currentEffect = 'Derelict Ship: ' + this.DerelictShip[dieRoll].description;
              break;
            case 'Town':
              this.currentEffect = 'Town: ' + this.Town[dieRoll].description;
              break;
            case 'BlastedWastes':
              this.currentEffect = 'Blasted Wastes: ' + this.BlastedWastes[dieRoll].description;
              break;
          }
        }
      },
      nextWorld() {
        this.locationIndex += 1;
        if (this.locationIndex >= this.Worlds.length) {
          this.locationIndex = 0;
        }
        this.currentLocation = this.Worlds[this.locationIndex].name;
        this.locationColor = this.Worlds[this.locationIndex].color;
        this.UpdateEventText();
      }
    },
    data() {
      return {
        die1: 0,
        die2: 0,
        rollSum: 0,
        currentEffect: '',
        currentLocation: 'Mines',
        locationColor: 'blue-grey darken-4',
        locationIndex: 0,
        Worlds: [
          {
            name: 'Mines',
            color: 'blue-grey darken-4'
          },
          {
            name: 'Targa',
            color: 'light-blue'
          },
          {
            name: 'Jargono',
            color: 'light-green darken-2'
          },
          {
            name: 'Cynder',
            color: 'deep-orange darken-3'
          },
          {
            name: 'DerelictShip',
            color: 'deep-purple accent-2'
          },
          {
            name: 'Trederra',
            color: 'lime darken-3'
          },
          {
            name: 'Town',
            color: 'brown lighten-2'
          },
          {
            name: 'BlastedWastes',
            color: 'brown darken-3'
          }
        ],
        Mines: [
          {
            roll: '1',
            description: '1 Ambush Attack - There are fiendish creatures and demons in the dark places of the world! Ambush Attack! Draw a threat to immediately Ambush the Heroes.'
          },
          {
            roll: '2',
            description: '2 Dark Dread – Things are looking more and more bleak by the moment! Draw a Growing Dread card to add to the stack.'
          },
          {
            roll: '3',
            description: '3 Creeping Darkness – The Darkness is always searching for a way out! Move the Darkness 2 steps forward on the Depth Track.'
          },
          {
            roll: '4',
            description: '4 Falling Rubble – The rocky ceiling of the mine shaft is unstable and prone to collapse. Each Hero in the Mines immediately takes D6 Hits.'
          },
          {
            roll: '5',
            description: '5 Terrifying Shriek – A shriek of pain and suffering echoes through the mine, chilling you to the bone. Each Hero in the Mines immediately takes D6 Horror Hits.'
          },
          {
            roll: '6',
            description: '6 Stubborn Resolve – This place is horrible and unforgiving, but you’re not about to give up without a fight! Each Hero may immediately Heal D6 Wounds/Sanity (any mix) or Recover 1 Grit. KO’d Heroes may immediately Recover, rolling for their Injury/Madness and Healing 2D6 Wounds/Sanity (any mix) as normal for Recovering.'
          }
        ],
        Targa: [
          {
            roll: '1',
            description: '1 Ambush Attack - There are fiendish creatures and demons in the dark places of the world! Ambush Attack! Draw a threat to immediately Ambush the Heroes.'
          },
          {
            roll: '2',
            description: '2 Dark Dread – Things are looking more and more bleak by the moment! Draw a Growing Dread card to add to the stack.'
          },
          {
            roll: '3',
            description: '3 Creeping Darkness – The Darkness is always searching for a way out! Move the Darkness 2 steps forward on the Depth Track.'
          },
          {
            roll: '4',
            description: '4 Blizzard – The icy chill turns to whipping winds as a blizzard sets in! – Weather- While in Targa Plateau, a Hero takes 1 automatic Hit at the start of each turn.'
          },
          {
            roll: '5',
            description: '5 Echoes of Death – For a moment, ghostly figues of a long-dead race can be seen moving through the halls. As you look on in disbelief, one of them stops… and looks back at you. One Random Hero in the Targa Plateau immediately takes 2D6 Horror Hits.'
          },
          {
            roll: '6',
            description: '6 Treasures of the Past – Though the ancient city has long been abandoned, valuable items can still be found, often just laying around as though the previous inhabitants just vanished. Each Hero may immediately draw a Loot card. KO’d Heroes may immediately Recover, rolling for their Injury/Madness and Healing 2D6 Wounds/Sanity (any mix) as normal for Recovering.'
          }
        ],
        Jargono: [
          {
            roll: '1',
            description: '1 Ambush Attack - There are fiendish creatures and demons in the dark places of the world! Ambush Attack! Draw a threat to immediately Ambush the Heroes.'
          },
          {
            roll: '2',
            description: '2 Dark Dread – Things are looking more and more bleak by the moment! Draw a Growing Dread card to add to the stack.'
          },
          {
            roll: '3',
            description: '3 Creeping Darkness – The Darkness is always searching for a way out! Move the Darkness 2 steps forward on the Depth Track.'
          },
          {
            roll: '4',
            description: '4 Volley of Arrows – A volley of serpentman arrows rains down from the treetops above! Each Hero in Jargono takes 3 Hits. Any Hero that takes 1 or more Wounds, also gains a Poison marker.'
          },
          {
            roll: '5',
            description: '5 Tribal Drums – In the distance, you hear the thundering war drums of a savage tribe. They’re getting louder and louder with every step you take. Each Hero in Jargono must discard 1 Grit or take D6 Sanity damage with no Willpower saves.'
          },
          {
            roll: '6',
            description: '6 Fountain of Life – A wellspring bubbles up here, rejuvenating all that touches its waters! Each Hero may immediately Heal D6 Wounds/Sanity (any mix) and remove any Poison markers on them. KO’d Heroes may immediately Recover, rolling for their Injury/Madness and Healing 2D6 Wounds/Sanity (any mix) as normal for Recovering.'
          }
        ],
        Cynder: [
          {
            roll: '1',
            description: '1 Ambush Attack - There are fiendish creatures and demons in the dark places of the world! Ambush Attack! Draw a threat to immediately Ambush the Heroes.'
          },
          {
            roll: '2',
            description: '2 Dark Dread – Things are looking more and more bleak by the moment! Draw a Growing Dread card to add to the stack.'
          },
          {
            roll: '3',
            description: '3 Creeping Darkness – The Darkness is always searching for a way out! Move the Darkness 2 steps forward on the Depth Track.'
          },
          {
            roll: '4',
            description: '4 Fires of Cynder – The Corrupting flames of Cynder erupt all around, burning the Heroes! Each Hero in Cynder takes D3 Burning Markers and 1 Corruption Point, ignoring Willpower.'
          },
          {
            roll: '5',
            description: '5 The Burden of Judgment – Shrieks of agony and torment echo through your mind as the dark eye of judgment falls on you, scrutinizing your worthiness. Each Hero in Cynder immediately takes 2 Sanity Damage, ignoring Willpower, for each Corruption Point he/she has.'
          },
          {
            roll: '6',
            description: '6 Flicker of Hope – A flicker of hope can be seen through the flashing flames… you must press on! Each Hero may immediately remove any Burning Markers they have as well as to either Heal 2D6 Wounds/Sanity (any mix) or remove D6 Corruption Points. KO’d Heroes may immediately Recover, rolling for their Injury/Madness and Healing 2D6 Wounds/Sanity (any mix) as normal for Recovering.'
          }
        ],
        DerelictShip: [
          {
            roll: '1',
            description: '1 Ambush Attack - There are fiendish creatures and demons in the dark places of the world! Ambush Attack! Draw a threat to immediately Ambush the Heroes.'
          },
          {
            roll: '2',
            description: '2 Dark Dread – Things are looking more and more bleak by the moment! Draw a Growing Dread card to add to the stack.'
          },
          {
            roll: '3',
            description: '3 Creeping Darkness – The Darkness is always searching for a way out! Move the Darkness 2 steps forward on the Depth Track.'
          },
          {
            roll: '4',
            description: '4 Hull Breach – Explosions rock the ship as a Hull Breach tears open nearby! –Space- Select a Random Hero’s Map Tile, and a Random Exit on that Map Tile (either an open Door or an End Cap) to find the location of the Hull Breach (Re-roll a new Hero if no valid exits on the Map Tile). Roll D6 to determine the Size of the Breach. Every Hero is immediately pulled a number of spaces equal to the Size of the Breach along the shortest path toward it (starting with the Hero closest to the Breach). Every Hero also takes a number of Hits equal to the Size of the Breach. Any Hero that is moved into one of the two spaces of the open Door/End Cap, is pulled through, taking 2D6 Wounds, ignoring Defense, before clawing their way back inside the ship. The Breach is then sealed by a force field.'
          },
          {
            roll: '5',
            description: '5 Echoes of Death – A wave of pure terror washes over you, flickering flashes of nightmares in your mind! Each Hero takes D6 Horror Hits. If the total Sanity Damage taken is equal to or greater than the number of Heroes in the Posse, also add a Growing Dread card to the stack.'
          },
          {
            roll: '6',
            description: '6 Hope for the Future – Seeing how far technology has advanced gives you hope for humanity’s future. Each Hero may immediately Heal 2D6 Wounds/Sanity (any mix) or cancel a Darkness or Growing Dread card on a D6 roll of 4+. KO’d Heroes may immediately Recover, rolling for their Injury/Madness and Healing 2D6 Wounds/Sanity (any mix) as normal for Recovering.'
          }
        ],
        Trederra: [
          {
            roll: '1',
            description: '1 Ambush Attack - There are fiendish creatures and demons in the dark places of the world! Ambush Attack! Draw a threat to immediately Ambush the Heroes.'
          },
          {
            roll: '2',
            description: '2 Dark Dread – Things are looking more and more bleak by the moment! Draw a Growing Dread card to add to the stack.'
          },
          {
            roll: '3',
            description: '3 Creeping Darkness – The Darkness is always searching for a way out! Move the Darkness 2 steps forward on the Depth Track.'
          },
          {
            roll: '4',
            description: '4 Incoming – A terrifying whistle shrieks across the sky right before the ground erupts in explosions! Each Hero in Trederra takes 2D6 Hits from flying debris.'
          },
          {
            roll: '5',
            description: '5 Marching in the Streets – The sound of marching echoes through the streets as a massive column of Trederran soldiers march to the front lines. Add D3 Patrol Markers to the Depth Track, but do NOT roll for Discovery.'
          },
          {
            roll: '6',
            description: '6 Break in the Clouds – A break in the toxic clouds overhead lets the cold light of Trederra’s sun shine through. Cancel all Weather effects. Each Hero may immediately remove any Poison and Stunned Markers they have as well as either Heal 2D6 Wounds/Sanity (any mix) or remove D6 Corruption Points. KO’d Heroes may immediately Recover, rolling for their Injury/Madness and Healing 2D6 Wounds/Sanity (any mix) as normal for Recovering.'
          }
        ],
        Town: [
          {
            roll: '1',
            description: '1 Rooftop Ambush – Bandits! On the Roof! Immediately add D3 Bandits to the board, each on a Random Building’s Rooftop. These Bandits replace their Bandit Pistol with Bandit Rifles (as detailed in the Shootout in the Streets mission). For any of these Bandits that cannot be placed, move the Darkness forward 1 space on the Depth Track instead.'
          },
          {
            roll: '2',
            description: '2 Building Fire – One of the buildings in Town has caught fire! Roll a Random Building and place a marker on it showing it is burning. Any model that ends their Move in a space of that Building (unless on the Rooftop) takes 2D6 Wounds, ignoring Defense.'
          },
          {
            roll: '3',
            description: '3 Creeping Darkness – The Darkness is always searching for a way out! Move the Darkness 2 steps forward on the Depth Track.'
          },
          {
            roll: '4',
            description: '4 Blinding Sun – The burning sun beats down from above, glaring in your eyes and making you squint. Until end of the turn, all Heroes are -1 on their To Hit Rolls (6+ still counts as a Critical Hit).'
          },
          {
            roll: '5',
            description: '5 Screaming in the Distance – A scream of pain and suffering echoes in the distance, chilling you to the bone. Each Hero immediately takes D6 Horror Hits.'
          },
          {
            roll: '6',
            description: '6 A Line is Drawn – This is it! Somebody’s got to save this Town and you’re not about to give up now! Each Hero may immediately Heal D6 Wounds/Sanity (any mix) or Recover 1 Grit. KO’d Heroes may immediately Recover, rolling for their Injury/Madness and Healing 2D6 Wounds/Sanity (any mix) as normal for Recovering.'
          }
        ],
        BlastedWastes: [
          {
            roll: '1',
            description: '1 Ambush Attack - TBD Ambush Attack! Draw a threat to immediately Ambush the Heroes.'
          },
          {
            roll: '2',
            description: '2 Dark Dread – TBD Draw a Growing Dread card to add to the stack.'
          },
          {
            roll: '3',
            description: '3 Creeping Darkness – TBD Move the Darkness 2 steps forward on the Depth Track.'
          },
          {
            roll: '4',
            description: '4 Incoming – TBD'
          },
          {
            roll: '5',
            description: '5 TBD'
          },
          {
            roll: '6',
            description: '6 TBD Each Hero may immediately remove any Poison and Stunned Markers they have as well as either Heal 2D6 Wounds/Sanity (any mix) or remove D6 Corruption Points. KO’d Heroes may immediately Recover, rolling for their Injury/Madness and Healing 2D6 Wounds/Sanity (any mix) as normal for Recovering.'
          }
        ],
      }
    }
  }
</script>

