const mqtt = require("mqtt");
const db = require("../config/db");

const client = mqtt.connect("mqtt://10.142.223.240:1883");

client.on("connect", () => {
    console.log("MQTT conectado");

    // Suscripciones correctas
    client.subscribe("banda/objeto");
    client.subscribe("banda/status");
    client.subscribe("banda/caja");
    client.subscribe("banda/evento");
});

client.on("message", (topic, message) => {
    const msg = message.toString();
    console.log("MQTT:", topic, msg);

    try {
        const json = JSON.parse(msg);

        // ------------------- OBJETO -------------------
        if (topic === "banda/objeto") {
            db.query(
                "INSERT INTO objetos (tipo, distancia) VALUES (?, ?)",
                [json.tipo, json.distancia]
            );
        }

        // ------------------- EMERGENCIA -------------------
        if (topic === "banda/status") {
            if (json.emergencia === true)
                db.query("INSERT INTO emergencia (estado) VALUES ('activada')");
            else if (json.emergencia === false)
                db.query("INSERT INTO emergencia (estado) VALUES ('liberada')");
        }

        // ------------------- CAJA -------------------
        if (topic === "banda/caja") {
            db.query(
                "INSERT INTO cajas (tipo, cantidad) VALUES (?, ?)",
                [json.tipo, json.cantidad]
            );
        }

        // ------------------- EVENTO -------------------
        if (topic === "banda/evento") {
            db.query(
                "INSERT INTO eventos (evento, detalle) VALUES (?, ?)",
                [json.evento, json.detalle || ""]
            );
        }

    } catch (err) {
        console.error("Error procesando mensaje MQTT:", err);
    }
});
