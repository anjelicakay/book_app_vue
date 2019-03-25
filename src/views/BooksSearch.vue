<template>
  <div class="book-search">
      <h2>Book Search</h2>
      <form v-on:submit.prevent="submit()">
        <input v-model="searchTerm" placeholder="Enter title">
        <input type="submit" value="Go">
      </form>

      <h3>Books</h3>
      <div v-for="item in books.items">
        <router-link v-bind:to="item.selfLink">
        <h4>{{ item.volumeInfo.title }} {{ item.volumeInfo.subtitle }}</h4>
        </router-link>
        <img :src="item.volumeInfo.imageLinks.thumbnail">
        <p>by: {{ item.volumeInfo.authors }}</p>
        <p>Page Count: {{ item.volumeInfo.pageCount }}</p>
    </div>

  </div>
</template>

<style>
</style>

<script>
var axios = require('axios');

export default {
  data: function() {
    return {
      books: {
              kind: "",
              items: [{
                      selfLink: "",
                      volumeInfo: {
                                    title: "",
                                    pageCount: "",
                                    authors: "",
                                    imageLinks: {
                                                 thumbnail: "",
                                    }
                }
              }]
      },
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
        var newSearchTerm = this.searchTerm.replace(/ /g, '_')
        axios
          .get("/api/google/books?search=" + newSearchTerm)
          .then(response => {
            this.books = response.data;
            // this.searchTerm = "";
          });
      }
  }
};
</script>