# Tutorial

## Current architecture

The following is the current architecture of our docker application.

```
$ ./
	| docker-compose.yml
	| mynginx
		| .git
		| README.md
		| Dockerfile
		| nginx.conf
		| ...
	| myplatform
		| .git
		| README.md
		| Dockerfile
		| server.js
		| ...
```

Content of the `docker-compose.yml`:

```yml
# Our first entry is nginx. Nginx is here to manage our connection flow (Reverse Proxy)
nginx:
	# We build it from the Dockerfile within the "mynginx" folder
	build: ./mynginx

	# We specify this container to restart in case of crash
	restart: always

    # We first need the container "node" to be up and linked in order to use our Nginx
	links:
		- node

    # We specify the name of our container
	container_name: nginx_1

    # We specify the port we are using inside our docker network and also outside
    # If we would like our application to be used under https, # we would also open the port 443 and manage it under our "nginx.conf" file.
    ports:
		- "80:80"

# Our second entry is node. Node is our main application
node:
	# We build it from the Dockerfile within the "myplatform" folder
	build: ./myplatform

    # We specify this container to restart in case of crash
	restart: always

    # We specify the name of our container
    container_name: node_1

    # We specify the port we are using inside our docker network
	ports:
		- "8080"
```

## Launch the application:

To launch the application, simply run `docker-compose up --build`.  You can also add ` -d` for Daemon mode.

If you want to do a *runtime update* of the **App container** (the application), you can create a small script like the following one:

```sh
if [ "$(docker ps -q -f name=myplatform_1)" ]; then
	cd ./myplatform/app
	echo 'Updating "app"...'
    docker cp . "$(docker ps -q -f name=myplatform_1)":/user/src/app/app/
	echo '"app" Updated !'
	exit 0;
else
	echo 'Container "myplatform_1" is not runing. Aborting...'
	exit 1;
fi
```