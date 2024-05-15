import nodemailer from 'nodemailer';

export const POST = async (req) => {
  
 


  const { selectedRows } = await req.json();
  console.log(selectedRows,"Check")

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  let tableContent = '<table border="1"><thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Hobbies</th></tr></thead><tbody>';

selectedRows.forEach(row => {
    tableContent += `<tr><td>${row.name}</td><td>${row.email}</td><td>${row.phone}</td><td>${row.hobbies}</td></tr>`;
});

tableContent += '</tbody></table>';

let mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'info@redpositive',
    subject: 'Selected Rows Data',
    html: tableContent,


 
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ message: 'Email sent successfully' }), { status: 200 });
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ message: 'Error sending email', error }), { status: 500 });
  }
};
