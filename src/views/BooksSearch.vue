<template>
  <div class="book-search">
      <h1>Book Finder</h1>
      <form v-on:submit.prevent="submit()">
        <input v-model="searchTerm">
        <input type="submit" value="Go">
      </form>

      <h1>Books</h1>
      <div v-for="book in books"> {{ books.items[0].volumeInfo.title }}</div>

  </div>
</template>

<style>
</style>

<script>
var axios = require('axios');

export default {
  data: function() {
    return {
      books: [{
              kind: "",
              items: [{}]
      }],
      searchTerm: ""
    };
  },
  created: function() {
    // axios.get("/api/books")
    //   .then(response => {
    //     this.books = response.data;
    //   });
  },
  methods: {
      submit: function() {
        var newSearchTerm = this.searchTerm.replace(' ', '_')
        axios
          .get("/api/google/books?search=" + newSearchTerm)
          .then(response => {
            this.books = response.data;
            this.searchTerm = "";
          });
      }
  }
};
</script>