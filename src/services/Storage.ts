import { Storage, Drivers } from '@ionic/storage';

const storage = new Storage({
    name: 'device_localdb',
    driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
  });
const storageInstance = storage.create()


export default storage;