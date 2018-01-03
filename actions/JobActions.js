import axios from 'axios'
import reverseGeocode from 'latlng-to-zip'
import qs from 'qs'
import { publisherID } from '../utilities/indeed'

import {
  FETCH_JOBS,
  LIKE_JOB,
} from './types'

// root url indeed API
const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?'
// object which will get converted into API request url string
const JOB_QUERY_PARAMS = {
  publisher: publisherID,
  format: 'json',
  v: '2',
  latlong: 1,
  radius: 10,
  q: 'javascript'
}

// return final API search URL after massaging
const buildJobsUrl = (zip) => {
  const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip })
  return `${JOB_ROOT_URL}${query}`

}

export const fetchJobs = (region, navigationCallback) => async (dispatch) => {
  // convert latlng to zipcode
  try {
    let zip = await reverseGeocode(region)
    // build url
    const url = buildJobsUrl(zip)
    // make API call
    let { data } = await axios.get(url)
    dispatch({ type: FETCH_JOBS, payload: data })
    // execute nav command passed in from MapScreen
    navigationCallback()
  } catch (err) {
    console.error(err)
  }
}

export const likeJob = (job) => {
  // synchronous action, so don't need to return dispatch function
  return {
    type: LIKE_JOB,
    payload: job,
  }
}
