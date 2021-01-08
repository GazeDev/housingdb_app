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

# We need environment.ts no matter what or angular will complain when replacing
touch ./src/environments/environment.ts

cp ${TARGET_PATH}.example ${TARGET_PATH}

# ENVIRONMENT VARIABLE REPLACEMENTS
sed -i -e "s|MAPBOX_ACCESS_TOKEN|${MAPBOX_ACCESS_TOKEN}|" ${TARGET_PATH}
sed -i -e "s|API_URL|${API_URL}|" ${TARGET_PATH}
sed -i -e "s|KEYCLOAK_URL|${KEYCLOAK_URL}|" ${TARGET_PATH}
sed -i -e "s|KEYCLOAK_REALM|${KEYCLOAK_REALM}|" ${TARGET_PATH}
sed -i -e "s|KEYCLOAK_CLIENT_ID|${KEYCLOAK_CLIENT_ID}|" ${TARGET_PATH}
sed -i -e "s|INSTANCE_NAME|${INSTANCE_NAME}|" ${TARGET_PATH}
sed -i -e "s|CUSTOM_MANIFEST_URL|${CUSTOM_MANIFEST_URL}|" ${TARGET_PATH}
sed -i -e "s|CUSTOM_FAVICON_URL|${CUSTOM_FAVICON_URL}|" ${TARGET_PATH}
sed -i -e "s|CUSTOM_LOGO_URL|${CUSTOM_LOGO_URL}|" ${TARGET_PATH}
sed -i -e "s|CUSTOM_STYLESHEET_URL|${CUSTOM_STYLESHEET_URL}|" ${TARGET_PATH}
sed -i -e "s|CUSTOM_APP_MENU_URL|${CUSTOM_APP_MENU_URL}|" ${TARGET_PATH}

# Make replacements in the netlify _redirects file
REDIRECTS_PATH="./src/_redirects"
cp ${REDIRECTS_PATH}.example ${REDIRECTS_PATH}

sed -i -e "s|NETLIFY_DOMAIN|${NETLIFY_DOMAIN}|" ${REDIRECTS_PATH}
sed -i -e "s|SITE_DOMAIN|${SITE_DOMAIN}|" ${REDIRECTS_PATH}

# Make replacements in the index.html
INDEX_PATH="./src/index.html"

cp ${INDEX_PATH}.template ${INDEX_PATH}

if [[ ${INSTANCE_NAME} == "" ]]; then
  INSTANCE_NAME="HousingDB"
fi
sed -i -e "s|<!--INSTANCE_NAME-->|${INSTANCE_NAME}|" ${INDEX_PATH}

if [[ ${CUSTOM_MANIFEST_URL} != "" ]]; then
  echo "Injecting custom manifest url: ${CUSTOM_MANIFEST_URL}"
  CUSTOM_MANIFEST_HTML="<link rel=\"manifest\" id=\"customManifest\" href=\"${CUSTOM_MANIFEST_URL}\"/>"
  sed -i -e "s|<!--CUSTOM_MANIFEST_HTML-->|${CUSTOM_MANIFEST_HTML}|" ${INDEX_PATH}
fi

if [[ ${CUSTOM_FAVICON_URL} != "" ]]; then
  echo "Injecting custom logo url: ${CUSTOM_FAVICON_URL}"
  CUSTOM_FAVICON_HTML="<link rel=\"icon\" type=\"image/png\" href=\"${CUSTOM_FAVICON_URL}\" />"
else
  CUSTOM_FAVICON_HTML="<link rel=\"icon\" type=\"image/png\" href=\"assets/icon/favicon.png\" />"
fi
sed -i -e "s|<!--CUSTOM_FAVICON_HTML-->|${CUSTOM_FAVICON_HTML}|" ${INDEX_PATH}

if [[ ${CUSTOM_STYLESHEET_URL} != "" ]]; then
  echo "Injecting custom stylesheet url: ${CUSTOM_STYLESHEET_URL}"
  CUSTOM_STYLESHEET_HTML="<link rel=\"stylesheet\" id=\"customStyles\" href=\"${CUSTOM_STYLESHEET_URL}\" />"
  sed -i -e "s|<!--CUSTOM_STYLESHEET_HTML-->|${CUSTOM_STYLESHEET_HTML}|" ${INDEX_PATH}
fi

if [[ ${PLAUSIBLE_DOMAIN} != "" ]]; then
  echo "Injecting Plausible Analytics: ${PLAUSIBLE_DOMAIN}"
  PLAUSIBLE_HTML="<script async defer data-domain=\"$PLAUSIBLE_DOMAIN\" src=\"https://plausible.io/js/plausible.js\"></script>"
  sed -i -e "s|<!--PLAUSIBLE_HTML-->|${PLAUSIBLE_HTML}|" ${INDEX_PATH}
fi
