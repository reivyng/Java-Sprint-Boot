const apiUrlSellers = 'http://localhost:8080/api/v1/sellers';

const apiEndpointsSellers = {
    fetchAll: '/obtener/',
    create: '/enviar/',
    filter: '/search/{filter}',
    getById: '/{id}',
    update: '/update/{id}',
    delete: '/delete/{id}', // Eliminación física
    deactivate: '/{id}' // Eliminación lógica
};

// Función para listar todos los vendedores
async function fetchSellers() {
    try {
        const response = await fetch(`${apiUrlSellers}${apiEndpointsSellers.fetchAll}`);
        if (!response.ok) {
            throw new Error('Error al obtener los vendedores');
        }
        const sellers = await response.json();
        renderSellers(sellers);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Validar los campos del formulario antes de enviar
function validateForm(sellerData) {
    if (!sellerData.nameSeller || sellerData.nameSeller.trim() === '') {
        alert('El nombre del vendedor es obligatorio.');
        return false;
    }
    return true;
}

// Función para registrar un nuevo vendedor
async function createSeller(sellerData) {
    try {
        if (!validateForm(sellerData)) {
            return;
        }

        sellerData.status = 1; // Activo por defecto

        const response = await fetch(`${apiUrlSellers}${apiEndpointsSellers.create}`, {
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
        if (!validateForm(sellerData)) {
            return;
        }

        sellerData.status = 1; // Activo por defecto al editar

        const endpoint = apiEndpointsSellers.update.replace('{id}', sellerData.idSeller);

        const response = await fetch(`${apiUrlSellers}${endpoint}`, {
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
        const endpoint = apiEndpointsSellers.delete.replace('{id}', sellerId);

        const response = await fetch(`${apiUrlSellers}${endpoint}`, {
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
        const endpoint = apiEndpointsSellers.deactivate.replace('{id}', sellerId);

        const response = await fetch(`${apiUrlSellers}${endpoint}`, {
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

// Función para buscar vendedores por filtro (ID o Nombre)
async function searchSellers(filter, searchType) {
    try {
        let endpoint;

        if (searchType === 'id') {
            // Buscar por ID
            endpoint = apiEndpointsSellers.getById.replace('{id}', filter);
        } else if (searchType === 'name') {
            // Buscar por Nombre
            endpoint = apiEndpointsSellers.filter.replace('{filter}', encodeURIComponent(filter));
        } else {
            throw new Error('Tipo de búsqueda no válido');
        }

        const response = await fetch(`${apiUrlSellers}${endpoint}`);
        if (!response.ok) {
            throw new Error('Error al buscar vendedores');
        }

        const sellers = searchType === 'id' ? [await response.json()] : await response.json();
        renderSellers(sellers); // Renderizar los vendedores encontrados
    } catch (error) {
        console.error('Error:', error);
        alert('No se pudo realizar la búsqueda. Inténtalo de nuevo.');
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
        const response = await fetch(`${apiUrlSellers}/${sellerId}`);
        if (!response.ok) {
            throw new Error('Error al obtener el vendedor');
        }
        const seller = await response.json();

        // Validar que los datos del vendedor sean correctos
        if (!seller || !seller.idSeller || !seller.nameSeller) {
            throw new Error('Datos del vendedor inválidos');
        }

        // Cargar los datos en el formulario
        document.getElementById('seller-id').value = seller.idSeller;
        document.getElementById('name').value = seller.nameSeller;

        // Mostrar el formulario
        toggleForm();
    } catch (error) {
        console.error('Error:', error);
        alert('No se pudo cargar los datos del vendedor. Por favor, inténtalo de nuevo.');
    }
}

// Mostrar/ocultar el formulario
function toggleForm() {
    const modal = document.getElementById('add-seller-modal');
    modal.style.display = modal.style.display === 'none' || modal.style.display === '' ? 'flex' : 'none';
}

// Asociar el botón "Agregar Vendedor" con el formulario
document.getElementById('add-seller').addEventListener('click', toggleForm);

// Cerrar el modal al hacer clic fuera de él
window.onclick = function (event) {
    const modal = document.getElementById('add-seller-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Manejar el envío del formulario con validaciones
document.getElementById('seller-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const sellerId = document.getElementById('seller-id').value;
    const name = document.getElementById('name').value.trim();

    const sellerData = {
        nameSeller: name,
    };

    // Validar los datos del formulario
    if (!validateForm(sellerData)) {
        return;
    }

    if (sellerId) {
        sellerData.idSeller = sellerId;
        updateSeller(sellerData);
    } else {
        createSeller(sellerData);
    }
});

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
    searchSellers(filter, searchType);
});

// Cargar la lista de vendedores al cargar la página
document.addEventListener('DOMContentLoaded', fetchSellers);