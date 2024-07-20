MikroORM - Postgres - Graphql - GraphqlTools



Install dependencies via yarn
Create your docker containers via docker-compose up -d
create .env file based on .env.example

```
PORT=8080
POSTGRES_USER=root
POSTGRES_PASSWORD=root
POSTGRES_DB=mikro-orm-graphql-data
NODE_DEV=false
```

Load fixtures yarn loadFixtures
Run via yarn start or yarn dev
GraphQL API is running on localhost:8080/graphql


GraphQL Playground is running on localhost:8080/graphql