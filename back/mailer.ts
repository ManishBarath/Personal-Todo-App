import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 1025,
  secure:false,
  auth: {
  },
  debug:true
});

export const sendEmail = async ( text: string) => {
  const info = await transporter.sendMail({
    from: 'Todo@gogosoon.com', 
    to : "abc@gmail.com",
    subject : "Todo Details", 
    text, 
  });

  console.log('Message sent: %s', info.messageId);
};

export const sendDueEmail = async ( to: string) => {
  const info = await transporter.sendMail({
    from: 'Todo@gogosoon.com', 
    to ,
    subject : "Hurry Up!", 
    text : " Today is your Due date", 
  });

  console.log('Message sent: %s', info.messageId);
};

