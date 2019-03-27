<template>
  <div class="users-show">
    <section>
      <div class="container">
        <div class="row mt-30">
          <div class="col-sm-4">
              <h3>{{ user.first_name }}</h3>
              <img :src="user.image" height="400" width="300">
              <div class="padding">
                <router-link v-if="user_id == user.id" class="btn btn-primary" v-bind:to="'/users/' + user.id + '/edit'">Update Profile</router-link>
              <div>
                <button v-if="user_id != user.id" v-on:click="connect()" class="btn btn-primary">Follow</button> 
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <h3>Book Clubs</h3>
            <div v-for="book_club in user.book_clubs">
              <router-link class="btn btn-primary" v-bind:to="'/book_clubs/' + book_club.id">{{ book_club.name }}</router-link>
            </div>
          </div>
          <div class="col-sm-4"">
            <h3 v-if="user_id == user.id">My Friends</h3>
            <h3 v-else>{{ user.first_name}}'s Friends</h3>
              <div v-for="followee in user.followees">
                <router-link v-bind:to="'/users/' + followee.id">
                 {{ followee.first_name }} {{ followee.last_name }} 
                </router-link>
                <span class="btn btn-color-a" v-on:click="destroyFollowing(friend)">Unfollow</span>
              </div>
              <!-- <p v-for="friend in user.followees"> -->
                <!-- {{ friend.first_name }} {{ friend.last_name }}  -->
              <!-- </p> -->
          </div>
        </div>
      </div>
    </section>


    <section class="ptb ptb-sm-80">
      <div class="container">
          <!-- work Filter -->
          <div class="row">
              <ul class="col container-filter categories-filter">
                  <li><a class="categories active" data-filter="*">All</a></li>
                  <li><a class="categories" data-filter=".currently_reading">Currently Reading</a></li>
                  <li><a class="categories" data-filter=".read">Read</a></li>
                  <li><a class="categories" data-filter=".to_read">Want to Read</a></li>
              </ul>
          </div>
          <!-- End work Filter -->
          <div class="row container-grid nf-col-4">

              <div class="nf-item currently_reading spacing" v-for="current_book in user.current_books">
                <div class="item-box">
                  <router-link v-bind:to="'/books/' + current_book.id">
                    <img alt="1" :src="current_book.image_url" class="item-container">
                      <div class="item-mask">
                        <div class="item-caption">
                          <h6 class="white">{{ current_book.title }}</h6>
                        </div>
                      </div>
                  </router-link>
                </div>
              </div>
               
             <div class="nf-item read spacing" v-for="read_book in user.read_books">
                <div class="item-box">
                  <router-link v-bind:to="'/books/' + read_book.id">
                    <img alt="1" :src="read_book.image_url" class="item-container">
                      <div class="item-mask">
                        <div class="item-caption">
                          <h6 class="white">{{ read_book.title }}</h6>
                        </div>
                      </div>
                  </router-link>
                 </div>
             </div>

             <div class="nf-item to_read spacing" v-for="to_read in user.to_read">
                <div class="item-box">
                  <router-link v-bind:to="'/books/' + to_read.id">
                    <img alt="1" :src="to_read.image_url" class="item-container">
                      <div class="item-mask">
                        <div class="item-caption">
                          <h6 class="white">{{ to_read.title }}</h6>
                        </div>
                      </div>
                  </router-link>
                 </div>
             </div>
          </div>
      </div>
    </section>
  </div>
</template>

<style>
  .profile-img{
  height:50px;
  width:50px;
  }
  .padding{
    padding: 25px;
  }

</style>

<script>
var axios = require("axios");

export default {
  data: function() {
    return {
      user: {
              id: "",
              first_name: "",
              last_name: "",
              email: "",
              inventories: [{
                              id: "",
                              user_id: "",
                              book_id: "",
                              status: "",
                            }],
              current_books: [{
                              id: "",
                              title: "",
                              author_id: "",
                              summary: "",
                              genre: "",
                            }],
              read_books: [{
                            id: "",
                            title: "",
                            author_id: "",
                            summary: "",
                            genre: "",
                          }],
              to_read: [{
                          id: "",
                          title: "",
                          author_id: "",
                          summary: "",
                          genre: ""
                        }],
              // memberships: [{
              //               id: "",
              //               user_id: "",
              //               book_club_id: "",
              // }],
              book_club: {
                          id: "",
                          name: "",
                          book_id: "",                
                        },
              followees: [
                            {
                              id: "",
                              first_name: "",
                              last_name: "",
                              image: ""
                            }
                          ]
            },
      user_id: "",      
      errors: []
    };
  },
  created: function() {
    this.user_id = localStorage.getItem("user_id");
    axios.get('/api/users/' + this.$route.params.id)
      .then(response => {
        console.log(response.data);
        this.user = response.data;
      }).catch(error => {
        console.log(error.response.data.errors);
        this.$router.push("/login")
      });
  },
  methods: {
    connect: function() {
      var params = { followee_id: this.user.id };
      axios.post("/api/followings", params)
      .then(response => {
        console.log(response.data);
      }).catch(errors => {
        console.log(errors.response.data.errors); 
      })    
    },
    destroyFollowing: function(friend) {
      axios
      .delete("/api/followings/" + friend.following_id)
      .then(response => {
        var index = this.user.followees.indexOf(friend);
        this.user.followees.splice(index, 1);
      })
    }
  }
};
</script>
