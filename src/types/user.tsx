export type UserT = {
    id: number,
    name: string,
    password: string,
    'c++'?: boolean
}

export type UserRegistrationT = {
    name: string,
    password: string
}

export type UserFromServerT = {
    id: number,
    name: string,
    password: string,
    'c++'?: boolean
}