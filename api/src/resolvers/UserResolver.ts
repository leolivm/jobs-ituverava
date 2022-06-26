import { sign } from 'jsonwebtoken'
import { compare, hash } from 'bcrypt'
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql'

import { User } from '../models'

import { IContext } from '../context'

@InputType()
class UserInputData {
  @Field()
  email: string

  @Field()
  password: string
}

@ObjectType()
class UserWithToken {
  @Field()
  user: User

  @Field()
  token: string
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async privateInfo(
    @Arg('token') token: string,
    @Ctx() ctx: IContext,
  ): Promise<User | null> {
    const dbToken = await ctx.prisma.tokens.findUnique({
      where: { token },
      select: {
        user: {
          select: {
            id: true,
            email: true,
            password: false,
            createdAt: true,
          },
        },
      },
    })

    if (!dbToken) throw new Error('User was not found')

    const { user } = dbToken

    return user
  }

  @Mutation(() => User)
  async signUp(
    @Arg('data') data: UserInputData,
    @Ctx() ctx: IContext,
  ): Promise<User | null> {
    const { email, password } = data

    const hashedPassword = await hash(password, 8)

    const emailExists = await ctx.prisma.users.findUnique({
      where: { email },
    })

    if (emailExists) throw new Error('Email already is used')

    return ctx.prisma.users.create({
      data: { email, password: hashedPassword },
    })
  }

  @Mutation(() => UserWithToken)
  async login(
    @Arg('data') data: UserInputData,
    @Ctx() ctx: IContext,
  ): Promise<UserWithToken | null> {
    const { email, password } = data

    const user = await ctx.prisma.users.findUnique({
      where: { email },
    })

    if (!user) throw new Error('User was not found')

    const passwordMatches = compare(password, user.password)

    if (!passwordMatches) throw new Error('Password does not match')

    const { id } = user

    const generatedToken = sign({ id }, '5c97ba027b3ab46ff90029e4765617d0', {
      subject: id,
      expiresIn: '1d',
    })

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete user.password

    const { token } = await ctx.prisma.tokens.create({
      data: { token: generatedToken, user: { connect: { id } } },
    })

    return { user, token }
  }
}
