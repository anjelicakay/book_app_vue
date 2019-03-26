<template>
  <div class="book-search">

<!--     <section id="preloader">
        <div class="loader" id="loader">
            <div class="loader-img"></div>
        </div>
    </section> -->
    
    <section class="inner-intro bg-image overlay-light parallax parallax-background1" data-background-img="img/book_background.jpg">
        <div class="container">
            <div class="row title">
              <h2>Book Search</h2>
              <form v-on:submit.prevent="submit()">
                <input v-model="searchTerm" placeholder="Enter title">
                <input type="submit" value="Go">
              </form>
            </div>
        </div>
    </section>
    

    <section class="ptb ptb-sm-80">
        <div class="container">
            <div class="row">
                <!-- Post Item -->
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
            // this.searchTerm = "";
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