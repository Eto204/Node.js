window.onload = init;

// El id viene en la URL: editar.html?id=3
var id = new URLSearchParams(window.location.search).get('id');

function init() {
    if (!id) {
        return window.location.href = 'empleados.html';
    }

    document.getElementById('employee-form').addEventListener('submit', guardar);
    cargarEmpleado();
}

function cargarEmpleado() {
    axios.get(url + '/empleados/' + id, headers)
        .then(function (res) {
            var empleado = res.data.data[0];
            document.getElementById('input-nombre').value = empleado.emp_nombre;
            document.getElementById('input-apellidos').value = empleado.emp_apellidos;
            document.getElementById('input-telefono').value = empleado.emp_telefono;
            document.getElementById('input-correo').value = empleado.emp_correo;
            document.getElementById('input-direccion').value = empleado.emp_direccion;
        })
        .catch(function (err) {
            mostrarError(err);
            window.location.href = 'empleados.html';
        });
}

function guardar(event) {
    event.preventDefault();
    var empleado = leerFormulario();

    if (!formularioCompleto(empleado)) {
        return alert('Completa todos los campos');
    }

    axios.put(url + '/empleados/' + id, empleado, headers)
        .then(function (res) {
            alert(res.data.message);
            window.location.href = 'empleados.html';
        })
        .catch(mostrarError);
}
