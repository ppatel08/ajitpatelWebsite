import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      first_name,
      last_name,
      email,
      phone,
      state,
      insurance_type,
      expiration_date,
      comments,
      attachment,
    } = req.body;

    const emailOptions = {
      from: 'InSapna Insurance <noreply@insapnainsurance.com>',
      to: 'priyank.patel118@gmail.com',
      replyTo: email,
      subject: `New Quote Request — ${first_name} ${last_name}`,
      html: `
        <h2>New Quote Request</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;font-family:sans-serif;">
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Name</td>
              <td style="padding:8px;border-bottom:1px solid #eee;">${first_name} ${last_name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Email</td>
              <td style="padding:8px;border-bottom:1px solid #eee;">${email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Phone</td>
              <td style="padding:8px;border-bottom:1px solid #eee;">${phone}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">State</td>
              <td style="padding:8px;border-bottom:1px solid #eee;">${state}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Insurance Type</td>
              <td style="padding:8px;border-bottom:1px solid #eee;">${insurance_type}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Expiration Date</td>
              <td style="padding:8px;border-bottom:1px solid #eee;">${expiration_date || 'Not provided'}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Comments</td>
              <td style="padding:8px;border-bottom:1px solid #eee;">${comments || 'None'}</td></tr>
        </table>
      `,
    };

    if (attachment) {
      emailOptions.attachments = [
        {
          filename: attachment.filename,
          content: Buffer.from(attachment.content, 'base64'),
        },
      ];
    }

    const { error } = await resend.emails.send(emailOptions);

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
