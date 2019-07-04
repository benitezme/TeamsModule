import gql from 'graphql-tag'

const TEAM_FB_FRAGMENT = gql`{
  id
  name
  slug
  members {
    role
    member {
      alias
      authId
    }
    status {
      id
      status
      reason
      createdAt
    }
  }
  fb {
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
  }
}`

export default TEAM_FB_FRAGMENT
