# The first thing we need to do is define from what image we want to build from. 
# Here we will use the latest LTS (long term support) version 10 of node
FROM node:latest

# Create a directory to hold the application code inside the image, this will be 
# the working directory for your application
WORKDIR /usr/src/app

# To bundle your app's source code inside the Docker image, use the COPY instruction
COPY . .

RUN npm install

# Define the command to run your app using CMD which defines your runtime
CMD ["npm run", "build:production2"]