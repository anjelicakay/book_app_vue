<template>
  <div class="book-search">

    <div class="container">
        <div class="row title">
          <h2 id="book-search">Book Search</h2>
          <form id="search-bar" v-on:submit.prevent="submit()">
            <input v-model="searchTerm" placeholder="Enter title">
            <input type="submit" value="Go">
          </form>
        </div>
    </div>

    <section class="ptb ptb-sm-80">
      <div class="container">
        <div class="row">
          <div class="col-md-8 offset-md-2 blog-post-hr">
            <div v-if="search">
              <div class="blog-post mb-30">
                <div class="results-container">
                  <h3>Results</h3>
                </div>
                <div v-for="item in books.items">
                  <div class="post-media">
                    <div v-if="item.volumeInfo.imageLinks">
                      <img :src="item.volumeInfo.imageLinks.thumbnail">
                    </div>
                  </div>
                  <div class="post-header">
                    <span @click="selectBook(item)">
                      <h4><a>{{ item.volumeInfo.title }} {{ item.volumeInfo.subtitle }}</a></h4>
                    </span>
                  </div>
                  <div class="post-meta">by {{ item.volumeInfo.authors[0] }}</div>
                <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.results-container{
  margin-bottom: 40px;
}
#book-search{
  margin-left: 450px;
  margin-top: -300px;
  z-index: 2;
}
#search-bar{
  margin-top: -250px;
  margin-left: -180px;
  z-index: 2;
}
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
      search: false,
      searchTerm: ""
    };
  },
  created: function() {},
  methods: {
      submit: function() {
        this.search = true
        var newSearchTerm = this.searchTerm.replace(/ /g, '_')
        axios
          .get("/api/google/books?search=" + newSearchTerm)
          .then(response => {
            this.books = response.data;
          });
      },
      selectBook: function(book) {
        axios
          .get("/api/google/book_find/" + book.id)
          .then( response => {
            console.log(response.data);
            this.$router.push("/books/" + response.data.id);
          });
      }
  }
};
</script>