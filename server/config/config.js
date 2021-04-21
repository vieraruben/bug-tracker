const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET || "BugTrackerApp",
    mongoUri: process.env.MONGODB_URI ||
      process.env.MONGO_HOST ||
      'mongodb+srv://admin:admin2021@cluster0.v5pwu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  }
  
  module.exports = config
  
  