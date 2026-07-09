# Portfolio Freelancer con Tienda Integrada - Entrega Final Talento Tech

Este es el proyecto final desarrollado para el curso **Talento Tech (2026)**. El sitio evolucionó de una landing page personal para un Diseñador Freelancer a una plataforma web interactiva que incluye una sección de servicios, un porfolio, opiniones de la comunidad, un formulario de contacto funcional y una **Tienda en Línea Dinámica** integrada con una API externa.

## 🚀 Demo en Vivo
Podés ver el sitio funcionando en producción aquí: [https://criscasti.github.io/Entrega-Final-Talento-Tech/](https://criscasti.github.io/Entrega-Final-Talento-Tech/)

## 🛠️ Tecnologías y Herramientas Utilizadas
* **HTML5:** Estructura semántica avanzada completa (`header`, `nav`, `main`, `section`, `footer`).
* **CSS3 Avanzado:** Diseño responsivo adaptado a dispositivos móviles y escritorio (Mobile First) mediante:
    * **Flexbox:** Para la barra de navegación y distribución de elementos flexibles.
    * **CSS Grid:** Para el catálogo de la tienda, la sección de servicios y el formulario de contacto.
    * **Custom Properties (Variables CSS):** Para la gestión centralizada y eficiente de la paleta de colores corporativa.
* **JavaScript (ES6+):** Lógica interactiva del lado del cliente y manipulación del DOM.
* **FakeStore API:** API REST externa utilizada para consumir el listado de productos de forma dinámica.
* **Formspree:** Integración para procesar los envíos de consultas del formulario en producción sin backend propio.

## ✨ Funcionalidades y Requerimientos Cumplidos

### 1. Interfaz y Maquetación Limpia
* Diseño moderno utilizando la tipografía *Krub* con reseteo y normalización de estilos.

### 2. Consumo de API Externa (Async/Await)
* Uso de `fetch` integrado con bloques `try/catch` para la captura asíncrona de datos desde una API externa de productos, renderizando las tarjetas del catálogo dinámicamente con sus respectivas imágenes, descripciones y precios.

### 3. Lógica Completa de Carrito de Compras
* **Contador en tiempo real:** Muestra la cantidad total de artículos agregados directamente desde el catálogo.
* **Gestión inteligente de cantidades:** Si un producto ya existe, incrementa su contador en vez de duplicar la fila.
* **Control individualizado:** Inclusión de un botón de remoción individual por producto que disminuye la cantidad de a una unidad o lo remueve si es el último.
* **Cálculo automático:** Desglose automatizado de subtotales por producto y cálculo del total general de la compra.
* **Persistencia con LocalStorage:** El carrito guarda su estado de forma local, evitando la pérdida de datos al recargar la página.
* **Vaciado total:** Botón dedicado para limpiar el carrito y el almacenamiento del navegador en un solo clic.

### 4. Validaciones en el Cliente
* Control mediante JavaScript antes del envío del formulario para asegurar que los campos obligatorios no se envíen vacíos.
* Validación estricta de estructura de correo electrónico utilizando expresiones regulares (`regex`).

