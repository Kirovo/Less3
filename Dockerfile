FROM node:14.17.1
WORKDIR /Lesson_API_Database
ENV ENV=dev
COPY package.json /Lesson_API_Database/package.json
RUN npm install
COPY . /Lesson_API_Database
CMD ["node", "dist/server.js"]