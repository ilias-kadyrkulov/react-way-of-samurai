import { GetItemsType, APIResponseType, instance } from "./api"

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => res.data)
    },
    followUser(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`)
            .then(res => res.data)
    },
    unfollowUser(userId: number) {
        return instance.delete<APIResponseType>(`follow/${userId}`)
            .then(res => res.data) as Promise<APIResponseType>
    }
}