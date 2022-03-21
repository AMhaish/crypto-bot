FROM node:10-alpine
WORKDIR /usr/app
COPY package.json .
RUN npm install --quiet
COPY . .
# RUN npm run test-unit
RUN npm run build
RUN npm install pm2 -g
CMD ["pm2-runtime", "dist/app.js"]