'use server';

import { Resend } from 'resend';
import ContactFormEmail from '../emails/contact-form-email';

export const sendMessage = async (data: FormData) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const senderEmail = data.get('email');
    const subject = data.get('subject');
    const message = data.get('message');

    const emailSent = await resend.emails.send({
      from: 'Contact Form<onboarding@resend.dev>',
      to: 'johnhmorgan@outlook.com',
      reply_to: senderEmail as string,
      subject: subject as string,
      react: ContactFormEmail({
        email: senderEmail as string,
        subject: subject as string,
        message: message as string,
      }),
    });
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
