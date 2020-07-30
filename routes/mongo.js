const mongodb = require('mongodb');
// const mongoUri = "mongodb://localhost:27017"
const mongoUri = "mongodb+srv://shreesh:storekaroyaar@projectcorontine-ohoqg.mongodb.net/STtest?retryWrites=true&w=majority";


module.exports = class mongo {
  //get room db
  static async getRoomDb() {
    const client = await mongodb.MongoClient.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    return client.db('chatSmash').collection('room');
  }

  //return custom room db
  static async createRoomDb(roomName) {
    const client = await mongodb.MongoClient.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    // console.log(roomName);
    return client.db('chatSmash').collection(roomName);
  }

  // get users DB
  static async getUsersDb() {
    const client = await mongodb.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    return client.db('chatSmash').collection('Users');
  }
}

// export default getRoomDb;
