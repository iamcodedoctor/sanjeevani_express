import UserService from "../services/userService.js";
const userService = new UserService();


class AdminController {
    listUsers = async (req, res, next) => {
        try {
            let {page, limit} = req.query;
            page = parseInt(page) || 0
            limit = parseInt(limit) || 10
            const response = await userService.listUsers({page, limit});
            return res.status(200).json({
                success: true,
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}

export default AdminController;