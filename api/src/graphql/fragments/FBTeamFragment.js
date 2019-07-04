import gql from 'graphql-tag'

const FB_TEAM_FRAGMENT = gql`{
  edges{
    node{
      id
      name
      slug
      avatar
      kind
      status {
        status
        reason
        createdAt
      }
      team {
        id
        name
        slug
        owner
        profile {
          avatar
          banner
          description
          motto
          updatedAt
        }
        members {
          role
          email
          member {
            alias
          }
        }
      }
    }
  }
}`

export default FB_TEAM_FRAGMENT
