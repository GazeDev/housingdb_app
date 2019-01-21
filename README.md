# HousingDB App

This frontend for the HousingDB api is built in Ionic 4, Angular.


# Installation/Docker Commands

It is intended that you will use [docker](https://docs.docker.com/engine/installation/)
and [docker compose](https://docs.docker.com/compose/install/). You'll need to
copy variables.env.example to variables.env and set the values and then run the
commands below via command line to get started:

Compile the initial image, or if the Dockerfile changes:
`docker-compose build app`

Bring up the container. This will tie the running process and logs to your terminal:
`docker-compose up app`

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
