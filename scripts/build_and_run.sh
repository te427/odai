#!/bin/bash
git pull origin

docker-compose build
docker-compose run