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