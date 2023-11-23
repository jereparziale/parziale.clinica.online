# parcial_labo_4 Parziale Jeremias Laboratorio 4 DNI: 42839805.
## TpClinicaOnline

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.6.

## Tecnologias y dependencias primarias utilizadas
+ Angular
+ Bootstrap
+ Firebase (Authentication, Firestore Database Y Storage)
+ Angular/Fire
+ swal
## Descripcion de la aplicacion
“La clínica OnLine, especialista en salud, cuenta actualmente con consultorios (6 en la actualidad),
dos laboratorios (físicos en la clínica), y una sala de espera general. Está abierta al público de lunes a
viernes en el horario de 8:00 a 19:00, y los sábados en el horario de 8:00 a 14:00.

Trabajan en ella profesionales de diversas especialidades, que ocupan los consultorios acorde a su
disponibilidad, y reciben en ellos pacientes con turno para consulta o tratamiento. Dichos turnos son
pedidos por la web seleccionando el profesional o la especialidad. La duración mínima de un turno es
30 minutos.” pero los profesionales pueden cambiar la duración según su especialidad. Estos
profesionales pueden tener más de una especialidad.

También contamos con un sector dentro de la clínica que se encarga de la organización y
administración de la misma..

## Flujo de trabajo modulo AUTH
### Login
El componente posee los input de email y contraseña, ademas en su parte derecha como se pidio oportunamente 6 perfiles de usuario y su foto de perfil con accesos rapidos los cuales al hacer click se cargan los datos (email-contraseña) para ingresar con el tipo de usuario que se desee. El componente valida que todos los usuarios hayan verificado su email y que los usuarios especialistas tengan el acceso concedido por el administrador.

![foto de login](https://github.com/jereparziale/parziale.clinica.online/blob/main/assets_readme/login.jpeg)

### Register
El componente en primera instancia permite elegir que tipo de usuario se registrara, ya sea paciente o especialista, una vez seleccionado se envia a un formulario de registro con datos propios de cada usuario.

![foto de filtro register](https://github.com/jereparziale/parziale.clinica.online/blob/main/assets_readme/filtro%20register.jpeg)

#### Paciente

![foto de register paciente](https://github.com/jereparziale/parziale.clinica.online/blob/main/assets_readme/register%20paciente.jpeg)

#### Especialista
Como parte de sus datos especificos para agregar la/s especialidad/es que atiende se abre un modal con la posibilidad de cargar tanto la especialidad como los dias y horarios de atencion

![foto](https://github.com/jereparziale/parziale.clinica.online/blob/main/assets_readme/register%20especialista.jpeg)

![foto](https://github.com/jereparziale/parziale.clinica.online/blob/main/assets_readme/register%20especialista%20horarios.jpeg)

## Flujo de trabajo Usuario Administrador
El usuario al ingresar a la pagina home tiene acceso a los modulos de __Usuarios, Turnos, Mi Perfil y Estadisticas__

### Usuarios

Este modulo cuenta con 4 acciones disponibles:

+ Registrar otro usuario administrador.
+ Listar Pacientes y al hacer click en los mismos ver su historia clinica
+ Listar Especialistas a los cuales se les podra conceder el acceso al sistema.
+ Exportar un EXCEL del listado de pacientes o especialistas.

![foto](https://github.com/jereparziale/parziale.clinica.online/blob/main/assets_readme/usuarios%20admin.jpeg)

### Turnos

AUN NO IMPLEMENTADA

### Mi Perfil

Muestra los datos del usuario y su foto de perfil.

![foto](https://github.com/jereparziale/parziale.clinica.online/blob/main/assets_readme/mi%20perfil%20admin.jpeg)

### Estadisticas

AUN NO IMPLEMENTADA (SPRINT 4 30/11/2023)

## Flujo de trabajo Usuario Especialistas
El especialista al ingresar a la pagina home tiene acceso a los modulos de __Mis Turnos, Mi Perfil y Mis Pacientes__

### Mis Turnos
El modulo comienza mostrando un filtro para poder buscar los turnos asignados al usuario especialista segun las especialidades que atienda o por nombre de paciente.

![foto](https://github.com/jereparziale/parziale.clinica.online/blob/main/assets_readme/mis%20turnos%20filtro%20espec.jpeg)

Una vez que se filtra, se mostraran en card los turnos asignados, sus detalles, un color especifico y las acciones disponibles segun el estado del mismo.

![foto](https://github.com/jereparziale/parziale.clinica.online/blob/main/assets_readme/mis%20turnos%20espec.jpeg)

Al momento del especialista finalizar la consulta el mismo debera llenar un formulario con los datos de la atencion y con la posibilidad de agregar datos dinamicos.

![foto](https://github.com/jereparziale/parziale.clinica.online/blob/main/assets_readme/cargar%20atencion%20espec.jpeg)

### Mi Perfil

Muestra los datos del usuario y su foto de perfil.

### Mis Pacientes

El modulo muestra los pacientes que el especialista atendio al menos una vez, al ser elegido se podra visualizar la historia clinica de este.

![foto](https://github.com/jereparziale/parziale.clinica.online/blob/main/assets_readme/mis%20pacientes%20filtro%20espec.jpeg)

## Flujo de trabajo Usuario Paciente
El paciente al ingresar a la pagina home tiene acceso a los modulos de __Mis Turnos, Mi Perfil y Solicitar Turno__

### Solicitar Turno

El modulo comienza mostrando un filtro para poder seleccionar alguna de las especialidades disponibles en la clinica y luego el profesional o por nombre del especialista el cual en este caso se tiene que elegir la especialidad de ese profesional.

Una vez seleccionado se mostrara la fecha del dia siguiente al dia actual y en caso de haber disponibilidad, un listado de horarios generado a raiz de la duracion teorica del turno. Al hacer click en el horario se mostrara un modal para confirmar el turno.

![foto](https://github.com/jereparziale/parziale.clinica.online/blob/main/assets_readme/solicitar%20turno%20paciente.jpeg)

![foto](https://github.com/jereparziale/parziale.clinica.online/blob/main/assets_readme/confirmar%20turno%20paciente.jpeg)
















