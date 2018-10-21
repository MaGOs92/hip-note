export default {
  methods: {
    navigate(path, query) {
      this.$router.push({
        path,
        query
      });
    },
  },
};
