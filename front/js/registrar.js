window.onload = init;

function init() {
    document.getElementById('employee-form').addEventListener('submit', registrar);
}

function registrar(event) {
    event.preventDefault();
    var empleado = leerFormulario();

    if (!formularioCompleto(empleado)) {
        return alert('Completa todos los campos');
    }

    axios.post(url + '/empleados', empleado, headers)
        .then(function (res) {
            alert(res.data.message);
            window.location.href = 'empleados.html';
        })
        .catch(mostrarError);
}
