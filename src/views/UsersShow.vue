<template>
  <div class="users-show">
    <h2>{{ user.first_name }}</h2>
    <h3>Currently Reading</h3>
    <div v-for="book in books">
      <ul>
        <router-link v-bind:to="'/books/' + book.id">
          <h3>{{ user.book.title }}</h3>
        </router-link>
      </ul>
      
    </div>
    
  </div>
</template>

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
                              status: ""
                            }]
            },
      errors: []
    };
  },
  created: function() {
    axios.get('/api/users/' + this.$route.params.id)
      .then(response => {
        console.log(response.data);
        this.user = response.data;
      });
  },
  methods: {
    connect: function() {}
  }
};
</script>
