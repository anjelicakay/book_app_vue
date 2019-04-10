<template>
  <div class="books-show">
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
              <div v-if="book.inventory">
                <h4>Read Status</h4>
                <button v-on:click="updateReadStatus('want_to_read')"       v-bind:class="{'btn-selected': book.inventory.status == 'want_to_read', 'btn-color-a': book.inventory.status != 'want_to_read'}"  class="btn btn-xs mr-15">Want to Read</button>
                <button v-on:click="updateReadStatus('read')"               v-bind:class="{'btn-selected': book.inventory.status == 'read', 'btn-color-a': book.inventory.status != 'read'}"                  class="btn btn-xs mb-15">Read</button>
                <button v-on:click="updateReadStatus('currently_reading')"  v-bind:class="{'btn-selected': book.inventory.status == 'currently_reading', 'btn-color-a': book.inventory.status != 'currently_reading'}"  class="btn btn-xs mb-15" >Currently Reading</button>
                <button v-on:click="destroyStatus()" class="btn btn-xs btn-color-a" >Remove From Library</button>
              </div>
              <div v-else>
                <h4>Add to My Library</h4>
                <button v-on:click="createReadStatus('want_to_read')"   class="btn btn-xs mr-15 btn-color-a">Want to Read</button>
                <button v-on:click="createReadStatus('read')"  class="btn btn-xs mb-15 btn-color-a">Read</button>
                <button v-on:click="createReadStatus('currently_reading')"  class="btn btn-xs btn-color-a" >Currently Reading</button>
              </div>
            </div>

            <div class="project-detail-block ptb-15">
              <strong class="dark-color">Genre: </strong><span>{{ book.genre }}</span>              
            </div>
          </div>

          <div class="col-md-6">
            <div class="shop-detail-info">
              <h3>{{ book.title }}</h3>
              <div class="shop-item-price mtb-10 ptb-10">by: {{ book.author.name }}</div>
                <p><strong class="dark-color">Page Count: </strong><span>{{ book.page_count}}</span></p>
                <hr />
                <p class="ptb-15" id="summary-alignment">{{ book.summary }}</p>

                <div class="tabs mt-15">
                  <div class="ui-tab-content">
                    <div id="tabs-1">
                      <h5>Write a Review</h5>
                        <form v-on:submit.prevent="submit()">
                          <div class="post-comment-star">
                            <div class="star-rat">
                               Rating: <star-rating v-model="rating" v-bind:increment="0.5" v-bind:max-rating="5" v-bind:read-only="false" v-bind:show-rating="false" :star-size="25"></star-rating>
                            </div>
                          </div>
                          <!-- <div class="clearfix"></div> -->
                          <textarea placeholder="Review" v-model="newReviewContent" required="" class="form-full mb-15"></textarea>
                          <input type="submit" class="btn btn-xs btn-black" value="Submit">
                        </form>
                        <div class ="post-comment mb-30 mt-15">
                          <div class="comment-list">    
                            <div v-for="review in book.reviews">
                              <div class="comment-avatar ml-30">
                                <img :src="review.user.image">
                              </div>  
                              <div class="ml-50">
                                <h6>{{ review.user.first_name }} {{ review.user.last_name }}</h6>
                                <!-- <div v-if="user_id == user.id"> -->
                                  <span class="btn btn-color-a" v-on:click="destroyReview()">Delete Review</span>
                                <!-- </div> -->
                                <div class="star-placement">
                                  <star-rating v-model="review.rating" v-bind:increment="0.5" v-bind:max-rating="5" v-bind:read-only="true" v-bind:show-rating="false" :star-size="25"></star-rating>
                                </div>
                              </div>
                              <div>
                                <p>{{ review.content }}</p>
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
    </section>
  </div>
</template>

<style>
  .star-placement{
    margin-left: 40px;
  }
  #summary-alignment{
    text-align: justify;
  }

  .btn-selected {
    background-color: #85886F;
    color: white;
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
                        id: "",
                        user_id: "",
                        book_id: "",
                        // rating: "",
                        content: "",
                        user: {
                                first_name: "",
                                last_name: "",
                                email: "",
                                image: ""
                              }
                        }],
              inventory: {
                          id: "",
                          status: ""
                        }   
      },
      inventories: [{
                      id: "",
                      user_id: "",
                      book_id: "",
                      status: ""
                    }],
      newReviewContent: "",
      rating: 0,
      user: {
              id: ""
            },
      errors: []
    };
  },
  created: function() {
    var user_id = localStorage.getItem("user_id");
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
    updateReadStatus: function(status) {
      var params = { 
                    status: status
                  };
      axios.patch("/api/inventories/" + this.book.inventory.id, params)
        .then(response => {
          console.log(response.data);
          this.book.inventory = response.data;
        });
    },
    createReadStatus: function(status) {
      var user_id = localStorage.getItem("user_id");
      var params = { 
                    user_id: user_id,
                    book_id: this.$route.params.id,
                    status: status
                  };
      axios.post("/api/inventories" , params)
        .then(response => {
          console.log(response.data);
          this.book.inventory = response.data;
        });
    },
    destroyStatus: function() {
      axios.delete("/api/inventories/" + this.book.inventory.id)
        .then(response => {
          console.log("Success", response.data);
          this.$router.push("/");
        });
    },
    destroyReview: function() {
      // this.user_id = localStorage.getItem("user_id")
      axios.delete("/api/reviews/" + this.book.review.id)
        .then(response => {
          console.log("Success", response.data);
          // this.$router.push("/")
        });
    }    
  }
};
</script>
