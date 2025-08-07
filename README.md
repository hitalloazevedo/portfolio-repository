Authentication

`POST /signin`
```
{
  "email": "email@email.com",
  "password": "password"
}
```

first version
- para cada operação no banco, eu abria e fechava uma conexão com o mongodb
- eu estou utilizando repositorios, e para cada caso de uso eu instanciava um novo repositorio
- o sistema não tinha cache
- média de 3 segundos para responder uma requisição


agora
- padrão singleton para os repositorios, ou seja, todos os casos de uso que manipulam a mesma entidade, utilizam apenas uma instancia do repositorio
- singleton do cache
- abrindo apenas uma conexão com o banco ao iniciar a aplicação

ALLOWED_ORIGINS="origin1 origin2"
JWT_EXPIRES_IN=<seconds>
JWT_SECRET=
MONGODB_CONNECTION_STRING=
PORT=3000
TO_KEEP_ALIVE_SERVICE_URL=<api_url_itself>