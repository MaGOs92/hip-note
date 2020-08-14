<template>
  <div class="sb-tab">
    <div class="sb-tab-header">
      <div 
        v-for="string in stringIndexes.slice().reverse()" 
        :key="string"
      >{{ `${string}|` }}
      </div>
    </div>
    <div 
      v-for="({chord, notes}, index) in mesures" 
      :key="index">
      <div class="sb-chord primary--text">
        {{ chord }}
      </div>
      <div>
        <div 
          v-for="(note, index) in notes.slice().reverse()" 
          :key="index">
          {{ `${note}|` }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sb-tab {
  font-family: monospace;
  display: flex;
  flex-wrap: wrap;
  margin: 5px 5px 5px 20px;
}
.sb-tab-header {
  margin-top: 21px;
}
.sb-chord {
  font-weight: bold;
  height: 21px;
}
</style>

<script>
export default {
  props: {
    t: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      stringIndexes: ['E', 'A', 'D', 'G', 'B', 'e']
    }
  },
  computed: {
    mesures() {
      const mesures = this.t.split('|').reduce((acc, rawMesure) => {
        const parsedMesure = {}
        if (rawMesure.indexOf('_') > -1) {
          parsedMesure.chord = rawMesure.substring(rawMesure.indexOf('_') + 1, rawMesure.lastIndexOf('_'))
        }

        parsedMesure.notes = rawMesure
          .substring(rawMesure.lastIndexOf('_'))
          .split('-')
          .reduce((acc, rawNotes) => {
            const timeArray = ['', '', '', '', '', '']
            const stringRe = /([EADGBe])([0-9hp/]+)/g
            let result
            let maxSize = 1
            while ((result = stringRe.exec(rawNotes)) !== null) {
              const stringIndex = this.stringIndexes.indexOf(result[1])
              const note = `-${result[2]}-`
              if (note.length > maxSize) {
                maxSize = note.length
              }
              timeArray[stringIndex] = note
            }


            return timeArray.map((string, index) => {
              let timeStr = string.toString()
              if (string.length < maxSize) {
                timeStr = string.padEnd(maxSize, '-')
              }

              const preStr = acc && acc[index]

              if (preStr) {
                return `${preStr}${timeStr}`
              }

              return timeStr
            })
          }, [])

        acc.push(parsedMesure)

        return acc

      }, [])

      return mesures
    }
  }
};
</script>
