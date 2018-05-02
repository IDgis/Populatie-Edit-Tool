#!/bin/bash

echo deploying Populatie Edit Tool...

export EDIT_TOOL_VERSION=0.3.0

export DOMAIN_PREFIX=pop-edit-tool
export DOMAIN_SUFFIX=local

COMPOSE_ARGS="\
    -p pop \
    -f populatie-edit-tool.yml"

docker-compose \
    $COMPOSE_ARGS \
    build

docker-compose \
    $COMPOSE_ARGS \
    up -d
