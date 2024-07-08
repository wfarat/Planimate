// storage.ts
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV({
	id: 'myAppStorage',
});

export { storage };
