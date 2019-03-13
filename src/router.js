import Vue from 'vue'
import Router from 'vue-router'
import UsersShow from './views/UsersShow.vue'
import BooksShow from './views/BooksShow.vue'
import AuthorsShow from './views/AuthorsShow.vue'
import Signup from './views/Signup.vue'
import Login from './views/Login.vue'
import Logout from './views/Logout.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [

    { path: "/users/:id", name: "users-show", component: UsersShow },
    { path: "/books/:id", name: "books-show", component: BooksShow },
    { path: "/authors/:id", name: "authors-show", component: AuthorsShow },
    { path: "/", name: "signup", component: Signup },
    { path: "/login", name: "login", component: Login },
    { path: "/logout", name: "logout", component: Logout }
  ]
})
