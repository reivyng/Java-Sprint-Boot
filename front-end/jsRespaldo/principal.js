// Detección de herramientas de desarrollo abiertas
(function() {
    const threshold = 160; // Umbral para detectar cambios en las dimensiones de la ventana
    let devtoolsOpen = false;

    setInterval(() => {
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;

        if (widthThreshold || heightThreshold) {
            if (!devtoolsOpen) {
                devtoolsOpen = true;
                alert('Herramientas de desarrollo detectadas. El acceso está restringido.');
                window.location.href = 'about:blank'; // Redirigir a una página en blanco
            }
        } else {
            devtoolsOpen = false;
        }
    }, 500);
})();

// Mensaje de advertencia en la consola
console.log('%c¡Advertencia!', 'color: red; font-size: 20px;');
console.log('No inspecciones esta consola. Podrías comprometer la seguridad.');

// Deshabilitar combinaciones de teclas comunes para abrir herramientas de desarrollo
document.addEventListener('keydown', (e) => {
    if (
        e.key === 'F12' || // F12
        (e.ctrlKey && e.shiftKey && e.key === 'I') || // Ctrl+Shift+I
        (e.ctrlKey && e.key === 'U') || // Ctrl+U
        (e.ctrlKey && e.shiftKey && e.key === 'J') // Ctrl+Shift+J
    ) {
        e.preventDefault();
    }
});

// Deshabilitar clic derecho
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});