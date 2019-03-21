<template>
  <div class="books-index">
    <h1>All Books</h1>
    <div>
      Filter Title: <input v-model="titleFilter" list="titles">

      <datalist id="titles">
        <option v-for="book in books">{{ book.title }}</option>
      </datalist>
    </div>

    <table class="table table-striped">
      <thead class="thead-light">
        <tr>
          <th scope="col" v-on:click="setSortAttribute('title')">Title  {{ orderIndicator('title') }}</th> 
<!--           <th scope="col" v-on:click="setSortAttribute('author')">author {{ orderIndicator('author') }}</th> -->
        </tr>
      </thead>
      <tbody is="transition-group" name="slide-left">
        <tr v-for="book in orderBy(filterBy(books, titleFilter, 'title'), sortAttribute, sortOrder)" v-bind:key="book.id">
          <td>
            <router-link v-bind:to="'/books/' + book.id">
              {{ book.title }}
            </router-link>
          </td>
<!--           <td>
            {{ book.author }}
          </td> -->
        </tr>
      </tbody>
    </table>

  </div>
</template>

<style>
</style>

<script>
var axios = require('axios');
import Vue2Filters from "vue2-filters";

export default {
  data: function() {
    return {
      books: [],
      currentBook: {},
      titleFilter: '',
      sortAttribute: 'title',
      sortOrder: 1
    };
  },
  created: function() {
    axios.get("/api/books")
      .then(response => {
        this.books = response.data;
      });
  },
  methods: {
    setSortAttribute: function(inputAttribute) {
      if (this.sortAttribute === inputAttribute) {
        this.sortOrder *= -1;
      } else {
        this.sortAttribute = inputAttribute;
        this.sortOrder = 1;
      }
    },
    orderIndicator: function(inputAttribute) {
      if (this.sortAttribute === inputAttribute) {
        if (this.sortOrder === 1) {
          return "▼";
        } else {
          return "▲";
        }
      } else {
        return " ";
      }
    }
  },
  mixins: [Vue2Filters.mixin]
};
</script>