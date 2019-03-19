import Vue from 'vue'
import Router from 'vue-router'
import BooksIndex from './views/BooksIndex.vue'
import UsersShow from './views/UsersShow.vue'
import BooksShow from './views/BooksShow.vue'
import AuthorsShow from './views/AuthorsShow.vue'
import UsersConnections from './views/UsersConnections.vue'
import UsersEdit from './views/UsersEdit.vue'
import UsersLibrary from './views/UsersLibrary.vue'
import Signup from './views/Signup.vue'
import Login from './views/Login.vue'
import Logout from './views/Logout.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [

    { path: "/books", name: "books-index", component: BooksIndex },
    { path: "/users/:id", name: "users-show", component: UsersShow },
    { path: "/books/:id", name: "books-show", component: BooksShow },
    { path: "/authors/:id", name: "authors-show", component: AuthorsShow },
    { path: '/users/:id/connections', name: 'users-connections', component: UsersConnections},
    { path: '/users/:id/edit', name: 'users-edit', component: UsersEdit },
    { path: '/', name: 'users-library', component: UsersLibrary },
    { path: "/signup", name: "signup", component: Signup },
    { path: "/login", name: "login", component: Login },
    { path: "/logout", name: "logout", component: Logout }
  ]
})
