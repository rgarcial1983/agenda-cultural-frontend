export interface User {
    id: number;
    username: string;
    email: string;
    roles: string[];
    enabled: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: User;
} 