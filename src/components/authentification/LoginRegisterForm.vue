<template>
  <v-card class="d-flex flex-column">
    <v-card-title align="center" color="primary">{{ loginState ? 'Login' : 'Register' }}</v-card-title>
    <v-card-text class="justify-center">
      <v-form class="d-flex flex-column" @submit.prevent="registerOrLogin">
        <v-text-field v-model="email" label="Email" type="email"
          :rules="[v => !!v || 'E-mail is required', v => /.+@.+\..+/.test(v) || 'E-mail must be valid']"></v-text-field>
        <v-text-field v-model="password" label="Password" type="password"
          :rules="[v => !!v || 'Password is required', v => (v && v.length >= 8) || 'Password must be at least 8 characters']"></v-text-field>
        <v-text-field v-if="!loginState" v-model="passwordConfirm" label="Confirm Password" type="password"
          :rules="[v => !!v || 'Password is required', v => (v && v.length >= 8) || 'Password must be at least 8 characters', v => v === password || 'Passwords must match']"></v-text-field>
        <v-btn type="submit" class="ma-2" color="primary">{{ loginState ? 'Login' : 'Register' }}</v-btn>
        <v-btn @click="switchLoginState" class="ma-2">{{ loginState ? 'Switch to Register' : 'Switch to Login' }}</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>  
<script>
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

export default {
  data() {
    return {
      loginState: true,
      email: '',
      password: '',
      passwordConfirm: '',
      error: null,
    };
  },
  methods: {
    async register() {
      const auth = getAuth();
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
        const user = userCredential.user;

        this.$store.dispatch('user/registerUser', { uid: user.uid, email: user.email, username: null });

        this.$store.dispatch('snackbar/showSnackbar', { message: 'Successfully registered', color: 'success' })

      } catch (error) {
        console.log(error);
        if (error.code === 'auth/invalid-email')
          this.error = 'The email address is not valid.';
        else if (error.code === 'auth/email-already-in-use')
          this.error = 'The email address is already in use by another account.';
        else if (error.code === 'auth/weak-password')
          this.error = 'The password is too weak.';
        else
          this.error = error.message;
        this.$store.dispatch('snackbar/showSnackbar', { message: this.error, color: 'error' })
      }
    },
    async login() {
      const auth = getAuth();
      try {
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
        const user = userCredential.user;

      } catch (error) {
        console.log(error);
        if (error.code === 'auth/invalid-email')
          this.error = 'The email address is not valid.';
        else if (error.code === 'auth/user-disabled')
          this.error = 'The user corresponding to the given email has been disabled.';
        else if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential')
          this.error = 'Invalid email or password';
        else
          this.error = error.message;
        this.$store.dispatch('snackbar/showSnackbar', { message: this.error, color: 'error' })
      }
    },
    registerOrLogin() {
      if (this.loginState) {
        this.login();
      } else {
        this.register();
      }
    },
    switchLoginState() {
      this.loginState = !this.loginState;
    },
  },
};
</script>