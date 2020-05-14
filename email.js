import sgMail from '@sendgrid/mail';
import jwt from 'jsonwebtoken';

sgMail.setApiKey(appConfig.emailNotification.sendgridApiKey);
const EMAIL_SECRET = appConfig.emailNotification.emailSecretHash || 'fisjoaijOEJRASDF2R2930RFDOIFMQ3ASLDKM';

const sendVerificationEmail = async (uid, { user, emailAddress }) => {
  const token = jwt.sign({ email: emailAddress, name }, EMAIL_SECRET, { expiresIn: '1d' });
  const html = htmlTemplate
    .replace('{{firstName}}', name)
    .replace('{{token}}', token)
    .replace('{{CONFIRMATION_URL}}', 'https://verify.tracescan.ca');
  const msg = {
    to: emailAddress,
    from: 'do-not-reply@tracescan.ca',
    subject: 'TraceScan - Verify Organization Email',
    html,
  };

  const response = await sgMail.send(msg);
  if (response[0].statusCode !== 202) {
    throw new Error('Failed to send verification email.');
  }
  return { message: 'Successfully sent verification email.' };
};

const verifyEmail = async (token) => {
  const { email, name } = jwt.verify(token, EMAIL_SECRET);

  console.log("verifyEmail:", { email, name });
  // update firestore


  // return User.findByIdAndUpdate(
  //   user._id,
  //   { $set: { isEmailVerified: true } },
  //   { new: true },
  // ).exec();
};


const htmlTemplate = `<meta charset="UTF-8">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>HiRide</title>
<style type="text/css">
  #outlook a {padding:0;}
  body{width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; margin:0; padding:0;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;}
  .ExternalClass {width:100%;}
  .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div, .ExternalClass blockquote {line-height: 100%;}
  .ExternalClass p, .ExternalClass blockquote {margin-bottom: 0; margin: 0;}
  #backgroundTable {margin:0; padding:0; width:100% !important; line-height: 100% !important;}

  img {outline:none; text-decoration:none; -ms-interpolation-mode: bicubic;}
  a img {border:none;}
  .image_fix {display:block;}

  p {margin: 1em 0;}

  h1, h2, h3, h4, h5, h6 {color: black !important;}
  h1 a, h2 a, h3 a, h4 a, h5 a, h6 a {color: black;}
  h1 a:active, h2 a:active,  h3 a:active, h4 a:active, h5 a:active, h6 a:active {color: black;}
  h1 a:visited, h2 a:visited,  h3 a:visited, h4 a:visited, h5 a:visited, h6 a:visited {color: black;}

  table td {border-collapse: collapse;}
  table { border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; }

  a {color: #3498db;}
  p.domain a{color: black;}

  hr {border: 0; background-color: #d8d8d8; margin: 0; margin-bottom: 0; height: 1px;}

  @media (max-device-width: 667px) {
    a[href^="tel"], a[href^="sms"] {
      text-decoration: none;
      color: blue;
      pointer-events: none;
      cursor: default;
    }

    .mobile_link a[href^="tel"], .mobile_link a[href^="sms"] {
      text-decoration: default;
      color: orange !important;
      pointer-events: auto;
      cursor: default;
    }

    h1[class="profile-name"], h1[class="profile-name"] a {
      font-size: 32px !important;
      line-height: 38px !important;
      margin-bottom: 14px !important;
    }

    span[class="issue-date"], span[class="issue-date"] a {
      font-size: 14px !important;
      line-height: 22px !important;
    }

    td[class="description-before"] {
      padding-bottom: 28px !important;
    }
    td[class="description"] {
      padding-bottom: 14px !important;
    }
    td[class="description"] span, span[class="item-text"], span[class="item-text"] span {
      font-size: 16px !important;
      line-height: 24px !important;
    }

    span[class="item-link-title"] {
      font-size: 18px !important;
      line-height: 24px !important;
    }

    span[class="item-header"] {
      font-size: 22px !important;
    }

    span[class="item-link-description"], span[class="item-link-description"] span {
      font-size: 14px !important;
      line-height: 22px !important;
    }

    .link-image {
      width: 84px !important;
      height: 84px !important;
    }

    .link-image img {
      max-width: 100% !important;
      max-height: 100% !important;
    }
  }

  @media (max-width: 500px) {
    .column {
      display: block !important;
      width: 100% !important;
      padding-bottom: 8px !important;
    }
  }

  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    a[href^="tel"], a[href^="sms"] {
      text-decoration: none;
      color: blue;
      pointer-events: none;
      cursor: default;
    }

    .mobile_link a[href^="tel"], .mobile_link a[href^="sms"] {
      text-decoration: default;
      color: orange !important;
      pointer-events: auto;
      cursor: default;
    }
  }

  @media (max-width: 600px) {
    .container {
      padding: 0 20px 28px 20px;
    }
  }

  @media (min-width: 600px) {
    .container {
      padding: 0 56px 28px 56px;
    }
  }

</style>
<!--[if gte mso 9]>
  <style type="text/css">
    #contentTable {
      width: 600px;
    }
  </style>
<![endif]-->


<table id="backgroundTable" style="margin:0; padding:0; width:100% !important; line-height: 100% !important; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;background-color: #F9FAFB;" width="100%" cellspacing="0" cellpadding="0" border="0">
<tbody><tr>
  <td width="10" valign="top">&nbsp;</td>
  <td valign="top" align="center">
    <!--[if (gte mso 9)|(IE)]>
    <table width="600" align="center" cellpadding="0" cellspacing="0" border="0" style="background-color: #FFF; border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;">
      <tr>
        <td>
    <![endif]-->
    <table style="width: 100%; max-width: 600px; background-color: #FFF; border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;" id="contentTable" cellspacing="0" cellpadding="0" border="0" align="center">
      <tbody><tr>
        <td style="border-collapse:collapse;" width="600" valign="top" align="center">
          <table style="background: #F9FAFB;" width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
<tbody><tr>
<td valign="top" align="center">
<div style="font-family: &quot;lato&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; line-height: 28px;">&nbsp;</div>
</td>
</tr>
</tbody></table>
<table style="border: 1px solid #E0E4E8;" width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
<tbody><tr>
<td style="padding: 56px 56px 28px 56px;" valign="top" align="center">
<div style="font-family: &quot;lato&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; line-height: 28px;font-size: 20px; color: #333;"><strong>Dear {{firstName}},</div>
</td>
</tr>
<tr>
<td class="container" valign="top" align="center">
<div style="font-family: &quot;lato&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; line-height: 28px;font-size: 20px; color: #333;">Thanks for registering your email address with HiRide! <strong>Just one more thing to do,</strong> click the confirm email button to finish up the verification process.</div>
</td>
</tr>
<tr>
<td class="container" valign="top" align="center">
<div><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="#" style="height:40px;v-text-anchor:middle;width:270px;" arcsize="125%" stroke="f" fillcolor="#E15718">
  <w:anchorlock></w:anchorlock>
  <center>
<![endif]-->
    <a href="{{CONFIRMATION_URL}}?token={{token}}" style="background-color:#F2C739;border-radius:50px;color:#ffffff;display:inline-block;font-family: 'lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:18px;font-weight: bold;line-height:40px;text-align:center;text-decoration:none;width:270px;-webkit-text-size-adjust:none;" target="_blank">Confirm Email</a>
<!--[if mso]>
  </center>
</v:roundrect>
<![endif]--></div>





</td>
</tr>
</tbody></table>
<table style="background: #F9FAFB;" width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
<tbody><tr>
<td style="padding: 28px 56px;" valign="top" align="center">
</td>
</tr>
<tr>
<td style="padding: 0 56px 28px 56px;" valign="top" align="center">
</td>
</tr>
<tr>
<td style="padding: 0 56px 28px 56px;" valign="middle" align="center">
<span style="font-family: &quot;lato&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; line-height: 28px;font-size: 16px; color: #A7ADB5; vertical-align: middle;"> With <span style="font-size: 20;color: red">&#9829</span> from HiRide</span>
&nbsp;
</td>
</tr>
</tbody></table>

        </td>
      </tr>
    </tbody></table>
    <!--[if (gte mso 9)|(IE)]>
        </td>
      </tr>
    </table>
    <![endif]-->
  </td>
  <td width="10" valign="top">&nbsp;</td>
</tr>
</tbody></table>`;


export default {
  sendVerificationEmail,
  verifyEmail
};
