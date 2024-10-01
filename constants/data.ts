export const topratedSaloons = [
  {
    id: 1,
    shopName: "Toni & Guy",
    shopLogo:
      "https://toniandguy.ph/cdn/shop/files/TONI_GUY_Only_Black_Square.jpg",
    shopImageURL:
      "https://images.pexels.com/photos/4625622/pexels-photo-4625622.jpeg",
    bio: "A top salon in India and a part of renowned salon chains, offering online services and spa treatments.",
    street: "Balaji Nagar",
    location:
      "Ground Floor, Balaji Nagar, Bus Stop, Unicure Corporation Plot No:6 Vel's Arcade, Pappakurichi Kattur, Tiruchirappalli, Tamil Nadu 620019",
    type: "luxury",
    shopStatus: "open",
    startTime: "8.00",
    endTime: "21.00",
    services: [1, 2, 6],
  },
  {
    id: 2,
    shopName: "Lakme Salon",
    shopLogo:
      "https://5.imimg.com/data5/SELLER/Default/2022/8/MT/DQ/JT/157546034/lakme-beauty-salon-500x500.jpg",
    shopImageURL:
      "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg",
    bio: "Our runway experts have curated some of the most popular services at Lakmē Salon, just for you.",
    street: "Thillai Nagar",
    location:
      "7th Cross St W, Thillai Nagar East, West Thillai Nagar, Thillai Nagar, Tiruchirappalli, Tamil Nadu 620018",
    type: "prime",
    shopStatus: "closed",
    startTime: "9.00",
    endTime: "22.00",
    services: [1, 3, 4, 5],
  },
];

export const cartData = [
  {
    id: 1,
    shopName: "Lakme Salon",
    shopLogo:
      "https://5.imimg.com/data5/SELLER/Default/2022/8/MT/DQ/JT/157546034/lakme-beauty-salon-500x500.jpg",
    services: [
      {
        id: 1,
        name: "Haircut",
        imageURL:
          "https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg",
        price: 200,
      },
      {
        id: 2,
        name: "Beard Trim",
        imageURL:
          "https://images.pexels.com/photos/7518723/pexels-photo-7518723.jpeg",
        price: 100,
      },
    ],
  },
  {
    id: 2,
    shopName: "Toni & Guy",
    shopLogo:
      "https://toniandguy.ph/cdn/shop/files/TONI_GUY_Only_Black_Square.jpg",
    services: [
      {
        id: 1,
        name: "Haircut",
        imageURL:
          "https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg",
        price: 200,
      },
    ],
  },
];

export const categories = [
  {
    id: 1,
    name: "Haircut",
    imageURL:
      "https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg",
    price: 200,
  },
  {
    id: 2,
    name: "Beard Trim",
    imageURL:
      "https://images.pexels.com/photos/7518723/pexels-photo-7518723.jpeg",
    price: 200,
  },
  {
    id: 3,
    name: "Manicure",
    imageURL:
      "https://images.pexels.com/photos/704815/pexels-photo-704815.jpeg",
    price: 200,
  },
  {
    id: 4,
    name: "Pedicure",
    imageURL:
      "https://cdn.pixabay.com/photo/2021/01/06/09/13/feet-5893686_960_720.jpg",
    price: 200,
  },
  {
    id: 5,
    name: "Facials",
    imageURL:
      "https://images.pexels.com/photos/5069412/pexels-photo-5069412.jpeg",
    price: 200,
  },
  {
    id: 6,
    name: "Hair color",
    imageURL:
      "https://cdn.pixabay.com/photo/2018/04/03/23/04/woman-3288365_1280.jpg",
    price: 200,
  },
];
