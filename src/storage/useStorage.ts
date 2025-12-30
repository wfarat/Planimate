import {useMMKV} from 'react-native-mmkv';

export function useStorage() {
    return useMMKV({id: 'myAppStorage'});
}
