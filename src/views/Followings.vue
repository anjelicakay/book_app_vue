<template>
  <div class="followings">
    <div>
      <h3>{{ user.first_name }}'s Friends</h3>
        <div v-for="followee in user.followees"> 
          <img :src="followee.image" height="100" width="100">
          <router-link v-bind:to="'/users/' + followee.id">
            <h4>{{followee.first_name}} {{followee.last_name}}</h4>
          </router-link>
        </div>
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
      user: {
              id: "",
              first_name: "",
              last_name: "",
              email: "",
            },
      followers: {
        id: "",
        first_name: "",
        last_name: "",
        image: "",
      },
      followees: {
        id: "",
        first_name: "",
        last_name: "",
        image: "",
      },
      errors: []
    };
  },  
  created: function() {
    axios.get("/api/users/" + this.$route.params.id)
    .then(response => {
      this.user = response.data;
    });
  },
  methods: {}
};
</script>