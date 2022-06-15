import mock from "./adapter";

import { User } from "../types/user";
import { sign } from "../utils/jwt";

const JWT_SECRET = "super-secret-key";
const JWT_EXPIRES_IN = "3 days";

function fakeRequest(time: number) {
  return new Promise((res) => setTimeout(res, time));
}

const users: User[] = [
  {
    id: "a8553063-7bd5-45ed-adbe-db6f069a3802",
    displayName: "Lucy Lavender",
    email: "develop@email.io",
    password: "develop",
  },
];

mock.onPost("/api/auth/sign-in").reply(async (config) => {
  try {
    await fakeRequest(1000);
    const { email, password } = JSON.parse(config.data);
    const user = users.find((_user) => _user.email === email);

    if (!user) {
      return [
        400,
        { message: "Email não cadastrado." },
      ];
    }

    if (user.password !== password) {
      return [400, { message: "Senha ou Email incorretos" }];
    }

    const token = sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return [200, { token, user }];
  } catch (error) {
    return [500, { message: "Ocorreu um erro equipe de suporte já foi notificada" }];
  }
});
let Vehicles = [
  {
    id:1,
    name : 'YAMAHA XVS950A MIDNIGHT',
    brand : 'YAMAHA',
    cilindradas : 950,
    image: 'static/motocycles/midnight.webp',
    price: 32000,
    year: '2019'
  },
  {
    id:2,
    name : 'BMW R 1200 GS ADVENTURE',
    brand : 'BMW',
    cilindradas : 1200,
    image: 'static/motocycles/r200.jpeg',
    price: 74000,
    year: '2019'
  },
  {
    id:3,
    name : 'KAWASAKI Z900',
    brand : 'KAWASAKI',
    cilindradas : 900,
    image: 'static/motocycles/z900.jpeg',
    price: 46000,
    year: '2019'
  },
  {
    id: 4,
    name : 'NC 750X',
    brand : 'HONDA',
    cilindradas : 750, 
    image : 'static/motocycles/NC750X.jpeg',
    price : 55700,
    year : '2022'
  },
  { 
    id: 5,
    name : 'HONDA 500X',
    brand : 'HONDA',
    cilindradas : 500, 
    image : 'static/motocycles/CB500X2022.jpeg',
    price : 25000,
    year : '2022',
  },
  {
  id: 6,
  name : 'Fazer FZ25 ABS',
  brand : 'YAMAHA',
  cilindradas : 250, 
  image : 'static/motocycles/FazerFZ25ABS.jpeg',
  price : 22000,
  year : '2022',
  },
  {
    id: 7,
    name : 'MT-09 ABS',
    brand : 'YAMAHA',
    cilindradas : 847, 
    image : 'static/motocycles/MT-09ABS.jpeg',
    price : 57900,
  year : '2022',
  },
  {
    id: 8,
    name : 'Z900',
    brand : 'KAWASAKI',
    cilindradas : 948, 
    image : 'static/motocycles/Z900.jpeg',
    price : 58000,
  year : '2022',
  },
  {
    id: 9,
    name : 'VULCAN S',
    brand : 'KAWASAKI',
    cilindradas : 649, 
    image : 'static/motocycles/VULCANS.jpeg',
    price : 47500,
    year : '2022',
  },
  {
    id: 10,
    name : ' Versys 650',
    brand : 'KAWASAKI',
    cilindradas : 649, 
    image : 'static/motocycles/Versys650.jpeg',
    price : 49000,
    year : '2022',
  },
  {
    id: 11,
    name : 'F 850 GS Triple Black',
    brand : 'BMW',
    cilindradas : 853, 
    image : 'static/motocycles/F850GSTripleBlack .jpeg',
    price : 70000,
    year : '2022',
  },
  {
  id: 12,
name : 'K 1600 GTL',
brand : 'BMW',
cilindradas : 1649, 
image : 'static/motocycles/K1600GTL.jpeg',
price : 93200,
year : '2022',
},

{
id: 13,
name : 'V-STROM 650XT',
brand : 'SUZUKI',
cilindradas : 645, 
image : 'static/motocycles/V-STROM650XT.jpeg',
price : 50975,
year : '2022',
},

{
id: 14,
name : 'GSX-S1000A',
brand : 'SUZUKI',
cilindradas : 900, 
image : 'static/motocycles/GSX-S1000A.jpeg',
price : 49700,
year : '2022',
},
];

mock.onGet("/api/vehicles").reply(async (config) => {
  try {
    await fakeRequest(1000);
    let aux = []
    const { description, brand } = config.params;
    aux = Vehicles.filter((item) => item.brand.includes(brand.toUpperCase()))
    aux = aux.filter((item) => item.name.includes(description.toUpperCase()))
    return [200, { vehicles : aux }];
  } catch (error) {
    console.log(error);
    return [500, { message: "Ocorreu um erro equipe de suporte já foi notificada" }];
  }
});

mock.onPost("registration/vehicles/delete").reply(async (config) => {
  try {
    await fakeRequest(1000);
    const { id } = JSON.parse(config.data);
    const index  = Vehicles.findIndex((item) => item.id === id)
    Vehicles.splice(index, 1);
    return [200, {message : "Moto excluída com sucesso"}];
  } catch (error) {
    return [500, { message: "Ocorreu um erro equipe de suporte já foi notificada" }];
  }
});

mock.onPut("registration/vehicles").reply(async (config) => {
  try {
    await fakeRequest(1000);
    const { id } = JSON.parse(config.data);
    const index  = Vehicles.findIndex((item) => item.id === id)
    Vehicles.splice(index, 1);
    return [200, {message : "Venda registrada com sucesso"}];
  } catch (error) {
    return [500, { message: "Ocorreu um erro equipe de suporte já foi notificada" }];
  }
});
