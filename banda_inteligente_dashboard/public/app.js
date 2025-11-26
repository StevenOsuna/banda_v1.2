// WebSocket con el backend
const socket = new WebSocket("ws://localhost:4000");

// Elementos del DOM
const motorTxt = document.getElementById("estadoMotor");
const velTxt = document.getElementById("velocidad");
const servoTxt = document.getElementById("servo");

const peqTxt = document.getElementById("peqActual");
const graTxt = document.getElementById("graActual");
const totalTxt = document.getElementById("totalObj");

const emergBox = document.getElementById("estadoEmerg");
const emergTxt = document.getElementById("emergenciaTxt");
const tablaCajas = document.getElementById("tablaCajas");

// === CHART ===
const ctx = document.getElementById("graficaObjetos").getContext("2d");

let graficaObjetos = new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["Pequeños", "Grandes"],
        datasets: [{
            label: "Conteo en caja actual",
            data: [0, 0],
            borderWidth: 2
        }]
    },
    options: {
        scales: { y: { beginAtZero: true, suggestedMax: 5 } }
    }
});

// === WEBSOCKET MENSAJES ===
socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    motorTxt.innerText = data.running ? "Encendido" : "Apagado";
    velTxt.innerText = data.speed;
    servoTxt.innerText = data.servo;

    peqTxt.innerText = data.pequenos;
    graTxt.innerText = data.grandes;
    totalTxt.innerText = data.total;

    // Actualizar gráfica
    graficaObjetos.data.datasets[0].data = [data.pequenos, data.grandes];
    graficaObjetos.update();

    // Emergencia
    if (data.emergencia) {
        emergTxt.innerText = "ACTIVA";
        emergBox.classList.add("on");
    } else {
        emergTxt.innerText = "Normal";
        emergBox.classList.remove("on");
    }
};

// === CARGAR TABLA DE CAJAS DESDE EL BACKEND ===
async function cargarCajas() {
    const res = await fetch("http://localhost:4000/api/cajas");
    const cajas = await res.json();

    tablaCajas.innerHTML = "";

    cajas.forEach(row => {
        tablaCajas.innerHTML += `
            <tr>
                <td>${row.tipo}</td>
                <td>${row.cantidad}</td>
                <td>${row.fecha}</td>
            </tr>
        `;
    });
}

// refrescar cada 3s
setInterval(cargarCajas, 3000);
cargarCajas();
