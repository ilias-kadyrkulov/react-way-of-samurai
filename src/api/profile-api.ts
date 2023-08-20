import { PhotosType, ProfileType } from "../types/types"
import { APIResponseType, instance } from "./api"

type SavePhotoResponseDataType = {
    photos: PhotosType
}

export const profileAPI = {
    getProfileId(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId)
            .then(res => res.data)
    },
    getUserStatus(userId: number) {
        return instance.get<string>('profile/status/' + userId)
            .then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put<APIResponseType>('profile/status', { status: status })
            .then(res => res.data)
    },
    savePhoto(photoFile: File) {
        const formData = new FormData();
        formData.append('image', photoFile); // кидаем в конец файл из input'a
        return instance.put<APIResponseType<SavePhotoResponseDataType>>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // это больше не json формат, когда не было js и AJAX - пользовались этим (отправка данных на сервер)
            }
        })
            .then(res => res.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put<APIResponseType>('profile', profile)
            .then(res => res.data)
    }
}