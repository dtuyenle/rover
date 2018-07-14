FROM nodesource/centos7

# install node
RUN curl -sL https://rpm.nodesource.com/setup_8.x | bash -
RUN yum install -y make gcc*
RUN yum install nodejs -y
RUN yum install git -y

# install postgrep
RUN yum install postgresql-server postgresql-contrib
RUN postgresql-setup initdb
RUN systemctl start postgresql
RUN systemctl enable postgresql

# install dependencies
ADD package.json package.json
RUN npm cache clean
RUN npm install
RUN npm install knex@0.13.0 -g
COPY . .

CMD npm run start
EXPOSE 1337
