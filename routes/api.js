const router = require("express").Router();
const Workout = require('../models/workout');

//getLastWorkout 
router.get('/api/workouts', (req, res) => {

  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" }
      }
    }
  ])
    .sort({ day: -1 })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });

});

//Updating an existing record from the table. 
router.put('/api/workouts/:id', (req, res) => {

  //equivalent to an UPDATE statement in mYSQL 
  Workout.findByIdAndUpdate(
    req.params.id, //where _id =100 //which record u wnat to update 
    { $push: { exercises: req.body } },
    { new: true, runValidators: true } //ensuring all the input are in valid format to store in the db 
  ) //what u want to update for instance all the columns within aa table 
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//Adding a new item to the workout table 
router.post('/api/workouts', (req, res) => {
  //equivalent to an INSERT statement of MYSQL 
  Workout.create({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get('/api/workouts/range', (req, res) => {
  //SELECT * from tablename 
  Workout.find()
    .sort({ _id: -1 }) //descending -1 
    .limit(7) //top 7 records only from the sorted pile 
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;