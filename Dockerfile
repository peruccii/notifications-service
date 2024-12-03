# Use a imagem oficial do Node.js
FROM node:20

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Expõe a porta que o NestJS usará
EXPOSE 3000

# Comando para iniciar o servidor NestJS
CMD ["npm", "run", "start:dev"]
