# Use an official Node.js runtime as the base image
FROM node

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies inside the container
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose port 3000 to be accessible from outside the container
EXPOSE 3000

# Run the application when the container starts
# CMD ["node", "src/app.js"]
CMD ["npm", "start"]
