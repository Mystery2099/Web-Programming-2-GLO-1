export const redirectTo = (url: string): string =>
	`<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="refresh" content="0;url=${url}">
  </head>
  <body></body>
</html>`;

export const errorMessage = (message: string): string => `<p style="color: red;">${message}</p>`;
