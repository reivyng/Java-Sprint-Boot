const apiUrl = 'http://localhost:8080/api/v1/sellers';

const apiEndpoints = {
    fetchAll: '/obtener/',
    create: '/enviar/',
    update: '/update/{id}',
    delete: '/delete/{id}', // Eliminación física
    deactivate: '/{id}' // Eliminación lógica
};

// Función para listar todos los vendedores
async function fetchSellers() {
    try {
        const response = await fetch(`${apiUrl}${apiEndpoints.fetchAll}`);
        if (!response.ok) {
            throw new Error('Error al obtener los vendedores');
        }
        const sellers = await response.json();
        renderSellers(sellers);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para registrar un nuevo vendedor
async function createSeller(sellerData) {
    try {
        // Asegurarse de que el estado sea activo por defecto
        sellerData.status = 1; // Activo por defecto

        console.log('Llamando a createSeller con datos:', sellerData); // Depuración
        const response = await fetch(`${apiUrl}${apiEndpoints.create}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sellerData), // Enviar los datos del vendedor
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error al registrar el vendedor: ${errorMessage}`);
        }

        alert('Vendedor registrado exitosamente');
        await fetchSellers(); // Actualizar la lista de vendedores
        toggleForm(); // Ocultar el formulario
    } catch (error) {
        console.error('Error:', error);
        alert('No se pudo registrar el vendedor. Por favor, inténtalo de nuevo.');
    }
}

// Función para actualizar un vendedor
async function updateSeller(sellerData) {
    try {
        // Asegurarse de que el estado sea activo por defecto al editar
        sellerData.status = 1; // Activo por defecto

        const endpoint = apiEndpoints.update.replace('{id}', sellerData.idSeller);

        const response = await fetch(`${apiUrl}${endpoint}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sellerData),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error al actualizar el vendedor: ${errorMessage}`);
        }

        alert('Vendedor actualizado exitosamente');
        fetchSellers(); // Actualizar la lista de vendedores
        toggleForm(); // Ocultar el formulario
    } catch (error) {
        console.error('Error:', error);
        alert('No se pudo actualizar el vendedor.');
    }
}

// Función para eliminar un vendedor físicamente
async function deleteSeller(sellerId) {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este vendedor de forma permanente?');
    if (!confirmDelete) {
        return;
    }

    try {
        const endpoint = apiEndpoints.delete.replace('{id}', sellerId);

        const response = await fetch(`${apiUrl}${endpoint}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error al eliminar el vendedor: ${errorMessage}`);
        }

        alert('Vendedor eliminado exitosamente');
        fetchSellers();
    } catch (error) {
        console.error('Error:', error);
        alert('No se pudo eliminar el vendedor.');
    }
}

// Función para desactivar un vendedor (eliminación lógica)
async function deactivateSeller(sellerId) {
    const confirmDeactivate = confirm('¿Estás seguro de que deseas desactivar este vendedor?');
    if (!confirmDeactivate) {
        return;
    }

    try {
        const endpoint = apiEndpoints.deactivate.replace('{id}', sellerId);

        const response = await fetch(`${apiUrl}${endpoint}`, {
           method: 'DELETE',
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error al desactivar el vendedor: ${errorMessage}`);
        }

        alert('Vendedor desactivado exitosamente');
        fetchSellers();
    } catch (error) {
        console.error('Error:', error);
        alert('No se pudo desactivar el vendedor.');
    }
}

// Función para renderizar los vendedores en la tabla
function renderSellers(sellers) {
    const sellerList = document.getElementById('seller-list');
    sellerList.innerHTML = ''; // Limpiar contenido previo

    sellers.forEach(seller => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${seller.idSeller}</td>
            <td>${seller.nameSeller}</td>
            <td>${seller.status === 1 ? 'Activo' : 'Inactivo'}</td>
            <td>
                <button class="button" onclick="fetchSellerById(${seller.idSeller})">Editar</button>
                <button class="button danger" onclick="deleteSeller(${seller.idSeller})">Eliminar</button>
                <button class="button warning" onclick="deactivateSeller(${seller.idSeller})">Desactivar</button>
            </td>
        `;
        sellerList.appendChild(row);
    });
}

// Función para obtener un vendedor por ID y cargarlo en el formulario
async function fetchSellerById(sellerId) {
    try {
        const response = await fetch(`${apiUrl}/${sellerId}`);
        if (!response.ok) {
            throw new Error('Error al obtener el vendedor');
        }
        const seller = await response.json();

        // Cargar los datos en el formulario
        document.getElementById('seller-id').value = seller.idSeller;
        document.getElementById('name').value = seller.nameSeller;

        // Mostrar el formulario
        toggleForm();
    } catch (error) {
        console.error('Error:', error);
    }
}

// Mostrar/ocultar el formulario
function toggleForm() {
    const modal = document.getElementById('add-seller-modal');
    modal.style.display = modal.style.display === 'none' || modal.style.display === '' ? 'flex' : 'none';
}

// Cerrar el modal al hacer clic fuera de él
window.onclick = function (event) {
    const modal = document.getElementById('add-seller-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Manejar el envío del formulario
document.getElementById('seller-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const sellerId = document.getElementById('seller-id').value;
    const name = document.getElementById('name').value;

    const sellerData = {
        nameSeller: name,
    };

    if (sellerId) {
        sellerData.idSeller = sellerId;
        updateSeller(sellerData);
    } else {
        createSeller(sellerData);
    }
});

// Cargar la lista de vendedores al cargar la página
document.addEventListener('DOMContentLoaded', fetchSellers);