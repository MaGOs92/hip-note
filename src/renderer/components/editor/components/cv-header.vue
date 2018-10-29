<template>
  <div
    class="cv-header-wrapper">
    <div class="cv-header-inner1 primary">
      <h1>{{ name }}</h1>
      <h3>{{ experience }}</h3>
    </div>
    <div class="cv-header-inner2 secondary">
      <h2>{{ position }}</h2>
      <h4><v-icon>email</v-icon>{{ email }}</h4>
      <h4><v-icon>phone</v-icon>{{ phone }}</h4>
      <h4>{{ portfolio }}</h4>
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
  margin: -20px -20px 0 -20px;
}
.cv-header-inner2 {
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin: 0 -20px 0 -20px;
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
    }
  }  
};
</script>
