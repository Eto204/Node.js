window.onload = init;

function init() {
    document.getElementById('search-form').addEventListener('submit', buscar);
    cargarEmpleados();
}

function cargarEmpleados() {
    axios.get(url + '/empleados', headers)
        .then(function (res) {
            mostrarEmpleados(res.data.data);
        })
        .catch(mostrarError);
}

function buscar(event) {
    event.preventDefault();
    var nombre = document.getElementById('input-search').value.trim();

    if (!nombre) {
        return cargarEmpleados();
    }

    axios.get(url + '/empleados/buscar/' + encodeURIComponent(nombre), headers)
        .then(function (res) {
            mostrarEmpleados(res.data.data);
        })
        .catch(function (err) {
            if (err.response && err.response.status == 404) {
                return mostrarEmpleados([]);
            }
            mostrarError(err);
        });
}

function eliminar(empleado) {
    var nombre = empleado.emp_nombre + ' ' + empleado.emp_apellidos;
    if (!confirm('¿Seguro que deseas eliminar a ' + nombre + '?')) {
        return;
    }

    axios.delete(url + '/empleados/' + empleado.emp_id, headers)
        .then(function (res) {
            alert(res.data.message);
            cargarEmpleados();
        })
        .catch(mostrarError);
}

function mostrarEmpleados(lista) {
    var body = document.getElementById('employees-body');
    body.innerHTML = '';
    document.getElementById('total').textContent = '(' + lista.length + ')';

    if (lista.length == 0) {
        body.innerHTML = '<tr><td colspan="6" class="text-center text-muted">No se encontraron empleados</td></tr>';
        return;
    }

    lista.forEach(function (empleado) {
        var fila = document.createElement('tr');

        // textContent evita que se ejecute HTML guardado en la base de datos
        [empleado.emp_nombre, empleado.emp_apellidos, empleado.emp_telefono,
            empleado.emp_correo, empleado.emp_direccion].forEach(function (valor) {
            var celda = document.createElement('td');
            celda.textContent = valor;
            fila.appendChild(celda);
        });

        var acciones = document.createElement('td');
        acciones.className = 'text-nowrap';

        var btnEditar = document.createElement('a');
        btnEditar.className = 'btn btn-sm btn-primary mr-1';
        btnEditar.textContent = 'Editar';
        btnEditar.href = 'editar.html?id=' + empleado.emp_id;

        var btnEliminar = document.createElement('button');
        btnEliminar.className = 'btn btn-sm btn-danger';
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.addEventListener('click', function () {
            eliminar(empleado);
        });

        acciones.appendChild(btnEditar);
        acciones.appendChild(btnEliminar);
        fila.appendChild(acciones);
        body.appendChild(fila);
    });
}
