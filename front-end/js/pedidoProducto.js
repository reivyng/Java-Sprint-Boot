// URL base de la API
const apiUrl = 'http://localhost:8080/api/v1/orderProducts';

const apiEndpoints = {
    fetchAll: '/obtener/',
    search: '/search/',
    create: '/enviar/',
    update: '/update/{id}',
    delete: '/delete/{id}', // Eliminar un cliente físicamente
    deactivate: '/{id}' // Desactivar un cliente (eliminación lógica)
};