

import axios from "axios";

class AppointmentService {
    static create(haircut) {
        return new Promise((resolve, reject) => {
            (async (haircut) => {
                const token = localStorage.getItem("bztoken");
                try {
                    await axios.post(
                        "api/new-appointment",
                        { haircut },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    resolve();
                } catch (e) {
                    reject();
                }

            })(haircut)
        })
    }

}

export default AppointmentService;