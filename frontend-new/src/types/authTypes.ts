export interface RegisterRequest {
    username: string;
    name: string;
    email: string;
    password: string;
    avatar: File | null;
    address?: AddressObject;
}

export interface AddressObject {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isPrimary: boolean;
}



export interface LoginRequest {
    username?: string
    email?: string;
    password: string;
}


export interface AuthStateUser {
    _id: string
    username: string
    email: string
    name: string
    avatar: string
    addressses?: string[]
    cartItems?: string[]
    createdAt: string
    updatedAt: string
}

export interface ChangePasswordRequest {
    oldPassword: string,
    newPassword: string
}