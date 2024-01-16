<template>
    <div>
      <input v-model="email" type="email" placeholder="Email">
      <input v-model="password" type="password" placeholder="Password">
      <button @click="register">Register</button>
      <button @click="login">Login</button>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
  
  export default {
    data() {
      return {
        loginState: true,
        email: '',
        password: '',
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