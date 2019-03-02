# Docker Management Dashboard

A management dashboard for your local docker containers

> This was created during my time as a student at Code Chrysalis

<p align="center">
    <img align="center" src="img/docker.png"> 
</p> 
<br><br>
Docker Managemenet Dashboard is a simple in browser SPA to manage your local docker containers in a friendly and interactive way without having to deal with the docker CLI.

Its built using the following technologies:

- Vue JS
- [Docker](https://www.docker.com/)
- Node
- Express
- [Dockerode](https://github.com/apocas/dockerode.git)

## SetUp

Clone this repostitory

```bash
git clone https://github.com/zero4994/docker-management-dashboard.git
```

Execute yarn to initialize

```bash
yarn install
```

Build the repo

```bash
yarn build
```

Finally start the appliaction

```bash
yarn start
```

## Use

Once the application starts the dashboard is available in **http://localhost:3000**

<p align="center">
    <img align="center" height="90%" width="90%" src="img/d-overview.png"> 
</p> 
<br><br>

### Starting Container

The image screen can take a JSON Object as an input for the container's initial conditions. The definitions of the properties of the JSON Object can be found [here](https://docs.docker.com/engine/api/v1.37/#operation/ContainerCreate)

<p align="center">
    <img align="center" height="90%" width="90%" src="img/createContainer.png"> 
</p>

## Contribution

Feel free to fork and contribute to this project
