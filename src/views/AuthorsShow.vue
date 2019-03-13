<template>
  <div class="authors-show">
    <h2>{{ author.first_name }} {{ author.last_name }}</h2>
    <p>{{ author.biography }}</p>
    <h3>Books</h3>
     <div v-for="book in author.books">
      <p>{{ book.title }}</p>
     </div>

  </div>
</template>

<script>
var axios = require("axios");

export default {
  data: function() {
    return {
      author: {
                id: "",
                first_name: "",
                last_name: "",
                biography: "",
                books: [{
                          id: "",
                          title: "",
                          author_id: "",
                          summary: "",
                          genre: ""
                        }]
            },
      errors: []
    };
  },
  created: function() {
    axios.get('/api/authors/' + this.$route.params.id)
      .then(response => {
        console.log(response.data);
        this.author = response.data;
      });
  },
  methods: {}
};
</script>
