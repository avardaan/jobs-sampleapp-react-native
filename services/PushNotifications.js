import { Permissions, Notifications } from 'expo'
import { AsyncStorage } from 'react-native'
import axios from 'axios'

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens'

export default async () => {
  let previousToken = await AsyncStorage.getItem('pushtoken')

  if (previousToken) {
    console.log("Previous token exists -", previousToken)
    // if token exists
    return
  }
  else {
    //console.log("previous token doesn't exist")
    // if token doesn't exist
    let permissionReturn = await Permissions.askAsync(Permissions.NOTIFICATIONS)

    //console.log("Permission return object", permissionReturn)

    // if user denies permission
    if (permissionReturn.status !== 'granted') {
      return
    }
    // generate token
    let token = await Notifications.getExpoPushTokenAsync()
    // make post request, send token to server
    await axios.post(PUSH_ENDPOINT, { token: {token} })
    // save token in AsyncStorage
    AsyncStorage.setItem('pushtoken', token)
  }
}
