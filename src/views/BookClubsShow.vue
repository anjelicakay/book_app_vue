<template>
  <div class="book-clubs-show">
    <div>
      <h2>{{ book_club.name }}</h2>
      <h3>Current Book Selection</h3>
      <h4>{{ book_club.book.title }}</h4>
      <img :src="book_club.book.image_url">
    </div>

     <div class="accordion d-flex justify-content-center">
       <div class="card z-depth-0 bordered">
         <div class="card-header" id="headingOne2">
           <h5 class="mb-0">
             <button class="btn btn-link d-flex justify-content-center" type="button" data-toggle="collapse" data-target="#collapseOne2"
               aria-expanded="true" aria-controls="collapseOne2">
               Add Members
             </button>
           </h5>
         </div>
         <div id="collapseOne2" class="collapse" aria-labelledby="headingOne2" data-parent="#accordionExample275">
           <div class="card-body">
             <div class="container">
               <form v-on:submit.prevent="submit()">
                   <input v-model="searchTerm" placeholder="Enter name">
                 <div>
                    <datalist id="names">
                      <option v-for="user in users">{{ user.first_name }} {{ user.last_name }}</option>
                    </datalist>
                   <input type="submit" value="Find"> 
                 </div>
               </form>
             </div>
           </div>
         </div>
       </div>
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
      searchTerm: "",
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
  methods: {
    submit: function() {
      this.searchTerm = 
      axios
        .get("/api/users" + searchTerm)
        .then(response => {
          this.users = response.data;
          // this.searchTerm = "";
        });
    },
  }
};
</script>
