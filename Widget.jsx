import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Colores
const COLORS = {
  azulRey: "#003366",
  blanco: "#FFFFFF",
  grisClaro: "#F0F0F0",
  grisOscuro: "#CCCCCC",
  azulGradiente: "linear-gradient(90deg, #003366 0%, #0055aa 100%)",
};

const ICONS = {
  baseDatos: "🗄️",
  ia: "🤖",
};

const Widget = () => {
  const [modo, setModo] = useState("baseDatos");
  const [input, setInput] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [cargando, setCargando] = useState(false);

  // Simulación de consulta a base de datos
  const consultarBaseDatos = async (query) => {
    await new Promise((r) => setTimeout(r, 900));
    return `Resultado de la base de datos para: ${query}`;
  };

  // Consulta a anythingLLM
  const consultarIA = async (query) => {
    try {
      await new Promise((r) => setTimeout(r, 1200));
      // Aquí iría la consulta real
      return `Respuesta IA para: ${query}`;
    } catch (error) {
      return "Error consultando IA";
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    setMensajes((prev) => [
      ...prev,
      { texto: input, tipo: "usuario" },
    ]);
    setInput("");
    setCargando(true);
    let respuesta = "";
    if (modo === "baseDatos") respuesta = await consultarBaseDatos(input);
    else respuesta = await consultarIA(input);
    setMensajes((prev) => [
      ...prev,
      { texto: respuesta, tipo: "sistema" },
    ]);
    setCargando(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        background: COLORS.blanco,
        border: `2px solid ${COLORS.azulRey}`,
        borderRadius: "20px",
        width: "370px",
        padding: "28px",
        boxShadow: `0 6px 24px ${COLORS.grisOscuro}`,
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Título animado */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          color: COLORS.azulRey,
          marginBottom: "16px",
          letterSpacing: "1px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {ICONS[modo]} Widget Inteligente
      </motion.h2>
      {/* Toggle de modo con indicador */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "18px", gap: "10px" }}>
        <span style={{
          color: modo === "baseDatos" ? COLORS.azulRey : COLORS.grisOscuro,
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "4px"
        }}>
          🗄️ Base de Datos
        </span>
        <button
          onClick={() => setModo(modo === "baseDatos" ? "ia" : "baseDatos")}
          style={{
            margin: "0 12px",
            width: "54px",
            height: "28px",
            borderRadius: "14px",
            border: `1.5px solid ${COLORS.azulRey}`,
            background: COLORS.grisClaro,
            position: "relative",
            cursor: "pointer",
            outline: "none",
            boxShadow: modo === "ia" ? "0 0 8px #0055aa44" : "none",
            transition: "box-shadow 0.2s",
          }}
        >
          <motion.div
            layout
            style={{
              position: "absolute",
              top: "3px",
              left: modo === "baseDatos" ? "3px" : "29px",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              background: COLORS.azulRey,
              boxShadow: "0 2px 8px #00336633",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: COLORS.blanco,
              fontSize: "16px",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {modo === "baseDatos" ? "🗄️" : "🤖"}
          </motion.div>
        </button>
        <span style={{
          color: modo === "ia" ? COLORS.azulRey : COLORS.grisOscuro,
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: "4px"
        }}>
          🤖 Modo IA
        </span>
      </div>
      {/* Mensajes */}
      <div style={{
        background: COLORS.grisClaro,
        borderRadius: "10px",
        padding: "14px",
        minHeight: "130px",
        maxHeight: "200px",
        overflowY: "auto",
        marginBottom: "14px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        border: `1px solid ${COLORS.grisOscuro}`,
      }}>
        <AnimatePresence>
          {mensajes.map((msg, idx) => (
            <React.Fragment key={idx}>
              <motion.div
                initial={{ opacity: 0, x: msg.tipo === "usuario" ? 60 : -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: msg.tipo === "usuario" ? 60 : -60 }}
                transition={{ duration: 0.3 }}
                style={{
                  alignSelf: msg.tipo === "usuario" ? "flex-end" : "flex-start",
                  background: msg.tipo === "usuario" ? COLORS.azulGradiente : COLORS.blanco,
                  color: msg.tipo === "usuario" ? COLORS.blanco : COLORS.azulRey,
                  borderRadius: msg.tipo === "usuario" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  padding: "10px 18px",
                  maxWidth: "80%",
                  boxShadow: msg.tipo === "usuario"
                    ? "0 2px 12px #00336622"
                    : "0 2px 12px #0055aa22",
                  fontSize: "15px",
                  position: "relative",
                  fontWeight: msg.tipo === "usuario" ? "bold" : "normal",
                }}
              >
                {msg.texto}
                {msg.tipo === "sistema" && (
                  <span style={{
                    position: "absolute",
                    bottom: "4px",
                    right: "10px",
                    fontSize: "11px",
                    color: "#888",
                  }}>
                    {modo === "ia" ? "🤖" : "🗄️"}
                  </span>
                )}
              </motion.div>
              {/* Separador visual */}
              {idx < mensajes.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  exit={{ opacity: 0 }}
                  style={{
                    height: "2px",
                    background: COLORS.azulRey,
                    borderRadius: "1px",
                    margin: "2px 0",
                    width: "40%",
                    alignSelf: "center",
                  }}
                />
              )}
            </React.Fragment>
          ))}
          {/* Animación de carga */}
          {cargando && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                alignSelf: "flex-start",
                background: COLORS.blanco,
                color: COLORS.azulRey,
                borderRadius: "18px 18px 18px 4px",
                padding: "10px 18px",
                maxWidth: "80%",
                boxShadow: "0 2px 12px #0055aa22",
                fontSize: "15px",
                fontStyle: "italic",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1 }}
                style={{ fontSize: "18px" }}
              >⏳</motion.span>
              Pensando...
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Input y botón enviar */}
      <div style={{ display: "flex", gap: "8px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            modo === "baseDatos"
              ? "Consulta la base de datos..."
              : "Pregunta algo a la IA..."
          }
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "10px",
            border: `1.5px solid ${COLORS.grisOscuro}`,
            fontSize: "15px",
            outline: "none",
            boxShadow: "0 2px 8px #00336611",
          }}
          onKeyDown={e => e.key === "Enter" && handleSend()}
          disabled={cargando}
        />
        <motion.button
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          disabled={cargando}
          style={{
            background: cargando ? COLORS.grisOscuro : COLORS.azulRey,
            color: COLORS.blanco,
            border: "none",
            borderRadius: "10px",
            padding: "10px 18px",
            cursor: cargando ? "not-allowed" : "pointer",
            fontWeight: "bold",
            fontSize: "15px",
            boxShadow: "0 2px 8px #00336622",
            transition: "background 0.2s",
          }}
        >
          {cargando ? "Enviando..." : "Enviar"}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Widget;