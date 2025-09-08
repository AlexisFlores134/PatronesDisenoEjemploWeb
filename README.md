# Sistema de Control de Acceso con Patrones de Diseño

Este proyecto implementa un sistema de control de acceso con RFID/NFC utilizando los patrones Decorator y Facade.

## 🚀 Demo en Vivo
Puedes probar el sistema directamente aquí: [\[GitHub Pages Link\]](https://alexisflores134.github.io/PatronesDisenoEjemploWeb/)

## 🎯 Patrones Implementados

### Decorator
Añade funcionalidades adicionales a objetos de forma dinámica:
- **LoggingDecorator**: Añade registro de accesos
- **TempAccessDecorator**: Restringe acceso por horario
- **AdminDecorator**: Concede privilegios administrativos

### Facade  
Simplifica el sistema complejo de verificación en una interfaz simple:
- **CardReader**: Lectura de tarjetas
- **UserValidator**: Validación de usuarios
- **PermissionChecker**: Verificación de permisos
- **AccessLogger**: Registro de accesos

## 🛠️ Tecnologías Utilizadas
- HTML5
- CSS3 (Flexbox, Grid, Variables CSS)
- JavaScript ES6+
- Patrones de Diseño (Decorator, Facade)

## 📦 Instalación y Uso

1. Clona el repositorio:
```bash
git clone https://github.com/AlexisFlores134/PatronesDisenoEjemploWeb.git
2. Abre index.html en tu navegador

3. Experimenta con los patrones:

- Autentica usuarios y aplica decoradores
- Prueba diferentes IDs de tarjeta (NFC-001, NFC-002, NFC-003)
- Simula accesos denegados

🎮 Como Probar
Tarjetas de Ejemplo:

- NFC-001: Acceso completo
- NFC-002: Acceso limitado
- NFC-003: Acceso denegado (restringida)
- INVALID-001: Formato incorrecto
 
Flujo de Demo:

1. Autentica un usuario
2. Aplica decoradores para añadir funcionalidades
3. Verifica acceso con diferentes tarjetas
4. Usa "Simular Acceso Denegado" para ver diferentes escenarios

📚 Explicación de Patrones
Decorator
Extiende funcionalidad dinámicamente sin modificar código existente, como añadir toppings a un café.

Facade
Proporciona una interfaz simplificada para un sistema complejo, como un recepcionista en un hotel.

👨‍💻 Autor
Tu AlexFlores - GitHub

📄 Licencia
Este proyecto es de código abierto y está disponible bajo la licencia MIT.