import { Platform } from "react-native";
import * as Device from 'expo-device';
export const getBaseUrl = () => {
    if(Device.isDevice){
        return 'http://192.168.1.209:3000'
    }
    return Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';


}
export const BASE_URL = getBaseUrl();