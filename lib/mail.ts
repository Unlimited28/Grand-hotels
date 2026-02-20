import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async ({ to, subject, html }: { to: string; subject: string; html: string }) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || '"Grand Commodores Hotel" <reservations@grandcommodores.com>',
      to,
      subject,
      html,
    });
    console.log('Email sent: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};

export const sendBookingConfirmation = async ({
  to,
  name,
  roomName,
  checkIn,
  checkOut,
  totalPrice,
}: {
  to: string;
  name: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
}) => {
  const subject = `Booking Confirmation - Grand Commodores Hotel`;
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
      <h2 style="color: #C5A059;">Booking Confirmed!</h2>
      <p>Dear ${name},</p>
      <p>Thank you for choosing Grand Commodores Hotel and Suites. Your reservation has been received and is currently being processed.</p>

      <div style="background: #FAF9F6; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Reservation Details</h3>
        <p><strong>Room:</strong> ${roomName}</p>
        <p><strong>Check-in:</strong> ${checkIn}</p>
        <p><strong>Check-out:</strong> ${checkOut}</p>
        <p><strong>Total Price:</strong> $${totalPrice}</p>
      </div>

      <p>We look forward to welcoming you soon!</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 12px; color: #666;">
        Grand Commodores Hotel and Suites<br/>
        Luxury Meets Distinction
      </p>
    </div>
  `;

  return sendEmail({ to, subject, html });
};
