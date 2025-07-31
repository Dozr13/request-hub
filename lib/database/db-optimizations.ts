import { RequestCategory, RequestStatus } from '@/types'
import { Prisma } from '@prisma/client'
import { prisma } from './prisma'

interface GetRequestsParams {
  clerkOrgId: string
  search?: string
  status?: string
  category?: string
  limit?: number
  offset?: number
}

export const optimizedQueries = {
  async getRequestsForList(params: GetRequestsParams) {
    const {
      clerkOrgId,
      search,
      status,
      category,
      limit = 20,
      offset = 0,
    } = params

    const whereClause: Prisma.RequestWhereInput = {
      clerkOrgId,
    }

    if (search) {
      whereClause.title = {
        contains: search,
        mode: 'insensitive',
      }
    }

    if (status) {
      whereClause.status = status as RequestStatus
    }

    if (category) {
      whereClause.category = category as RequestCategory
    }

    const requests = await prisma.request.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip: offset,
    })

    return { requests }
  },
}
