const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 500; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "68726b82fb526d2669d9a59e",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: [
                {
                    url: "https://res.cloudinary.com/dcrhrgums/image/upload/v1752420342/YelpCamp/ajppr3k9xosrju8ro7p5.png",
                    filename: "YelpCamp/ajppr3k9xosrju8ro7p5",
                },
                {
                    url: "https://res.cloudinary.com/dcrhrgums/image/upload/v1752420344/YelpCamp/nj4akwg8xuamtu1n7aiy.jpg",
                    filename: "YelpCamp/nj4akwg8xuamtu1n7aiy",
                },
                {
                    url: "https://res.cloudinary.com/dcrhrgums/image/upload/v1752420345/YelpCamp/vi3fi0fl46yyeslpfhvq.jpg",
                    filename: "YelpCamp/vi3fi0fl46yyeslpfhvq",
                },
            ],
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ],
            },
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
