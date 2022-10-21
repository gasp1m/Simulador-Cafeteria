const loginButton = document.getElementById('btn-login');

loginButton.addEventListener('click', () => {
    Swal.fire({
        title: 'Iniciar sesión',
        html: `<input type="text" id="user" class="swal2-input" placeholder="Usuario">
        <input type="password" id="password" class="swal2-input" placeholder="Contraseña">`,
        confirmButtonText: 'Sign in',
        focusConfirm: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        preConfirm: () => {
          const user = Swal.getPopup().querySelector('#user').value
          const password = Swal.getPopup().querySelector('#password').value
          if (!user || !password) {
            Swal.showValidationMessage(`Por favor, ingresa datos válidos.`)
          }
          return { user: user, password: password }
        }
      }).then( () => {
        Swal.fire(
            'Bienvenido!',
            'Iniciaste sesión con éxito.',
            'success')
      })
})