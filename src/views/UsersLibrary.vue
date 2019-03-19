<template>
  <div class="users-library">
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {};
  },
  created: function() {
    var user_id = localStorage.getItem("user_id");
    if (user_id) {
      this.$router.push("/users/" + user_id);
    } else {
      this.$router.push("/login");
    }
  },
  methods: {}
};
</script>