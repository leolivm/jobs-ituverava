import { Field, ObjectType, ID } from 'type-graphql'

@ObjectType()
export class Jobs {
  @Field(() => ID)
  id: string

  @Field(() => String)
  title: string

  @Field(() => String)
  description: string

  @Field(() => String)
  company?: string

  @Field(() => String)
  salary?: string

  @Field(() => String)
  address?: string

  @Field(() => String)
  contact: string

  @Field(() => Date)
  createdAt: Date
}
