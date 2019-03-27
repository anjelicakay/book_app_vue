<template>
  <div class="books-show">

<!--     <section class="inner-intro bg-image overlay-light parallax parallax-background1" data-background-img="img/book_background.jpg"></section> -->


      <section id="shop-item" class="ptb ptb-sm-80">
          <div class="container">
              <div class="row ">
                  <div class="col-md-4 mb-sm-60">
                      <div class="shop-detail-item">
                          <div class="sp-wrap">
                              <img v-bind:src="book.image_url" :alt="book.title">
                          </div>
                      </div>
                      <div class="mt-30">
                        <h4>Add to My Library</h4>
                        <button v-on:click="libraryToRead()" class="btn btn-xs btn-color-a mr-15 ">Want to Read</button>
                        <button v-on:click="libraryRead()" class="btn btn-xs btn-color-a mb-15">Read</button>
                        <button v-on:click="libraryCurrentRead()" class="btn btn-xs btn-color-a" >Currently Reading</button>
                      </div>
                  </div>

                  <div class="col-md-6">
                      <div class="shop-detail-info">
                          <h3>{{ book.title }}</h3>
                          <div class="shop-item-price mtb-15 ptb-15">by: {{ book.author.name }}</div>
                                  <p>
                                      <strong class="dark-color">Page Count: </strong><span>{{ book.page_count}}</span>
                                  </p>
                          <hr />
                          <p class="ptb-15">{{ book.summary }}</p>
                          <ul class="project-detail-block ptb-15">
                              <li>
                              </li>
                              <li>
                                  <p>
                                      <strong class="dark-color">Genre: </strong><span>{{ book.genre }}</span>
                                  </p>
                              </li>
                          </ul>

                          <div class="tabs mt-15">
                              <ul>
                                  <li><a href="#tabs-1">Reviews</a></li>
                              </ul>

                              <div class="ui-tab-content">
                                  <!-- Review -->
                                  <div id="tabs-1">
                                    <h5>Write a Review</h5>
                                      <form v-on:submit.prevent="submit()">
                                        <div class="post-comment-star">
                                            <div class="star-rat">
                                               Rating: <star-rating v-model="rating" v-bind:increment="0.5" v-bind:max-rating="5" v-bind:read-only="false" v-bind:show-rating="false" star-size="25"></star-rating>
                                            </div>
                                        </div>
                                        <!-- <div class="clearfix"></div> -->
                                        <textarea placeholder="Review" v-model="newReviewContent" required="" class="form-full mb-15"></textarea>
                                        <input type="submit" class="btn btn-xs btn-black" value="Submit">
                                      </form>
                                      <div class="post-comment">
                                        <div v-for="review in book.reviews">
                                          <div class="comment-list mb-30 mt-15">   
                                            <div class="comment-avatar ml-30">
                                                <img :src="review.user.image">
                                            </div>
                                              <div class="">
                                                <div class="ml-30">
                                                  <h6>{{ review.user.first_name }} {{ review.user.last_name }}</h6>
                                                  <div class="post-meta">
                                                      <div class="star-placement">
                                                          <star-rating v-model="review.rating" v-bind:increment="0.5" v-bind:max-rating="5" v-bind:read-only="true" v-bind:show-rating="false" star-size="25"></star-rating>
                                                      </div>
                                                  </div>
                                                  <div >
                                                    <p>{{ review.content }}</p>
                                                  </div>
                                              </div>  
                                              <hr />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                  </div>
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
  .star-placement{
    margin-left: 40px;
  }
</style>

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
                        name: ""
                      },
              reviews: [{
                        user_id: "",
                        book_id: "",
                        rating: "",
                        content: "",
                        user: {
                                first_name: "",
                                last_name: "",
                                email: "",
                                image: ""
                              }
                        }]   
      },
      inventories: [{
                      id: "",
                      user_id: "",
                      book_id: "",
                      status: ""
                    }],
      newReviewContent: "",
      rating: 0,
      errors: []
    };
  },
  created: function() {
    axios
      .get("/api/books/" + this.$route.params.id)
      .then(response => {
        this.book = response.data;
        this.book.summary = this.book.summary.replace(/<.>|<..>/g, '')
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
