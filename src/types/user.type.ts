interface User {
    id: string;
    username: string;
    email: string;
    created_at: Date;
    updated_at: Date;
}

interface UserLogin {
    username: string;
    password: string;
}


interface UserRegistration {
    username: string;
    email: string;
    password: string;
}

export type {User, UserLogin, UserRegistration};
