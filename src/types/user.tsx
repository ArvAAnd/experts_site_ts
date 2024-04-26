export type UserT = {
    id: number,
    name: string,
    password: string
}

export type UserRegistrationT = {
    name: string,
    password: string
}

export type UserFromServerT = {
    id: number,
    name: string,
    password: string
}

export type UserAndTheme = {
    user_id: number,
    theme_id: number
}

export type Theme = {
    name: string
}

export type ThemeFromServerT = {
    id: number,
    name: string
}