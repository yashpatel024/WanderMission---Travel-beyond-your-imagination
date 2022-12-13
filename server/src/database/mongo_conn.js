const mongoose = require('mongoose');

module.exports = {
    connectDb: async (DatabaseURI) => {
      try {
            await mongoose.connect(DatabaseURI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log("Mongo connected");
        } catch (error) {
            console.log(error.message);
        }
    }
};