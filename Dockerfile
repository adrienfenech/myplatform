# Pull an Alpine linux (~5MB) environment with
# Node already install on it.
FROM node:9.2.0-alpine


# Create the folder "app" under /usr/src/
# We add a "/" after "app" to specify the type of
# app (ie: a folder)
RUN mkdir -p /usr/src/app/

# We specify the newly created folder app that
# it's where our command should be executed
WORKDIR /user/src/app/

# We copy the package.json in the "app" folder
COPY package.json /user/src/app/

# We install our dependencies
RUN npm install

# Security reason
RUN npm i npm@latest

# We copy our project in the "app" folder
COPY . /user/src/app/

# We expose to our docker environment (network) the port
# we are using within the application. (ie 8080)
EXPOSE 8080

# We specify how we start our application
# CF package.json
ENTRYPOINT [ "npm", "run", "development" ]
