<template>
    <ion-item>
      <ion-label>Dark Mode</ion-label>
      <ion-toggle
        v-model="isDarkMode"
        @ionChange="toggleTheme"
        slot="end"
      ></ion-toggle>
    </ion-item>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { IonToggle, IonLabel, IonItem } from '@ionic/vue';
  import storage from '@/services/Storage'; // Optional, for storing theme preference
  
  export default defineComponent({
    name: 'ThemeToggle',
    components: {
      IonToggle,
      IonLabel,
      IonItem,
    },
    setup() {
      const isDarkMode = ref<boolean>(false);
  
      // Function to toggle theme
      const toggleTheme = async () => {
        const mode = isDarkMode.value ? 'dark' : 'light';
        document.body.setAttribute('color-theme', mode); // Apply the theme
        await storage.set('theme', mode); // Save the theme preference (optional)
      };
  
      // On mount, check if theme preference exists and set it
      onMounted(async () => {
        const savedTheme = await storage.get('theme');
        if (savedTheme) {
          isDarkMode.value = savedTheme === 'dark';
          document.body.setAttribute('color-theme', savedTheme); // Apply saved theme
        } else {
          // Default theme
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          isDarkMode.value = prefersDark;
          document.body.setAttribute('color-theme', prefersDark ? 'dark' : 'light');
        }
      });
  
      return {
        isDarkMode,
        toggleTheme,
      };
    },
  });
  </script>
  
  <style scoped>
  /* Optional: Customize styles for the toggle component */
  </style>