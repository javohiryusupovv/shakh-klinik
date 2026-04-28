import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, phone, serviceSlug, doctorSlug } = body

    if (!fullName || !phone) {
      return NextResponse.json(
        { error: 'Full name va phone number talab qilinadi' },
        { status: 400 }
      )
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!botToken || !chatId) {
      return NextResponse.json(
        { error: 'Telegram konfiguratsiyasi topilmadi' },
        { status: 500 }
      )
    }

    const serviceName = serviceSlug
      ? `Xizmat: ${serviceSlug}`
      : ''
    const doctorName = doctorSlug
      ? `Shifokor: ${doctorSlug}`
      : ''

    const message = `📅 Yangi ishga yozilish!\n\n👤 Ism: ${fullName}\n📞 Telefon: ${phone}${serviceName ? `\n${serviceName}` : ''}${doctorName ? `\n${doctorName}` : ''}`

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`

    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Telegram error:', errorData)
      return NextResponse.json(
        { error: 'Xabar yuborishda xatolik' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Appointment error:', error)
    return NextResponse.json(
      { error: 'Ichki server xatoligi' },
      { status: 500 }
    )
  }
}