const productos = [{
    id: 1,
    name: "Café Brasil",
    description: "Café suave con notas de chocolate y un cuerpo sedoso. Ideal para quienes buscan una experiencia equilibrada y reconfortante.\n" + "\n" + // "Proveniente de la región de Minas Gerais, conocida por su clima cálido y suelos ricos, perfectos para el cultivo de granos de alta calidad. Los caficultores trabajan a altitudes de alrededor de 1200 metros, asegurando un proceso cuidadoso y artesanal.\n" +
        // "\n" +
        "Su perfil aromático, con un toque de dulzura natural, lo convierte en una excelente opción para preparaciones en espresso o métodos de filtro.",
    image: "assets/img/brasil.png",
    price: 4500
}, {
    id: 2,
    name: "Café Colombia",
    description: "Café balanceado con acidez media, notas de caramelo y un leve trasfondo de frutos secos. Este café captura la esencia de la tradición cafetera colombiana.\n" + "\n" + // "Se cultiva en el Eje Cafetero, entre 1500 y 2000 metros sobre el nivel del mar. Estas condiciones ideales permiten obtener granos con un perfil complejo y refinado.\n" +
        // "\n" +
        "Es perfecto para disfrutarlo solo, destacando su sabor único y su cuerpo redondo.",
    image: "assets/img/colombia.png",
    price: 5200
}, {
    id: 3,
    name: "Café Perú",
    description: "Café con cuerpo pleno y un sabor vibrante que combina notas frutales como ciruelas y moras. Cada sorbo ofrece una experiencia intensa y aromática.\n" + "\n" + // "Proveniente de las alturas de Cajamarca, a más de 1800 metros, este café es cultivado por cooperativas familiares comprometidas con prácticas orgánicas. Su origen asegura un producto respetuoso con el medio ambiente y de excelente calidad.\n" +
        // "\n" +
        "Es ideal para métodos de preparación como la prensa francesa o el chemex, que resaltan su complejidad.",
    image: "assets/img/peru.png",
    price: 4800
}, {
    id: 4,
    name: "Café Bolivia",
    description: "Café con un delicioso sabor a nueces, caramelo y un toque de miel. Es una opción suave pero con carácter, perfecta para cualquier momento del día.\n" + "\n" + // "Se cultiva en la región de Yungas una zona reconocida por su biodiversidad y paisajes únicos. Las fincas familiares trabajan a altitudes superiores a los 1600 metros y emplean un proceso de secado al sol que potencia sus características dulces y suaves.\n" +
        // "\n" +
        "Disfrutalo en preparaciones tanto tradicionales como modernas.",
    image: "assets/img/bolivia.png",
    price: 4700
}, {
    id: 5,
    name: "Café Blend",
    description: "Una mezcla especial que combina lo mejor de los grandes orígenes cafetaleros: la suavidad de Brasil, la acidez brillante de Colombia y la intensidad frutal de Perú. Cada taza ofrece un balance perfecto entre dulzura, acidez y cuerpo.\n" + "\n" + "Ideal para cappuccinos, lattes o para disfrutar como café negro en una mañana productiva.",
    image: "assets/img/blend.png",
    price: 5500
}]

// Función para generar un array de productos en formato JSON y mostrarlo en consola
function generarProductosArray() {
    console.log(productos);
    return productos;
}


// Función para mostrar cards de productos y un modal con la descripción
function renderProductos() {
    const productosSection = document.querySelector(".productos");
    productos.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('item-producto');

        const image = document.createElement('img');
        image.classList.add('img-producto');

        const title = document.createElement('h3');
        title.classList.add('nombre-producto');

        const buttonContenedor = document.createElement("div");
        buttonContenedor.className = "button-container";

        const button = document.createElement('button');
        button.classList.add('buttonInfo');
        button.textContent = "Más información";

        const buttonCarrito = document.createElement('button');
        buttonCarrito.classList.add('buttonCarrito');
        buttonCarrito.textContent = "Agregar al carrito";
        buttonCarrito.addEventListener('click', () => {
            agregarProducto(producto);
        });

        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.style.display = 'none';

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        const modalTitle = document.createElement('h3');
        modalTitle.innerText = producto.name;

        const modalDescription = document.createElement('p');
        modalDescription.innerText = producto.description;

        const closeModalBtn = document.createElement('button');
        closeModalBtn.textContent = "Cerrar";
        closeModalBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        modalContent.appendChild(modalTitle);
        modalContent.appendChild(modalDescription);
        modalContent.appendChild(closeModalBtn);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        button.addEventListener('click', () => {
            modal.style.display = 'flex';
        });

        image.src = producto.image;
        image.alt = producto.name;
        title.innerText = producto.name;

        div.appendChild(image);
        div.appendChild(title);
        buttonContenedor.appendChild(button);
        buttonContenedor.appendChild(buttonCarrito);
        div.appendChild(buttonContenedor);

        productosSection.appendChild(div);
    });
}

function actualizarCarrito() {
    var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    var tablaCarrito = document.getElementById("tabla-carrito");
    tablaCarrito.innerHTML = "";
    if (carrito.length === 0) {
        tablaCarrito.innerHTML = `
            <tr>
                <td>El carrito de compras está vacío</td>
            </tr>
        `;
        return;
    }
    let total = 0;
    for (var i = 0; i < carrito.length; i++) {
        var producto = carrito[i];
        var fila = document.createElement("tr");
        const subtotal = producto.precio * producto.quantity;
        total += subtotal;
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>$${subtotal}</td>
            <td>
                <button onclick="cambiarCantidad(${producto.id}, -1)">-</button>
                ${producto.quantity}
                <button onclick="cambiarCantidad(${producto.id}, 1)">+</button>
                <button onclick="eliminarProducto(${producto.id})"><i class="fas fa-trash"></i></button>
            </td>
        `;

        tablaCarrito.appendChild(fila);
    }

    var filaTotal = document.createElement("tr");
    filaTotal.innerHTML = `
        <td><strong>Total</strong></td>
        <td><strong>$${total}</strong></td>
    `;

    tablaCarrito.appendChild(filaTotal);
}

// Función para cambiar la cantidad de un producto
function cambiarCantidad(id, cambio) {
    var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    var producto = carrito.find(item => item.id === id);

    if (producto) {
        producto.quantity += cambio;

        if (producto.quantity <= 0) {
            carrito = carrito.filter(item => item.id !== id);
        }
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito(); // Actualizar la tabla después del cambio
}

// Función para eliminar un producto
function eliminarProducto(id) {
    var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}


// Obtener carrito de LocalStorage
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];


// Agregar producto al carrito
function agregarProducto(producto) {
    var producto = {
        id: producto.id, nombre: producto.name, precio: producto.price
    };
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const existingItem = carrito.find(item => item.id === producto.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        carrito.push({...producto, quantity: 1});
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}


// Guardar carrito en LocalStorage
localStorage.setItem('carrito', JSON.stringify(carrito));


// Eliminar producto
function eliminarProducto(idProducto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter(function (producto) {
        return producto.id !== idProducto;
    });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

// Vaciar carrito
document
    .getElementById("vaciar-carrito")
    .addEventListener("click", function () {
        localStorage.removeItem("carrito");
        actualizarCarrito();
    });


// Obtener elementos
const cartButton = document.getElementById("cart-button");
const cart = document.getElementById("carrito");
const closeCartButton = document.getElementById("close-cart");

// Mostrar el carrito
cartButton.addEventListener("click", () => {
    cart.classList.toggle("visible");
    if (cart.classList.contains("visible")) {
        cartButton.style.display = "none";
    } else {
        cartButton.style.display = "block";
    }
});

// Cerrar el carrito
closeCartButton.addEventListener("click", () => {
    cart.classList.remove("visible");
    cartButton.style.display = "block";

});


generarProductosArray();
renderProductos();
