# ClientesApp

Proyecto desarrollado con el framework de JavaScript 'Angular', aplicación que corre por el lado del cliente para el sistema básico "ClientesApp" que se utilizó para el aprendizaje del curso Spring 5 - Angular.

## Descripción

La aplicación Web fue creada con el objetivo de poder hacer un CRUD de los clientes que formarán parte de una base de datos que sirve como ejemplo.

Los datos de los clientes son: apellido, nombre, email, fecha de creación, región y opcionalmente una foto que los represente. 

Para la creación de clientes por el lado del servidor, utilizando Spring 5 (Spring boot y security), se crearon las siguientes entidades: clientes y regiones, con una relación de uno a muchos, clientes -> regiones.

Para la persistencia se utilizó JPA y Hibernate, y la base de datos relacional MySql.

Para manejar la autenticación se utilizó Spring Security y OAuth2, aprendiendo a utilizar el manejo de tokens, que son necesarios a la hora de llevar a cabo la autenticación de sesiones sin estado (stateless).

## Avances

null