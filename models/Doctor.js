import mongoose from 'mongoose'

const DoctorSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        specialization: {
            type: String,
            required: true,
        },
        experience: {
            type: String,
            required: true,
        },
        feePerConsultation: {
            type: Number,
            required: true,
        },
        availableHours: {
            type: Array,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        isApproved: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Doctor', DoctorSchema)
