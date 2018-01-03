import {
  LIKE_JOB
} from '../actions/types'

import _ from 'lodash'

export default (state=[], action) => {
  switch (action.type) {
    case LIKE_JOB:
      // keeps list unique
      return _.uniqBy([ action.payload, ...state ], 'jobkey')

    default:
      return state

  }
}
