import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server'

import { context } from './context'
import { UserResolver, JobsResolver } from './resolvers'

const app = async () => {
  const schema = await buildSchema({ resolvers: [UserResolver, JobsResolver] })

  new ApolloServer({ schema, context }).listen({ port: 3333 }, () =>
    console.log('Server is running at port 3333 🥳'),
  )
}

app()
