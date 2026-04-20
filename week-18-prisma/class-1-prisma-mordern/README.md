# PostgreSQL

# Project Commands - Class-1

```bash
npm init
npm install typescript tsx @types/node --save-dev
npx tsc --init


npm install prisma @types/pg --save-dev
npm install @prisma/client @prisma/adapter-pg pg dotenv

# // tsconfig.json
# {
#   "compilerOptions": {
#     "module": "ESNext",
#     "moduleResolution": "bundler",
#     "target": "ES2023",
#     "strict": true,
#     "esModuleInterop": true,
#     "ignoreDeprecations": "6.0"
#   }
# }
# // package.json
# {
#   "type": "module"
# }

npx prisma
npx prisma init --output ../generated/prisma


npx create-db

npx prisma migrate dev --name init
npx prisma generate
npm run dev
npx prisma studio

// "postinstall": "prisma generate", // automatically generates client after npm install
// "seed": "npx tsx prisma/seed.ts"
npm run seed
```

##### Debug with Cline!

```
prisma init
prisma generate
prisma migrate

@prisma/client
@prisma/adapter-pg

pg //The node-postgres database driver
@types/pg
dotenv

```
