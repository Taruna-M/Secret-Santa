const mongoose = require('mongoose');
const { Schema } = mongoose;

const secretSantaPartcipantSchema = new Schema({
    participantName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    assignedParticipant: {
        type: String,
        default: null,
    },
    Santa: {
        type: String,
        default: null,
    },
});

const Participant = mongoose.model('SecretSantaParticipants', secretSantaPartcipantSchema);

module.exports = Participant;