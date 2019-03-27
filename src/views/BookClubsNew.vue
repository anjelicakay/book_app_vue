<template>
  <div class="book-clubs-new">
    <div id="container">
      <h2>Create a Book Club</h2>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      <form v-on:submit.prevent="submit()">
        <div>
          Name: <input v-model="newBookClubName">
        </div>
        <div>
          Book: <input v-model="newBookClubBookId">
        </div>
        <input type="submit" value="Create" class="btn btn-warning">
      </form>
    </div>
  </div>
</template>

<style>
#conatiner{
  padding-top: 50px;
}
</style>

<script>
  var axios = require('axios')

export default {
  data: function() {
    return {
      newBookClubName: "",
      newBookClubBookId: "",
      errors: []
    };
  },
  created: function() {},
  methods: {
    submit: function (){
      console.log("Create the book club");
      var params = {
                    name: this.newBookClubName,
                    book_id: this.newBookClubBookId
                    };
      axios.post("/api/book_clubs", params)
        .then(response => {
          console.log("Success", response.data);
          this.$router.push("/");
        }).catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>