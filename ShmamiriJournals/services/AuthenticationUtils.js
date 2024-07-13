import AsyncStorage from '@react-native-async-storage/async-storage';

 async function save(key, value) {
    console.log("storeResponseToken")
    try {
          if (Platform.OS === 'android') {
            await SecureStore.setItemAsync(key, value);
          } else {
            await AsyncStorage.setItem(key, value);
          }
      } catch (e) {
        console.log(a)
      }
  }

export default {
    storeResponseToken(response){
        if (response.status){
            if(response.access_token !== undefined){
                save("access_token",response.access_token)
            }
        }
    },

    async getAccessToken(){
          let value = false
          if (Platform.OS === 'android') {
            value = await SecureStore.getItemAsync("access_token");
          } else {
            value = await AsyncStorage.getItem("access_token");
          }
        console.log(value)
        console.log("getAccessToken")
        if (value !== null) {
            return value
        }else{
            return false
        }    

    }

}
