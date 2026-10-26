let votos = { norte: 0, sur: 0, centro: 0 };
let paises = ["México", "Canadá", "España", "Japón", "Brasil", "Alemania", "Francia", "Italia", "Argentina", "Chile"];

document.addEventListener("DOMContentLoaded", () => {
    actualizarVistaArreglo();
});

function toggleLoginForm() {
    const loginForm = document.getElementById("loginForm");
    loginForm.classList.toggle("hidden");
}

function emitirVoto() {
    const seccion = document.getElementById("seccionCiudad").value;
    
    switch (seccion) {
        case "norte":
            votos.norte++;
            break;
        case "sur":
            votos.sur++;
            break;
        case "centro":
            votos.centro++;
            break;
        default:
            console.log("Sección no válida");
            return;
    }

    const res = document.getElementById("resVotacion");
    res.innerHTML = `Voto registrado para la sección <strong>${seccion.toUpperCase()}</strong>.<br>
                     Conteo actual: Norte: ${votos.norte} | Sur: ${votos.sur} | Centro: ${votos.centro}`;
}

function sumarPositivos() {
    let suma = 0;
    let num = 0;

    while (true) {
        let entrada = prompt("Ingresa un número positivo (Ingresa 0 o un negativo para terminar):");
        num = parseFloat(entrada);

        if (isNaN(num) || num <= 0) {
            break;
        }
        suma += num;
    }

    document.getElementById("resSuma").innerHTML = `La suma total de los números positivos ingresados es: <strong>${suma}</strong>`;
}

function ordenarNumeros() {
    let n1 = parseFloat(document.getElementById("num1").value);
    let n2 = parseFloat(document.getElementById("num2").value);
    let n3 = parseFloat(document.getElementById("num3").value);

    if (isNaN(n1) || isNaN(n2) || isNaN(n3)) {
        document.getElementById("resOrden").innerText = "Por favor, ingresa los 3 números.";
        return;
    }

    let arreglo = [n1, n2, n3];
    arreglo.sort((a, b) => b - a);

    document.getElementById("resOrden").innerHTML = `Ordenados de mayor a menor: <strong>${arreglo.join(" > ")}</strong>`;
}

function calcularNeto() {
    let bruto = parseFloat(document.getElementById("importeBruto").value);

    if (isNaN(bruto) || bruto < 0) {
        document.getElementById("resNeto").innerText = "Ingresa un importe bruto válido.";
        return;
    }

    let impuesto = bruto > 15000 ? 0.16 : 0.10;
    let montoImpuesto = bruto * impuesto;
    let neto = bruto - montoImpuesto;

    document.getElementById("resNeto").innerHTML = `
        Importe Bruto: $${bruto.toFixed(2)} €<br>
        Impuesto aplicado (${impuesto * 100}%): $${montoImpuesto.toFixed(2)} €<br>
        <strong>Importe Neto: $${neto.toFixed(2)} €</strong>
    `;
}

function calcularSueldo() {
    let antiguedad = parseFloat(document.getElementById("antiguedad").value);
    const sueldoBase = 40000;
    let aumentoPct = 0;

    if (isNaN(antiguedad) || antiguedad < 0) {
        document.getElementById("resSueldo").innerText = "Ingresa un número de años válido.";
        return;
    }

    if (antiguedad > 10) {
        aumentoPct = 0.10;
    } else if (antiguedad > 5) {
        aumentoPct = 0.07;
    } else if (antiguedad > 3) {
        aumentoPct = 0.05;
    } else {
        aumentoPct = 0.03;
    }

    let aumentoMonto = sueldoBase * aumentoPct;
    let sueldoFinal = sueldoBase + aumentoMonto;

    document.getElementById("resSueldo").innerHTML = `
        Sueldo Base: $${sueldoBase} €<br>
        Aumento por ${antiguedad} años (${aumentoPct * 100}%): +$${aumentoMonto} €<br>
        <strong>Sueldo Total Correspondiente: $${sueldoFinal} €</strong>
    `;
}

function sumarImpares() {
    let suma = 0;
    for (let i = 1; i <= 100; i++) {
        if (i % 2 !== 0) {
            suma += i;
        }
    }
    document.getElementById("resImpares").innerHTML = `La suma de todos los números impares del 1 al 100 es: <strong>${suma}</strong>`;
}

function generarAsteriscos() {
    let cant = parseInt(document.getElementById("cantAsteriscos").value);
    if (isNaN(cant) || cant <= 0) {
        document.getElementById("resAsteriscos").innerText = "Ingresa una cantidad válida.";
        return;
    }

    let asteriscos = "";
    for (let i = 0; i < cant; i++) {
        asteriscos += "* ";
    }
    document.getElementById("resAsteriscos").innerText = asteriscos;
}

function generarTablas() {
    let html = "";
    for (let i = 1; i <= 10; i++) {
        html += `<div style="background:#fff; padding:5px; border:1px solid #ccc;"><strong>Tabla del ${i}</strong><br>`;
        for (let j = 1; j <= 10; j++) {
            html += `${i} x ${j} = ${i * j}<br>`;
        }
        html += `</div>`;
    }
    document.getElementById("resTablas").innerHTML = html;
}

function actualizarVistaArreglo() {
    document.getElementById("arregloBase").innerText = JSON.stringify(paises);
    document.getElementById("longitudArreglo").innerText = paises.length;
}

function mostrarRespuestaArreglo(mensaje) {
    document.getElementById("resArreglo").innerHTML = mensaje;
    actualizarVistaArreglo();
}

function ejecutarPop() {
    let eliminado = paises.pop();
    mostrarRespuestaArreglo(`<strong>pop():</strong> Se eliminó el último elemento: <em>"${eliminado}"</em>`);
}

function ejecutarShift() {
    let eliminado = paises.shift();
    mostrarRespuestaArreglo(`<strong>shift():</strong> Se eliminó el primer elemento: <em>"${eliminado}"</em>`);
}

function ejecutarPush() {
    let nuevo = prompt("Ingresa el nombre de un nuevo país:");
    if (nuevo) {
        paises.push(nuevo);
        mostrarRespuestaArreglo(`<strong>push():</strong> Se agregó <em>"${nuevo}"</em> al final del arreglo.`);
    }
}

function ejecutarUnshift() {
    let nuevo = prompt("Ingresa el nombre de un nuevo país para el inicio:");
    if (nuevo) {
        paises.unshift(nuevo);
        mostrarRespuestaArreglo(`<strong>unshift():</strong> Se agregó <em>"${nuevo}"</em> al inicio del arreglo.`);
    }
}

function ejecutarSplice() {
    if (paises.length < 2) {
        alert("El arreglo necesita más elementos para aplicar splice.");
        return;
    }
    let eliminados = paises.splice(1, 1, "País Reemplazado");
    mostrarRespuestaArreglo(`<strong>splice(1, 1, 'País Reemplazado'):</strong> Se eliminó <em>"${eliminados}"</em> en la pos 1 y se insertó uno nuevo.`);
}

function ejecutarDelete() {
    if (paises.length === 0) return;
    delete paises[0];
    mostrarRespuestaArreglo(`<strong>delete paises[0]:</strong> Se borró el valor del índice 0.`);
}

function ejecutarReverse() {
    paises.reverse();
    mostrarRespuestaArreglo(`<strong>reverse():</strong> Se invirtió el orden del arreglo.`);
}

function ejecutarSort() {
    paises.sort();
    mostrarRespuestaArreglo(`<strong>sort():</strong> Arreglo ordenado alfabéticamente.`);
}

function ejecutarConcat() {
    let otrosPaises = ["Perú", "Colombia"];
    let concatenado = paises.concat(otrosPaises);
    document.getElementById("resArreglo").innerHTML = `<strong>concat():</strong> Se unió con ["Perú", "Colombia"].<br>Resultado: ${JSON.stringify(concatenado)}`;
}

function ejecutarJoin() {
    let cadena = paises.join(" - ");
    document.getElementById("resArreglo").innerHTML = `<strong>join(" - "):</strong> Cadena resultante:<br><em>${cadena}</em>`;
}