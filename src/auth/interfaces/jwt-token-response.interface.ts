export interface JwtTokenResponse {
  userId: string;
  username: string;
  type: 'refresh' | 'access';
}
