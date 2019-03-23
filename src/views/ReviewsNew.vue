<template>
  <div class="reviews-new">
    <h1>Create a Review</h1>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
    <div class="container">
    <form v-on:submit.prevent="submit()">
      <div>
        Rating: <input v-model="newReviewRating">
      </div>
      <div>
        Review: <input v-model="newReviewContent">
      </div>
      <input type="submit" value="Create">
    </form>
    </div>
  </div>
</template>

<style>
</style>

<script>
var axios = require("axios");

export default {
  data: function() {
    return {
            reviews: [],
            newReviewRating: "",
            newReviewContent: "",
            errors: []
          };
  },
  created: function() {
    axios.get("/api/reviews")
    .then(response => {
      this.reviews = response.data;
    });
  },
  methods: {
    submit: function() {
      console.log("Create new review");
      var params = {
                    rating: this.newReviewRating,
                    content: this.newReviewContent
                    };
      axios.post("/api/reviews", params)
        .then(response => {
          console.log("Success", response.data);
          this.$router.push("/books");
        }).catch(error => {
          this.errors = error.response.data.errors;
        });              
    }
  }
};
</script>
