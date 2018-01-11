<template>
      <v-toolbar fixed class="cyan" dark>
        <v-toolbar-title class="mr-4">
          <span
            class="home"
            @click="navigateTo({name: 'root'})">
              Tab-tracker
          </span>
        </v-toolbar-title>

        <v-toolbar-items>
          <v-btn flat dark>
            BROWSE
          </v-btn>
        </v-toolbar-items>

        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn
            v-if="!$store.isUserLoggedIn"
            flat
            dark
            @click="navigateTo({name: 'login'})">
            Login
          </v-btn>

          <v-btn
            v-if="!$store.isUserLoggedIn"
            flat
            dark
            @click="navigateTo({name: 'register'})">
            Sign Up
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
.home {
  cursor: pointer
}
.home:hover {
  color: #EAE
}
</style>
