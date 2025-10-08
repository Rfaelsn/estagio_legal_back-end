import { Request } from 'express';

export function extractTokensFromCookies(request: Request): {
  accessToken: string | null;
  refreshToken: string | null;
} {
  const cookieHeader = request.headers?.cookie || '';

  const accessTokenMatch = cookieHeader.match(/access_?token=([^;]+)/i);
  const refreshTokenMatch = cookieHeader.match(/refresh_?token=([^;]+)/i);

  return {
    accessToken: accessTokenMatch
      ? decodeURIComponent(accessTokenMatch[1])
      : null,
    refreshToken: refreshTokenMatch
      ? decodeURIComponent(refreshTokenMatch[1])
      : null,
  };
}
