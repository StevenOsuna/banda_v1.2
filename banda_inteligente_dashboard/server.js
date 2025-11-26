const express = require("express");
const path = require("path");
const WebSocket = require("ws");
const mqtt = require("mqtt");

const app = express();
const PORT = 3000;

// Servir dashboard
app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(PORT, () =>
    console.log("Dashboard running on http://localhost:" + PORT)
);

// =======================
//   WEBSOCKET SERVER
// =======================
const wss = new WebSocket.Server({ server });

// =======================
//   MQTT CLIENT
// =======================
const mqttClient = mqtt.connect("mqtt://10.142.223.240:1883");

mqttClient.on("connect", () => {
    console.log("MQTT conectado");
    mqttClient.subscribe("banda/status");
});

// ❗ BORRAR cualquier mqttClient.on("message") global que tengas
//    porque ESTE es el único válido que no causará errores.

// =======================
//   BRIDGE WS ← MQTT
// =======================
wss.on("connection", (ws) => {
    console.log("Cliente WebSocket conectado");

    // Cada cliente WS recibe datos MQTT de forma independiente
    const handler = (topic, message) => {
        if (topic === "banda/status") {
            try {
                ws.send(message.toString());
            } catch (err) {
                console.log("WS send error:", err);
            }
        }
    };

    mqttClient.on("message", handler);

    ws.on("close", () => {
        console.log("WS desconectado");
        mqttClient.removeListener("message", handler);
    });
});
