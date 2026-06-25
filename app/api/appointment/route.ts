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
    .filter((chatId, index, chatIds) => chatIds.indexOf(chatId) === index)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, phone, serviceSlug, doctorSlug } = body

    if (!fullName || !phone) {
      return NextResponse.json(
        { error: 'Имя и номер телефона обязательны' },
        { status: 400 }
      )
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatIds = getTelegramChatIds()

    if (!botToken || chatIds.length === 0) {
      return NextResponse.json(
        { error: 'Конфигурация Telegram не найдена' },
        { status: 500 }
      )
    }

    const serviceName = serviceSlug
      ? `Услуга: ${serviceSlug}`
      : ''
    const doctorName = doctorSlug
      ? `Врач: ${doctorSlug}`
      : ''

    const message = `📅 Новая запись на приём!\n\n👤 Имя: ${fullName}\n📞 Телефон: ${phone}${serviceName ? `\n${serviceName}` : ''}${doctorName ? `\n${doctorName}` : ''}`

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
          return { chatId, success: false }
        }

        return { chatId, success: true }
      })
    )

    const sentCount = results.filter((result) => result.success).length
    const failedCount = results.length - sentCount

    if (sentCount === 0) {
      return NextResponse.json(
        { error: 'Ошибка при отправке сообщения' },
        { status: 500 }
      )
    }

    if (failedCount > 0) {
      console.warn('Telegram partial delivery:', { sent: sentCount, failed: failedCount })
    }

    return NextResponse.json({ success: true, sent: sentCount, failed: failedCount })
  } catch (error) {
    console.error('Appointment error:', error)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
}
