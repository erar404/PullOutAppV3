<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Login</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content class="ion-padding">
        <!-- Username Field -->
        <ion-item>
          <ion-label position="floating">Username</ion-label>
          <ion-input v-model="username" type="text" required></ion-input>
        </ion-item>
  
        <!-- Password Field -->
        <ion-item>
          <ion-label position="floating">Password</ion-label>
          <ion-input v-model="password" type="password" required></ion-input>
        </ion-item>
  
        <!-- Login Button -->
        <ion-button expand="full" @click="handleLogin">Login</ion-button>
  
        <!-- Signup Button -->
        <ion-button expand="full" fill="outline" @click="handleSignup">Sign Up</ion-button>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    name: 'LoginPage',
    setup() {
      const username = ref<string>(''); // Define username as a string type
      const password = ref<string>(''); // Define password as a string type
  
      const router = useRouter(); // Access Vue Router for navigation
  
      // Handle login action
      const handleLogin = (): void => {
        if (username.value && password.value) {
          // For now, you can add a simple alert or redirect logic
          alert(`Logged in with Username: ${username.value}`);
        } else {
          alert('Please fill in both fields');
        }
      };
  
      // Handle signup action
      const handleSignup = (): void => {
        // For now, simply log an alert or navigate to another page
        router.push('/signup');
      };
  
      return {
        username,
        password,
        handleLogin,
        handleSignup,
      };
    },
  });
  </script>
  
  <style scoped>
  /* Optional styling */
  ion-item {
    margin-bottom: 20px;
  }
  
  ion-button {
    margin-top: 20px;
  }
  </style>
  