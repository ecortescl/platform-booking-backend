
## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu máquina:

- [Node.js](https://nodejs.org/)
- [XAMPP](https://www.apachefriends.org/index.html)
- [GitHub Desktop](https://desktop.github.com/)

## Pasos para Correr la Aplicación

Sigue estos pasos para ejecutar la aplicación:

1. **Clonar el Repositorio**
   - Abre GitHub Desktop.
   - Ve a "File" > "Clone Repository".
   - Ingresa la URL de tu repositorio y selecciona una ubicación en tu disco para clonar el proyecto.

2. **Instalar Dependencias**
   - Abre la terminal en la carpeta del proyecto clonado.
   - Ejecuta el siguiente comando para instalar las dependencias:
     ```
     npm install
     ```

3. **Instalar XAMPP**
   - Descarga e instala XAMPP desde [aquí](https://www.apachefriends.org/index.html).
   - Una vez instalado, abre el Panel de Control de XAMPP.

4. **Iniciar Apache y MySQL**
   - En el Panel de Control de XAMPP, inicia los módulos de **Apache** y **MySQL**.

5. **Crear la Base de Datos**
   - Abre tu navegador y ve a `http://localhost/phpmyadmin`.
   - Crea una nueva base de datos llamada `booking`.

6. **Migrar la Base de Datos**
   - En la terminal, asegúrate de estar en la carpeta del proyecto.
   - Ejecuta el siguiente comando para migrar la base de datos:
     ```
     npx sequelize-cli db:migrate
     ```

7. **Iniciar la Aplicación**
   - Finalmente, inicia la aplicación ejecutando:
     ```
     npm run dev
     ```

## Acceso a la Aplicación

Una vez que la aplicación esté corriendo, puedes acceder a ella a través de tu navegador en `http://localhost:4000` 

## Notas Adicionales

- Asegúrate de que no haya otros servicios usando los mismos puertos que Apache y MySQL.
- Si tienes problemas, revisa los registros de errores en XAMPP y la consola de tu terminal.


