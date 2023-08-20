import axios from "axios"
import { UserType } from "../types/types"

export const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "0dafe35f-8562-4c22-a2e6-5a27a963c1ea"
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}
// instance.get('auth/me').then((res: AxiosResponse<any>) => res.data)