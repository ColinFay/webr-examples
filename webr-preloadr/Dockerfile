FROM node:18

ENV R_VERSION=4.2.3

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Installing R

RUN apt-get update && \apt-get install gdebi-core -y

RUN curl -O https://cdn.rstudio.com/r/debian-12/pkgs/r-${R_VERSION}_1_amd64.deb && \
  gdebi r-${R_VERSION}_1_amd64.deb

RUN /opt/R/${R_VERSION}/bin/Rscript ./node_modules/webrtools/r/install.R dplyr

COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]