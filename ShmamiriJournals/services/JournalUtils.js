import AsyncStorage from '@react-native-async-storage/async-storage';

 async function save(key, value) {
    try {
        await AsyncStorage.setItem(key, value);
      } catch (e) {
        console.log(a)
      }
  }

 export default {
    storeData(response){
        if (response.status){
            if(response.data !== undefined){
                save("journals",response.data)
            }
        }
    },

    async getData(){
        const value = await AsyncStorage.getItem('journals');
        if (value !== null) {
            return value
        }else{
            return false
        }    

    }

}
