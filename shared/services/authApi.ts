import { api } from './api';

export interface SignUpRequest {
  email: string;
  password: string;
  nickname: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string | null;
  tokenType: string;
}

export interface UserResponse {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
}

/**
 * 회원가입 API
 * POST /auth/signup
 */
export async function signup(request: SignUpRequest): Promise<UserResponse> {
  return api.post<UserResponse>('/auth/signup', request);
}

/**
 * 로그인 API
 * POST /auth/login
 */
export async function login(request: LoginRequest): Promise<TokenResponse> {
  return api.post<TokenResponse>('/auth/login', request);
}

/**
 * 내 정보 조회 API
 * GET /me
 */
export async function getMe(token: string): Promise<UserResponse> {
  return api.authenticatedGet<UserResponse>('/me', token);
}
