<template>
  <div class="books-show">
    <h2>{{ book.title }}</h2>
    <h3>{{ book.author.first_name }} {{ book.author.last_name }}</h3>
    <p>{{ book.genre }}</p>
    <p>{{ book.summary }}</p>
    <h3>Reviews</h3>
  </div>
</template>

<script>
var axios = require("axios");

export default {
  data: function() {
    return {
      book: {
              id: "",
              title: "",
              author_id: "",
              summary: "",
              genre: "",
              author: {
                        first_name: "",
                        last_name: "",
                        id: "",
                      },
              reviews: [{
                        user_id: "",
                        book_id: "",
                        rating: "",
                        content: "",
                      }]          
            },
      errors: []
    };
  },
  created: function() {
    axios.get('/api/books/' + this.$route.params.id)
      .then(response => {
        console.log(response.data);
        this.book = response.data;
      });
  },
  methods: {}
};
</script>
