<template>
  <v-card class="d-flex flex-column">
    <v-card-title align="center" color="primary">{{ loginState ? 'Login' : 'Register' }}</v-card-title>
    <v-card-text class="justify-center">
      <v-form class="d-flex flex-column" @submit.prevent="registerOrLogin" ref="form">
        <v-text-field v-model="email" label="Email" type="email" ref="email" :error-messages="emailErrors"
          @blur="validateEmail"></v-text-field>
        <v-text-field v-if="!loginState" v-model="username" label="Username" type="text" ref="username"
          :error-messages="usernameErrors" @blur="validateUsername"></v-text-field>
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
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, confirmPasswordReset } from "firebase/auth";
import { getFirestore, getDocs, collection, setDoc } from "firebase/firestore";
import { get } from "idb-keyval";

export default {
  data() {
    return {
      loginState: true,
      email: '',
      emailErrors: [],
      username: '',
      usernameErrors: [],
      password: '',
      passwordConfirm: '',
      error: null,
      listOfUsernames: [],
    };
  },
  methods: {
    // Email form input validation
    validateEmail() {
      this.emailErrors = [];

      if (!this.email) {
        this.emailErrors.push('E-mail is required');
      } else if (!/.+@.+\..+/.test(this.email)) {
        this.emailErrors.push('E-mail must be valid');
      }
      return true;
    },
    // Username form input validation
    async validateUsername() {
      this.usernameErrors = [];

      if (!this.username) {
        this.usernameErrors.push('Username is required');
      } else if (this.username.length < 3) {
        this.usernameErrors.push('Username must be at least 3 characters');
      } else if (this.username.length > 16) {
        this.usernameErrors.push('Username must be at most 16 characters');
      } else if (!/^[a-zA-Z0-9_]+$/.test(this.username)) {
        this.usernameErrors.push('Username must only contain alphanumeric characters and underscores');
      } else if (this.listOfUsernames.includes(this.username)) {
        this.usernameErrors.push('Username already taken');
      }
    },
    // Register user
    async register() {

      // Check if username is already taken
      if (this.listOfUsernames.includes(this.username)) {
        this.error = 'Username already taken';
        this.$store.dispatch('snackbar/showSnackbar', { message: this.error, color: 'error' })
        return;
      }

      const auth = getAuth();
      try {

        // create user in firebase auth
        const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
        const user = userCredential.user;

        // create user in firestore
        await this.$store.dispatch('user/registerUser', { uid: user.uid, email: user.email, username: this.username});
        await this.$store.dispatch('snackbar/showSnackbar', { message: 'Successfully registered', color: 'success' })

        // redirect to home page
        this.$router.push('/');

      } catch (error) {
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
    // Login user
    async login() {
      const auth = getAuth();
      try {
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
        const user = userCredential.user;

        await this.$store.dispatch('user/loginUser', { uid: user.uid });
        await this.$store.dispatch('snackbar/showSnackbar', { message: 'Successfully Logged-in', color: 'success' })
        this.$router.push('/');

      } catch (error) {
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
    // Dispatch register or login depending on loginState
    async registerOrLogin() {
      if (this.loginState) {
        this.login();
      } else {
        this.register();
      }
    },
    // Switch between login and register
    switchLoginState() {
      this.loginState = !this.loginState;
    },
  },
  // Get all usernames from database when component is mounted
  async mounted() {
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      if (doc.data().username)
        this.listOfUsernames.push(doc.data().username);
    });
  },
};
</script>