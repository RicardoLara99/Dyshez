# Etapa de construcción
FROM node:18-alpine as builder
WORKDIR /app

# Copia los archivos de configuración y dependencias
COPY package.json yarn.lock ./

# Instala todas las dependencias necesarias para construir la aplicación
RUN yarn install --frozen-lockfile

# Copia el resto del código de la aplicación al directorio de trabajo
COPY . .

# Construye la aplicación Next.js
RUN yarn build

# Etapa final para producción
FROM node:18-alpine as runner
WORKDIR /app

# Copia los archivos necesarios desde la etapa de construcción
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

# Instala solo las dependencias de producción
RUN yarn install --production --frozen-lockfile

# Expone el puerto que utilizará la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["yarn", "start"]

