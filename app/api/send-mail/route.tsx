import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const emailInfo = await request.json();
    
    const { email, nombre, description, telefono} = emailInfo;
    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PW,
      },
    });

    const mailOptions = {
      from: nombre,
      to: process.env.NODEMAILER_EMAIL,
      subject: "Recibiste un mensaje en la web",
      template: "email",
      html: `
        <h3>Mensaje de ${nombre}</h3>
        <p>Teléfono: ${telefono}</p>
        <p>Email: ${email}</p>
        <p>Mensaje: ${description}</p>
    `,
    };

    const data = await transporter.sendMail(mailOptions);
    console.log(data.response);
    return NextResponse.json(
      {
        message: "Email sent",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error,
      },
      { status: 500 }
    );
  }
}