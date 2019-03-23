<template>
  <div class="books-show">
    <h2>{{ book.title }}</h2>
    <img v-bind:src="book.image_url" :alt="book.title">
    <router-link v-bind:to="'/authors/' + book.author.id">
      <h3>{{ book.author.first_name }} {{ book.author.last_name }}</h3>
    </router-link>
    <p>{{ book.genre }}</p>
    <p>{{ book.summary }}</p>
    <div class="accordion d-flex justify-content-center">
      <div class="card z-depth-0 bordered">
        <div class="card-header" id="headingOne2">
          <h5 class="mb-0">
            <button class="btn btn-link d-flex justify-content-center" type="button" data-toggle="collapse" data-target="#collapseOne2"
              aria-expanded="true" aria-controls="collapseOne2">
              Review Book
            </button>
          </h5>
        </div>
        <div id="collapseOne2" class="collapse" aria-labelledby="headingOne2" data-parent="#accordionExample275">
          <div class="card-body">
            <div class="container">
              <form v-on:submit.prevent="submit()">
                <div>
                  Rating: <star-rating v-model="rating" v-bind:increment="0.5" v-bind:max-rating="5" v-bind:read-only="false" v-bind:show-rating="true"></star-rating>
                </div>
                <div>
                  Review: <input v-model="newReviewContent">
                </div>
                <input type="submit" value="Create">
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h3>Reviews</h3>
    <div v-for="review in book.reviews">
      <!-- <p>{{ review.user.first_name }}</p> -->
      <star-rating v-model="review.rating" v-bind:increment="0.5" v-bind:max-rating="5" v-bind:read-only="true"></star-rating>
      <p>{{ review.content }}</p>
    </div>
  </div>
</template>

<script>
var axios = require("axios");
var StarRating = require('vue-star-rating');

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
                        user: {
                                  id: "",
                                  first_name: "",
                                  last_name: "",
                                  email: ""
                                },
              }],    
            },
      newReviewContent: "",
      rating: 0,
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
  methods: {
    submit: function() {
      console.log("Create new review");
      var params = {
                    book_id: this.book.id,
                    rating: this.rating,
                    content: this.newReviewContent
                    };         
      axios.post("/api/reviews", params)
        .then(response => {
          console.log("Success", response.data);
          this.$router.push("/books/" + this.book.id);
        }).catch(error => {
          this.errors = error.response.data.errors;
        });              
    }
  }
};
</script>
