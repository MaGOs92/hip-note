<template>
  <div
    class="cv-header-wrapper">
    <div class="cv-header-inner1 primary">
      <h1>{{ name }}</h1>
      <h3>{{ experience }}</h3>
      <img
        v-if="photo"
        :src="photo"
        class="cv-photo"
        alt="Portrait CV">
    </div>
    <div class="cv-header-inner2 secondary">
      <h2 class="cv-position">{{ position }}</h2>
      <h4><v-icon
        small
        class="cv-icon">email</v-icon>{{ email }}</h4>
      <h4><v-icon
        small
        class="cv-icon">phone</v-icon>{{ phone }}</h4>
      <h4><v-icon
        small
        class="cv-icon">book</v-icon>{{ portfolio }}</h4>
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
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
}
.cv-icon {
  color: white;
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
    portfolio: {
      required: false,
      type: String,
      default: ''
    },
    photo: {
      required: false,
      type: String,
      default: ''
    }
  }  
};
</script>
