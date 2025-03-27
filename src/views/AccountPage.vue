<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title>Accounts</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <br><br>
            <ion-header> Account Name </ion-header>
            <ion-list> 
                <ion-item> 
                    <!-- <p> {{retval }}</p> -->
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>


<script setup lang="ts">
import { IonContent, IonToolbar, IonPage, IonButtons, IonMenuButton, IonHeader, IonTitle, IonList, IonItem  } from '@ionic/vue';
import storage from '@/services/Storage';
import { defineComponent, ref } from 'vue';
import { rgmcAPIurl } from '@/globals';
import axios from 'axios';

// const userData = await fetch(rgmcAPIurl + '/systemuser').then(
//     response => {
//         if (response.ok) {
//             console.log(response.json())
//         } else {
//             console.log('errorss')
//         }
//     }
// )
// const response = await axios.get(rgmcAPIurl + '/systemuser');
// const data = response.data;
// await storage.set('apiData', data);

// console.log(storage.get('testdata'))
// console.log(storage.get('testdata'))



</script>

<style>

</style>