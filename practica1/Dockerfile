# Usar la imagen oficial de Node.js
FROM node:lts-alpine

# Definir directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Exponer el puerto de desarrollo de Vite
EXPOSE 5173

# Iniciar Vite en modo desarrollo
CMD ["npm", "run", "dev"]