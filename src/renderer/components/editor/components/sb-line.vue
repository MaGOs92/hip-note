<template>
  <div class="sb-line">
    <div 
      v-for="({chord, text, leftPadding}, index) in fragments" 
      :key="index"
      :class="{'left-padding': leftPadding}"
      class="sb-fragment">
      <div class="sb-chord primary--text">
        {{ chord }}
      </div>
      <div class="sb-text">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.sb-line {
  display: flex;
  margin: 5px 5px 5px 20px;
}
.sb-chord {
  font-weight: bold;
  height: 21px;
}
.left-padding {
  padding-left: 5px;
}
.sb-text {
  justify-self: baseline;
}
.sb-fragment {
  display: flex;
  flex-direction: column;
}
</style>

<script>
export default {
  props: {
    l: {
      type: String,
      default: ''
    },
  },
  computed: {
    fragments() {
      const splitedLine = this.l.split('_')
      const fragments = [{ text: splitedLine[0] }]
      for (let i = 1; i < splitedLine.length; i += 2) {
        fragments.push({
            chord: splitedLine[i],
            text: splitedLine[i + 1],
            leftPadding: splitedLine[i - 1].slice(-1) === ' '
          })
      }

      return fragments
    }
  }
};
</script>
