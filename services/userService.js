import Doctor from '../models/Doctor.js'
import Notification from '../models/Notification.js'
import User from '../models/User.js'

class UserService {
    me = (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await User.findById(id)
                const { password, ...other } = response._doc
                return resolve(other)
            } catch (error) {
                return reject(error)
            }
        })
    }

    applyForDoctor = ({
        address,
        availableHours,
        email,
        experience,
        feePerConsultation,
        firstname,
        lastname,
        phoneNumber,
        specialization,
        id,
    }) => {
        return new Promise(async (resolve, reject) => {
            try {
                const doctor = await Doctor.create({
                    address,
                    availableHours,
                    email,
                    experience,
                    feePerConsultation,
                    firstname,
                    lastname,
                    phoneNumber,
                    specialization,
                    userId: id,
                })
                const admin = await User.findOne({ role: 'admin' })
                const notification = await Notification.create({
                    text: `${firstname} ${lastname} has applied for doctor account.`,
                    userId: admin._id,
                })

                return resolve({
                    message: 'Applied Successfully for doctor account.',
                    doctor,
                    notification,
                })
            } catch (error) {
                return reject(error)
            }
        })
    }

    listUsers = ({page, limit}) => {
        return new Promise(async (resolve, reject) => {
            try {
                const users = await User.find({}).skip(page*limit).limit(limit).sort({createdAt: -1}).lean();
                return resolve(users);
            } catch (error) {
                return reject(error);
            }
        })
    }

}

export default UserService
