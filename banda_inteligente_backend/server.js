const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Rutas API
app.use("/api/objetos", require("./routes/objetos"));
app.use("/api/cajas", require("./routes/cajas"));
app.use("/api/emergencia", require("./routes/emergencia"));
app.use("/api/eventos", require("./routes/eventos"));

// MQTT escucha en background
require("./mqtt/mqtt_client");

const PORT = 4000;
app.listen(PORT, () => console.log("Servidor API corriendo en puerto", PORT));
