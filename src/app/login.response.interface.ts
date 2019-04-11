export interface LoginResponse {
    body: boolean;
    token: string;
    username: string;
    roles: string[];
    photo: string;
}