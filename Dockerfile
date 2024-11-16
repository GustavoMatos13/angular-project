FROM node:20

WORKDIR /app

COPY . .

RUN npm install 

RUN npm install @angular/cli - g

COPY . .

EXPOSE 4200

CMD ["npm", "start","--", "--host", "0.0.0.0"]