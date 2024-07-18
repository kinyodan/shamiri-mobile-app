import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key,value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  };

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value
      }
    } catch (e) {
      return false
    }
  };

  const removeItemValue  = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    }
    catch(exception) {
        return false;
    }
  }

export default {
    setResponseToken(response){
        if (response.status){
            if(response.access_token !== undefined){
                storeData("access_token", response.access_token)
               return response.access_token
            }else{
                return false
            }
        }
    },

  async getAccessToken(){
      const token = await getData("access_token")
      return token ? token : false 
  },

  setResponseData(response){
      if (response.status){
          if(response.data !== undefined){
              storeData("user_name", response.data[0])
              storeData("user_email", response.data[1])

             return response.data
          }else{
              return false
          }
      }
  },

  async getResponseData(){
    const userName = await getData("user_name")
    const userEmail = await getData("user_email")
    const data= {userName: userName, email: userEmail}
    console.log(data)
    return userEmail ? data : false 
  },

  async removeStoredToken(){
    const isRemoved = await removeItemValue('access_token')
    return isRemoved ? true : false
  }

}


