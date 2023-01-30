import Notification from "../models/Notification.js";

export const createNotifications = async (req, res, next) => {
    try {
        const {id} = req.body;

        const notification = {
            text: 'This is a test notification created for testing',
            userId: id
        }

        const notifications = []
        for(let i=0; i<10; i++) {
            const newNotification = await Notification.create(notification)
            notifications.push(newNotification);
        }

        return res.status(200).json({
            success: true,
            data: notifications
        })
    } catch (error) {
        return next(error);
    }
}