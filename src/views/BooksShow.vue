<template>
  <div class="books-show">
    <h2>{{ book.title }}</h2>
    <img v-bind:src="book.image_url" :alt="book.title">
    <router-link v-bind:to="'/authors/' + book.author.id">
      <h3>{{ book.author.first_name }} {{ book.author.last_name }}</h3>
    </router-link>
    <p>{{ book.genre }}</p>
    <p>{{ book.summary }}</p>
    <h3>Reviews</h3>
    <div v-for="review in book.reviews">
<!--       <p>{{ review.user.first_name }}</p> -->
      <p>{{ review.rating }}</p>
      <p>{{ review.content }}</p>
    </div>
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
              image_url: "",
              page_count: "",
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
                        // user: {
                        //           id: "",
                        //           first_name: "",
                        //           last_name: "",
                        //           email: ""
                        //         },
              }],       
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
