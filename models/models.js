const { permission } = require("process");

let Publi = [
  {
    id: 1,
    title: 'Cien Años de Soledad',
    description: 'La obra narra la historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo. La novela combina lo fantástico con lo real maravilloso y lo épico para representar la historia de América Latina y Colombia. La novela es considerada una obra maestra de la literatura en lengua española y una de las obras más traducidas y leídas en el mundo.',
    urlMedia: 'https://images-na.ssl-images-amazon.com/images/I/51Q5pFV1HPL._SX331_BO1,204,203,200_.jpg',
  },
  {
    id: 2,
    title: 'El Amor en los Tiempos del Cólera',
    description: 'La novela narra la vida de Florentino Ariza y Fermina Daza, quienes se enamoran en su juventud, pero Fermina decide casarse con Juvenal Urbino. Florentino jura esperarla hasta que enviude. La historia transcurre en un ambiente de realismo mágico y es considerada una de las obras más importantes de la literatura hispanoamericana.',
    urlMedia: 'https://images-na.ssl-images-amazon.com/images/I/51y6qg0K2OL._SX331_BO1,204,203,200_.jpg',
  }
];
let Users = [
  {
    id: 1,
    name: 'Juan',
    lastName: 'Pérez',
    userName: 'juanp',
    email: 'asd@gmail.com',
    password : '1234',
    repassword: '1234',
    permission: 'admin'
  },
  {
    id: 2,
    name: 'Pedro',
    lastName: 'González',
    userName: 'pedrog',
    email: 'asdss@gmail.com',
  }
]

let Comentarios = [];
let solicitudesAmistad = [];

// Exportamos los métodos que se comunicarán con la base de datos
exports.getPubli = () => {
  return Publi.map(publi => {
    const publiComentarios = Comentarios.filter(comentario => comentario.idPubli === publi.id);
    return {
      ...publi,
      comentarios: publiComentarios
    };
  });
};
exports.getPubliById = (id) => Publi.find(pu => pu.id === parseInt(id));
exports.addPublicacion = (newData) => {
  const lastId = Publi.length > 0 ? Publi[Publi.length - 1].id : 0;
  newData.id = lastId + 1;
  newData.disponible = true;
  Publi.push(newData);
};
exports.addComentarioPubli = (newData) => {
  const lastId = Comentarios.length > 0 ? Comentarios[Comentarios.length - 1].id : 0;
  newData.id = lastId + 1;
  Comentarios.push(newData);
}

exports.updateBook = (id, newData) => {
  const index = Publi.findIndex(book => book.id === parseInt(id));
  Publi[index] = { ...Publi[index], ...newData };
}
exports.deleteBook = (id) => {
  Publi = Publi.filter(book => book.id !== parseInt(id));
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

exports.getUserByUserName = (userName) => Users.some(user => user.userName === userName);

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

exports.getHistoric = () => {
  return rent.map(rent => {
    const book = Publi.find(book => book.id === rent.idBook);
    const user = Users.find(user => user.id === rent.idUser);
    return {
      ...rent,
      book,
      user
    };
  });
};

exports.createSolicitudAmi = (newData) => {
  const lastId = solicitudesAmistad.length > 0 ? solicitudesAmistad[solicitudesAmistad.length - 1].id : 0;
  newData.id = lastId + 1;
  solicitudesAmistad.push(newData);
  return solicitudesAmistad;
}

exports.findRelacion = (userSend, userReq) => solicitudesAmistad.find(solicitud => solicitud.userSend === userSend && solicitud.userReq === userReq) ?? null;

exports.updateSolicitudAmi = (id, newData) => {
  const index = solicitudesAmistad.findIndex(solicitud => solicitud.id === parseInt(id));
  solicitudesAmistad[index] = { ...solicitudesAmistad[index], ...newData };
}

/* 
{
    "idUser": 1,
    "idBook": 1,
    "date_rent": "28-09-2024",
    "date_f": "02-10-2024"
  }
 // agregando una renta


 {
    "name": "david",
    "lastName": "Pérez",
    "email": "assd@gmail.com",
    "password": "1234",
    "repassword": "1234"
  }
    //agregando user

 */
 