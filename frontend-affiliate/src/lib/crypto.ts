const secretKey = process.env.NEXT_PUBLIC_API_URL;
export function generateAuthUrl(roles: string) {
  const payload = JSON.stringify({ roles });

  const encodedState = Buffer.from(
    JSON.stringify({ payload, secretKey })
  ).toString("base64");

  return encodedState;
}
