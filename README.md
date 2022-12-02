## Prisma setup

```bash
npx prisma init --datasource-provider postgresql
```

## App setup

Define `DATABASE_URL` env var
```bash
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE?schema=public"
```
Run docker-compose
```bash
docker-compose up -d
```
Or, after container created
```bash
docker run --name pokemon-db -e POSTGRES_PASSWORD=admin -d postgres
```
Run migration

```bash
npx prisma migrate dev --name <migration_name>
```

How to do query using json (JSON & HSTORE - Postgres - pros and cons, how to index) and others DBs? benchmarks

### PSQL Links

https://www.craigkerstiens.com/2013/07/03/hstore-vs.-json-which-to-use-in-postgres/
https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-hstore/


```sql
-- Real cursor --
-- Like stream --
BEGIN;
DECLARE mycursor CURSOR FOR SELECT * FROM "Pokemon";
MOVE 10 FROM mycursor
FETCH 2 FROM mycursor
FETCH BACKWARD 2 FROM mycursor
FETCH FORWARD 2 FROM mycursor
```