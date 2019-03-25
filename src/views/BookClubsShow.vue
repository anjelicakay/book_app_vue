<template>
  <div class="book-clubs-show">
    <h2>{{ book_club.name }}</h2>
    <h4>{{ book_club.book.title }}</h4>
     </div>
  </div>
</template>

<script>
var axios = require("axios");

export default {
  data: function() {
    return {
      book_club: {
                  id: "",
                  name: "",
                  book_id: "",
                  book: {
                          id: "",
                          title: "",
                          author_id: "",
                          summary: "",
                          genre: "",
                          image_url: "",
                          page_count: ""
                        }
            },
      errors: []
    };
  },
  created: function() {
    axios.get('/api/book_clubs/' + this.$route.params.id)
      .then(response => {
        console.log(response.data);
        this.book_club = response.data;
      // }).catch(error => {
      //   console.log(error.response.data.errors);
      //   this.$router.push("/")
      });
  },
  methods: {}
};
</script>
