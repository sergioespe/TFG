##To start the DB:

Create a `.env` file with this content for local development:
```
DATABASE_URL="postgresql://postgres:secure_pass_here@localhost:5432/postgres?schema=public"
```

```
docker-compose up -d
```

## Useful commands

Reset the DB to apply and test the new schema:
```
npm run reset
```

Generate a migration for the current schema:
```
npm run migrate
```