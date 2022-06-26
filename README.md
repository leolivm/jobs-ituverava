<h1 align="center">
    <img alt="prisma" title="prisma" src=".github/prisma.png" />
    <h3 align="center">Prisma & GraphQL Jobs Application</h3>
</h1>

## :bookmark: About the project

Simple node API made with GraphQL and Prisma to register users and jobs in the city [GraphQL](https://graphql.org/), [Type-GraphQL](https://typegraphql.com/) and [Prisma ORM](https://www.prisma.io/)

## � Getting started

### Requirements

**Clone the project and access the folder**

```bash
$ git clone https://github.com/leolivm/jobs-ituverava.git && cd jobs-ituverava
```

- Create an `.env` file in the root of the `api` folder with the contents of the `.env.example` file

```bash
# Run the postgres container
$ docker-compose up
```

```bash
# Install the dependencies
$ yarn
```

**Follow the steps below**

```bash
$ yarn prisma migrate dev
```

Run the project

```bash
$ yarn dev
```

---

Made with � by Leandro Martins � [See my linkedin](https://www.linkedin.com/in/leandro-martins-0640921a4/)
