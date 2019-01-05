# Node v10
FROM node:dubnium

# Create app directory
WORKDIR /usr/src/app

# For npm@5 or later, copy package-lock.json as well
COPY package.json package-lock.json ./

RUN npm install --unsafe-perm -gq ionic@4.5.0 --no-interactive

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8100
EXPOSE 35729
