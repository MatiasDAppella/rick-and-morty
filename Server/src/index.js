const server = require('./app');
const PORT = 3001;

// Database connection
const { conn } = require('./database');

server.listen(PORT, async () => {
    try {
      await conn.sync({ force: true });
      console.log('Database connected successfully')
    } catch (error) {
      console.log('ERROR connecting database')
    }
    console.log(`Server raised in port: ${PORT}`);
});