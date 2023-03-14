import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Admin',
      email: 'admin@test.com',
      password: bcrypt.hashSync('AdminPassWord'),
      isAdmin: true,
    },
    {
      name: 'Pedro Ferreira',
      email: 'prgf2011@gmail.com',
      password: bcrypt.hashSync('SuperStrongPa55Word'),
      isAdmin: true,
    },
    {
      name: 'Mum - The Boss',
      email: 'ana_guimaraes@msn.com',
      password: bcrypt.hashSync('change me'),
      isAdmin: true,
    },
    {
      name: 'Mafalda',
      email: 'ana.m.guimaraes.ferreira@gmail.com',
      password: bcrypt.hashSync('change me'),
      isAdmin: false,
    },
  ],
  // products: [
  //   {
  //     name: 'Free Shirt',
  //     slug: 'free-shirt',
  //     category: 'Shirts',
  //     image: '/images/shirt1.jpg',
  //     price: 70,
  //     brand: 'Nike',
  //     countInStock: 20,
  //     description: 'A popular shirt',
  //   },
  //   {
  //     name: 'Fit Shirt',
  //     slug: 'fit-shirt',
  //     category: 'Shirts',
  //     image: '/images/shirt2.jpg',
  //     price: 80,
  //     brand: 'Adidas',
  //     countInStock: 5,
  //     description: 'A popular shirt',
  //   },
  //   {
  //     name: 'Slim Shirt',
  //     slug: 'slim-shirt',
  //     category: 'Shirts',
  //     image: '/images/shirt3.jpg',
  //     price: 90,
  //     brand: 'Raymond',
  //     countInStock: 20,
  //     description: 'A popular shirt',
  //   },
  //   {
  //     name: 'Golf Pants',
  //     slug: 'golf-pants',
  //     category: 'Pants',
  //     image: '/images/pants1.jpg',
  //     price: 90,
  //     brand: 'Oliver',
  //     countInStock: 20,
  //     description: 'Smart looking pants',
  //   },
  //   {
  //     name: 'Fit Pants',
  //     slug: 'fit-pants',
  //     category: 'Pants',
  //     image: '/images/pants2.jpg',
  //     price: 95,
  //     brand: 'Zara',
  //     countInStock: 20,
  //     description: 'A popular pants',
  //   },
  //   {
  //     name: 'Classic Pants',
  //     slug: 'classic-pants',
  //     category: 'Pants',
  //     image: '/images/pants3.jpg',
  //     price: 75,
  //     brand: 'Casely',
  //     countInStock: 20,
  //     description: 'A popular pants',
  //   },
  // ],
};

export default data;
