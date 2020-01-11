#!/usr/bin/env bash

ENVIRONMENT=''
VERBOSE='false'

print_usage() {
printf "
Usage: ./set-env.sh -e prod

Flags:
  -e \t Set the environment; prod, dev, etc
"
}

while getopts 'e:v' flag; do
  case "${flag}" in
    e) ENVIRONMENT="${OPTARG}" ;;
    v) verbose='true' ;;
    *) print_usage
       exit 1 ;;
  esac
done

if [[ ${ENVIRONMENT} == '' ]]; then
  echo "[Error] -e flag and value are required"
  print_usage
  exit 1
fi

IS_PROD=false
if [[ ${ENVIRONMENT} == "prod" ]]; then
  IS_PROD=true
fi

TARGET_FILE="environment.${ENVIRONMENT}.ts"
if [[ ${ENVIRONMENT} == "dev" ]]; then
  TARGET_FILE="environment.ts"
fi

TARGET_PATH="./src/environments/${TARGET_FILE}"

cp ${TARGET_PATH}.example ${TARGET_PATH}

# ENVIRONMENT VARIABLE REPLACEMENTS
echo ${MAPBOX_ACCESS_TOKEN}
sed -i -e "s/MAPBOX_ACCESS_TOKEN/${MAPBOX_ACCESS_TOKEN}/" ${TARGET_PATH}

echo ${TARGET_PATH}
echo ${IS_PROD}
