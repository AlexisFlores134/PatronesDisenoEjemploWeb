// ====== PATRÓN FACADE ======

// Subsistema: Lector de tarjetas
class CardReader {
    readCard(cardId) {
        logAction(`Leyendo tarjeta: ${cardId}`);
        return cardId;
    }
}

// Subsistema: Validador de usuarios
class UserValidator {
    validateUser(cardId) {
        // Tarjetas que no empiezan con "NFC" serán inválidas
        const isValid = cardId.startsWith("NFC");
        const validationMessage = isValid ? 
            '✅ Válida' : '❌ Inválida - Formato incorrecto';
        
        logAction(`Validando tarjeta: ${validationMessage}`);
        return isValid;
    }
}

// Subsistema: Comprobador de permisos
class PermissionChecker {
    checkPermissions(cardId) {
        // Simular diferentes niveles de permiso basados en el ID
        let hasPermission = false;
        let permissionMessage = "";
        
        if (cardId === "NFC-001") {
            hasPermission = true;
            permissionMessage = "✅ Usuario con acceso completo";
        } 
        else if (cardId === "NFC-002") {
            hasPermission = true;
            permissionMessage = "✅ Usuario con acceso limitado";
        }
        else if (cardId === "NFC-003") {
            // Tarjeta restringida - acceso denegado
            hasPermission = false;
            permissionMessage = "❌ Tarjeta restringida - Acceso denegado";
        }
        else if (cardId.startsWith("NFC")) {
            // Otras tarjetas NFC tienen acceso básico
            hasPermission = true;
            permissionMessage = "✅ Acceso básico concedido";
        }
        else {
            // Tarjetas no NFC
            hasPermission = false;
            permissionMessage = "❌ Tarjeta no reconocida - Acceso denegado";
        }
        
        logAction(`Verificando permisos: ${permissionMessage}`);
        return hasPermission;
    }
}

// Subsistema: Registro de accesos
class AccessLogger {
    logAccess(cardId, granted) {
        const timestamp = new Date().toLocaleTimeString();
        const status = granted ? 'CONCEDIDO' : 'DENEGADO';
        const message = `[ACCESO] ${timestamp} - ${cardId} - ${status}`;
        logAction(message, granted ? "granted" : "denied");
        return message;
    }
}

// Fachada que simplifica el proceso completo
class AccessControlFacade {
    constructor() {
        this.cardReader = new CardReader();
        this.userValidator = new UserValidator();
        this.permissionChecker = new PermissionChecker();
        this.accessLogger = new AccessLogger();
    }
    
    processAccess(cardId) {
        logAction("=== INICIANDO VERIFICACIÓN DE ACCESO ===");
        
        // 1. Leer tarjeta
        const cardData = this.cardReader.readCard(cardId);
        
        // 2. Validar usuario
        const isValid = this.userValidator.validateUser(cardData);
        if (!isValid) {
            this.accessLogger.logAccess(cardId, false);
            logAction("❌ ACCESO DENEGADO - Tarjeta inválida", "denied");
            logAction("=== VERIFICACIÓN COMPLETADA ===\n");
            return false;
        }
        
        // 3. Verificar permisos
        const hasPermission = this.permissionChecker.checkPermissions(cardId);
        if (!hasPermission) {
            this.accessLogger.logAccess(cardId, false);
            logAction("❌ ACCESO DENEGADO - Permisos insuficientes", "denied");
            logAction("=== VERIFICACIÓN COMPLETADA ===\n");
            return false;
        }
        
        // 4. Registrar acceso
        this.accessLogger.logAccess(cardId, true);
        
        // 5. Resultado final
        logAction("✅ ACCESO PERMITIDO", "granted");
        logAction("=== VERIFICACIÓN COMPLETADA ===\n");
        
        return true;
    }
    
    // Método para simular acceso denegado específicamente
    simulateDeniedAccess(cardId) {
        logAction("=== SIMULANDO ACCESO DENEGADO ===");
        logAction(`Usando tarjeta: ${cardId}`);
        
        // Simular diferentes razones de denegación
        const reasons = [
            "Tarjeta reportada como perdida/robada",
            "Usuario sin permisos para esta área",
            "Acceso fuera del horario permitido",
            "Intento de acceso múltiple fallido",
            "Sistema en modo de mantenimiento"
        ];
        
        const randomReason = reasons[Math.floor(Math.random() * reasons.length)];
        
        logAction(`Razón: ${randomReason}`, "denied");
        this.accessLogger.logAccess(cardId, false);
        logAction("❌ ACCESO DENEGADO", "denied");
        logAction("=== SIMULACIÓN COMPLETADA ===\n");
        
        return false;
    }
}