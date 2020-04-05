import axios from "axios";

const url = process.env.NODE_ENV === "production" ? "api" : "http://localhost:8080/api";

class UserService {
    static createUser(newUser) {
        return new Promise((resolve, reject) => {
            (async (newUser) => {
                try {
                    const { data: req } = await axios.post(`${url}/signup`, { newUser });
                    resolve(req);
                } catch (e) {
                    reject(e.response.data);
                }
            })(newUser)
        })
    }

    static login(creds) {
        return new Promise((resolve, reject) => {
            (async (creds) => {
                try {
                    const { data: req } = await axios.post(`${url}/login`, { ...creds });
                    resolve(req);
                } catch (e) {
                    reject(e.response.data);
                }
            })(creds)
        })
    }

    static logout() {
        return new Promise((resolve, reject) => {
            const error = false;
            localStorage.removeItem("bztoken");
            resolve();
            if (error) reject()
        })
        // TODO: post request to /logout to remove token from user in db. 
        // needs user info in vuex store to achieve this outcome
    }

    static guard() {
        const token = localStorage.getItem("bztoken");
        return new Promise((resolve, reject) => {
            (async (token) => {
                try {
                    const res = await axios.get(`${url}/verify`, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });
                    resolve(res.data.auth)
                } catch (e) {
                    reject(false);
                }
            })(token)
        })
    }

}

export default UserService;