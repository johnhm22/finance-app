import React from 'react';

type ContactFormEmailProps = {
  subject: string;
  email: string;
  message: string;
};

const ContactFormEmail = ({
  subject,
  email,
  message,
}: ContactFormEmailProps) => {
  return (
    <>
      <div>
        <h1>Contact Form Submission</h1>
        <p>From:{email}</p>
        <h2>Subject: {subject}</h2>
        <p>{message}</p>
      </div>
    </>
  );
};

export default ContactFormEmail;
