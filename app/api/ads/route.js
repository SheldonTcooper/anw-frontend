import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/ads - Listar anúncios
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const location = searchParams.get('location')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')

    const where = {
      isActive: true,
      ...(category && { category: { slug: category } }),
      ...(location && { 
        location: { 
          contains: location
        }
      })
    }

    const ads = await prisma.ad.findMany({
      where,
      include: {
        category: true,
        user: {
          select: { name: true, phone: true, whatsapp: true }
        }
      },
      orderBy: [
        { isVip: 'desc' },
        { createdAt: 'desc' }
      ],
      skip: (page - 1) * limit,
      take: limit
    })

    const total = await prisma.ad.count({ where })

    return NextResponse.json({
      ads: ads.map(ad => ({
        ...ad,
        images: JSON.parse(ad.images || '[]')
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Erro ao buscar anúncios:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// POST /api/ads - Criar anúncio
export async function POST(request) {
  try {
    const data = await request.json()
    
    const ad = await prisma.ad.create({
      data: {
        ...data,
        images: JSON.stringify(data.images || [])
      },
      include: {
        category: true
      }
    })

    return NextResponse.json({
      ...ad,
      images: JSON.parse(ad.images)
    })

  } catch (error) {
    console.error('Erro ao criar anúncio:', error)
    return NextResponse.json(
      { error: 'Erro ao criar anúncio' },
      { status: 500 }
    )
  }
}