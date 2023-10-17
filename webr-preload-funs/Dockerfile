FROM r-base:4.3.1

ENV R_VERSION=4.2.3

# Create app directory
WORKDIR /usr/src/app

RUN apt update && \
  apt install nodejs npm -y

COPY . .

RUN npm install

RUN Rscript ./node_modules/webrtools/r/install_from_desc.R $(pwd)/rfuns/DESCRIPTION

EXPOSE 3000

CMD [ "node", "index.js" ]
