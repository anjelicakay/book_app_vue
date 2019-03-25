import Vue from 'vue'
import Router from 'vue-router'
import UsersShow from './views/UsersShow.vue'
import UsersConnections from './views/UsersConnections.vue'
import UsersLibrary from './views/UsersLibrary.vue'
import UsersEdit from './views/UsersEdit.vue'
import BooksIndex from './views/BooksIndex.vue'
import BooksShow from './views/BooksShow.vue'
import BooksSearch from './views/BooksSearch.vue'
import AuthorsShow from './views/AuthorsShow.vue'
import BookClubsShow from './views/BookClubsShow.vue'
import BookClubsNew from './views/BookClubsNew.vue'
import Signup from './views/Signup.vue'
import Login from './views/Login.vue'
import Logout from './views/Logout.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [

    { path: "/users/:id", name: "users-show", component: UsersShow },
    { path: '/users/:id/edit', name: 'users-edit', component: UsersEdit },
    { path: '/users/:id/connections', name: 'users-connections', component: UsersConnections},
    { path: '/', name: 'users-library', component: UsersLibrary },
    { path: "/books", name: "books-index", component: BooksIndex },
    { path: "/results", name: "books-show", component: BooksShow },
    { path: "/search", name: "search", component: BooksSearch},
    { path: "/authors/:id", name: "authors-show", component: AuthorsShow },
    { path: "/book_clubs/:id", name: "book-clubs-show", component: BookClubsShow },
    { path: "/book_clubs", name: "book-clubs-new", component: BookClubsNew},
    { path: "/signup", name: "signup", component: Signup },
    { path: "/login", name: "login", component: Login },
    { path: "/logout", name: "logout", component: Logout }
  ]
})
