<template>
  <div class="ma-6">
    <v-row>
      <v-col col="7">
        <v-card>
          <v-card-title>
            <v-radio-group v-model="radioType" row>
              <v-radio label="Pixmap" value="pixmap"/>
              <v-radio label="Theme Element" value="themeElement"/>
              <v-radio label="Color" value="color"/>
            </v-radio-group>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line/>
          </v-card-title>
          <v-data-table :headers="headers" :items="result" :search="search" @click:row="pickElement" dense>

          </v-data-table>
        </v-card>
      </v-col>
      <v-col col="6" v-if="'pixmap' === radioType && currentPixmap" >
        <Pixmap :pixmap="currentPixmap"/>
      </v-col>
      <v-col col="6" v-else-if="'themeElement' === radioType && currentThemeElement" >
        <v-card className="ma-2">
          <v-card-title>{{ currentThemeElement.id }}</v-card-title>
          <v-card-text>
            <span v-if="currentThemeElement.type">Type : {{ currentThemeElement.type }} <br/></span>
            <span v-if="currentThemeElement.name">Name : {{ currentThemeElement.name }} <br/></span>
            <span v-if="currentThemeElement.since">Since : {{ currentThemeElement.since }} <br/></span>
            <span v-if="currentThemeElement.usage">Usage : {{ currentThemeElement.usage.join(", ") }}</span>
          </v-card-text>
        </v-card>
        <Pixmap v-for="pixmap of currentThemeElement.pixmaps"
                :pixmap="pixmap"
                :forcedUsages="currentThemeElement.usage ? currentThemeElement.usage.filter(x => pixmap.usage && !pixmap.usage.includes(x)) : undefined"
                :key="pixmap.id"/>
      </v-col>
      <v-col col="6" v-else-if="'color' === radioType && currentColor" >
        <Color :color="currentColor"/>
      </v-col>
      <v-col col="6" v-else></v-col>
    </v-row>

  </div>
</template>

<script>
import {ThemeParser} from "../core/theme-parser";
import Pixmap from "./Pixmap";
import Color from "./Color";


export default {
  name: 'ThemeViewer',

  components: {
    Color,
    Pixmap
  },

  mounted() {
    ThemeParser.loadTheme().then(() => {
      this.loaded = true;
      this.headers = this.generateHeaders();
      this.result = this.generateResult();
      this.currentPixmap = ThemeParser.getPixmap("pmEcosystemFlaskFrame");
    });
  },

  computed: {},

  data: () => ({
    components: [],
    currentColor: undefined,
    currentPixmap: undefined,
    currentThemeElement: undefined,
    headers: [],
    result: undefined,
    loaded: false,
    radioType: "pixmap",
    search: ""
  }),

  watch: {
    radioType() {
      this.headers = this.generateHeaders();
      this.result = this.generateResult();
    }
  },

  methods: {
    generateResult() {
      if("pixmap" === this.radioType) return ThemeParser.getPixmaps();
      if("themeElement" === this.radioType) return ThemeParser.getThemeElements();
      if("color" === this.radioType) return ThemeParser.getColors();
    },

    generateHeaders() {
      if("pixmap" === this.radioType) return [
        {
          text: "ID",
          value: 'id',
          align: 'left',
          width: '400px'
        }, {
          text: 'Texture',
          value: 'texture',
          align: 'left',
          width: '200px'
        }, {
          text: 'Usage',
          value: 'usage.length',
          align: 'left',
        }, {
          text: 'X',
          value: 'x',
          align: 'left',
        }, {
          text: 'Y',
          value: 'y',
          align: 'left',
        }, {
          text: 'Width',
          value: 'width',
          align: 'left',
        }, {
          text: 'Height',
          value: 'height',
          align: 'left',
        }
      ]
      else if("themeElement" === this.radioType) return [
        {
          text: "ID",
          value: 'id',
          align: 'left',
          width: '400px'
        }, {
          text: 'Pixmaps',
          value: 'pixmaps.length',
          align: 'left',
        }, {
          text: 'Usage',
          value: 'usage.length',
          align: 'left',
        }, {
          text: 'Type',
          value: 'type',
          align: 'left',
        }
      ]
      else if("color" === this.radioType) return [
        {
          text: "ID",
          value: 'id',
          align: 'left',
          width: '400px'
        }, {
          text: 'Red',
          value: 'red',
          align: 'left',
        }, {
          text: 'Green',
          value: 'green',
          align: 'left',
        }, {
          text: 'Blue',
          value: 'blue',
          align: 'left',
        }, {
          text: 'Alpha',
          value: 'alpha',
          align: 'left',
        }, {
          text: 'Usage',
          value: 'usage.length',
          align: 'left',
        }
      ]
    },

    pickElement(element) {
      if("pixmap" === this.radioType) return this.currentPixmap = element;
      else if("themeElement" === this.radioType) return this.currentThemeElement = element;
      else if("color" === this.radioType) return this.currentColor = element;
    }
  }
}
</script>
