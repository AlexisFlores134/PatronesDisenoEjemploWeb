// ====== PATRÓN DECORATOR ======

// Clase base User
class User {
    constructor(name, role) {
        this.name = name;
        this.role = role;
    }
    
    desc() {
        return `${this.name} [${this.role}]`;
    }
    
    hasAccess() {
        return this.role !== 'usuario';
    }
}

// Clase base para decoradores
class UserDecorator {
    constructor(user) {
        this.user = user;
    }
    
    desc() {
        return this.user.desc();
    }
    
    hasAccess() {
        return this.user.hasAccess();
    }
}

// Decorador para logging
class LoggingDecorator extends UserDecorator {
    desc() {
        return this.user.desc() + " +Registro";
    }
    
    hasAccess() {
        const access = this.user.hasAccess();
        logAction(`Registro de acceso: ${this.user.name} - ${access ? 'Permitido' : 'Denegado'}`);
        return access;
    }
}

// Decorador para acceso temporal
class TempAccessDecorator extends UserDecorator {
    desc() {
        return this.user.desc() + " +Temporal";
    }
    
    hasAccess() {
        // Simular acceso temporal (solo entre 9 AM y 6 PM)
        const hour = new Date().getHours();
        const hasTemporalAccess = hour >= 9 && hour <= 18;
        
        if (!hasTemporalAccess) {
            logAction(`Acceso temporal denegado: Fuera del horario permitido (9:00-18:00)`);
            return false;
        }
        
        return this.user.hasAccess();
    }
}

// Decorador para permisos de admin
class AdminDecorator extends UserDecorator {
    desc() {
        return this.user.desc() + " +Admin";
    }
    
    hasAccess() {
        // Siempre permite acceso a admin
        logAction(`Acceso administrativo concedido: ${this.user.name}`);
        return true;
    }
}