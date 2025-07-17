# Use an official nodejs runtime as a parent image
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app

#copy the package.json and the package-lock.json to the container
COPY package*.json .

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma client inside container
RUN npx prisma generate

# Define the command to run the app
CMD ["npm", "run", "dev"]