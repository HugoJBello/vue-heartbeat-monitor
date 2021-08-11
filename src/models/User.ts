export interface User {
    id?: string
    username?: string,
    email: string,
    role:ROLE
}

export enum ROLE {
    USER = "INITIAL",
    ADMIN = "ADMIN",
}
