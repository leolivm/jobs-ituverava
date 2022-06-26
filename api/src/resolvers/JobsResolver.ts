import { verify } from 'jsonwebtoken'
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql'

import { Jobs } from '../models'

import { IContext } from '../context'

interface ITokenPayload {
  iat: number
  exp: number
  sub: string
}

@InputType()
class JobInputData {
  @Field()
  title: string

  @Field()
  token: string

  @Field()
  description: string

  @Field({ nullable: true })
  company?: string

  @Field({ nullable: true })
  salary?: string

  @Field({ nullable: true })
  address?: string

  @Field()
  contact: string
}
@Resolver()
export class JobsResolver {
  @Mutation(() => Jobs)
  async createJob(
    @Arg('data') data: JobInputData,
    @Ctx() ctx: IContext,
  ): Promise<Jobs> {
    const { token, contact, description, title, salary, address, company } =
      data

    const decoded = verify(token, '5c97ba027b3ab46ff90029e4765617d0')

    const { sub } = decoded as ITokenPayload

    const user = await ctx.prisma.users.findUnique({
      where: { id: sub },
    })

    if (!user) throw new Error('Invalid auth token')

    return ctx.prisma.jobs.create({
      data: {
        title,
        description,
        salary: salary ?? '',
        address: address ?? '',
        company: company ?? '',
        contact,
        user: { connect: { id: user.id } },
      },
    })
  }

  @Query(() => [Jobs], { nullable: true })
  async findUserAllJobs(
    @Arg('token') token: string,
    @Ctx() ctx: IContext,
  ): Promise<Jobs[]> {
    const decoded = verify(token, '5c97ba027b3ab46ff90029e4765617d0')

    const { sub } = decoded as ITokenPayload

    return ctx.prisma.jobs.findMany({
      where: { usersId: sub },
    })
  }

  @Query(() => [Jobs], { nullable: true })
  async findAllJobs(@Ctx() ctx: IContext): Promise<Jobs[]> {
    return ctx.prisma.jobs.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    })
  }

  @Mutation(() => Jobs)
  async deleteJob(@Arg('id') id: string, @Ctx() ctx: IContext): Promise<Jobs> {
    return ctx.prisma.jobs.delete({
      where: { id },
    })
  }
}
