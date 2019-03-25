<template>
  <div class="users-show">
    <div>
      <h2>{{ user.first_name }}</h2>
      <img :src="user.image" height="100" width="100">
    </div>
<!--     <div v-model="displayButton"> -->
    <router-link v-if="user_id == user.id" class="btn btn-primary" v-bind:to="'/users/' + user.id + '/edit'">Update Profile</router-link>
    <!-- </div> -->
    <div>
      <button v-if="user_id != user.id" id="myDIV" v-on:click="connect()" class="btn btn-primary">Follow</button>
      <!-- <button v-if="user_id != user.id" v-on:click="connect()" class="btn btn-primary">Following</button> -->
    </div>
    <h3>Currently Reading</h3>
    <div v-for="current_book in user.current_books">
      <!-- <ul> -->
        <router-link v-bind:to="'/books/' + current_book.id">
          <h3>{{ current_book.title }}</h3>
        </router-link>
      <!-- </ul> -->
    </div>
      <h3>Have Read</h3>
      <div v-for="read_book in user.read_books">
      <router-link v-bind:to="'/books/' + read_book.id">
        <h3>{{ read_book.title }}</h3>
      </router-link>
      </div>
      <h3>Want to Read</h3>
      <div v-for="to_read in user.to_read">
      <router-link v-bind:to="'/books/' + to_read.id">
        <h3>{{ to_read.title }}</h3>
      </router-link>
      </div>

  </div>
</template>

<style>
  .profile-img{
  height:50px;
  width:50px;
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
                        }]
              // followees: [{
              //             id: "",
              //             first_name: "",
              //             last_name: "",
              //             image: "",
              //           }],   
              // followees: [{
              //             id: "",
              //             first_name: "",
              //             last_name: "",
              //             image: "",
              //           }]                   
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
    // follow: function() {
    //   if( followee_id === nil )
    //     
    // },
    connect: function() {
      var params = { followee_id: this.user.id };
      axios.post("/api/followings/", params);
    }
  }
  // displayButton: function() {
  //   if user.id != current_user.id

  // }
};
</script>
