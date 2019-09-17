#!/usr/bin/env bash
npm run build

surge /usr/src/app/www --domain=$SURGE_DOMAIN
