export function verificar(id) {
    const elemento = document.getElementById(id);
    const valor = elemento.value.trim();
    let esValido = true;
    let mensaje = "";

    switch(id) {
        case 'patente':
            if (valor === "") {
                esValido = false;
                mensaje = "La patente es requerida.";
            }
            break;
        case 'marca':
            if (valor === "") {
                esValido = false;
                mensaje = "La marca es requerida.";
            }
            break;
        case 'modelo':
            if (valor === "") {
                esValido = false;
                mensaje = "El modelo es requerido.";
            }
            break;
        case 'año':
            if (valor === "" || isNaN(valor) || valor < 2000 || valor > 2024) {
                esValido = false;
                mensaje = "El año debe estar entre 2000 y 2024.";
            }
            break;
        case 'precio':
            if (valor === "" || isNaN(valor) || valor < 20000 || valor > 50000) {
                esValido = false;
                mensaje = "El precio debe estar entre 20000 y 50000.";
            }
            break;
        case 'disponibilidad':
            if (valor === "") {
                esValido = false;
                mensaje = "La disponibilidad es requerida.";
            }
            break;
        default:
            break;
    }

    if (esValido) {
        elemento.classList.remove('is-invalid');
        elemento.classList.add('is-valid');
        document.getElementById(`e-${id}`).innerHTML = "";
    } else {
        elemento.classList.remove('is-valid');
        elemento.classList.add('is-invalid');
        document.getElementById(`e-${id}`).innerHTML = `<div class="invalid-feedback">${mensaje}</div>`;
    }
}

export function limpiar() {
    document.querySelectorAll('.form-control').forEach(item => {
        item.value = '';
        item.classList.remove('is-valid', 'is-invalid');
    });
}