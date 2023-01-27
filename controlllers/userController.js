import UserService from "../services/userService.js";
const userService = new UserService();

class UserController {
    me = async (req, res, next) => {
        try {
            const id = req.user.id;
            const response = await userService.me(id);
            return res.status(200).json({
                success: true,
                data: response
            })
        } catch (error) {
            next(error);
        }
    }
}

export default UserController;