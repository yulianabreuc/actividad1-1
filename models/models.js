const { permission } = require("process");

let Books = [
  {
    id: 1,
    title: 'Cien Años de Soledad',
    author: 'Gabriel García Márquez',
    year: 1967,
    genre: 'Magic realism',
    pages: 417,
    editorial: 'Sudamericana',
    disponible: true
  },
  {
    id: 2,
    title: 'El Aleph',
    author: 'Jorge Luis Borges',
    year: 1949,
    genre: 'Short stories',
    pages: 146,
    editorial: 'Losada',
    disponible: true
  }
];
let Users = [
  {
    id: 1,
    name: 'Juan',
    lastName: 'Pérez',
    email: 'asd@gmail.com',
    password : '1234',
    repassword: '1234',
    permission: 'admin'
  }
]

let rent = [];
// Exportamos los métodos que se comunicarán con la base de datos
exports.getBooks = () => Books;
exports.getBookById = (id) => Books.find(book => book.id === parseInt(id));
exports.addBook = (newData) => {
  const lastId = Books.length > 0 ? Books[Books.length - 1].id : 0;
  newData.id = lastId + 1;
  newData.disponible = true;
  Books.push(newData);
};
exports.updateBook = (id, newData) => {
  const index = Books.findIndex(book => book.id === parseInt(id));
  Books[index] = { ...Books[index], ...newData };
}
exports.deleteBook = (id) => {
  Books = Books.filter(book => book.id !== parseInt(id));
}

// Exportamos los métodos Users
exports.getUsers = () => Users;

exports.getUserByEmail = (email) => Users.find(user => user.email === email);

exports.addUser = (newData) => {
  const lastId = Users.length > 0 ? Users[Users.length - 1].id : 0;
  newData.id = lastId + 1;
  newData.permission = 'normal';
  Users.push(newData);
}

exports.updateUser = (id, newData) => {
  const index = Users.findIndex(user => user.id === parseInt(id));
  Users[index] = { ...Users[index], ...newData };
}

exports.getUserById = (id) => Users.find(user => user.id === parseInt(id));

exports.deleteUser = (id) => {
  Users = Users.filter(user => user.id !== parseInt(id));
}


// Exportamos los métodos Rent  
exports.getRents = () => rent;

exports.addRent = (newData) => {
  const lastId = rent.length > 0 ? rent[rent.length - 1].id : 0;
  newData.id = lastId + 1;
  newData.state = 'Pending';
  rent.push(newData);
}

exports.getRentByBookId = (idBook) => rent.find(rent => rent.idBook === parseInt(idBook));

exports.getRentByUserId = (idUser) => rent.find(rent => rent.idUser === parseInt(idUser));

exports.updateRent = (id, newData) => {
  const index = rent.findIndex(rent => rent.id === parseInt(id));
  rent[index] = { ...rent[index], ...newData };
}

exports.getRentById = (id) => rent.find(rent => rent.id === parseInt(id));

exports.getUserRentHistory = (id) => rent.filter(rent => rent.idUser === parseInt(id));
exports.getUserRentHistoryByState = (id, state) => rent.filter(rent => rent.idUser === parseInt(id) && rent.state === state);