# uses mysql:8.0 image
FROM mysql:8.0 

# Finds init.sql in local proj, and copies it to the container's /docker-entrypoint-initdb.d/ directory.
COPY ./database/init.sql /docker-entrypoint-initdb.d/ 

# You need to set the environment variables for MySQL root password and database name.
ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_DATABASE=course_db

# The default MySQL port is 3306, so we expose it to allow connections from the host machine.
EXPOSE 3306