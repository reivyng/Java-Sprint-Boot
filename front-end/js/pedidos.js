// URL base de la API
const apiUrl = 'http://localhost:8080/api/v1/orders';

const apiEndpoints = {
    fetchAll: '/obtener/',
    search: '/search/',
    create: '/enviar/',
    update: '/update/{id}',
    delete: '/delete/{id}', // Eliminar un cliente físicamente
    deactivate: '/{id}' // Desactivar un cliente (eliminación lógica)
};

// Obtener todos los clientes
async function fetchAllClients() {
    try {
        const response = await fetch(apiUrl + apiEndpoints.fetchAll);
        if (!response.ok) throw new Error('Error al obtener los clientes');
        const data = await response.json();
        console.log('Respuesta de la API:', data); // Inspecciona la respuesta aquí
        return data;
    } catch (error) {
        console.error('Error al obtener los clientes:', error);
    }
}

// Buscar un cliente por criterio
async function searchClient(criteria) {
    try {
        const response = await fetch(apiUrl + apiEndpoints.search + criteria);
        if (!response.ok) throw new Error('Error al buscar el cliente');
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}

// Crear un nuevo cliente
async function createClient(clientData) {
    try {
        const response = await fetch(apiUrl + apiEndpoints.create, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clientData)
        });
        if (!response.ok) throw new Error('Error al crear el cliente');
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}

// Crear un nuevo pedido
async function createOrder(orderData) {
    try {
        console.log('Datos enviados al backend:', orderData); // Inspecciona los datos enviados
        const response = await fetch(apiUrl + apiEndpoints.create, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        if (!response.ok) throw new Error('Error al crear el pedido');
        const data = await response.json();
        console.log('Pedido creado:', data);
        return data;
    } catch (error) {
        console.error('Error al crear el pedido:', error);
    }
}

// Actualizar un cliente existente
async function updateClient(id, clientData) {
    try {
        const endpoint = apiEndpoints.update.replace('{id}', id);
        const response = await fetch(apiUrl + endpoint, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clientData)
        });
        if (!response.ok) throw new Error('Error al actualizar el cliente');
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}

// Método para actualizar un pedido
async function updateOrder(id, orderData) {
    try {
        const endpoint = apiEndpoints.update.replace('{id}', id);
        const response = await fetch(apiUrl + endpoint, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        if (!response.ok) throw new Error('Error al actualizar el pedido');
        const data = await response.json();
        console.log('Pedido actualizado:', data);
        return data;
    } catch (error) {
        console.error('Error al actualizar el pedido:', error);
    }
}

// Eliminar un cliente físicamente
async function deleteClient(id) {
    try {
        const endpoint = apiEndpoints.delete.replace('{id}', id);
        const response = await fetch(apiUrl + endpoint, { method: 'DELETE' });
        if (!response.ok) throw new Error('Error al eliminar el cliente');
        console.log('Cliente eliminado correctamente');
    } catch (error) {
        console.error(error);
    }
}

// Desactivar un pedido (eliminación lógica)
async function deactivateClient(id) {
    try {
        const endpoint = apiEndpoints.deactivate.replace('{id}', id);
        console.log('Endpoint para desactivar:', apiUrl + endpoint); // Verifica la URL
        const response = await fetch(apiUrl + endpoint, { method: 'DELETE' });
        if (!response.ok) throw new Error('Error al desactivar el pedido');
        console.log('Pedido desactivado correctamente');
    } catch (error) {
        console.error('Error al desactivar el pedido:', error);
    }
}

// Obtener todos los pedidos y renderizarlos en la tabla
async function loadPedidos() {
    const pedidosTableBody = document.getElementById('pedidosTableBody');
    if (!pedidosTableBody) {
        console.error('Elemento pedidosTableBody no encontrado en el DOM.');
        return;
    }

    pedidosTableBody.innerHTML = ''; // Limpiar la tabla

    try {
        const pedidos = await fetchAllClients(); // Llama a la función de la API

        if (!Array.isArray(pedidos)) {
            throw new Error('La respuesta de la API no es un array.');
        }

        pedidos.forEach(pedido => {
            const clientName = pedido.client?.nameClient || 'N/A';
            const sellerName = pedido.seller?.nameSeller || 'N/A';

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${pedido.idOrders || 'N/A'}</td>
                <td>${pedido.dateOrder || 'N/A'}</td>
                <td>${clientName}</td>
                <td>${sellerName}</td>
                <td>
                    <button class="button" data-id="${pedido.idOrders}" onclick="handleEditPedido(event)">Editar</button>
                    <button class="button danger" data-id="${pedido.idOrders}" onclick="handleDeletePedido(event)">Eliminar</button>
                    <button class="button warning" data-id="${pedido.idOrders}" onclick="handleDeactivatePedido(event)">Desactivar</button>
                </td>
            `;
            pedidosTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error al cargar los pedidos:', error.message);
    }
}

// Mostrar el modal para agregar o editar un pedido
function showPedidoModal(action, pedido = null) {
    const modal = document.getElementById('pedidoModal');
    const modalTitle = document.getElementById('modalTitle');
    const pedidoIdInput = document.getElementById('pedidoId');
    const clientInput = document.getElementById('client');
    const sellerInput = document.getElementById('seller');
    const dateOrderInput = document.getElementById('dateOrder');

    // Configurar el título y los valores según la acción
    if (action === 'create') {
        modalTitle.textContent = 'Agregar Nuevo Pedido';
        pedidoIdInput.value = '';
        clientInput.value = '';
        sellerInput.value = '';
        dateOrderInput.value = '';
    } else if (action === 'edit' && pedido) {
        modalTitle.textContent = 'Editar Pedido';
        pedidoIdInput.value = pedido.idOrders;
        clientInput.value = pedido.client.idClient;
        sellerInput.value = pedido.seller.idSeller;
        dateOrderInput.value = pedido.dateOrder;
    }

    // Mostrar el modal
    modal.style.display = 'block';
}

// Ocultar el modal
document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('pedidoModal').style.display = 'none';
});

document.getElementById('cancelPedidoButton').addEventListener('click', () => {
    document.getElementById('pedidoModal').style.display = 'none';
});

// Manejar el envío del formulario para crear o editar un pedido
document.getElementById('pedidoForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    // Capturar los datos del formulario
    const pedidoId = document.getElementById('pedidoId').value;
    const clientId = document.getElementById('client').value;
    const sellerId = document.getElementById('seller').value;
    const dateOrder = document.getElementById('dateOrder').value;

    // Crear el objeto del pedido
    const pedidoData = {
        client: { idClient: clientId },
        seller: { idSeller: sellerId },
        dateOrder: dateOrder,
        status: 1 // Estado inicial del pedido
    };

    try {
        if (pedidoId) {
            // Si hay un ID, actualizar el pedido
            await updateOrder(pedidoId, pedidoData);
        } else {
            // Si no hay ID, crear un nuevo pedido
            await createOrder(pedidoData);
        }

        document.getElementById('pedidoModal').style.display = 'none'; // Cerrar el modal
        loadPedidos(); // Recargar la tabla
    } catch (error) {
        console.error('Error al guardar el pedido:', error);
    }
});

// Mostrar el modal para agregar un pedido
document.getElementById('addPedidoButton').addEventListener('click', () => {
    showPedidoModal('create');
});

// Mostrar el modal para editar un pedido
async function handleEditPedido(event) {
    const id = event.target.getAttribute('data-id'); // Obtener el ID del pedido
    const pedidos = await fetchAllClients(); // Obtener todos los pedidos para buscar el seleccionado
    const pedido = pedidos.find(p => p.idOrders == id); // Buscar el pedido por ID

    if (!pedido) {
        console.error('Pedido no encontrado');
        return;
    }

    showPedidoModal('edit', pedido); // Mostrar el modal con los datos del pedido
}

// Eliminar un pedido con confirmación
async function handleDeletePedido(event) {
    const id = event.target.getAttribute('data-id');

    // Preguntar al usuario si está seguro de eliminar el pedido
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este pedido?');
    if (!confirmDelete) {
        return; // Salir si el usuario cancela
    }

    try {
        await deleteClient(id); // Llamar al método para eliminar el pedido
        loadPedidos(); // Recargar la tabla
    } catch (error) {
        console.error('Error al eliminar el pedido:', error);
    }
}

// Manejar la desactivación de un pedido
async function handleDeactivatePedido(event) {
    const id = event.target.getAttribute('data-id');
    console.log('ID del pedido a desactivar:', id); // Verifica el ID

    const confirmDeactivate = confirm('¿Estás seguro de que deseas desactivar este pedido?');
    if (!confirmDeactivate) {
        return; // Salir si el usuario cancela
    }

    try {
        await deactivateClient(id); // Llamar al método para desactivar el pedido
        loadPedidos(); // Recargar la tabla
    } catch (error) {
        console.error('Error al desactivar el pedido:', error);
    }
}

// Alternar la visibilidad del modal
function togglePedidoModal() {
    const modal = document.getElementById('pedidoModal');
    modal.style.display = modal.style.display === 'none' || modal.style.display === '' ? 'flex' : 'none';
}

// Cerrar el modal al hacer clic fuera de él
window.onclick = function (event) {
    const modal = document.getElementById('pedidoModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Asignar eventos a los botones al cargar la página
window.onload = () => {
    document.getElementById('loadPedidosButton').addEventListener('click', loadPedidos);
    document.getElementById('addPedidoButton').addEventListener('click', addPedido);
    loadPedidos(); // Cargar los pedidos automáticamente
};
