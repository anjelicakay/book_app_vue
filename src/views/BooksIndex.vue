<template>
  <div class="books-index">
      <h2>Search Results</h2>
      <div v-for ="book in books">
        <ul>
        <router-link v-bind:to="'/books/' + book.id">
<!--           <img v-bind:src="book.image_url" :alt="book.title"> -->
          <h3>{{ book.title }}</h3>
        </router-link>
        <h4>{{ book.author.first_name }} {{ book.author.last_name }}</h4>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
var axios = require("axios");

export default {
  data: function() {
    return {
            books: []    
            }
  },
  created: function() {
    axios.get('/api/books')
      .then(response => {
        this.books = response.data;
      });
  },
  methods: {}
};
</script>
