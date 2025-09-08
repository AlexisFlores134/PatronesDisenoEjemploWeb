// ====== CÓDIGO PRINCIPAL ======

// Variables globales
let currentUser = null;
let baseUser = null;
const logElement = document.getElementById("log");

// Función para registrar acciones en el log
function logAction(message, type = "info") {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement("div");
    logEntry.className = "log-entry";
    
    // Aplicar estilo según el tipo de mensaje
    if (type === "denied") {
        logEntry.classList.add("access-denied");
    } else if (type === "granted") {
        logEntry.classList.add("access-granted");
    }
    
    logEntry.textContent = `[${timestamp}] ${message}`;
    logElement.appendChild(logEntry);
    logElement.scrollTop = logElement.scrollHeight;
}

// Función para limpiar el log
function clearLog() {
    logElement.innerHTML = "";
}

// Inicialización cuando el DOM está listo
document.addEventListener("DOMContentLoaded", function() {
    logAction("Sistema de control de acceso inicializado");
    
    // Configurar valor por defecto para demostración
    document.getElementById("cardId").value = "NFC-001";
    
    // Autenticación de usuario
    document.getElementById("auth-btn").addEventListener("click", () => {
        const name = document.getElementById("userName").value;
        const role = document.getElementById("userRole").value;
        
        baseUser = new User(name, role);
        currentUser = baseUser;
        
        const desc = currentUser.desc();
        document.getElementById("user-desc").textContent = desc;
        
        logAction(`Usuario autenticado: ${desc}`);
    });
    
    // Botón de reinicio
    document.getElementById("reset-btn").addEventListener("click", () => {
        if (baseUser) {
            currentUser = baseUser;
            const desc = currentUser.desc();
            document.getElementById("user-desc").textContent = desc;
            logAction(`Usuario reiniciado a estado base: ${desc}`);
        } else {
            logAction("Primero debe autenticar un usuario");
        }
    });
    
    // Aplicar decoradores
    document.querySelectorAll("[data-add]").forEach(btn => {
        btn.addEventListener("click", () => {
            if (!currentUser) { 
                logAction("Primero debe autenticar un usuario"); 
                return; 
            }
            
            const decoratorType = btn.dataset.add;
            
            // Aplicar el decorador correspondiente
            if (decoratorType === "log") {
                currentUser = new LoggingDecorator(currentUser);
                logAction("Decorador de Registro aplicado");
            } else if (decoratorType === "temp") {
                currentUser = new TempAccessDecorator(currentUser);
                logAction("Decorador de Acceso Temporal aplicado");
            } else if (decoratorType === "admin") {
                currentUser = new AdminDecorator(currentUser);
                logAction("Decorador de Admin aplicado");
            }
            
            // Actualizar la interfaz
            const desc = currentUser.desc();
            document.getElementById("user-desc").textContent = desc;
            
            // Verificar acceso
            const hasAccess = currentUser.hasAccess();
            const accessMessage = `Verificación de acceso: ${hasAccess ? "PERMITIDO" : "DENEGADO"}`;
            logAction(accessMessage, hasAccess ? "granted" : "denied");
        });
    });
    
    // Verificación de acceso con Facade
    document.getElementById("facade-btn").addEventListener("click", () => {
        const cardId = document.getElementById("cardId").value;
        const facade = new AccessControlFacade();
        facade.processAccess(cardId);
    });
    
    // Simular acceso denegado
    document.getElementById("denied-btn").addEventListener("click", () => {
        const cardId = document.getElementById("cardId").value || "NFC-003";
        const facade = new AccessControlFacade();
        facade.simulateDeniedAccess(cardId);
    });
    
    // Limpiar log
    document.getElementById("clear-log").addEventListener("click", clearLog);
    
    // Ejemplos de tarjetas para probar
    logAction("💡 Prueba estas tarjetas:");
    logAction("NFC-001 → Acceso completo");
    logAction("NFC-002 → Acceso limitado");
    logAction("NFC-003 → Acceso denegado (restringida)");
    logAction("INVALID-001 → Formato incorrecto");
});