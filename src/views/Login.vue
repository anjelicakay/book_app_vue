<template>
  <div class="login">
    <div class="container">
      <form v-on:submit.prevent="submit()">
        <h1>Login</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Email:</label>
          <input type="email" class="form-control" v-model="email">
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input type="password" class="form-control" v-model="password">
        </div>
<!--         <div class="g-signin2" data-onsuccess="onSignIn">
        <input type="submit" class="btn btn-primary" value="Submit">
        <meta name="google-signin-scope" content="profile email">
        <meta name="google-signin-client_id" content="CLIENT_ID.apps.googleusercontent.com">
        </div> -->

      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password
      };
      axios
        .post("/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          this.$router.push("/users/" + response.data.user_id);
        })
        .catch(error => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
    // onSignIn: function(googleUser) {
    //         // Useful data for your client-side scripts:
    //         var profile = googleUser.getBasicProfile();
    //         console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    //         console.log('Full Name: ' + profile.getName());
    //         console.log('Given Name: ' + profile.getGivenName());
    //         console.log('Family Name: ' + profile.getFamilyName());
    //         console.log("Image URL: " + profile.getImageUrl());
    //         console.log("Email: " + profile.getEmail());

    //         // The ID token you need to pass to your backend:
    //         var id_token = googleUser.getAuthResponse().id_token;
    //         console.log("ID Token: " + id_token);
    //       }
  }
};
</script>