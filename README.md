# SE-course-project-2

*** STRUCTURE OF OUR PROJECT ***

course-management-system/
├── backend/                # Node.js backend service
│   ├── src/
│   │   └── index.js        # API endpoints and business logic
│   └── Dockerfile          # Backend container configuration
├── frontend/               # Web frontend
│   ├── public/             # Static assets
│   │   ├── index.html      # Main HTML page
│   │   ├── css/            # Stylesheets
│   │   └── js/             # Client-side JavaScript
│   ├── nginx.conf          # Nginx configuration
│   └── Dockerfile          # Frontend container configuration
├── database/               # Database service
│   ├── init.sql            # Database initialization script
│   └── Dockerfile          # Database container configuration
├── docker-compose.yml      # Docker composition file
├── package.json            # Node.js dependencies
├── package-lock.json       # Node.js dependencies
└── README.md               # Project documentation

*** To Pull all and Run the Container since we have a docker-compose.yml ***
docker-compose pull    <!-- pulls latest images -->
docker-compose build     <!-- build images -->   
docker-compose up       <!-- start services -->
docker-compose ps    <!-- check status of the running services  -->

*****************************
* * * * * * * * * * * * * * *
*****************************





*** MAKE SURE This Is In Your .gitignore ***
node_modules/
.env

*** STACK USED ***
Frontend: HTML, CSS, JavaScript, Nginx
Backend: Node.js, Express.js
Database: MySQL
Containerization: Docker

*** FOR BACKEND DEPENDENCIES RUN ***
npm install   # Technically you don't need this because you are using docker but just in case

*** TO RUN THE DOCKER FILES ***
docker-compose up   # This will Build all the necessary Docker images
docker-compose up -d   # Or run in the background
docker-compose down      # Stops the application

*** IF YOU MAKE CHANGES TO THE CODE THEN RUN ***
docker-compose build
docker-compose up


*** Creating New Tags for an Image: Sets it up on the Repo ***
docker-compose build
docker push rpm24/swe_project_2:frontend
docker push rpm24/swe_project_2:backend
docker push rpm24/swe_project_2:database

*** To Pull them individually ***
docker pull rpm24/swe_project_2:frontend
docker pull rpm24/swe_project_2:backend
docker pull rpm24/swe_project_2:database



*** Using Docker allows for packaging everything the application needs to run - including dependencies, configuration, and environment - into containers that will work consistently across different systems. *** 
