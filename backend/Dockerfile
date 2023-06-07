FROM node:18.12

# Install Dependencies
COPY package*.json ./

RUN npm install --silent

# Copy app source code
COPY . .

EXPOSE 7000
# Exports

CMD ["node","server.js"]
