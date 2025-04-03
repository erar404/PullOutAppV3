<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay" v-if="$route?.meta?.hideMenu === undefined">
        <ion-content>
          <ion-list id="inbox-list">
            <ion-list-header>Account Name</ion-list-header>
            <ion-note>account-mail@ionicframework.com</ion-note>

            <ion-menu-toggle :auto-hide="false"  v-for="(p, i) in appPages" :key="i">
              <ion-item @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none" :detail="false" class="hydrated" :class="{ selected: selectedIndex === i }">
                <ion-icon aria-hidden="true" slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>
          <!-- <theme-toggle></theme-toggle> -->
          
          <ion-list id="labels-list">
            <ion-list-header>Recent Scans</ion-list-header>

            <ion-item v-for="(label, index) in recentScans" lines="none" :key="index">
              <ion-icon aria-hidden="true" slot="start" :ios="timeOutline" :md="timeSharp"></ion-icon>
              <ion-label>{{ label }}</ion-label>
            </ion-item>
          </ion-list>
          <ion-toggle :checked="paletteToggle" @ionChange="toggleChange($event)" justify="space-between">Dark Mode</ion-toggle>
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script setup lang="ts">
import {
  IonApp,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRouterOutlet,
  IonSplitPane,
  IonToggle
} from '@ionic/vue';
import type { ToggleCustomEvent } from '@ionic/vue';
import { ref } from 'vue';
import {
  settingsOutline,
  settingsSharp,
  barcodeOutline,
  barcodeSharp,
  personOutline,
  personSharp,
  timeOutline,
  timeSharp
} from 'ionicons/icons';


const selectedIndex = ref(0);

const appPages = [
  {
    title: 'Scans',
    url: '/Scans',
    iosIcon: barcodeOutline,
    mdIcon: barcodeSharp,
  },
  {
    title: 'Settings',
    url: '/folder/Settings',
    iosIcon: settingsOutline,
    mdIcon: settingsSharp,
  },
  {
    title: 'Account',
    url: '/Account',
    iosIcon: personOutline,
    mdIcon: personSharp,
  },
];
const recentScans = ['03-26-2024-1612-AE', '03-25-2024-1512-PD', '03-25-2024-1102-EC', '03-24-2024-0412-AE', '03-23-2024-1612-AE', '03-22-2024-1612-AE'];

const path = window.location.pathname.split('folder/')[1];
if (path !== undefined) {
  selectedIndex.value = appPages.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
}

const paletteToggle = ref(false);


// Use matchMedia to check the user preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

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

</script>

<style >
ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
  
}

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-note {
  margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
}

ion-menu.md ion-list#inbox-list {
  border-bottom: 1px solid var(--ion-background-color-step-150, #d7d8da);
}

ion-menu.md ion-list#inbox-list ion-list-header {
  font-size: 22px;
  font-weight: 600;

  min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
  font-size: 16px;

  margin-bottom: 18px;

  color: #757575;

  min-height: 26px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
  color: #616e7e;
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a;
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}
</style>
