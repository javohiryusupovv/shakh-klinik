import { NextRequest, NextResponse } from 'next/server'

function getTelegramChatIds() {
  const raw = process.env.TELEGRAM_CHAT_IDS || [
    process.env.TELEGRAM_CHAT_ID,
    process.env.TELEGRAM_CHAT_ID_ADMIN,
  ].filter(Boolean).join(',')

  return raw
    .split(',')
    .map((chatId) => chatId.trim())
    .filter(Boolean)
}

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
    const chatIds = getTelegramChatIds()

    if (!botToken || chatIds.length === 0) {
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

    const results = await Promise.all(
      chatIds.map(async (chatId) => {
        const response = await fetch(telegramUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ status: response.status }))
          console.error('Telegram error:', { chatId, error: errorData })
          return false
        }

        return true
      })
    )

    if (results.some((success) => !success)) {
      return NextResponse.json(
        { error: 'Xabar yuborishda xatolik' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, sent: chatIds.length })
  } catch (error) {
    console.error('Appointment error:', error)
    return NextResponse.json(
      { error: 'Ichki server xatoligi' },
      { status: 500 }
    )
  }
}
