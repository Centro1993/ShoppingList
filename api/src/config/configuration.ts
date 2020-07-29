export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    mongodb: {
        uri: process.env.MONGODB_URI || 'mongodb://mongodb:27017/shoppingList'
    },
    apiUrl: process.env.API_URL || 'http://localhost:' + (parseInt(process.env.PORT, 10) || 3000)
});