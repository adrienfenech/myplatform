# DevOps // Tutorial 1

## Prerecquisite
For the following tutorial, you gonna need [Docker](https://www.docker.com/) installed on your machine, [Git](https://github.com) and an IDE (Please respect yourself) or at least a text editor like [Vim](https://www.vim.org/) or [the other one which we do not care about](https://www.gnu.org/software/emacs/). 
You do not need to be on Linux, Windows or Mac, thanks to docker :)

You should fork now the project [https://github.com/adrienfenech/myplatform](https://github.com/adrienfenech/myplatform), we will work on it in the part 2.


## Docker

### Introduction

> "*Build, Ship, and Run Any App, Anywhere*"

Docker lets you deploy application in custom environment via containers. *Docker provides an additional layer of abstraction and automation of operating-system-level virtualization on Windows and Linux* (*[Wikipedia](https://en.wikipedia.org/wiki/Docker_(software))*). 

To keep it simple and in a *non-computer-science* language: **Docker** lets you deploy your application in any system by using your configuration in order to create an expected environment.

### Install

The installation part is probably the worst part of Docker (especially on Windows). Depending on your OS / version / build and finally configuration, you might have a different installation but also different commands than other people. 

Go on **[Docker](https://www.docker.com/)** and follow the instructions.

To test your installation, try the next command:
```
docker run hello-world
```

If everything is fine, **Docker** we let you know :)

> In order to use Docker, it's highly recommended to use a *bash shell*. 
> If you are on Windows and if you had to install the **[Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/)**, you can use the ***Docker Quickstart Terminal***, if not, try to use ***Powershell*** or ***Git Bash***.

### Docker Project Architecture

Depending on the complexity of your project, you can have two different architecture.

1. **Without** *docker-compose* (simple app)
```
$ 	 MyProject
		| .git
		| .gitignore
		| Dockerfile
		| server.js
		| ...
```

2. **With** *docker-compose* (complex app)
```
$ 	 MyProject
		| .git
		| .gitignore
		| docker-compose.yml
		| Database
			| Dockerfile
			| db.conf
			| ...
		| Logic
			| Dockerfile
			| server.js
			| ...
		| API
			| Dockerfile
			| api.js
			| ...
		| Nginx
			| Dockerfile
			| nginx.conf
			| ...
```

### Dockerfile

The ***Dockerfile*** is the configuration file of your container. You specify all the environment needed by your application.
Whenever it's possible, use current *Official Repositories* as the basis.

```Dockerfile
# The minimum environment (Node, php, etc...)
FROM <image>:<tag>

# Use RUN to execute classic command as mkdir, cd, etc...
RUN <cmd>

# Use EXPOSE to open a port to the Docker machine, for example 80, 4242, etc...
EXPOSE <port>

# The ENTRYPOINT & CMD let you tell to Docker what to do when the container is mounted
ENTRYPOINT [ "command_or_file_to_execute" ]
CMD [ "arg_1", "arg_2", "arg_3"]
```

> You should check the documentation, we can do almost everything in a Dockerfile !

### Docker compose

***docker-compose*** lets you build and run multiple containers as you can do with a script. The goal is to clean how you organize your application(s), and use a "configuration" file instead of script. Check the following example showing how a project which uses `nginx` (Reverse proxy), 3 `node` (Server logic) and `mongo` (Database) is built:

```bash

#Nginx container
nginx:
	#The Dockerfile of our nginx is in "./nginx" folder
    build: ./nginx
    
	#If the nginx container crash, we start it again
    restart: always

	#We specify that our nginx container depends on 3 nodes containers
    links:
        - node1:node1
        - node2:node2
        - node3:node3

	#We expose the port 80 of the container to the port 80 of or machine 
    ports:
        - "80:80"

#Node (1) container
node1:

	#The Dockerfile of our node is in "./server" folder
    build: ./server
    
	#If the node container crash, we start it again
    restart: always
	
	#We specify where the node container has to take his env variables
    env_file: ./variables.env

	#We specify that our node container depends on a mongo container
    links:
        - mongo
    
    #We expose the port 8080 of the container
    ports:
        - "8080"
#Node (2) container
node2:
    build: ./server
    restart: always
    env_file: variables.env
    links:
        - mongo
    ports:
        - "8080"
#Node (3) container
node3:
    build: ./server
    restart: always
    env_file: variables.env
    links:
        - mongo
    ports:
        - "8080"
#Mongo container
mongo:	
	#The Dockerfile of our mongo is in "./dockerbase" folder
    build: ./dockerbase
        
	#If the node container crash, we start it again
    restart: always
    
    #We expose the port 27017 of the container
    ports:
        - "27017"
```

### Docker machine
***docker-machine*** is a service like process. It is used to create and manage all of your containers / images. It differs if you are on *Windows* or *Linux / Unix*:

* *Windows*
```
docker-machine stop
docker-machine start
docker-machine restart
```
* *Linux / Unix*
```
(sudo) (systemctl) stop docker
(sudo) (systemctl) start docker
(sudo) (systemctl) restart docker
```

### Basics command

#### Build / Run

To create and run a project inside a container, we first have to build one:
```bash
docker build -t username/projectname /path/to/dockerfile
```

and finally run it:
```bash
docker run username/projectname
```

or via *docker-compose* (build + run):
```bash
docker-compose up --build
```

#### List / Stop / Remove
```bash
#List
docker ps -a

#Stop
docker stop imagename

#Remove
docker rm imagename
```

## App => _Dockerized_ App

> From A to DA

The first step to improve our current App, is to make it more portable. We saw that Docker can help us on that point.

> Docker alone is not sufficient in a production environment, we can make the system more stable if we also add configuration tool for the environment as well as deployment tool.

In order to _dockerize_ the current app, you will create a **Dockerfile** at the root of the project. This **Dockerfile** will contain (keep the order) :

1. The environment of the container (node in this case) with a specific version (alpine)
2. Create the directory in which we will work (**/usr/src/app/**)
3. Specify that we gonna work in this newly created directory
4. Copy the current **package.json** file and install it (`npm install`)
5. Copy the everything in the current folder to the working directory
6. Expose the port in which our server is listening on (hint: check **server.js** file)
7. Specify our Entrypoint `[ "npm", "run", "development" ]`

You will need the following command inside the **Dockerfile**:

* COPY
* ENTRYPOINT
* EXPOSE
* FROM
* RUN
* WORKDIR

Try to build and run this container. If you did it well, you should be able to access the website in your favorite browser on the specified port.

> Something goes wrong ? Check again your Dockerfile, otherwise it can come from your build command and/or your run command. Check the port options for example ;) 

Congratulations, you made your first (or not) *Dockerized*, portable application.

## _Dockerized_ App => _Dockerized_ App with Reverse Proxy

> From DA to DARP

Even if our Application is working  "*well*", we can improve a lot more. Keep in mind that your application **SHOULD NOT** be the first entrance of your server. Each connection has to be properly handle first by a reverse proxy.

Let's create a new project next to our **myplatform**: 

* **mynginx**

This project will contain only three files:

* Dockerfile
* nginx.conf  
* README.md (Because a DevOps process involves a readable description of everything :) )

The **nginx.conf** file will contain:

```
worker_processes 2;  
  
events {  
     worker_connections 65536;  
     use epoll;  
     multi_accept on;  
 }  
  
http {  
        client_header_timeout  3m;  
        client_body_timeout    3m;  
        send_timeout           3m;  
        ssl_session_timeout 10m;  
  
        upstream node-app {  
              ip_hash;  
              server node:8080 weight=10 max_fails=3 fail_timeout=30s;  
        }  
  
        limit_req_zone $binary_remote_addr zone=one:10m rate=180r/m;  
        server {  
              listen                80 default_server;  
             ssl                   off;  
              keepalive_timeout     70;  
              server_name           localhost;  
  
              location / {  
                    proxy_request_buffering off;  
                    proxy_buffering off;  
  
                    proxy_read_timeout 300;  
                    proxy_connect_timeout 300;  
  
                    proxy_pass http://node-app;  
                    proxy_http_version 1.1;  
                    proxy_set_header Upgrade $http_upgrade;  
                    proxy_set_header Connection "";  
                    proxy_set_header Host $host;  
                    proxy_set_header X-Real-IP $remote_addr;  
                    proxy_cache_bypass $http_upgrade;  
  
                    add_header 'Access-Control-Allow-Origin' 'https://estimeo.com' always;  
                    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;  
                    add_header 'Access-Control-Allow-Headers' 'Origin, X-Requested-With, Content-Type, Accept' always;  
                    add_header 'Access-Control-Allow-Credentials' 'true' always;  
  
                    if ($request_method = 'GET') {  
                        add_header 'Access-Control-Allow-Origin' '*' always;  
                        add_header 'Access-Control-Allow-Methods' 'GET' always;  
                        add_header 'Access-Control-Allow-Headers' 'Origin, X-Requested-With, Content-Type, Accept' always;  
                        add_header 'Access-Control-Allow-Credentials' 'true' always;  
                    }  
              }  
        }  
  
        client_max_body_size 20M;  
}
```
> This file basically configures your reverse proxy, it should be enough readable to understand it.

Next, we will create the **Dockerfile** which gonna contain:

```
# Set nginx base image  
FROM nginx:1.13.10  
# Expose port 80  
EXPOSE 80  
# Copy custom configuration file from the current directory  
COPY nginx.conf /etc/nginx/nginx.conf
```
I let you fulfill the Readme :)

___
In order to use this Reverse Proxy with our current App, we will now switch on **docker-compose**.



Starting now, the architecture should look like the following:

```
$ 	 ./
		| README.md
		| docker-compose.yml
		| mynginx
			| README.md
			| Dockerfile
			| nginx.conf
			| ...
		| myplatform
			| README.md
			| Dockerfile
			| server.js
			| ...
```

This **docker-compose.yml** should do the following:

* Create a first entry **nginx** which will build from **mynginx** directory. It is also linked with the second entry **node** and should expose the port 80 to the world.
* Create a second entry **node** which will build from **myplatform** directory. This entry should also specify the internal port used by the server.

You can now test everything with a simple `docker-compose up --build`. If everything is fine, you should be able to access your application in your browser via [http://localhost](http://localhost)

## _Dockerized_ App with Reverse Proxy => _Dockerized_ Tested App with Reverse Proxy

> From DARP to DTARP

> It starts to have a long name, we like it !

In this part, nothing new. We gonna just do what you always do in every project, especially in the past year because you were kind of perfect students: Add test everywhere in your project, that's also why I will let you free to do it on your own. 

You can for example add some tests on the history and also try to check the time page, I think the time retrieved for the different cities are not relevant...

> You don't know where to start ? No problem:
> You should use **mocha** to test some basic features of your application. To launch the test, simply add `"test": "mocha **.spec.js"` in your **package.json** file, under the **scripts** object.
> When you write test about a specific feature, you should copy/paste the name of that file, and add a `.spec` before the `.js`. It precises to everyone that this file is the test suite of the feature. It should follow this pattern:
> ```
>  $	./project
>		| myfeature.js
>		| myfeature.spec.js
> ```

This test part is **important** for the following so try do create at least 10 tests about different features.

## _Dockerized_ Tested App with Reverse Proxy => Micro-Service _Dockerized_ Tested App with Reverse Proxy

> From DTARP to MSDTARP

We start to have a complex application. May be it is time to create a new architecture to handle all the new content. It is also a good way to spot all the breaking points that we didn't see.

> It is always hard and long to change a project's architecture, but it is worst to do it when we reaching a breaking point. So let's do it now.

At the end of this part, you should have 6 unique projects:

* mynginx (The **Reverse Proxy**)
* myplatform (The **Router** and **Renderer** of our App)
* ms-calculator (Micro-service which will handle the **calculator** part of the platform)
* ms-time (Micro-service which will handle the **time** part of the platform)
* ms-chat (Micro-service which will handle the **chat** part of the platform)
* ms-history (Micro-service which will handle the **history** part of the platform)

You will also have the next architecture:

```
$ ./
	| README.md
	| docker-compose.yml
	| mynginx
		| Dockerfile
		| nginx.conf
		| ...
	| myplatform
		| Dockerfile
		| server.js
		| ...
	| ms-calculator
		| Dockerfile
		| ms.js
		| ...
	| ms-time
		| Dockerfile
		| ms.js
		| ...
	| ms-chat
		| Dockerfile
		| ms.js
		| ...
	| ms-history
		| Dockerfile
		| ms.js
		| ...
```

> You can use anything to communicate between the services, but if you don't know how to start, I provide you way to do it with [**ms-manager**](https://www.npmjs.com/package/ms-manager) (It is an npm package designed for this tutorial, based on the [**Hydra**](https://www.npmjs.com/package/hydra) project). 

### Hint

A Micro-Service is working like a server, it is waiting for something, in order to process it and optionally send back a response. 

The basic architecture is the following:
```
$ ./ms-something
		| Dockerfile		## The container configuration
		| ms.js  			## The entry point of the Micro-Service 
		| manager.js		## The logic of the Micro-Service
		| manager.spec.js	## The test suit of the Micro-Service
		| ...				## Other configuration or optional files (like package.json or micro-service configuration)
```

If you use the provided package to communicate between the services, your **ms.js** should look like the following:

```js
'use strict';
  
/**  
 * Load configuration file and initialize Hydra. */
let config = require(`./config/config.json`) || {};
config['hydra']['redis']['url'] = process.env.REDIS_PORT + '/0';

const MM = require('ms-manager');
MM.init(config, (err, serviceInfo) => {  
    if (err) {  
        console.error(err);  
  } else {
	  console.log(serviceInfo);
	  /**
	  * Subscribe to the different messages
	  */
  }
});
```

You should also update your **package.json** with the following **redis** entry:

```
redis:  
	image: "redis:3.2.11-alpine"  
	restart: always  
	container_name: redis_1  
	ports:  
		- "6379"
```

## Micro-Service _Dockerized_ Tested App with Reverse Proxy => Continuous Remote Tested Micro-Service _Dockerized_ App with Reverse Proxy

> From MSDTARP to CRTMSDARP   --  WTF ?!

Next episode :)



## Continuous Remote Tested Micro-Service _Dockerized_ App with Reverse Proxy =>  [...] with Collaboration Tools

> From CRTMSDARP  to CRTMSDARPCT

Next episode :)

## DevOps Ideas

Docker (and generally containers) are really good tools for DevOps. But there are only a tiny part of a real process. Following are the main categories with example:

* Collaboration
	* Trello
	* Jira
	* Slack
	* TeamFoundation
* SCM
	* Github / Git
	* Bitbucket
	* Gitlab
	* Subversion
* CI
	* Jenkins
	* Travis CI
	* Circle CI
	* Solano CI
* Testing
	* Mocha
	* JUnit
	* JMeter
	* Gatling
* Deployment
	* Capistrano
	* Otto
	* ElasticBox
	* Juju
* Cloud / LaaS / PaaS
	* AWS
	* Azure
	* OpenStack
	* Heroku
* Configuration
	* Chef
	* Puppet
	* Ansible
	* Vagrant
* Containerization
	* Docker
	* Nomad
	* Kubernetes
	* Swarm

> Most of theses tools have been created in order to work which each others. That's why DevOps process is powerful and we can apply a lot of automation !

___
> *Adrien Fenech*
