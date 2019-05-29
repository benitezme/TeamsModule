import axios from 'axios'

import { logger } from '../../../logger'

export const deleteTeamOnSAWeb = async (codeName, authorization) => {
  logger.info('deleteTeamOnSAWeb -> Entering function.')

  let response = await axios({
    url: process.env.PLATFORM_API_URL,
    method: 'post',
    data: {
      query:
        `mutation web_DeleteTeam($team: web_DeleteTeamInput) {
          web_DeleteTeam(team: $team){
            codeName
          }
        }`,
      variables: {
        team: {
          codeName
        }
      }
    },
    headers: {
      authorization
    }
  })

  if (response.data.errors) {
    logger.error('Error deleting the team: ' + JSON.stringify(response.data.errors))
    throw 'Error deleting the team: ' + JSON.stringify(response.data.errors)
  } else {
    logger.info('Team deleted successfully.')
  }
}

export default deleteTeamOnSAWeb
