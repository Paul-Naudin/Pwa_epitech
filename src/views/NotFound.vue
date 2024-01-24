<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <div class="text-center">
          <v-icon large color="error">mdi-alert-circle-outline</v-icon>
          <h1 class="error--text">404 - Page Not Found</h1>
          <p class="grey--text text--darken-1">The page you are looking for does not exist.</p>
          <v-btn color="error" dark large to="/">Return to Home</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'NotFound',
}
</script>