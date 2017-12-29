import axios from 'axios'
import reverseGeocode from 'latlng-to-zip'
import qs from 'qs'
import { publisherID } from '../utilities/indeed'

import {
  FETCH_JOBS,
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

export const fetchJobs = (region) => async (dispatch) => {
  // convert latlng to zipcode
  try {
    let zip = await reverseGeocode(region)
    // build url
    const url = buildJobsUrl(zip)
    // make API call
    let { data } = await axios.get(url)
    dispatch({ type: FETCH_JOBS, payload: data })
    console.log(data)
  } catch (err) {
    console.error(err)
  }
  // hit indeed jobs API

  axios.get()

}
