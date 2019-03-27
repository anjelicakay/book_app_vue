<template>
  <div id="app">

<!--     <section id="preloader">
        <div class="loader" id="loader">
            <div class="loader-img"></div>
        </div>
    </section> -->


    <div class="wrapper">
      <header id="header" class="header-transparent header--dark" style="min-height: 84px;">
          <nav id="navigation" class="header-nav">
              <div class="container">
                  <div class="row d-flex flex-md-row align-items-center">
                      <div class="nav-menu ml-auto">
                          <ul class="">
                              <li class="nav-menu-item">
                                  <router-link to="/search">Book Search</router-link>
                              </li>
                              <li class="nav-menu-item">
                                  <router-link to="/">My Library</router-link>
                              </li>
                              <li class="nav-menu-item">
                                  <router-link to="book_clubs">Create a Book Club</router-link>
                              </li>
                              <li class="nav-menu-item">
                                  <router-link to="/login">Login</router-link>
                              </li>
                              <li class="nav-menu-item">
                                  <router-link to="/logout">Logout</router-link>
                              </li>
                              <li class="nav-menu-item">
                                  <router-link to="/signup">Sign Up</router-link>
                              </li>
                          </ul>
                      </div>
                      <div class="nav-icons">
                          <div class="nav-icon-item d-lg-none">
                              <span class="nav-icon-trigger menu-mobile-btn align-middle"><i class="ion"></i></span>
                          </div>
                      </div>
                  </div>
              </div>
          </nav>
        </header>

        <!-- End Header -->

        <!-- Intro Section -->
        <section class="inner-intro bg-image overlay-light parallax parallax-background1" data-background-img="/img/book_background.jpg">
        </section>
        <!-- End Intro Section -->

      <div class='clearfix'>
        <router-view/>
      </div>

      <!-- FOOTER -->
      <footer class="footer">
          <div class="ptb-30">
              <div class="container">
                  <!--Footer Info -->
                  <div class="row footer-info">
                      <div class="col-lg-12 col-md-12 col-sm-12">
                          <div class="footer-block">
                              <a class="footer-logo">
                                  <img class="sizing" src="/img/bookends_logo.png"/>
                              </a>
                              <p>Bookends is a social media platform designed to build a community around what is typically an individual activity - reading.</p>
                          </div>
                      </div>
                  </div>
                  <!-- End Footer Info -->
              </div>
          </div>
          <hr />
      </footer>
      <!-- END FOOTER -->

    </div>
    <!-- Site Wraper End -->



<!--     <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.clearfix{
  min-height: 1500px
}

.sizing{
  height: 70px;
}

</style>
