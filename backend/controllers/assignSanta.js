const Participant = require('../models/participant');
const AppError = require('../utils/AppError');

const assignSanta = async (req, res, next) => {
    try {
        const { email } = req.body;
        const santa = await Participant.findOne({ email });
        if (!santa) throw new AppError('Uh Oh! The email address of this Santa does not exist', 404);
        if (santa.assignedParticipant) {
            const assignedParticipant = await Participant.findOne({ Santa: email });
            const response = {
                name: assignedParticipant.participantName,
                email: assignedParticipant.email,
                contactNumber: assignedParticipant.contactNumber,
                address: assignedParticipant.address,
            }
            return res.status(200).send({
                message: 'assigned',
                response,
            });
        }
        const participants = await Participant.find();
        const availableParticipants = participants.filter((participant) => !participant.Santa && participant.email !== email);
        const randomIndex = Math.floor(Math.random() * availableParticipants.length);
        const randomParticipant = availableParticipants[randomIndex];
        await randomParticipant.updateOne({ Santa: email });
        await santa.updateOne({ assignedParticipant: randomParticipant.email });
       
        const response = {
            name: randomParticipant.participantName,
            email: randomParticipant.email,
            contactNumber: randomParticipant.contactNumber,
            address: randomParticipant.address,
        }
        return res.status(200).send({
            message: 'assigned',
            data: response,
        });
    }
    catch (err) {
        next(err);
    }
};
module.exports = assignSanta; 