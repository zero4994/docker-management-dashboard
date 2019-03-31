# Docker Management Dashboard

A management dashboard for your local docker containers

> This was created during my time as a student at Code Chrysalis

<p align="center">
    <img align="center" src="img/docker.png"> 
</p> 
<br><br>

## Overview

Docker Managemenet Dashboard is a simple page application to manage your local docker containers in a friendly and interactive way without having to deal with the docker CLI.

It allows you to do the following operations:

- Start
- Stop
- Pause
- Unpause
- Remove
- Inspect
- Get Logs

## Architecture

Its built using the following technologies:

- Vue JS
- Vuetify
- Node
- Express
- [Socket.IO](https://socket.io/)
- [Docker](https://www.docker.com/)
- [Dockerode](https://github.com/apocas/dockerode.git)

<p align="center">
    <img align="center" height="90%" width="90%" src="img/architecture.png">
</p>

## SetUp

Clone this repostitory

```bash
git clone https://github.com/zero4994/docker-management-dashboard.git
```

Execute yarn to initialize

```bash
yarn install
```

Build

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

### Managing Containers

The Docker Management Dashboar can perform basic operations to container "at glance"

<p align="center">
    <img align="center" height="90%" width="90%" src="img/d-container-overview.png"> 
</p>

When a container is expanded the user can view the logs as well as perform quick actions

<p align="center">
    <img align="center" height="90%" width="90%" src="img/d-logs.png"> 
</p>

Containers can be inspected as well

<p align="center">
    <img align="center" height="90%" width="90%" src="img/d-inspect.png"> 
</p>

## Contribution

Feel free to fork and contribute to this project
