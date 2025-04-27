const apiUrl = 'http://localhost:8080/api/v1/products';

const apiEndpoints = {
    fetchAll: '/obtener/',
    create: '/enviar/',
    update: '/update/{id}',
    delete: '/delete/{id}', // Eliminación física
    deactivate: '/{id}' // Eliminación lógica
};

// Función para listar todos los productos
async function fetchProducts() {
    try {
        const response = await fetch(`${apiUrl}${apiEndpoints.fetchAll}`);
        if (!response.ok) {
            throw new Error('Error al obtener los productos');
        }
        const products = await response.json();
        console.log('Productos obtenidos:', products); // Depuración
        renderProducts(products);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para registrar un nuevo producto
async function createProduct(productData) {
    try {
        // Agregar el estado activo por defecto
        productData.status = 1;

        console.log('Llamando a createProduct con datos:', productData); // Depuración
        const response = await fetch(`${apiUrl}${apiEndpoints.create}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error al registrar el producto: ${errorMessage}`);
        }

        alert('Producto registrado exitosamente');
        await fetchProducts(); // Actualizar la lista de productos
        toggleForm(); // Ocultar el formulario
    } catch (error) {
        console.error('Error:', error);
        alert('No se pudo registrar el producto. Por favor, inténtalo de nuevo.');
    }
}

// Función para actualizar un producto
async function updateProduct(productData) {
    try {
        const endpoint = apiEndpoints.update.replace('{id}', productData.idProduct);

        // Asegurarse de que el estado del producto se mantenga activo si no se especifica
        if (!productData.status) {
            productData.status = 1; // Estado activo por defecto
        }

        const response = await fetch(`${apiUrl}${endpoint}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error al actualizar el producto: ${errorMessage}`);
        }

        alert('Producto actualizado exitosamente');
        fetchProducts(); // Actualizar la lista de productos
        toggleForm(); // Ocultar el formulario
    } catch (error) {
        console.error('Error:', error);
        alert('No se pudo actualizar el producto.');
    }
}

// Función para eliminar un producto físicamente
async function deleteProduct(productId) {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este producto de forma permanente?');
    if (!confirmDelete) {
        return;
    }

    try {
        const endpoint = apiEndpoints.delete.replace('{id}', productId);

        const response = await fetch(`${apiUrl}${endpoint}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error al eliminar el producto: ${errorMessage}`);
        }

        alert('Producto eliminado exitosamente');
        fetchProducts();
    } catch (error) {
        console.error('Error:', error);
        alert('No se pudo eliminar el producto.');
    }
}

// Función para desactivar un producto (eliminación lógica)
async function deactivateProduct(productId) {
    const confirmDeactivate = confirm('¿Estás seguro de que deseas desactivar este producto?');
    if (!confirmDeactivate) {
        return;
    }

    try {
        const endpoint = apiEndpoints.deactivate.replace('{id}', productId);

        const response = await fetch(`${apiUrl}${endpoint}`, {
           method: 'DELETE',
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error al desactivar el producto: ${errorMessage}`);
        }

        alert('Producto desactivado exitosamente');
        fetchProducts();
    } catch (error) {
        console.error('Error:', error);
        alert('No se pudo desactivar el producto.');
    }
}

// Función para renderizar los productos en la tabla
function renderProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Limpiar contenido previo

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.idProduct}</td>
            <td>${product.nameProduct}</td>
            <td>${product.priceProduct}</td>
            <td>${product.status === 1 ? 'Activo' : 'Inactivo'}</td>
            <td>
                <button class="button" onclick="fetchProductById(${product.idProduct})">Editar</button>
                <button class="button danger" onclick="deleteProduct(${product.idProduct})">Eliminar</button>
                <button class="button warning" onclick="deactivateProduct(${product.idProduct})">Desactivar</button>
            </td>
        `;
        productList.appendChild(row);
    });
}

// Función para obtener un producto por ID y cargarlo en el formulario
async function fetchProductById(productId) {
    try {
        const response = await fetch(`${apiUrl}/${productId}`);
        if (!response.ok) {
            throw new Error('Error al obtener el producto');
        }
        const product = await response.json();

        // Cargar los datos en el formulario
        document.getElementById('product-id').value = product.idProduct;
        document.getElementById('name').value = product.nameProduct;
        document.getElementById('price').value = product.priceProduct;

        // Mostrar el formulario
        toggleForm();
    } catch (error) {
        console.error('Error:', error);
    }
}

// Mostrar/ocultar el formulario
function toggleForm() {
    const form = document.getElementById('product-form');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

// Manejar el envío del formulario
document.getElementById('product-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const productId = document.getElementById('product-id').value;
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;

    const productData = {
        nameProduct: name,
        priceProduct: price,
    };

    if (productId) {
        productData.idProduct = productId;
        updateProduct(productData); // Actualizar producto existente
    } else {
        createProduct(productData); // Crear nuevo producto
    }
});

// Cargar la lista de productos al cargar la página
document.addEventListener('DOMContentLoaded', fetchProducts);