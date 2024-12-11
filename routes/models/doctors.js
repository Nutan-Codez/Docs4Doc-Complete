const mongoose = require('mongoose');

let doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNo: {
        type: Number,
        minlength: 10,
        maxlength: 10,
    },
    picture: {
        type: String,
        default:'default.jpg',
    },
    patients:[{
        type:mongoose.Schema.Types.ObjectId,
        default:[],
        ref:'User',
    }]
});


//to remove from patient side--->
// This pre-remove hook ensures that when a doctor is deleted, 
// their reference is removed from all associated patients (users).
// doctorSchema.pre('remove', async function(next) {
//     try {
//       // Pull the reference to this doctor from all patients (users)
//         await User.updateMany(
//         { 'doctor': this._id }, // Find all users who have this doctor ID as reference
//         { $pull: { 'doctor': this._id } } // Remove this doctor from their `doctor` field
//     );
//       next(); // Proceed to deletion
//     } catch (error) {
//         next(error); // If an error occurs, pass it to the next middleware
//     }
// });
// doctorSchema.pre('remove', async function(next) {
//     try {
//       // Assuming `User` model has a reference to doctorId
//         await User.updateMany({ doctor: this._id }, { $unset: { doctor: "" } });
//         next();
//     } catch (err) {
//         console.error('Error in pre-remove hook:', err);
//         next(err);  // Ensure errors are passed along to the main catch block
//     }
// });



const doctor = mongoose.model('doctor', doctorSchema);

module.exports = doctor;