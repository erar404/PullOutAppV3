import { Storage, Drivers } from '@ionic/storage';

export default {
    install: async (app: any) => {
        // const storage = new Storage()
        const storage = new Storage({
            name: '__mydb',
            driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
          });
        const storageInstance = await storage.create()
    
        app.config.globalProperties.$ionicStorage = storageInstance
        // app.config.globalProperties.$store.$ionicStorage = storageInstance // for vuex
        // return app
    }
}



