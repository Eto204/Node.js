// Código compartido por las páginas que requieren sesión
// (empleados.html, registrar.html, editar.html)

var url = window.location.protocol === 'file:' ? 'http://localhost:3000' : '';

var token = localStorage.getItem('token');

// Sin token no se puede entrar
if (!token) {
    window.location.href = 'index.html';
}

// Encabezado con el token para todas las peticiones
var headers = {
    headers: { 'Authorization': 'Bearer ' + token }
};

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_mail');
    window.location.href = 'index.html';
}

// Maneja los errores de axios
function mostrarError(err) {
    if (err.response && err.response.status == 401) {
        alert('Tu sesión expiró, vuelve a iniciar sesión');
        return logout();
    }
    alert(err.response ? err.response.data.message : 'No hay conexión con el servidor');
}

// Toma los datos del formulario de empleado
function leerFormulario() {
    return {
        emp_nombre: document.getElementById('input-nombre').value.trim(),
        emp_apellidos: document.getElementById('input-apellidos').value.trim(),
        emp_telefono: document.getElementById('input-telefono').value.trim(),
        emp_correo: document.getElementById('input-correo').value.trim(),
        emp_direccion: document.getElementById('input-direccion').value.trim()
    };
}

function formularioCompleto(empleado) {
    return empleado.emp_nombre && empleado.emp_apellidos && empleado.emp_telefono &&
        empleado.emp_correo && empleado.emp_direccion;
}

// Encabezado: correo del usuario y botón de cerrar sesión
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('user-mail').textContent = localStorage.getItem('user_mail') || '';
    document.getElementById('btn-logout').addEventListener('click', logout);
});
