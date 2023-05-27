const nodemailer = require("nodemailer");
async function mail(mail) {
    console.log(mail)
    let transporter = nodemailer.createTransport({
         service:"gmail",
        auth: {
            user: 'salmanaziz216@gmail.com',
            pass: 'ktebsbicykwrbdpf'
        },
      });

      let info = await transporter.sendMail({//enter your pass here
        from: '"Salman aziz" <salmanaziz216@gmail.com>', // sender address
        to:mail, // list of receivers
        subject: "Room Booking", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>You Rooms Request is Accepted</b>", // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

module.exports=mail
    
