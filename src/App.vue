<template>
  <div id="app">

    <div class="wrapper">
      <header id="header" class="header-transparent header--sticky header--dark" style="min-height: 84px;">
          <nav id="navigation" class="header-nav">
              <div class="container">
                  <div class="row d-flex flex-md-row align-items-center">
                      <div class="nav-menu ml-auto">
                          <ul class="">
                              <li class="nav-menu-item">
                                  <router-link to="/">My Library</router-link>
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
                  </div>
              </div>
          </nav>
        </header>
      </div>
        <!-- End Header -->

      <router-view/>
      <!-- FOOTER -->
      <footer class="footer">
          <div class="ptb-30">
              <div class="container">
                  <!--Footer Info -->
                  <div class="row footer-info">
                      <div class="col-lg-3 col-md-12 col-sm-12">
                          <div class="footer-block">
                              <a class="footer-logo mb-25" href="home.html">
                                  <img src="img/logo-black.png" />
                              </a>
                              <p>Bookends is a social media platform designed to build a community around what is typically an individual activity - reading.</p>
                              <ul class="social">
                                  <li><a target="_blank" href="https://www.twitter.com/"><i class="fa fa-twitter"></i></a></li>
                                  <li><a target="_blank" href="https://instagram.com/"><i class="fa fa-instagram"></i></a></li>
                                  <li><a target="_blank" href="https://www.facebook.com/"><i class="fa fa-facebook"></i></a></li>
                                  <li><a target="_blank" href="https://vimeo.com/"><i class="fa fa-vimeo-square"></i></a></li>
                                  <li><a target="_blank" href="https://www.behance.net/"><i class="fa fa-behance"></i></a></li>
                              </ul>
                          </div>
                      </div>
                      <div class="col-lg-6 col-md-4 col-sm-4">
                          <div class="footer-block">
                              <h6 class="link-title">Company</h6>
                              <ul class="link">
                                  <li><a href="#">About Company</a></li>
                                  <li><a href="#">Our Team</a></li>
                                  <li><a href="#">FAQ</a></li>
                              </ul>
                          </div>
                      </div>

                      <div class="col-lg-3 col-md-6 col-sm-12">
                          <div class="footer-block">
                              <h6 class="link-title">Contact</h6>
                              <p>215 W. Ohio St., Chicago, IL 60654</p>
                              <ul class="link">
                                  <li><a href="mailto:yourname@domain.com"><i class="fa fa-envelope-o left"></i>contact@bookends.com</a></li>
                                  <li><a><i class="fa fa-phone left"></i>312/555-1223</a></li>
                              </ul>
                          </div>
                      </div>
                  </div>
                  <!-- End Footer Info -->
              </div>
          </div>
          <hr />

          <!-- Copyright Bar -->
          <section class="copyright ptb-40">
              <div class="container">
                  <p class="">
                      © 2018 <a><b>Mazel Template</b></a>. All Rights Reserved.
                      <br />
                      Template  by <a target="_blank" href="http://nileforest.com/"><b>nileforest</b></a>
                  </p>
              </div>
          </section>
          <!-- End Copyright Bar -->

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
</style>
