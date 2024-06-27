import { editVehicle, getVehicles, removeVehicle, saveVehicle, selectOneVehicle, editTenant, getTenants, removeTenant, saveTenant, selectOneTenant } from "./firestore.js";
import { verificar, limpiar } from "./utilidades.js";

let vehicleId = 0;
let tenantId = 0;

document.getElementById('btnGuardar').addEventListener('click', () => {
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id);
    });

    if (document.querySelectorAll('.is-invalid').length == 0) {
        const vehiculo = {
            patente: document.getElementById('patente').value.trim(),
            marca: document.getElementById('marca').value.trim(),
            modelo: document.getElementById('modelo').value.trim(),
            año: document.getElementById('año').value.trim(),
            precio: document.getElementById('precio').value.trim(),
            disponibilidad: document.getElementById('disponibilidad').value
        };

        if (document.getElementById('btnGuardar').value == 'Guardar') {
            saveVehicle(vehiculo)
                .then(() => {
                    alert("Datos guardados correctamente.");
                    limpiar();
                })
                .catch(error => {
                    alert("Error al guardar los datos: " + error.message);
                });
        } else {
            editVehicle(vehicleId, vehiculo)
                .then(() => {
                    alert("Datos editados correctamente.");
                    limpiar();
                    vehicleId = 0;
                    document.getElementById('btnGuardar').value = 'Guardar';
                })
                .catch(error => {
                    alert("Error al editar los datos: " + error.message);
                });
        }
    }
});

window.addEventListener('DOMContentLoaded', () => {
    getVehicles((snapshot) => {
        let tabla = '';
        snapshot.forEach((doc) => {
            const item = doc.data();
            tabla += `<tr>
                <td>${item.patente}</td>
                <td>${item.marca}</td>
                <td>${item.modelo}</td>
                <td>${item.año}</td>
                <td>${item.precio}</td>
                <td>${item.disponibilidad}</td>
                <td>
                    <button class="btn btn-danger btn-sm" data-id="${doc.id}">Eliminar</button>
                    <button class="btn btn-warning btn-sm" data-id="${doc.id}">Editar</button>
                </td>
            </tr>`;
        });
        document.getElementById('contenidoVehiculos').innerHTML = tabla;
        addTableEvents('vehiculos');
    });

    getTenants((snapshot) => {
        let tabla = '';
        snapshot.forEach((doc) => {
            const item = doc.data();
            tabla += `<tr>
                <td>${item.nombre}</td>
                <td>${item.apellido}</td>
                <td>${item.rut}</td>
                <td>${item.celular}</td>
                <td>${item.correo}</td>
                <td>
                    <button class="btn btn-danger btn-sm" data-id="${doc.id}">Eliminar</button>
                    <button class="btn btn-warning btn-sm" data-id="${doc.id}">Editar</button>
                </td>
            </tr>`;
        });
        document.getElementById('contenidoArrendatarios').innerHTML = tabla;
        addTableEvents('arrendatarios');
    });
});

function addTableEvents(type) {
    const removeFunction = type === 'vehiculos' ? removeVehicle : removeTenant;
    const selectOneFunction = type === 'vehiculos' ? selectOneVehicle : selectOneTenant;

    document.querySelectorAll('.btn-danger').forEach(boton => {
        boton.addEventListener('click', (event) => {
            if (confirm("¿Está seguro que desea eliminar este registro?")) {
                removeFunction(event.target.dataset.id)
                    .then(() => {
                        alert("Registro eliminado correctamente.");
                    })
                    .catch(error => {
                        alert("Error al eliminar el registro: " + error.message);
                    });
            }
        });
    });

    document.querySelectorAll('.btn-warning').forEach(boton => {
        boton.addEventListener('click', (event) => {
            selectOneFunction(event.target.dataset.id)
                .then(doc => {
                    const data = doc.data();
                    if (type === 'vehiculos') {
                        document.getElementById('patente').value = data.patente;
                        document.getElementById('marca').value = data.marca;
                        document.getElementById('modelo').value = data.modelo;
                        document.getElementById('año').value = data.año;
                        document.getElementById('precio').value = data.precio;
                        document.getElementById('disponibilidad').value = data.disponibilidad;
                        vehicleId = doc.id;
                        document.getElementById('btnGuardar').value = 'Editar';
                    } else {
                        document.getElementById('nombreArrendatario').value = data.nombre;
                        document.getElementById('apellidoArrendatario').value = data.apellido;
                        document.getElementById('rutArrendatario').value = data.rut;
                        document.getElementById('celularArrendatario').value = data.celular;
                        document.getElementById('correoArrendatario').value = data.correo;
                        tenantId = doc.id;
                        document.getElementById('btnGuardarArrendatario').value = 'Editar';
                    }
                })
                .catch(error => {
                    alert("Error al seleccionar el registro: " + error.message);
                });
        });
    });
}

document.getElementById('btnGuardarArrendatario').addEventListener('click', () => {
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id);
    });

    if (document.querySelectorAll('.is-invalid').length == 0) {
        const arrendatario = {
            nombre: document.getElementById('nombreArrendatario').value.trim(),
            apellido: document.getElementById('apellidoArrendatario').value.trim(),
            rut: document.getElementById('rutArrendatario').value.trim(),
            celular: document.getElementById('celularArrendatario').value.trim(),
            correo: document.getElementById('correoArrendatario').value.trim()
        };

        if (document.getElementById('btnGuardarArrendatario').value == 'Guardar') {
            saveTenant(arrendatario)
                .then(() => {
                    alert("Datos guardados correctamente.");
                    limpiar();
                })
                .catch(error => {
                    alert("Error al guardar los datos: " + error.message);
                });
        } else {
            editTenant(tenantId, arrendatario)
                .then(() => {
                    alert("Datos editados correctamente.");
                    limpiar();
                    tenantId = 0;
                    document.getElementById('btnGuardarArrendatario').value = 'Guardar';
                })
                .catch(error => {
                    alert("Error al editar los datos: " + error.message);
                });
        }
    }
});
