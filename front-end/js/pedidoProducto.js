// URL base de la API
const apiUrl = 'http://localhost:8080/api/v1/orderProducts';

const apiEndpoints = {
    fetchAll: '/obtener/',
    search: '/', 
    filter: '/search/{filter}',
    getById: '/{id}',
    create: '/enviar/',
    update: '/update/',
    delete: '/delete/', // Eliminar un cliente físicamente
    deactivate: '/' // Desactivar un cliente (eliminación lógica)
};

// Obtener todos los detalles de pedidos
async function fetchAllOrderProducts() {
    try {
        const response = await fetch(apiUrl + apiEndpoints.fetchAll);
        const data = await response.json();
        console.log('Detalles de pedidos:', data); // Verifica los datos aquí
        return data;
    } catch (error) {
        console.error('Error al obtener los detalles de pedidos:', error);
    }
}

// Buscar un detalle de pedido por ID y devolver todos los datos
async function searchOrderProduct(id) {
    try {
        const response = await fetch(apiUrl + apiEndpoints.search + id); // URL ajustada
        console.log('URL generada para la solicitud:', apiUrl + apiEndpoints.search + id);
        const data = await response.json();
        console.log('Respuesta completa de la API para el ID:', id, data);

        // Verificar si la respuesta es un objeto válido
        if (!data || typeof data !== 'object') {
            alert('No se encontraron datos para el ID proporcionado.');
            return null;
        }

        return data; // Devuelve todos los datos
    } catch (error) {
        console.error('Error al buscar el detalle de pedido:', error);
        throw error;
    }
}

// Función para buscar detalles de pedidos por filtro (ID o Nombre del Producto)
async function searchOrderProducts(filter, searchType) {
    try {
        let endpoint;

        if (searchType === 'id') {
            // Buscar por ID
            endpoint = apiEndpoints.getById.replace('{id}', filter);
        } else if (searchType === 'product') {
            // Buscar por Nombre del Producto
            endpoint = apiEndpoints.filter.replace('{filter}', encodeURIComponent(filter));
        } else {
            throw new Error('Tipo de búsqueda no válido');
        }

        const response = await fetch(`${apiUrl}${endpoint}`);
        if (!response.ok) {
            throw new Error('Error al buscar detalles de pedidos');
        }

        const orderProducts = searchType === 'id' ? [await response.json()] : await response.json();
        renderOrderProducts(orderProducts); // Renderizar los detalles de pedidos encontrados
    } catch (error) {
        console.error('Error:', error);
        alert('No se pudo realizar la búsqueda. Inténtalo de nuevo.');
    }
}

// Crear un nuevo detalle de pedido
async function createOrderProduct(orderProduct) {
    try {
        const response = await fetch(apiUrl + apiEndpoints.create, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderProduct)
        });

        const data = await response.json();
        console.log('Respuesta del backend:', data); // Verifica la respuesta aquí
        return data;
    } catch (error) {
        console.error('Error al crear el detalle de pedido:', error);
        throw error;
    }
}

// Actualizar un detalle de pedido
async function updateOrderProduct(id, updatedOrderProduct) {
    try {
        const response = await fetch(apiUrl + apiEndpoints.update + id, { // URL ajustada
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedOrderProduct)
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el detalle de pedido');
        }

        const data = await response.json();
        console.log('Respuesta del backend al actualizar:', data); // Verifica la respuesta aquí
        return data;
    } catch (error) {
        console.error('Error al actualizar el detalle de pedido:', error);
        throw error;
    }
}

// Eliminar un detalle de pedido físicamente
async function deleteOrderProduct(id) {
    try {
        const response = await fetch(apiUrl + apiEndpoints.delete + id, { // URL ajustada
            method: 'DELETE'
        });
        console.log('Detalle de pedido eliminado:', response.status);
        return response.status;
    } catch (error) {
        console.error('Error al eliminar el detalle de pedido:', error);
    }
}

// Desactivar un detalle de pedido (eliminación lógica)
async function deactivateOrderProduct(id) {
    try {
        const response = await fetch(apiUrl + apiEndpoints.deactivate + id, { // URL ajustada
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Error al desactivar el detalle de pedido');
        }
        const data = await response.json();
        console.log('Detalle de pedido desactivado:', data);
        return data;
    } catch (error) {
        console.error('Error al desactivar el detalle de pedido:', error);
        throw error;
    }
}

// Función para manejar la desactivación de un detalle de pedido
async function deactivateOrderProductHandler(id) {
    if (confirm('¿Estás seguro de que deseas desactivar este detalle de pedido?')) {
        try {
            const response = await deactivateOrderProduct(id);
            alert('Detalle de pedido desactivado exitosamente');
            loadOrderProducts(); // Recargar la tabla
        } catch (error) {
            console.error('Error al desactivar el detalle de pedido:', error);
            alert('Hubo un error al desactivar el detalle de pedido. Por favor, inténtalo de nuevo.');
        }
    }
}

// Función para renderizar los detalles de pedidos en la tabla
function renderOrderProducts(orderProducts) {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ''; // Limpiar contenido previo

    orderProducts.forEach(orderProduct => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${orderProduct.idOrderProduct}</td>
            <td>${orderProduct.order.client.nameClient}</td>
            <td>${orderProduct.product.nameProduct}</td>
            <td>${orderProduct.quantity}</td>
            <td>${orderProduct.price}</td>
            <td>${orderProduct.total}</td>
            <td>
                <button class="button" onclick="editOrderProduct(${orderProduct.idOrderProduct})">Editar</button>
                <button class="button danger" onclick="deleteOrderProductHandler(${orderProduct.idOrderProduct})">Eliminar</button>
                <button class="button warning" onclick="deactivateOrderProductHandler(${orderProduct.idOrderProduct})">Desactivar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Función para cargar todos los detalles de pedidos en la tabla
async function loadOrderProducts() {
    try {
        const orderProducts = await fetchAllOrderProducts();
        renderOrderProducts(orderProducts);
    } catch (error) {
        console.error('Error al cargar los detalles de pedidos:', error);
    }
}

// Función para manejar la creación de un nuevo detalle de pedido
async function createOrderProductHandler() {
    const orderProduct = {
        order: {
            idOrders: parseInt(document.getElementById('order').value) // ID del pedido
        },
        product: {
            idProduct: parseInt(document.getElementById('product').value) // ID del producto
        },
        quantity: parseInt(document.getElementById('quantity').value), // Cantidad
        price: parseFloat(document.getElementById('price').value), // Precio unitario
        total: parseFloat(document.getElementById('quantity').value) * parseFloat(document.getElementById('price').value), // Total calculado
        status: 1 // Asegúrate de que el estado sea "activo"
    };

    console.log('Datos enviados al backend:', orderProduct); // Verifica los datos aquí

    try {
        const newOrderProduct = await createOrderProduct(orderProduct);
        alert('Detalle de pedido creado exitosamente');
        document.getElementById('orderProductForm').reset();
        document.getElementById('orderProductForm').style.display = 'none';
        loadOrderProducts();
    } catch (error) {
        console.error('Error al crear el detalle de pedido:', error);
        alert('Hubo un error al crear el detalle de pedido. Por favor, inténtalo de nuevo.');
    }
}

// Función para manejar la edición de un detalle de pedido
async function editOrderProduct(id) {
    console.log('ID proporcionado para editar:', id);

    if (!id || isNaN(id)) {
        console.error('ID inválido proporcionado para editar:', id);
        alert('El ID proporcionado no es válido.');
        return;
    }

    try {
        const orderProduct = await searchOrderProduct(id);

        if (!orderProduct) {
            alert('No se encontraron datos para el ID proporcionado.');
            return;
        }

        document.getElementById('order').value = orderProduct.order.idOrders;
        document.getElementById('product').value = orderProduct.product.idProduct;
        document.getElementById('quantity').value = orderProduct.quantity;
        document.getElementById('price').value = orderProduct.price;

        const form = document.getElementById('orderProductForm');
        form.style.display = 'block';

        const saveButton = document.getElementById('saveButton');
        saveButton.textContent = 'Actualizar';
        saveButton.onclick = async () => {
            const updatedOrderProduct = {
                order: {
                    idOrders: parseInt(document.getElementById('order').value)
                },
                product: {
                    idProduct: parseInt(document.getElementById('product').value)
                },
                quantity: parseInt(document.getElementById('quantity').value),
                price: parseFloat(document.getElementById('price').value),
                total: parseFloat(document.getElementById('quantity').value) * parseFloat(document.getElementById('price').value),
                status: 1
            };

            if (!updatedOrderProduct.order.idOrders || !updatedOrderProduct.product.idProduct || 
                isNaN(updatedOrderProduct.quantity) || isNaN(updatedOrderProduct.price)) {
                alert('Por favor, completa todos los campos correctamente.');
                return;
            }

            try {
                const response = await updateOrderProduct(id, updatedOrderProduct);
                alert(response.message || 'Detalle de pedido actualizado exitosamente');
                form.style.display = 'none';
                form.reset();
                saveButton.textContent = 'Guardar';
                saveButton.onclick = createOrderProductHandler;
                loadOrderProducts();
            } catch (error) {
                console.error('Error al actualizar el detalle de pedido:', error);
                alert('Hubo un error al actualizar el detalle de pedido. Por favor, inténtalo de nuevo.');
            }
        };
    } catch (error) {
        console.error('Error al cargar los datos del detalle de pedido para editar:', error);
        alert('No se pudieron cargar los datos del detalle de pedido. Por favor, verifica el ID.');
        document.getElementById('orderProductForm').style.display = 'none';
    }
}

// Función para manejar la eliminación de un detalle de pedido
async function deleteOrderProductHandler(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este detalle de pedido?')) {
        try {
            await deleteOrderProduct(id);
            alert('Detalle de pedido eliminado exitosamente');
            loadOrderProducts(); // Recargar la tabla
        } catch (error) {
            console.error('Error al eliminar el detalle de pedido:', error);
        }
    }
}

// Función para mostrar el formulario de creación
function showCreateForm() {
    const form = document.getElementById('orderProductForm');
    form.style.display = 'block'; // Mostrar el formulario
    form.reset(); // Limpiar los campos del formulario
    document.getElementById('saveButton').onclick = createOrderProductHandler; // Asignar la función de creación al botón
}

// Función para ocultar el formulario de creación
function hideCreateForm() {
    const form = document.getElementById('orderProductForm');
    form.style.display = 'none'; // Ocultar el formulario
    form.reset(); // Limpiar los campos del formulario
}

// Manejar el evento de búsqueda
document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    const searchType = document.getElementById('search-type').value; // Obtener el tipo de búsqueda
    const filter = document.getElementById('search-input').value.trim(); // Obtener el valor ingresado

    if (!filter) {
        alert('Por favor, ingresa un término de búsqueda.');
        return;
    }

    // Llamar a la función de búsqueda con el filtro y el tipo de búsqueda
    searchOrderProducts(filter, searchType);
});

// Cargar los detalles de pedidos al cargar la página
document.addEventListener('DOMContentLoaded', loadOrderProducts);