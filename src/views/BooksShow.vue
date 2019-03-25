<template>
  <div class="books-show">
    <h2>{{ book.title }}</h2>
    <img v-bind:src="book.image_url" :alt="book.title">
    <p>by: {{ book.author.name }}</p>
    <h4>Add to My Library</h4>
    <button v-on:click="libraryCurrentRead()" class="btn btn-primary">Currently Reading</button>
    <button v-on:click="libraryToRead()" class="btn btn-primary">Want to Read</button>
    <button v-on:click="libraryRead()" class="btn btn-primary">Read</button>
    <p>Genre: {{ book.genre }}</p>
    <p>{{ book.summary }}</p>
    <div>
    </div>
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
<!--       <p>{{ review.user.first_name }}</p> -->
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
                        name: "",
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
                        //         }
              }]   
      },
      inventories: [{
                      id: "",
                      user_id: "",
                      book_id: "",
                      status: "",
                    }],
      newReviewContent: "",
      rating: 0,
      errors: []
    };
  },
  created: function() {
    // axios.get('/api/books/' + this.$route.params.id)
    //   .then(response => {
    //     console.log(response.data);
    //     this.book = response.data;
    //   });
    axios
      .get("/api/books/" + this.$route.params.id)
      .then(response => {
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
    },
    libraryCurrentRead: function() {
      var user_id = localStorage.getItem("user_id");
      var status = 0
      console.log("Add to library")
      var params = { 
                    user_id: this.user_id,
                    book_id: this.book.id,
                    status: 0
                  };
      axios.post("/api/inventories/", params);
    },
    libraryToRead: function() {
      var user_id = localStorage.getItem("user_id");
      var status = 1
      console.log("Add to library")
      var params = { 
                    user_id: this.user_id,
                    book_id: this.book.id,
                    status: 1 
                  };
      axios.post("/api/inventories/", params);
    },
    libraryRead: function() {
      var user_id = localStorage.getItem("user_id");
      var status = 2
      console.log("Add to library")
      var params = { 
                    user_id: this.user_id,
                    book_id: this.book.id,
                    status: 2
                  };
      axios.post("/api/inventories/", params);
    }
  }
};
</script>
