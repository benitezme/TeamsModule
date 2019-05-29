import axios from 'axios'

import { logger } from '../../../logger'

export const createTeamOnSAWeb = async (teamCodeName, teamDisplayName, codeName, displayName, authorization) => {
  logger.info('createTeamOnSAWeb -> Entering function.')

  let response = await axios({
    url: process.env.PLATFORM_API_URL,
    method: 'post',
    data: {
      query:
        `mutation web_AddTeam($team: web_TeamInput) {
          web_AddTeam(team: $team){
            codeName
          }
        }`,
      variables: {
        team: {
          codeName: teamCodeName,
          displayName: teamDisplayName,
          bot: {
            codeName,
            displayName
          }
        }
      }
    },
    headers: {
      authorization
    }
  })

  if (response.data.errors) {
    logger.error('Error creating the team: ' + JSON.stringify(response.data.errors))
    throw 'Error creating the team: ' + JSON.stringify(response.data.errors)
  } else {
    logger.info('Team created successfully.')
  }
}

export default createTeamOnSAWeb
