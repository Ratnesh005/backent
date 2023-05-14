const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const mongoURI =
  "mongodb+srv://food:12345@cluster0.6nbd9co.mongodb.net/foodmern?retryWrites=true&w=majority"; 
module.exports = function (callback) {
  mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
    
    if (err) console.log("---" + err);
    else {
      // var database =
      console.log("connected to mongo");
      const fetched_data = await mongoose.connection.db.collection("food_items");
      fetched_data.find({}).toArray(async function (err, data) {
        const foodCategory = await mongoose.connection.db.collection(
          "foodCategory"
        );
        foodCategory.find({}).toArray( function (err, catData) {
          callback(err, data, catData);
          // if(err)
          // console.log(err);
          // else
          // {
          //   global.food_items =data;
          //   global.foodCategory =catData;

          // }
        });
      });
      // listCollections({name: 'food_items'}).toArray(function (err, database) {
      // });
      //    module.exports.Collection = database;
      // });
    }
  });
};
