<template>
  <ion-page>
      <ion-header :translucent="true">
          <ion-toolbar>
              <ion-buttons slot="start">
                  <ion-menu-button color="primary"></ion-menu-button>
              </ion-buttons>
              <ion-title>Scans</ion-title>
          </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
          <br><br>
          <ion-header> Scan 1</ion-header>
      </ion-content>
  </ion-page>
</template>


<script lang="ts">
  import {
    InfiniteScrollCustomEvent,
    IonAvatar,
    IonContent,
    IonFab,
    IonFabButton,
    IonIcon,
    IonImg,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonItem,
    IonLabel,
    IonList,
    alertController
  } from '@ionic/vue';
  import { defineComponent, reactive, ref, onMounted } from 'vue';
  import storage from '@/services/Storage';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    components: {
      IonAvatar,
      IonContent,
      IonFab,
      IonFabButton,
      IonIcon,
      IonImg,
      IonInfiniteScroll,
      IonInfiniteScrollContent,
      IonItem,
      IonLabel,
      IonList,
    },
    setup() {
      const items = reactive<any>([]);
      const router = useRouter(); // Access Vue Router for navigation

      const generateItems = () => {
        const count = items.length + 1;
        for (let i = 0; i < 50; i++) {
          items.push(`Item ${count + i}`);
        }
      };
      

      const ionInfinite = (event: InfiniteScrollCustomEvent) => {
        generateItems();
        setTimeout(() => event.target.complete(), 500);
      };

      generateItems();


      const presentAlert = async (header: string, subHeader: string, message: string ) => {
        const alert = await alertController.create({
          header: header,
          subHeader: subHeader,
          message: message,
          buttons: ['OK'],
        });

        await alert.present();
      };

      const presentLoginAlert = async () => {
        const loginAlert = await alertController.create({
              header: 'RGMC Scanner',
              subHeader: 'Not Logged In',
              message: 'Please Login Again to Continue',
              buttons: [
                {text: 'OK',
                  handler: () => {
                    router.push('/login')
                  }
                }
              ],
          });

         await loginAlert.present();

            
      }

      onMounted(async () => {
        await storage.get('isLoggedin').then(
          data =>  {
            if (!data) {
              console.log('truee')
              presentLoginAlert()
              
            }
          }
        )


      });

      return { ionInfinite, items };
    },
  });
</script>