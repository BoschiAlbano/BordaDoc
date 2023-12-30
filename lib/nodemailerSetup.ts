import nodemailer from "nodemailer";

const config = {
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: process.env.From, // generated ethereal user
        pass: process.env.Google_Nodemailer, // generated ethereal password
    },
};

const transporter = nodemailer.createTransport(config);

export default transporter;
