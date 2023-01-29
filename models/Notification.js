import mongoose, { Schema } from 'mongoose'

const NotificationSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },
        seen: {
            type: Boolean,
            default: false,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Notification', NotificationSchema)
