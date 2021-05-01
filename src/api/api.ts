import axios from "axios";

const instance = axios.create({ /* облегчает работу с axios запросами, подставляя автоматически нужные данные */
    baseURL: "https://social-network.samuraijs.com/api/1.0/", /* в строке URL автоматически будет подставляться перед другой частью адреса. */
    withCredentials: true, /* аргумент который передаётся в запрос для того, чтобы разрешить отправку cookie. Передаётся вторым параметром DELETE и третьим параметром в POST */
    headers: {"API-KEY": "e68751ec-99e4-4ba5-aeca-d3d2975884b0"} /* ключ для авторизация передаётся в POST и DELETE запросах третьим аргументом в axios запросах. Добавляется в cookie, чтобы сервер понял что ты авторизован и вернул нужные данные */
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
    },
    savePhoto(photoFile: File) {
        const formData = new FormData()
        formData.append("image", photoFile)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}

export const authAPI = {
    auth() {
        return instance.get(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}

export const securityAPI = {
    getCaptchaUrl() {
       return instance.get("/security/get-captcha-url")
    }
}