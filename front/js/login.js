window.onload = init;

// Si abres el HTML con doble clic (file://) usa el servidor local
var url = window.location.protocol === 'file:' ? 'http://localhost:3000' : '';

function init() {
    // Si ya hay sesión, entra directo
    if (localStorage.getItem('token')) {
        window.location.href = 'empleados.html';
    }

    document.getElementById('login-form').addEventListener('submit', login);
}

function login(event) {
    event.preventDefault();

    var mail = document.getElementById('input-mail').value.trim();
    var pass = document.getElementById('input-password').value;

    if (!mail || !pass) {
        return alert('Ingresa tu correo y contraseña');
    }

    axios({
        method: 'post',
        url: url + '/user/login',
        data: {
            user_mail: mail,
            user_password: pass
        }
    }).then(function (res) {
        // Guarda el token para usarlo en /empleados
        localStorage.setItem('token', res.data.message);
        localStorage.setItem('user_mail', mail);
        window.location.href = 'empleados.html';
    }).catch(function (err) {
        alert(err.response ? err.response.data.message : 'No hay conexión con el servidor');
    });
}
