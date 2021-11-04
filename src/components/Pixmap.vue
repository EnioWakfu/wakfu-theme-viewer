<template>
  <v-card className="ma-2">
    <v-card-title>{{ pixmap.id }}</v-card-title>
    <v-card-subtitle>Texture : {{ pixmap.texture }}</v-card-subtitle>
    <v-card-text>
      Position : {{ pixmap.position }} <br/>
      Coords : {{ pixmap.x }};{{ pixmap.y }} <br/>
      Size : {{ pixmap.width }};{{ pixmap.height }} <br/>
      Since : {{ pixmap.since }} <br/>
      {{ pixmap.flipHorizontally ? "Flipped horizontally. " : "" }}
      {{ pixmap.flipVertically ? "Flipped vertically" : "" }} <br/>
      <span v-if="forcedUsages || (pixmap.usage && pixmap.usage.length > 0 && !forcedUsages)">Usage : {{ forcedUsages ? forcedUsages.join(",") : pixmap.usage.join(", ") }}</span>
    </v-card-text>
    <v-card-actions>
      <canvas ref="canvas"/>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  name: 'Pixmap',
  props: ['forcedUsages', 'pixmap'],

  mounted() {
    this.refreshPixmap()
  },

  methods: {
    refreshPixmap() {
      const canvas = this.$refs['canvas'];
      const context = canvas.getContext('2d');
      const pixmap = this.pixmap;
      context.clearRect(0, 0, canvas.width, canvas.height)
      canvas.width = pixmap.width;
      canvas.height = pixmap.height
      context.drawImage(pixmap.image, pixmap.x, pixmap.y, pixmap.width, pixmap.height, 0, 0, pixmap.width, pixmap.height);
    }
  },

  watch: {
    pixmap() {
      this.refreshPixmap()
    }
  }
}
</script>