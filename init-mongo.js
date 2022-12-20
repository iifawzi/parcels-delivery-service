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