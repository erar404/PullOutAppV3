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
        <ion-input label="Username" 
        label-placement="floating" 
        placeholder="Enter Username" 
        v-model="username" 
        type="text" 
        required></ion-input>
      </ion-item>

      <!-- Password Field -->
      <ion-item>
        <ion-input
          label="Password"
          label-placement="floating" 
          placeholder="Enter Password"
          v-model="password"
          :type="passwordVisible ? 'text' : 'password'"
          required
        ></ion-input>
        <!-- Eye Icon to toggle password visibility -->
        <ion-icon
          :name="passwordVisible ? 'eye' : 'eye-off'"
          slot="end"
          @click="togglePasswordVisibility"
          style="cursor: pointer;"
          class="password-eye-icon"
        ></ion-icon>
      </ion-item>

      <!-- Login Button -->
      <ion-button expand="full" @click="handleLogin">Login</ion-button>

      <!-- Signup Button -->
      <ion-button expand="full" fill="outline" @click="handleSignup">Sign Up</ion-button>
      <ion-icon
          :name="prefersDark ? 'moon-sharp' : 'sun-sharp'"
          slot="end"
          @click="toggleChange"
        ></ion-icon>
        <ion-toggle :checked="paletteToggle" @ionChange="toggleChange($event)" justify="space-between" class="toggle-dark">Dark Mode</ion-toggle>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
    IonTitle,
    IonToolbar,
    IonHeader,
    IonLabel,
    IonInput,
    IonItem,
    IonButton,
    IonContent,
    IonPage,
    IonIcon,
    IonToggle,
    loadingController,
    alertController
  } from '@ionic/vue'
import type { ToggleCustomEvent } from '@ionic/vue';
import { addIcons } from 'ionicons';
import { eye, 
  eyeOff, 
  eyeOffOutline, 
  eyeOutline,
 } from 'ionicons/icons';
import storage from '@/services/Storage';
import axios from 'axios';
import { rgmcAPIurl } from '@/globals';

export default defineComponent({
  name: 'LoginPage',
  components: {
    IonIcon,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonLabel,
    IonInput,
    IonItem,
    IonButton,
    IonContent,
    IonPage,
    IonToggle,
    
  },
  setup() {
    const username = ref<string>(''); // Define username as a string type
    const password = ref<string>(''); // Define password as a string type
    const passwordVisible = ref<boolean>(false); // Track visibility of password

    const router = useRouter(); // Access Vue Router for navigation
    const systemUsers =  ref<any[]>([]);

    // Dark mode
    const paletteToggle = ref(false);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)'); // Use matchMedia to check the user preference\

    const showLoading = async () => {
      const loading = await loadingController.create({
            message: 'Loading Data. Internet Connection Needed...',
      });

        loading.present()
    }

    // Start Loading of data from API - Transfer to storage
    const loadUserData = async (loading: any) => {
      try {
        const response = await axios.get(rgmcAPIurl + '/systemuser');
       if (response.data.length > 0) {
        await storage.set('SystemUserList', response.data);
        systemUsers.value = await response.data;
       }
      } catch (Exception) {
        loading.dismiss()
        presentAlert('Login', 'Error while loading user data', 'Error Details (Please send a screenshot): \n'+ Exception)
      }

    } 

    const loadCompanyData = async (loading: any) => {
      try {
        const response = await axios.get(rgmcAPIurl + '/company');
        if (response.data.length > 0) {
          await storage.set('CompanyList', response.data);
        } else {
          loading.dismiss()
          presentAlert('Login', 'No company data Loaded', '(Please send a screenshot) Details : No Company Data were loaded')
        }
      } catch (Exception) {
        presentAlert('Login', 'Error while loading company data', 'Error Details (Please send a screenshot): \n'+ Exception)
      }
    }

    const loadCustomerData = async (loading: any) => {
      try {
        const response = await axios.get(rgmcAPIurl + '/customer');
        if (response.data.length > 0) {
          await storage.set('CustomerList', response.data);
        } else {
          loading.dismiss();
          presentAlert('Login', 'No customer data Loaded', '(Please send a screenshot) Details : No customer Data were loaded')
        }
      } catch (Exception) {
        presentAlert('Login', 'Error while loading customer data', 'Error Details (Please send a screenshot): \n'+ Exception)
      }
    }

    

    const presentAlert = async (header: string, subHeader: string, message: string ) => {
      const alert = await alertController.create({
        header: header,
        subHeader: subHeader,
        message: message,
        buttons: ['OK'],
      });

      await alert.present();
    };
    // Register icons when the component is mounted
    onMounted(async () => {
      addIcons({
        eye,     // Register the eye icon
        eyeOff,
      });

      const loading = await loadingController.create({
        message: 'Loading Data. Internet Connection Needed...',});
      
      loading.present()
      loadUserData(loading);
      loadCustomerData(loading);
      // loadCompany()
      loading.dismiss();
    });

    // Add or remove the "ion-palette-dark" class on the html element
    const toggleDarkPalette = (shouldAdd : boolean) => {
      document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
    };

    // Check/uncheck the toggle and update the palette based on isDark
    const initializeDarkPalette = (isDark: boolean) => {
      paletteToggle.value = isDark;
      toggleDarkPalette(isDark);
    };

    // Initialize the dark palette based on the initial
    // value of the prefers-color-scheme media query
    initializeDarkPalette(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (mediaQuery) => initializeDarkPalette(mediaQuery.matches));

    // Listen for the toggle check/uncheck to toggle the dark palette
    const toggleChange = (event: ToggleCustomEvent) => {
      toggleDarkPalette(event.detail.checked);
    };
        

    // Toggle password visibility
    const togglePasswordVisibility = (): void => {
      passwordVisible.value = !passwordVisible.value; // Toggle the boolean value
    };

    // Handle login action
    const handleLogin = (): void => {
      if (username.value && password.value) {
        // For now, you can add a simple alert or redirect logic
        if (systemUsers.value.find(val => val.secCode.toUpperCase() === username.value.toUpperCase() && val.passwordDecrypted === password.value)) {
          presentAlert('login', 'Success!', 'Logged in with Username: ${username.value}');
          router.push('/Scans')
        } else {
          presentAlert('login', 'Credentials', `Incorrect Username/Password`);
        }
      } else {
        presentAlert('login', 'Credentials', 'Please fill in both fields');
      }
    };

    // Handle signup action
    const handleSignup = (): void => {
      // For now, simply log an alert or navigate to another page
      // router.push('/signup');
      console.log('sss')
    };
    return {
      username,
      password,
      passwordVisible,
      eyeOutline, 
      eyeOffOutline,
      eye, 
      eyeOff,
      prefersDark,
      paletteToggle,
      togglePasswordVisibility,
      handleLogin,
      handleSignup,
      toggleChange,
      initializeDarkPalette,
      showLoading
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

.toggle-dark {
  position: fixed;
  top: 95%;
}

/* Center the password eye icon */
.password-item {
  position: relative;
}

.password-eye-icon {
  position: absolute;
  right: 10px; /* Adjust to your needs */
  top: 50%;
  transform: translateY(-50%);
}

</style>
