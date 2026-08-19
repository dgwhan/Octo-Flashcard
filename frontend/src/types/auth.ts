export interface LoginRequest {
    identifier: string;
    password: string;
    rememberMe: boolean;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    expiresAt: string;
    userId: string;
    username: string;
    email: string;
}

export interface RegisterResponse {
    id: string;
    username: string;
    email: string;
    createdAt: string;
}

export interface CurrentUserResponse {
    id: string;
    username: string;
    email: string;
}