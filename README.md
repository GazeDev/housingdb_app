# HousingDB App

This frontend for the HousingDB api is built in Ionic 4, Angular.


# Installation/Docker Commands

It is intended that you will use [docker](https://docs.docker.com/engine/installation/)
and [docker compose](https://docs.docker.com/compose/install/). You'll need to run the
commands below via command line to get started:

---
NOTE: We are going to use a bash alias to make running docker-compose files a bit less verbose. You can run the following to create `docker-compose-local` and `docker-compose-deploy` alias commands:
```
echo "alias docker-compose-local='docker-compose --file=docker-compose-local.yml'" >> ~/.bashrc
echo "alias docker-compose-deploy='docker-compose --file=docker-compose-deploy.yml'" >> ~/.bashrc
source ~/.bashrc
```
---

Copy the app config (ready for running locally):
`cp src/app/app.config.example.ts src/app/app.config.ts`

Compile the initial image, or if the Dockerfile changes:
`docker-compose build app`

Bring up the container. This will tie the running process and logs to your terminal:
`docker-compose up app`

You can now view the app in your browser:
[http://localhost:4201](http://localhost:4201)

To instead run it detached, you can run the following:
`docker-compose up -d app`

To view a detached container's logs as they are generated:
`docker-compose logs --follow`

To stop a detached container:
`docker-compose stop`

To open a bash shell in a container:
`docker-compose exec bash app`


# Committing

Good guide for git commits:
https://chris.beams.io/posts/git-commit/
