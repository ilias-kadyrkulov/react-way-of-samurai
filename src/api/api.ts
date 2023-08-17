import axios, { AxiosResponse } from "axios"
import { PhotosType, ProfileType, UserType } from "../types/types"

const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "0dafe35f-8562-4c22-a2e6-5a27a963c1ea"
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})

type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string
}
type FollowResponseType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type UnfollowResponseType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}
export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => res.data)
    },
    followUser(userId: number) {
        return instance.post<FollowResponseType>(`follow/${userId}`)
            .then(res => res.data)
    },
    unfollowUser(userId: number) {
        return instance.delete<UnfollowResponseType>(`follow/${userId}`)
            .then(res => res.data)
    }
}


export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}
type MeResponseType = {
    data: { id: number, email: string, login: string }
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type LoginResponseType = {
    data: { userId: number }
    resultCode: ResultCodesEnum | ResultCodeForCaptcha
    messages: Array<string>
}
type LogoutResponseType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}
export const authAPI = {
    me() {
        return instance.get<MeResponseType>('auth/me')
            .then(res => res.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>('auth/login', { email, password, rememberMe, captcha })
            .then(res => res.data)
    },
    logout() {
        return instance.delete<LogoutResponseType>('auth/login')
            .then(res => res.data)
    }
}

// instance.get('auth/me').then((res: AxiosResponse<any>) => res.data)
type UpdateStatusProfileResponseType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type SavePhotoResponseType = {
    data: PhotosType
    resultCode: ResultCodesEnum
    messages: Array<string>
}
export const profileAPI = {
    getProfileId(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId)
    },
    getUserStatus(userId: number) {
        return instance.get<string>('profile/status/' + userId)
    },
    updateStatus(status: string) {
        return instance.put<UpdateStatusProfileResponseType>('profile/status', { status: status })
            .then(res => res.data)
    },
    savePhoto(photoFile: File) {
        const formData = new FormData();
        formData.append('image', photoFile); // кидаем в конец файл из input'a
        return instance.put<SavePhotoResponseType>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // это больше не json формат, когда не было js и AJAX - пользовались этим (отправка данных на сервер)
            }
        })
        .then(res => res.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put<UpdateStatusProfileResponseType>('profile', profile)
            .then(res => res.data)
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get('security/get-captcha-url')
    }
}