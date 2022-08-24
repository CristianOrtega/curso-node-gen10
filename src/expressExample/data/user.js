const { nanoid } = require('nanoid');

const users = [
    {
        id: nanoid(),
        name: 'Cristian',
        email: 'cristian.ortega@clave.cl'
    }
];

module.exports = users;