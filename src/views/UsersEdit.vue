<template>
  <div class="users-edit">

    <ul>
      <li v-for="error in errors"{{ error }}</li>
    </ul>
    <div class='container'>
      <h2>Edit Profile</h2>
      <form v-on:submit.prevent="submit()">
        <div class="form-group">
          <label>First Name: </label>
          <input class='form-control' type='text' v-model="user.first_name" placeholder="First Name">
        </div>
        <div class="form-group">
          <label>Last Name: </label>
          <input class='form-control' type='text' v-model="user.last_name" placeholder="Last Name">
        </div>
        <div class="form-group">
          <label>New Email: </label>
          <input class='form-control' type='text' v-model="user.email" placeholder="New Email">
        </div>
        <div class="form-group">
          <label>New Profile Picture: </label>
          <input class='form-control' type='text' v-model="user.image" placeholder="New Profile Picture">
        </div>
        <input type="submit" value="Save" class="btn btn-primary">
      </form>
    </div>
  </div>
</template>


<style>

</style>


<script>
var axios = require('axios');

export default {
  data: function() {
    return {
      user: {
              first_name: "",
              last_name: "",
              email: "",
              image: ""
              },
      errors: []
    };
  },
  created: function() {
    axios.get("/api/users/" + this.$route.params.id)
      .then(response => {
        console.log(response.data);
        this.user = response.data;
      })
  },
  methods: {
    submit: function() {
      var params = {
                    first_name: this.user.first_name,
                    last_name: this.user.last_name,
                    email: this.user.email,
                    image: this.user.image
                    };
      axios.patch("/api/users/" + this.user.id, params)
        .then(response => {
          this.$router.push("/users/" + this.user.id);
        }).catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
}
</script>