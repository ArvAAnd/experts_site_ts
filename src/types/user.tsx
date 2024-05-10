export type UserT = {
    id: number,
    name: string,
    password: string,
    experts: {
        id: number,
        name: string
    }[] | null,
    interests: {
        id: number,
        name: string
    }[] | null
}

export type UserRegistrationT = {
    name: string,
    password: string,
    gmail: string
}

export type UserAuthorizationT = {
    name: string,
    password: string
}

export type UserFromServerT = {
    id: number,
    name: string,
    password: string,
    experts: {
        id: number,
        name: string
    }[]
    interests: {
        id: number,
        name: string
    }[]
}

export type UserAndTheme = {
    id: number,
    user_id: number,
    theme_id: number
}

export type UserAndThemeForServerT = {
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

export type ExpertAndInterestedForServerT = {
    changeMode: boolean,
    user_id: number,
    themesIdExpert: number[],
    themesIdInterested: number[]
}