<template>
  <div
    class="cv-header-wrapper">
    <div class="cv-header-inner1 primary">
      <div>
        <h1>{{ name }}</h1>
        <h4>{{ age }}</h4>
      </div>
      <h3>{{ experience }}</h3>
      <img
        v-if="photo"
        :src="photo"
        class="cv-photo"
        alt="Portrait CV">
    </div>
    <div class="cv-header-inner2">
      <h2 class="cv-position">{{ position }}</h2>
      <v-layout row>
        <v-flex 
          xs6 
          class="cv-header-details">
          <div>
            <v-chip 
              v-for="skill in parsedSkills"
              :key="skill"
              small
              text-color="white" 
              color="primary">{{ skill }}</v-chip>
          </div>
          <!-- <div>
            <v-chip 
              v-for="language in parsedLanguages"
              :key="language"
              small
              text-color="white" 
              color="primary">{{ language }}</v-chip></div> -->
        </v-flex>
        <v-flex 
          xs6 
          class="cv-header-about-me">
          <h4>
            <v-icon
              small
              class="cv-icon">location_on</v-icon>{{ location }}
          </h4>
          <h4>
            <v-icon
              small
              class="cv-icon">email</v-icon>{{ email }}
          </h4>
          <h4>
            <v-icon
              small
              class="cv-icon">phone</v-icon>{{ phone }}
          </h4>
          <h4>
            <v-icon
              small
              class="cv-icon">book</v-icon>{{ portfolio }}
          </h4>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<style scoped>
.cv-header-wrapper {
  width: 100%;
}
.cv-header-inner1 {
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 75px;
  padding: 20px;
}
.cv-header-inner2 {
  padding: 20px;
  border-bottom: 2px solid rgba(0,0,0,0.12);
}
.cv-icon {
  color: black;
  margin-right: 10px;
}
.cv-photo {
  width: 150px;
  height: 150px;
  margin-top: 100px;
  border: 2px solid white;
  border-radius: 50%;
}
.cv-position {
  margin-bottom: 5px;
}
</style>

<script>
import moment from 'moment'
export default {
  props: {
    name: {
      required: false,
      type: String,
      default: ''
    },
    experience: {
      required: false,
      type: String,
      default: ''
    },
    position: {
      required: false,
      type: String,
      default: ''
    },
    email: {
      required: false,
      type: String,
      default: ''
    },
    phone: {
      required: false,
      type: String,
      default: ''
    },
    photo: {
      required: false,
      type: String,
      default: ''
    },
    location: {
      required: false,
      type: String,
      default: ''
    },
    portfolio: {
      required: false,
      type: String,
      default: ''
    },
    skills: {
      required: false,
      type: String,
      default: ''
    },
    languages: {
      required: false,
      type: String,
      default: ''
    },
    age: {
      required: false,
      type: String,
      default: ''
    }
  },
  computed: {
    parsedSkills() {
      return JSON.parse(this.skills)
    },
    parsedLanguages() {
      return JSON.parse(this.languages)
    }, 
  }
};
</script>
