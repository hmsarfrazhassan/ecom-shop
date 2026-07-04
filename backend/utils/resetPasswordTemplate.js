export const resetPasswordTemplate = (resetLink) => {
  return `
  <!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body style="background-color: lightgray; padding: 50px">
    <div
      style="
        max-width: 600px;
        width: 100%;
        margin: 0 auto;
        padding: 20px;
        background-color: white;
        border-radius: 8px;
      "
    >
      <h1 style="text-align: center; font-weight: 400; font-family: sans-serif">
        Reset password
      </h1>
      <p style="font-family: sans-serif; text-align: center">
        We received a request to reset the password for your
        <strong>ShopOne</strong> account. If this is true, click below to reset
        your password.
      </p>
      <div style="margin: 0 auto; text-align: center">
        <a
          href="${resetLink}"
          style="
            display: inline-block;
            padding: 12px 24px;
            background: #5555f0;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-family: sans-serif;
          "
        >
          Reset Password
        </a>
      </div>
      <p style="font-family: sans-serif; text-align: center">
        if you did not forgot your password you can safely ignore this email.
      </p>
      <p style="font-family: sans-serif; font-size: 10px">
        This password reset link will expire in 15 minutes.
      </p>
    </div>
  </body>
</html>

  `;
};
