import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

interface CheckoutItem {
  id?: string
  name: string
  price: number
  quantity: number
  image?: string | null
  category?: string | null
  size?: string | null
}

interface CheckoutPayload {
  firstName: string
  lastName: string
  email?: string
  phone: string
  address: string
  city: string
  paymentMethod?: string
  notes?: string
  items: CheckoutItem[]
}

function isValidPayload(body: any): body is CheckoutPayload {
  return (
    body &&
    typeof body.firstName === 'string' &&
    typeof body.lastName === 'string' &&
    typeof body.phone === 'string' &&
    typeof body.address === 'string' &&
    typeof body.city === 'string' &&
    Array.isArray(body.items) &&
    body.items.length > 0
  )
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)

    if (!isValidPayload(body)) {
      return NextResponse.json({ error: 'Donnees invalides' }, { status: 400 })
    }

    const customerName = `${body.firstName} ${body.lastName}`.trim()
    const normalizedItems = body.items.map((item) => ({
      id: item.id || null,
      name: item.name,
      price: Number(item.price) || 0,
      quantity: Number(item.quantity) || 1,
      image: item.image || null,
      category: item.category || null,
      size: item.size || null,
    }))
    const totalAmountMAD = normalizedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )

    const firstItem = normalizedItems[0]
    const supabase = createClient()
    const { error } = await supabase.from('order_requests').insert({
      customer_name: customerName,
      email: body.email || null,
      phone: body.phone,
      city: body.city,
      address: body.address,
      notes: body.notes || null,
      payment_method: body.paymentMethod || null,
      primary_product_title: firstItem?.name || null,
      primary_product_price_mad: firstItem?.price || null,
      total_amount_mad: totalAmountMAD,
      items: normalizedItems,
      status: 'PENDING',
      source: 'web_checkout',
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
