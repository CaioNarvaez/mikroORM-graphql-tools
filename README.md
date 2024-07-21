# MikroORM - Postgres - GraphQL-Tools

This is a template project with a simple MikroORM setup with graphql-tools and codegen.

## Installation

- Install dependencies via yarn

## Setup

- Create your docker containers via 
```
docker-compose up -d
```
- create .env file based on .env.example

```
PORT=8080
POSTGRES_USER=root
POSTGRES_PASSWORD=root
POSTGRES_DB=postgres
NODE_DEV=false
```

- Seed database
```
yarn seed
```

- Generate graphql schema for resolver typesafety
```
yarn generate
```

## Starting server

-  ```yarn start``` or ```yarn dev```

## Playground

- GraphQL Playground is running on ```localhost:8080/graphql```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)