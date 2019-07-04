import gql from 'graphql-tag'

const FB_FRAGMENT = gql`{
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
}`

export default FB_FRAGMENT
