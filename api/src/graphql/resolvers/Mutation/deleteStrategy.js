import axios from 'axios'

import { logger } from '../../../logger'

export const deleteStrategy = fbSlug => {
  logger.info('deleteStrategy')
  logger.info(fbSlug)
  return new Promise((resolve, reject) => {
    try {
      return axios.post(process.env.PLATFORM_API_URL, {
        query: `mutation strategizer_DeleteTradingSystem($fbSlug: String!) {
          strategizer_DeleteTradingSystem(fbSlug: $fbSlug){
            id
          }
        }`,
        variables: {
          fbSlug: fbSlug
        }
      }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          logger.info('deleteStrategy result')
          logger.info(res.data)
          resolve(res.data)
        })
        .catch(err => {
          logger.error('deleteStrategy err')
          logger.error(err)
          reject(err)
        })
    } catch (error) {
      reject(error)
    }
  })
}

export default deleteStrategy
