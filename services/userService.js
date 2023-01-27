import User from "../models/User.js"

class UserService {
    me = (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await User.findById(id);
                const {password, ...other} = response._doc;
                return resolve(other);
            } catch (error) {
                return reject(error);
            }
        })
    }
}

export default UserService;