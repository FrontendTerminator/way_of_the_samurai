import axios from "axios";

const instance = axios.create({ // облегчает работу с axios запросами, подставляя автоматически нужные данные
    baseURL: "https://social-network.samuraijs.com/api/1.0/", // в строке URL автоматически будет подставляться перед другой частью адреса.
    withCredentials: true, // аргумент который передаётся в запрос для того, чтобы разрешить отправку cookie. Передаётся вторым параметром DELETE и третьим параметром в POST
    headers: {"API-KEY": "5a6ca339-ef7a-4147-8ff1-68b95a39c9e7"} // ключ для авторизация передаётся в POST и DELETE запросах третьим аргументом в axios запросах. Добавляется в cookie, чтобы сервер понял что ты авторизован и вернул нужные данные
})

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    followUser(id: number) {
        return instance.post(`follow/${id}`)
            .then(response => {
                return response.data.resultCode
            })
    },
    unFollowUser(id: number) {
        return instance.delete(`follow/${id}`)
            .then(response => {
                return response.data.resultCode
            })
    },
    getProfile(userId: string) {
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile(userId: string) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId: string) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status})
    }
}

export const authAPI = {
    auth() {
    return instance.get(`auth/me`)
    }
}
