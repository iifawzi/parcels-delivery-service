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
  }
  ],
)