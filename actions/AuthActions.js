import { AsyncStorage } from 'react-native'
import { Facebook } from 'expo'
import { appID } from '../utilities/facebook'

import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
} from './types'

// AsyncStorage.setItem('fb_token', token)
// AsyncStorage.getItem('fb_token')

// cleaner syntax. facebookLogin returns a function (so no curly braces)
export const facebookLogin = () => async (dispatch) => {
  // check storage for token
  let token = await AsyncStorage.getItem('fb_token')
  //
  if (token) {
    // dispatch facebook_login_success
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token })
  } else {
    // start fb login
    doFacebookLogin(dispatch)
  }
}

// helper function to perform facebook login stuff
const doFacebookLogin = async (dispatch) => {
  // params, appID, and what fb info we want
  // facebooklogin returns an object with type and token property, so destructure
  let { type, token } = await Facebook.logInWithReadPermissionsAsync(appID, {
    permissions: ['public_profile']
  })
  // login fail
  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL })
  }
  // if successful login
  await AsyncStorage.setItem('fb_token', token)
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token })
}
