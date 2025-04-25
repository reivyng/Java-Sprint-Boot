// URL base de la API
const apiUrl = 'http://localhost:8080/api/v1/clients';

const apiEndpoints = {
    fetchAll: '/obtener/',
    search: '/search/',
    create: '/enviar/',
    update: '/update/{id}',
    delete: '/delete/{id}', // Eliminar un cliente físicamente
    deactivate: '/{id}' // Desactivar un cliente (eliminación lógica)
};

// Función para listar todos los clientes activos
async function fetchActiveClients() {
    try {
        const response = await fetch(`${apiUrl}${apiEndpoints.fetchAll}`);
        if (!response.ok) {
            throw new Error('Error al obtener los clientes activos');
        }
        const clients = await response.json();
        renderClients(clients);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para buscar clientes por filtro (nombre o teléfono)
async function searchClients() {
    try {
        const response = await fetch(`${apiUrl}${apiEndpoints.search}{filter}`);
        if (!response.ok) {
            throw new Error('Error al buscar clientes');
        }
        const clients = await response.json();
        renderClients(clients);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para obtener un cliente por ID
async function fetchClientById(clientId) {
    try {
        const response = await fetch(`${apiUrl}/${clientId}`);
        if (!response.ok) {
            throw new Error('Error al obtener el cliente');
        }
        const client = await response.json();

        // Cargar los datos en el formulario
        document.getElementById('client-id').value = client.idClient;
        document.getElementById('name').value = client.nameClient;
        document.getElementById('phone').value = client.phoneClient;

        // Mostrar el formulario
        toggleForm();
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para registrar un nuevo cliente
async function createClient(clientData) {
    try {
        console.log('Datos enviados:', clientData); // Depuración

        const response = await fetch(`${apiUrl}${apiEndpoints.create}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clientData),
        });

        if (!response.ok) {
            // Si la respuesta no es exitosa, lanza un error con el mensaje de la API
            const errorMessage = await response.text();
            throw new Error(`Error al registrar el cliente: ${errorMessage}`);
        }

        // Si la respuesta es exitosa
        console.log('Cliente registrado exitosamente');
        alert('Cliente registrado exitosamente'); // Mensaje de éxito
        fetchActiveClients(); // Actualizar la lista de clientes
        toggleForm(); // Ocultar el formulario
    } catch (error) {
        // Este bloque solo se ejecutará si ocurre un error real
        console.error('Error:', error);
    }
}

// Función para actualizar un cliente
async function updateClient( clientData) {
    try {
        const response = await fetch(`${apiUrl}${apiEndpoints.update}{id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clientData),
        });
        if (!response.ok) {
            throw new Error('Error al actualizar el cliente');
        }
        console.log('Cliente actualizado exitosamente');
        fetchActiveClients(); // Actualizar la lista
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para eliminar un cliente físicamente (eliminación persistente)
async function deleteClient(clientId) {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este cliente de forma permanente?');
    if (!confirmDelete) {
        return; // Si el usuario cancela, no se ejecuta la eliminación
    }

    try {
        // Realizar la solicitud DELETE al endpoint correspondiente
        const response = await fetch(`${apiUrl}${apiEndpoints.delete.replace('{id}', clientId)}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            // Si la respuesta no es exitosa, lanza un error con el mensaje de la API
            const errorMessage = await response.text();
            throw new Error(`Error al eliminar el cliente: ${errorMessage}`);
        }

        console.log('Cliente eliminado físicamente');
        alert('Cliente eliminado exitosamente'); // Mensaje de éxito
        fetchActiveClients(); // Actualizar la lista de clientes
    } catch (error) {
        console.error('Error:', error);
        alert('No se pudo eliminar el cliente. Inténtalo de nuevo.');
    }
}

// Función para eliminar un cliente lógicamente (cambiar estado a inactivo)
async function deactivateClient(clientId) {
    console.log('Desactivando cliente con ID:', clientId); // Depuración
    const confirmDeactivate = confirm('¿Estás seguro de que deseas desactivar este cliente?');
    if (!confirmDeactivate) {
        return; // Si el usuario cancela, no se ejecuta la desactivación
    }

    try {
        // Asegúrate de que esta URL coincida con la ruta del backend
        const response = await fetch(`${apiUrl}${apiEndpoints.deactivate}${clientId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 0 }), // Cambiar el estado a 0 (inactivo)
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error al desactivar el cliente: ${errorMessage}`);
        }

        console.log('Cliente desactivado');
        alert('Cliente desactivado exitosamente'); // Mensaje de éxito
        fetchActiveClients(); // Actualizar la lista de clientes
    } catch (error) {
        console.error('Error:', error);
        alert('No se pudo desactivar el cliente. Inténtalo de nuevo.');
    }
}

// Función para renderizar los clientes en la tabla
function renderClients(clients) {
    const clientList = document.getElementById('client-list');
    clientList.innerHTML = ''; // Limpiar contenido previo

    clients.forEach(client => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${client.idClient}</td>
            <td>${client.nameClient}</td>
            <td>${client.phoneClient}</td>
            <td>${client.status === 1 ? 'Activo' : 'Inactivo'}</td>
            <td>
                <button class="button" onclick="fetchClientById(${client.idClient})">Editar</button>
                <button class="button danger" onclick="deleteClient(${client.idClient})">Eliminar</button>
                <button class="button warning" onclick="deactivateClient(${client.idClient})">Desactivar</button>
            </td>
        `;
        clientList.appendChild(row);
    });
}

// Manejar el envío del formulario
document.getElementById('client-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    // Obtener los datos del formulario
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    // Crear el objeto cliente
    const clientData = {
        nameClient: name,
        phoneClient: phone,
        status: true // Asegurar que el estado sea true al crear un cliente
    };

    // Llamar a la función para crear el cliente
    createClient(clientData);
});

// Llamar a la función al cargar la página
document.addEventListener('DOMContentLoaded', fetchActiveClients);