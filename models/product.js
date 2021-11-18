const mongoose = require("mongoose")
// ADD PRODUCT IMAGE 
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    originalPrice: {
        type: Number,
    },
    quantityAvailable: {
        type: Number,
        required: true,
    },
    quantitySold: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        default: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, reprehenderit architecto! Ut exercitationem dolor voluptatum necessitatibus asperiores illo cumque temporibus enim nulla, vero dicta hic maxime itaque dignissimos expedita, obcaecati quasi excepturi incidunt similique in perspiciatis corporis. Harum dignissimos, ad doloribus voluptatum fuga quasi dolorum veritatis saepe quae fugit eligendi repudiandae facere? Alias, itaque iste! Sapiente sequi quam vero deserunt quae, quaerat sit quasi nobis dicta et asperiores voluptas laudantium? Ad pariatur error quae beatae, quis consectetur iusto explicabo qui, et laborum repellendus iure impedit debitis ducimus. Voluptas, in at! Ea iure similique esse. Ullam ducimus deleniti possimus provident excepturi."
    },
    img: {
        type: String,
        default: ''
    }
}, { collection: "products" })

module.exports = mongoose.model("ProductSchema", ProductSchema)
