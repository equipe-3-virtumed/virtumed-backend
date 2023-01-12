<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">This backend project is powered by <a href="http://nodejs.org" target="_blank">Nest</a> - a progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Installation

```bash
$ npm install
```

## Running the app

PostgreSQL installed in your O.S. is needed to run database in tests mode.

```bash
# preparing Prisma's Schema in SQL
$ npx prisma generate
$ npx prisma db push

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Open Swagger at http://localhost:3333/docs

## Adding Admin

The Admin's Routes are protected by AuthGuards, so you have to:

- Open `admin.controller`.
- Comment `@UseGuards(AuthGuard('Admin'))` and `@ApiBearerAuth()` lines in  in order to free admin routes.
- Open http://localhost:3333/docs and add an Admin to your local database via Swagger.
- Close the admin routes.
- Have fun!

## Stay in touch

- Bruno Sallum - [LinkedIn](https://www.linkedin.com/in/bruno-sallum/) - [GitHub](https://github.com/B-Sallum)
- Charles Brendon - [LinkedIn](https://www.linkedin.com/in/charles-brendon-silva-suzart-851a9271/) - [GitHub](https://github.com/charlesbrendon)
- Kleiton Lima - [LinkedIn](https://www.linkedin.com/in/kleitonlima/) - [GitHub](https://github.com/KleitonLima)
- Pedro Oliveira - [LinkedIn](https://www.linkedin.com/in/pedro-augusto-silva-de-oliveira/) - [GitHub](https://github.com/pedroasdoliveira)
- Nubia Dias - [LinkedIn](https://www.linkedin.com/in/dev-nubia-dias/) - [GitHub](https://github.com/nubiapdias)
- Wirlley Melo - [LinkedIn](https://www.linkedin.com/in/wirlley/) - [GitHub](https://github.com/wirlleym)

## License

This project and Nest is [MIT licensed](LICENSE).

## Support Nest

<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>