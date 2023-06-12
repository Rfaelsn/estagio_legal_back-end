FROM node:18

ENV WORKDIR=/usr/estagio_legal_back

WORKDIR ${WORKDIR}

#Copiando os arquivos de dependencias para o contêiner
COPY . . 

RUN npm ci

CMD ["npm", "run", "start:prod"]
# #porta exposta
EXPOSE 3000
