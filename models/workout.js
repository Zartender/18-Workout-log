const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    //Array of objects which have diff columns 
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: "Enter type of exercise"
            }, 
            name: {
                type: String,
                required: "Enter name"
            },
            duration: {
                type: Number,
                required: "Enter time"
            },
            weight: {
                type: Number
            },
            reps: {
                type: Number
                
            },
            sets: {
                type: Number
        
            },
            distance: {
                type: Number
                
            },

        }
    ],
   
    day: {
        type: Date,
        default: Date.now
    }
});



// type: 'resistance',
// name: 'Bicep Curl',
// duration: 20,
// weight: 100,
// reps: 10,
// sets: 4,


const Workout = mongoose.model("workout", workoutSchema);

module.exports = Workout;