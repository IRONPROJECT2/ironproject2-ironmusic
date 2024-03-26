# Ironmusic (IronHack second project)
Ironmusic es el proyecto final del modulo 2 del bootcamp de programación web de Ironhack, está realizado por Marta Bravo y Lucas Fajersztejn.
Ironmusic es un blog para músicos y bandas. Nuestro propósito ha sido crear un lugar de encuentro entre músicos, donde estos puedan contactar con otras bandas y unirse a ellas; publicar diferentes ofertas en busca de músicos, promocionar un concierto o buscar otras bandas para organizar un festival (bandjam).


## Retos de este proyecto:

- Integración de múltiples APIs y módulos de Node.js: La integración y gestión adecuada de varias APIs y módulos de Node.js.

- Gestión de sesiones de usuario de forma segura y persistente: Implementar y configurar correctamente la gestión de sesiones de usuario utilizando express-session y connect-mongo para garantizar la seguridad y persistencia de los datos de sesión en la base de datos MongoDB.

- Modelado y operaciones de base de datos MongoDB con Mongoose: Diseñar adecuadamente los modelos de datos y realizar operaciones tanto de busqueda como CRUD (crear, leer, actualizar, eliminar) en la base de datos MongoDB utilizando Mongoose de manera eficiente y estructurada.

- Manejo de errores HTTP y depuración del servidor: Asegurar un manejo adecuado de errores HTTP utilizando http-errors y facilitar la depuración del servidor utilizando Morgan para registrar solicitudes HTTP y rastrear posibles problemas en el flujo de ejecución.

- Implementación de funcionalidades avanzadas: Desarrollar funcionalidades avanzadas como la creación de un ranking de las mejores 10 bandas según el voto de los usuarios podría haber sido un desafío técnico que requería un diseño cuidadoso y una implementación eficiente.

## Functionalities
- Iniciar sesión / registrarse: El usuario puede iniciar sesión en el caso de tener una cuenta o si no registrarse en la web
- Crear una banda: Una vez iniciada la sesión el usuario puede ir al formulario de crear banda y crear una, posteriormente los usuarios que pertenecen a una banda se unen a esta y deberán ser aceptados por el administrador (el usuario que creo la banda)
- Unirse a una banda / tener control sobre sus integrantes: Una vez creada la banda esta aparecerá en la lista de bandas y si algún otro usuario entra a ver los detalles de esa banda tiene la opción de unirse a está, en el caso de que clickeé en unirse a ella, el administrador deberá ir a su perfíl para aceptar o rechazar la solicitud
- Buscar: en el centro del nav hay un buscador el cuál puede usarse para buscar usuarios, bandas, y posts
- Realizar un post (Bandjam, Formar Banda y Anuncia Tu Concierto): En la sección de comunidad el usuario puede hacer un post en:
    - Bandjam: un espacio para buscar otras bandas para organizar festivales o jams
    - Formar Banda: un espacio para buscar banda o músicos para una banda
    - Anuncia Tu Concierto: un espacio para promocionar un show (si la fecha está próxima saldrá en el index)
- Enviar un mensaje: el usuario puede comentar en cualquiera de los posteos.
- Ranking: en los detalles de cada banda los usuarios pueden votar en un ranking de estrellas del 1 al 5, donde se generará una media con todos los votos y se mostrará en el ranking del index.
- Index: se compone de un ranking en el que se muestran las 10 bandas mejores puntuadas, las 5 últimas bandas añadidas a la web, un apartado para noticias sobre música, una invitación para hacer un posteo en comunity y por último un espacio para promocionar los 6 shows más próximos a la fecha actual.

## Demostración

## Screenshots

Error 404

![Error 404](https://i.postimg.cc/pVq87tyB/404.png)

Error 500

![Error 505](https://i.postimg.cc/gJKRmCsm/Error-500.png)

error validation

![error validation](https://i.postimg.cc/nrcmz3S7/errorvalidation.png)

Uso de sweetalert2

![Uso de sweetalert2](https://i.postimg.cc/3RhmM8gt/Estas-Seguro.png)

Band Detail

![Band Detail](https://i.postimg.cc/yxQZS02G/Band.png)


