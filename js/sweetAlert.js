const { value: bienvenida } = await Swal.fire ({
    title: 'Bienvenido!',
    text: 'Para continuar, da click en el botón',
    confirmButtonText: 'Continuar',
    allowOutsideClick: false,
    allowEnterKey: true,
})

const { value: user } = await Swal.fire({
    title: 'Ingresa un usuario',
    input: 'password',
    inputLabel: 'Usuario',
    inputPlaceholder: 'Usuario',
    allowOutsideClick: false,
    allowEnterKey: true,
    icon: 'info', 
    inputAttributes: {
      maxlength: 10,
      autocapitalize: 'off',
      autocorrect: 'off'
    },
    inputValidator: (value) => {
        if (!value) {
            return 'Por favor, ingresa un usuario válido.'
        }
    },
    confirmButtonText: 'Siguiente'
})

const { value: password } = await Swal.fire({
    title: 'Ingresa una contraseña',
    input: 'password',
    inputLabel: 'Contraseña',
    inputPlaceholder: 'Usuario',
    allowOutsideClick: false,
    allowEnterKey: true,
    icon: 'info',
    inputAttributes: {
      maxlength: 15,
      autocapitalize: 'off',
      autocorrect: 'off'
    },
    inputValidator: (value) => {
        if (!value) {
            return 'Por favor, ingresa una contraseña válida.'
        }
    },
    confirmButtonText: 'Aceptar'
})

const inputOptions = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        'Frío': 'Frío',
        'Caliente': 'Caliente',
        'Otro': 'Otro'
      })
    }, 1000)
  })
  
  const { value: cafes } = await Swal.fire({
    title: 'Selecciona tu tipo de café favorito',
    input: 'radio',
    icon: 'question',
    allowOutsideClick: false,
    allowEnterKey: true,
    confirmButtonText: 'Aceptar',
    inputOptions: inputOptions,
    inputValidator: (value) => {
      if (!value) {
        return 'Por favor, selecciona una opción.'
      }
    }
  })

if (user && password && cafes){
    Swal.fire({
        icon: 'success',
        title: 'Listo!',
        confirmButtonText: 'Aceptar'
    })
};

function exito() {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'success',
    title: 'Signed in successfully'
  })
}