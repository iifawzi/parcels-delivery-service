db.auth('root', 'root')
db = db.getSiblingDB('saloodo')

db.createUser({
  user: 'saloodoUser',
  pwd: 'saloodoPass',
  roles: [
    {
      role: 'readWrite',
      db: 'saloodo',
    },
  ],
});

db.bikers.insertMany(
  [{
    username: "biker1",
    password: "$2b$05$ADWgYlrf0.Szt/tJRZ4vt.Na/EIBIlpGYmM5y26GIAqErUuzZkfDi", // password
    fullName: "Biker Number 1"
  },
  {
    username: "biker2",
    password: "$2b$05$ADWgYlrf0.Szt/tJRZ4vt.Na/EIBIlpGYmM5y26GIAqErUuzZkfDi", // password
    fullName: "Biker Number 2"
  },
  {
    username: "biker3",
    password: "$2b$05$ADWgYlrf0.Szt/tJRZ4vt.Na/EIBIlpGYmM5y26GIAqErUuzZkfDi", // password
    fullName: "Biker Number 3"
  },
  {
    username: "biker4",
    password: "$2b$05$ADWgYlrf0.Szt/tJRZ4vt.Na/EIBIlpGYmM5y26GIAqErUuzZkfDi", // password
    fullName: "Biker Number 4"
  },
  {
    username: "biker5",
    password: "$2b$05$ADWgYlrf0.Szt/tJRZ4vt.Na/EIBIlpGYmM5y26GIAqErUuzZkfDi", // password
    fullName: "Biker Number 5"
  },
  {
    username: "biker6",
    password: "$2b$05$ADWgYlrf0.Szt/tJRZ4vt.Na/EIBIlpGYmM5y26GIAqErUuzZkfDi", // password
    fullName: "Biker Number 6"
  },
  {
    username: "biker7",
    password: "$2b$05$ADWgYlrf0.Szt/tJRZ4vt.Na/EIBIlpGYmM5y26GIAqErUuzZkfDi", // password
    fullName: "Biker Number 7"
  },
  {
    username: "biker8",
    password: "$2b$05$ADWgYlrf0.Szt/tJRZ4vt.Na/EIBIlpGYmM5y26GIAqErUuzZkfDi", // password
    fullName: "Biker Number 8"
  },
  {
    username: "biker9",
    password: "$2b$05$ADWgYlrf0.Szt/tJRZ4vt.Na/EIBIlpGYmM5y26GIAqErUuzZkfDi", // password
    fullName: "Biker Number 9"
  },
  {
    username: "biker10",
    password: "$2b$05$ADWgYlrf0.Szt/tJRZ4vt.Na/EIBIlpGYmM5y26GIAqErUuzZkfDi", // password
    fullName: "Biker Number 10"
  }
  ],
);

db.customers.insertMany(
  [{
    username: "customer1",
    password: "$2b$05$ADWgYlrf0.Szt/tJRZ4vt.Na/EIBIlpGYmM5y26GIAqErUuzZkfDi", // password
    fullName: "Customer Number 1"
  },
  {
    username: "customer2",
    password: "$2b$05$ADWgYlrf0.Szt/tJRZ4vt.Na/EIBIlpGYmM5y26GIAqErUuzZkfDi", // password
    fullName: "Customer Number 2"
  },
  {
    username: "customer3",
    password: "$2b$05$ADWgYlrf0.Szt/tJRZ4vt.Na/EIBIlpGYmM5y26GIAqErUuzZkfDi", // password
    fullName: "Customer Number 3"
  },
  {
    username: "customer4",
    password: "$2b$05$ADWgYlrf0.Szt/tJRZ4vt.Na/EIBIlpGYmM5y26GIAqErUuzZkfDi", // password
    fullName: "Customer Number 4"
  },
  {
    username: "customer5",
    password: "$2b$05$ADWgYlrf0.Szt/tJRZ4vt.Na/EIBIlpGYmM5y26GIAqErUuzZkfDi", // password
    fullName: "Customer Number 5"
  }
  ],
);

// TESTING Configs: 
db = db.getSiblingDB('test-saloodo')

db.createUser({
  user: 'testSaloodoUser',
  pwd: 'testSaloodoPass',
  roles: [
    {
      role: 'readWrite',
      db: 'test-saloodo',
    },
  ],
});

db.bikers.insertMany(
  [{
    username: "biker1",
    _id: new ObjectId("63a22b00a704bee4b0254f4c"),
    password: "$2b$05$ADWgYlrf0.Szt/tJRZ4vt.Na/EIBIlpGYmM5y26GIAqErUuzZkfDi", // password
    fullName: "Biker Number 1"
  },
  {
    username: "biker2",
    password: "$2b$05$ADWgYlrf0.Szt/tJRZ4vt.Na/EIBIlpGYmM5y26GIAqErUuzZkfDi", // password
    fullName: "Biker Number 2"
  },
  {
    username: "biker3",
    password: "$2b$05$ADWgYlrf0.Szt/tJRZ4vt.Na/EIBIlpGYmM5y26GIAqErUuzZkfDi", // password
    fullName: "Biker Number 3"
  },
  {
    username: "biker4",
    password: "$2b$05$ADWgYlrf0.Szt/tJRZ4vt.Na/EIBIlpGYmM5y26GIAqErUuzZkfDi", // password
    fullName: "Biker Number 4"
  },
  {
    username: "biker5",
    password: "$2b$05$ADWgYlrf0.Szt/tJRZ4vt.Na/EIBIlpGYmM5y26GIAqErUuzZkfDi", // password
    fullName: "Biker Number 5"
  },
  {
    username: "biker6",
    password: "$2b$05$ADWgYlrf0.Szt/tJRZ4vt.Na/EIBIlpGYmM5y26GIAqErUuzZkfDi", // password
    fullName: "Biker Number 6"
  },
  {
    username: "biker7",
    password: "$2b$05$ADWgYlrf0.Szt/tJRZ4vt.Na/EIBIlpGYmM5y26GIAqErUuzZkfDi", // password
    fullName: "Biker Number 7"
  },
  {
    username: "biker8",
    password: "$2b$05$ADWgYlrf0.Szt/tJRZ4vt.Na/EIBIlpGYmM5y26GIAqErUuzZkfDi", // password
    fullName: "Biker Number 8"
  },
  {
    username: "biker9",
    password: "$2b$05$ADWgYlrf0.Szt/tJRZ4vt.Na/EIBIlpGYmM5y26GIAqErUuzZkfDi", // password
    fullName: "Biker Number 9"
  },
  {
    username: "biker10",
    password: "$2b$05$ADWgYlrf0.Szt/tJRZ4vt.Na/EIBIlpGYmM5y26GIAqErUuzZkfDi", // password
    fullName: "Biker Number 10"
  }
  ],
);

db.customers.insertMany(
  [{
    username: "customer1",
    _id: new ObjectId("63a22b00a704bee4b0254f4d"),
    password: "$2b$05$ADWgYlrf0.Szt/tJRZ4vt.Na/EIBIlpGYmM5y26GIAqErUuzZkfDi", // password
    fullName: "Customer Number 1"
  },
  {
    username: "customer2",
    password: "$2b$05$ADWgYlrf0.Szt/tJRZ4vt.Na/EIBIlpGYmM5y26GIAqErUuzZkfDi", // password
    fullName: "Customer Number 2"
  },
  {
    username: "customer3",
    password: "$2b$05$ADWgYlrf0.Szt/tJRZ4vt.Na/EIBIlpGYmM5y26GIAqErUuzZkfDi", // password
    fullName: "Customer Number 3"
  },
  {
    username: "customer4",
    password: "$2b$05$ADWgYlrf0.Szt/tJRZ4vt.Na/EIBIlpGYmM5y26GIAqErUuzZkfDi", // password
    fullName: "Customer Number 4"
  },
  {
    username: "customer5",
    password: "$2b$05$ADWgYlrf0.Szt/tJRZ4vt.Na/EIBIlpGYmM5y26GIAqErUuzZkfDi", // password
    fullName: "Customer Number 5"
  }
  ],
);