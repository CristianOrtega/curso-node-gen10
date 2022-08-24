const { nanoid } = require('nanoid');

const articles = [
    {
        id: nanoid(),
        name: 'Notebook Asus',
        description: 'You could work, play and study with this product',
        price: 999999,
        image: 'image.png'
    }
]

module.exports = articles;