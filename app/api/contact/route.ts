import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, email, phone, service, message } = body

    if (!fullName || !email || !phone || !service || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      )
    }

    const resend = new Resend(process.env.RESEND_API_KEY || 're_PXEXbLqR_BNuPPjSpLWNgr6HJJQpcScLt')

    const { data, error } = await resend.emails.send({
      from: 'KRONEUS Contact Form <onboarding@resend.dev>',
      to: 'rohiths7102@gmail.com',
      replyTo: email,
      subject: `New Contact Request from ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 40px 20px;">
          <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #06b6d4; margin: 0; font-size: 28px;">KRONEUS</h1>
              <p style="color: #64748b; margin: 5px 0 0 0;">Zero Trust Security</p>
            </div>
            
            <h2 style="color: #0f172a; margin: 0 0 20px 0; font-size: 22px; border-bottom: 2px solid #06b6d4; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; color: #475569; font-weight: 600; width: 120px;">Name:</td>
                  <td style="padding: 10px 0; color: #0f172a;">${fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #475569; font-weight: 600;">Email:</td>
                  <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #06b6d4; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #475569; font-weight: 600;">Phone:</td>
                  <td style="padding: 10px 0; color: #0f172a;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #475569; font-weight: 600;">Service:</td>
                  <td style="padding: 10px 0; color: #0f172a;">${service}</td>
                </tr>
              </table>
            </div>
            
            <div style="background: #ffffff; padding: 20px; border-radius: 8px; border-left: 4px solid #06b6d4;">
              <h3 style="color: #475569; margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Message:</h3>
              <p style="color: #0f172a; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                Sent from KRONEUS Contact Form<br/>
                ${new Date().toLocaleString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    )
  }
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
