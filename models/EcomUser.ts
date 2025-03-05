export interface EcomUser {
    _id?: string;
    username: string;
    email: string;
    password: string;
    imageUrl: string;
    isAdmin: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

