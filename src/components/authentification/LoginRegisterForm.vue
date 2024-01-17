<template>
  <v-card class="d-flex flex-column">
    <v-card-title align="center" color="primary">{{ loginState ? 'Login' : 'Register' }}</v-card-title>
    <v-card-text class="justify-center">
      <v-form class="d-flex flex-column">
        <v-text-field v-model="email" label="Email"
          :rules="[v => !!v || 'E-mail is required', v => /.+@.+\..+/.test(v) || 'E-mail must be valid']"></v-text-field>
        <v-text-field v-model="password" label="Password" type="password"
          :rules="[v => !!v || 'Password is required', v => (v && v.length >= 8) || 'Password must be at least 8 characters']"></v-text-field>
        <v-text-field v-if="!loginState" v-model="passwordConfirm" label="Confirm Password" type="password"
          :rules="[v => !!v || 'Password is required', v => (v && v.length >= 8) || 'Password must be at least 8 characters', v => v === password || 'Passwords must match']"></v-text-field>
        <v-btn @click="loginState ? login : register" class="ma-2" color="primary">{{ loginState ? 'Login' : 'Register' }}</v-btn>
        <v-btn @click="switchLoginState" class="ma-2">{{ loginState ? 'Switch to Register' : 'Switch to Login' }}</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>  
<script>
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      loginState: true,
      email: '',
      password: '',
      passwordConfirm: '',
    };
  },
  methods: {
    async register() {
      const auth = getAuth();
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        // ...
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      }
    },
    async login() {
      const auth = getAuth();
      try {
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(user);

      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
      }
    },
    switchLoginState() {
      this.loginState = !this.loginState;
    },
  },
};
</script>