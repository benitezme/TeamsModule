import 'dotenv/config'
import express from 'express'
import createApolloServer from './ApolloServer'
import { formatError } from './errors'
import {
  Prisma,
  extractFragmentReplacements
} from 'prisma-binding'
import { importSchema } from 'graphql-import'
import { resolvers } from './graphql/resolvers'
import { schemaDirectives } from './directives'
import pubsub from './pubsub'
import { logger } from './logger'
import wrongPreshared from './errors/notAllowed.json'

const GRAPHQL_ENDPOINT = '/graphql'
const GRAPHQL_SUBSCRIPTIONS = '/graphql'
const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV
const SCHEMA_PATH = process.env.SCHEMA_PATH

const db = new Prisma({
  fragmentReplacements: extractFragmentReplacements(resolvers),
  typeDefs: importSchema(SCHEMA_PATH),
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  debug: false
})

const app = express()

app.post(GRAPHQL_ENDPOINT, (req, res, next) => {
  if (req.headers.preshared === process.env.PRESHARED_GATEWAY_KEY) {
    next();
  } else {
    res.send(wrongPreshared);
  }
});

app.post(GRAPHQL_ENDPOINT)

const server = createApolloServer(app, {
  graphqlEndpoint: GRAPHQL_ENDPOINT,
  subscriptionsEndpoint: GRAPHQL_SUBSCRIPTIONS,
  apolloServerOptions: { formatError },
  typeDefs: importSchema('src/graphql/schema.graphql'),
  resolvers,
  resolverValidationOptions: { requireResolversForResolveType: false },
  schemaDirectives,
  context: req  => ({
    ...req ,
    token: req.headers ? req.headers : undefined,
    user: req.user ? req.user : undefined,
    userId: (req.headers && req.headers.userid) ? req.headers.userid : undefined,
    db,
    pubsub
  })
})

server.listen({ port: PORT }, () => {
  logger.info(
    `GraphQL Server is running on http://localhost:${PORT}${GRAPHQL_ENDPOINT} in "${NODE_ENV}" mode\n`
  )
})
