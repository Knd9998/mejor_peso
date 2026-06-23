// ----- Base de datos simulacion inicial -----
let db = {
    miembros: JSON.parse(localStorage.getItem('cuerpoSano_miembros')) || [
        { id: 1, nombre: "Juan Perez", direccion: "Av. San Juan 3211", telefono: "5467-1234", fechaNac: "1990-05-15", dni: "30651849", tipoMembresia: "Mensual", foto: null, estadoPago: "Pagado" },
        { id: 2, nombre: "Ana Gomez", direccion: "Miralla 1270", telefono: "3792-5678", fechaNac: "1985-09-22", dni: "27876543", tipoMembresia: "Anual", foto: null, estadoPago: "Vencido" },
        { id: 3, nombre: "Agostina Failache", direccion: "Av. Pedro Goyena 233", telefono: "2453-8596", fechaNac: "2002-05-10", dni: "44657895", tipoMembresia: "Semestral", foto: null, estadoPago: "Pendiente" }
    ],
    membresias: [
        { id: 1, nombre: "Mensual", precio: 50000, duracion: 30 },
        { id: 2, nombre: "Cuatrimestral", precio: 180000, duracion: 120 },
        { id: 3, nombre: "Semestral", precio: 250000, duracion: 180 },
        { id: 4, nombre: "Anual", precio: 450000, duracion: 365 }
    ],
    clases: JSON.parse(localStorage.getItem('cuerpoSano_clases')) || [
        { id: 1, nombre: "Yoga", horarioInicio: "09:00", horarioFin: "10:00", entrenadorId: 1, entrenadorNombre: "Carlos Ramirez", descripcion: "Relajación y estiramientos", sala: "1", cupos: 15, inscritos: [1] },
        { id: 2, nombre: "CrossFit", horarioInicio: "18:00", horarioFin: "19:00", entrenadorId: 2, entrenadorNombre: "Laura Fernandez", descripcion: "Alta intensidad", sala: "2", cupos: 2, inscritos: [1, 2] }
    ],
    entrenadores: JSON.parse(localStorage.getItem('cuerpoSano_entrenadores')) || [
        { id: 1, nombre: "Carlos Ramirez", dni: "38475069", fechaNac: "1995-03-10", direccion: "Av. San Juan 3244", telefono: "2456-9578", certificaciones: ["CrossFit L1", "Nutrición Deportiva"], certificados: [] },
        { id: 2, nombre: "Laura Fernandez", dni: "37511685", fechaNac: "1992-07-21", direccion: "Av. Independencia 3200", telefono: "3245-8521", certificaciones: ["Profesora de Yoga", "Meditación Guiada"], certificados: []  },
        { id: 3, nombre: "Mario Reolla", dni: "28475012", fechaNac: "1987-10-30", direccion: "Chile 520", telefono: "6438-1957", certificaciones: ["Entrenador Físico"], certificados: []  },
        { id: 4, nombre: "Romina Herrera", dni: "40512466", fechaNac: "1997-03-11", direccion: "Mexico 458", telefono: "6452-8565", certificaciones: ["Profesora de Pilates"], certificados: []  }
    ],
    pagos: JSON.parse(localStorage.getItem('cuerpoSano_pagos')) || [
        { id: 1, miembroId: 1, monto: 50000, fecha: "2025-04-01", medioPago: "Efectivo", tipoMembresia: "Mensual" },
        { id: 2, miembroId: 1, monto: 50000, fecha: "2025-05-01", medioPago: "Tarjeta de Crédito", tipoMembresia: "Mensual" },
        { id: 3, miembroId: 2, monto: 450000, fecha: "2024-01-15", medioPago: "Transferencia", tipoMembresia: "Anual" }
    ],
    asistenciasClases: JSON.parse(localStorage.getItem('cuerpoSano_asistenciasClases')) || [
        { id: 1, miembroId: 1, claseId: 1, fecha: "2025-06-01", estado: "Presente" },
        { id: 2, miembroId: 1, claseId: 2, fecha: "2025-06-01", estado: "Ausente" },
        { id: 3, miembroId: 2, claseId: 2, fecha: "2025-06-01", estado: "Presente" },
        { id: 4, miembroId: 1, claseId: 1, fecha: "2025-06-03", estado: "Presente" },
        { id: 5, miembroId: 2, claseId: 2, fecha: "2025-06-03", estado: "Ausente" },
        { id: 6, miembroId: 1, claseId: 1, fecha: "2025-06-10", estado: "Presente" }
    ],
    ingresosEstablecimiento: JSON.parse(localStorage.getItem('cuerpoSano_ingresos')) || [
        { id: 1, miembroId: 1, fecha: "2025-06-01", horario: "08:30:00" },
        { id: 2, miembroId: 1, fecha: "2025-06-01", horario: "17:45:00" },
        { id: 3, miembroId: 2, fecha: "2025-05-31", horario: "09:15:00" },
        { id: 4, miembroId: 1, fecha: "2025-06-03", horario: "09:00:00" },
        { id: 5, miembroId: 2, fecha: "2025-06-03", horario: "18:30:00" }
    ],
    asistenciasEntrenadores: JSON.parse(localStorage.getItem('cuerpoSano_asistenciasEntrenadores')) || [
        { id: 1, entrenadorId: 1, claseId: 1, fecha: "2025-06-01", estado: "Presente" },
        { id: 2, entrenadorId: 2, claseId: 2, fecha: "2025-06-01", estado: "Presente" },
        { id: 3, entrenadorId: 1, claseId: 1, fecha: "2025-06-03", estado: "Ausente" },
        { id: 4, entrenadorId: 2, claseId: 2, fecha: "2025-06-10", estado: "Presente" }
    ]
};




let currentUser = { role: null, username: null, id: null, displayName: null };
let pendingMemberData = null; 
let editingClaseId = null;
let editingEntrenadorId = null;
let certificacionesTemp = [];

// Credenciales
const validCredentials = {
    admin: { user: "admin", pass: "admin", role: "admin", displayName: "Candela" },
    recepcion: { user: "personal", pass: "personal", role: "recepcion", displayName: "Personal de Recepción" },
    miembro: { user: "juan", pass: "juan", role: "miembro", displayName: "Juan" },
    entrenador: { user: "carlos", pass: "carlos", role: "entrenador", displayName: "Carlos" }
};




// -------------- Panel de Control ---------------------
function viewDashboard() {
    document.getElementById('pageTitle').innerText = "Panel de Control";
    const container = document.getElementById('dynamicContent');
    
    const fechaActual = new Date().toLocaleDateString('es-AR', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    let welcomeName = currentUser.displayName || currentUser.username;
    
    let contenidoDashboard = `
        <div class="dashboard-container">
            <div class="welcome-card" style="background: linear-gradient(135deg, #227c6c 0%, #1a5f52 100%); color: white; padding: 2rem; border-radius: 20px; margin-bottom: 2rem;">
                <h2 style="color: white; margin-bottom: 0.5rem;">¡Bienvenido/a, ${welcomeName}!</h2>
                <p style="color: rgba(255,255,255,0.9);">Rol: ${currentUser.role.toUpperCase()}</p>
                <p style="color: rgba(255,255,255,0.8); margin-top: 0.5rem;">${fechaActual}</p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
    `;
    
    // Contenido segun rol
    if (currentUser.role === 'admin') {
        const totalIngresos = db.pagos.reduce((sum, p) => sum + p.monto, 0);
        contenidoDashboard += `
            <div class="stat-card" style="background: white; padding: 1.5rem; border-radius: 16px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <i class="fas fa-users" style="font-size: 2.5rem; color: #227c6c;"></i>
                <h3 style="font-size: 2rem; margin: 0.5rem 0;">${db.miembros.length}</h3>
                <p style="color: #64748b;">Miembros Registrados</p>
            </div>
            <div class="stat-card" style="background: white; padding: 1.5rem; border-radius: 16px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <i class="fas fa-chalkboard-teacher" style="font-size: 2.5rem; color: #227c6c;"></i>
                <h3 style="font-size: 2rem; margin: 0.5rem 0;">${db.entrenadores.length}</h3>
                <p style="color: #64748b;">Entrenadores</p>
            </div>
            <div class="stat-card" style="background: white; padding: 1.5rem; border-radius: 16px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <i class="fas fa-calendar-alt" style="font-size: 2.5rem; color: #227c6c;"></i>
                <h3 style="font-size: 2rem; margin: 0.5rem 0;">${db.clases.length}</h3>
                <p style="color: #64748b;">Clases Disponibles</p>
            </div>
        `;
    } else if (currentUser.role === 'recepcion') {
        const asistenciasHoy = db.asistenciasClases.filter(a => a.fecha === new Date().toISOString().split('T')[0]).length;
        contenidoDashboard += `
            <div class="stat-card" style="background: white; padding: 1.5rem; border-radius: 16px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <i class="fas fa-users" style="font-size: 2.5rem; color: #227c6c;"></i>
                <h3 style="font-size: 2rem; margin: 0.5rem 0;">${db.miembros.length}</h3>
                <p style="color: #64748b;">Miembros Registrados</p>
            </div>
            <div class="stat-card" style="background: white; padding: 1.5rem; border-radius: 16px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <i class="fas fa-calendar-check" style="font-size: 2.5rem; color: #227c6c;"></i>
                <h3 style="font-size: 2rem; margin: 0.5rem 0;">${asistenciasHoy}</h3>
                <p style="color: #64748b;">Asistencias Registradas Hoy</p>
            </div>
            <div class="stat-card" style="background: white; padding: 1.5rem; border-radius: 16px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <i class="fas fa-door-open" style="font-size: 2.5rem; color: #227c6c;"></i>
                <h3 style="font-size: 2rem; margin: 0.5rem 0;">${db.ingresosEstablecimiento.length}</h3>
                <p style="color: #64748b;">Ingresos al Gimnasio</p>
            </div>
        `;
    } else if (currentUser.role === 'miembro') {
        const miembroActual = db.miembros[0];
        const misIngresosCount = db.ingresosEstablecimiento.filter(i => i.miembroId === miembroActual.id).length;
        const misClasesInscriptas = db.clases.filter(c => c.inscritos && c.inscritos.includes(miembroActual.id)).length;
        
        contenidoDashboard += `
            <div class="stat-card" style="background: white; padding: 1.5rem; border-radius: 16px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <i class="fas fa-id-card" style="font-size: 2.5rem; color: #227c6c;"></i>
                <h3 style="font-size: 1.2rem; margin: 0.5rem 0;">${miembroActual.nombre}</h3>
                <p style="color: #64748b;">DNI: ${miembroActual.dni}</p>
            </div>
            <div class="stat-card" style="background: white; padding: 1.5rem; border-radius: 16px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <i class="fas fa-tag" style="font-size: 2.5rem; color: #227c6c;"></i>
                <h3 style="font-size: 1.2rem; margin: 0.5rem 0;">${miembroActual.tipoMembresia}</h3>
                <p style="color: #64748b;">Membresía</p>
            </div>
            <div class="stat-card" style="background: white; padding: 1.5rem; border-radius: 16px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <i class="fas fa-credit-card" style="font-size: 2.5rem; color: ${miembroActual.estadoPago === 'Pagado' ? '#227c6c' : '#ef4444'};"></i>
                <h3 style="font-size: 1.2rem; margin: 0.5rem 0; color: ${miembroActual.estadoPago === 'Pagado' ? '#227c6c' : '#ef4444'};">${miembroActual.estadoPago}</h3>
                <p style="color: #64748b;">Estado de Pago</p>
            </div>
            <div class="stat-card" style="background: white; padding: 1.5rem; border-radius: 16px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <i class="fas fa-history" style="font-size: 2.5rem; color: #227c6c;"></i>
                <h3 style="font-size: 2rem; margin: 0.5rem 0;">${misIngresosCount}</h3>
                <p style="color: #64748b;">Visitas al Gimnasio</p>
            </div>
            <div class="stat-card" style="background: white; padding: 1.5rem; border-radius: 16px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <i class="fas fa-dumbbell" style="font-size: 2.5rem; color: #227c6c;"></i>
                <h3 style="font-size: 2rem; margin: 0.5rem 0;">${misClasesInscriptas}</h3>
                <p style="color: #64748b;">Clases Inscriptas</p>
            </div>
        `;
    } else if (currentUser.role === 'entrenador') {
        const entrenadorActual = db.entrenadores[0];
        const clasesAsignadas = db.clases.filter(c => c.entrenadorId === entrenadorActual?.id);
        const asistenciasCount = db.asistenciasEntrenadores.filter(a => a.entrenadorId === entrenadorActual?.id).length;
        
        contenidoDashboard += `
            <div class="stat-card" style="background: white; padding: 1.5rem; border-radius: 16px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <i class="fas fa-chalkboard-teacher" style="font-size: 2.5rem; color: #227c6c;"></i>
                <h3 style="font-size: 1.2rem; margin: 0.5rem 0;">${entrenadorActual?.nombre || 'Entrenador'}</h3>
                <p style="color: #64748b;">DNI: ${entrenadorActual?.dni || '-'}</p>
            </div>
            <div class="stat-card" style="background: white; padding: 1.5rem; border-radius: 16px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <i class="fas fa-dumbbell" style="font-size: 2.5rem; color: #227c6c;"></i>
                <h3 style="font-size: 2rem; margin: 0.5rem 0;">${clasesAsignadas.length}</h3>
                <p style="color: #64748b;">Clases Asignadas</p>
            </div>
            <div class="stat-card" style="background: white; padding: 1.5rem; border-radius: 16px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <i class="fas fa-calendar-check" style="font-size: 2.5rem; color: #227c6c;"></i>
                <h3 style="font-size: 2rem; margin: 0.5rem 0;">${asistenciasCount}</h3>
                <p style="color: #64748b;">Asistencias Registradas</p>
            </div>
        `;
    }
    
    contenidoDashboard += `
            </div>
        </div>
    `;
    
    container.innerHTML = contenidoDashboard;
}




function initializeApp() {
    renderMenu();
    viewDashboard();
    initMobileMenu();
}

// ------------ Menu y submenu roles -------------
const roleMenus = {
    admin: [
        { 
            id: "dashboard", 
            label: "Panel de Control", 
            icon: "fas fa-tachometer-alt", 
            view: "viewDashboard"
        },
        { 
            id: "miembros", 
            label: "Gestión de Miembros", 
            icon: "fas fa-users", 
            submenu: [
                { label: "Registrar Miembro", view: "viewRegistrarMiembro" },
                { label: "Modificar Miembro", view: "viewModificarMiembro" },
                { label: "Consultar Miembro", view: "viewConsultarMiembro" },
                { label: "Eliminar Miembro", view: "viewEliminarMiembro" }
            ]
        },
        { 
            id: "membresias", 
            label: "Gestión de Membresías", 
            icon: "fas fa-tags", 
            submenu: [
                { label: "Registrar Membresía", view: "viewRegistrarMembresia" },
                { label: "Modificar Membresía", view: "viewModificarMembresia" },
                { label: "Consultar Membresía", view: "viewConsultarMembresia" },
                { label: "Eliminar Membresía", view: "viewEliminarMembresia" },
                { label: "Imprimir Membresía", view: "viewImprimirMembresia" },
                { label: "Ver Estado de Pago", view: "viewEstadoPagoMembresia" }
            ]
        },
        { 
            id: "clases", 
            label: "Clases", 
            icon: "fas fa-calendar-alt", 
            submenu: [
                { label: "Registrar Clase", view: "viewRegistrarClase" },
                { label: "Modificar Clase", view: "viewModificarClase" },
                { label: "Consultar Clase", view: "viewConsultarClase" },
                { label: "Eliminar Clase", view: "viewEliminarClase" },
                { label: "Imprimir Listado de Clases", view: "viewImprimirListadoClases" },
                { label: "Asignar Entrenador a Clase", view: "viewAsignarEntrenadorClase" },
                { label: "Inscribir Miembros a Clases", view: "viewInscribirMiembrosClase" }
            ]
        },
        { 
            id: "entrenadores", 
            label: "Gestión de Entrenadores", 
            icon: "fas fa-chalkboard-teacher", 
            submenu: [
                { label: "Registrar Entrenador", view: "viewRegistrarEntrenador" },
                { label: "Modificar Entrenador", view: "viewModificarEntrenador" },
                { label: "Consultar Entrenador", view: "viewConsultarEntrenador" },
                { label: "Eliminar Entrenador", view: "viewEliminarEntrenador" },
                { label: "Imprimir Listado de Entrenadores", view: "viewImprimirListadoEntrenadores" }
            ]
        },
        { 
            id: "pagos", 
            label: "Gestión de Pagos", 
            icon: "fas fa-money-bill", 
            submenu: [
                { label: "Registrar Cobro", view: "viewRegistrarCobro" },
                { label: "Ver Historial de Pagos", view: "viewHistorialPagos" }
            ]
        },
       { 
            id: "asistencias", 
            label: "Asistencias", 
            icon: "fas fa-clipboard-list", 
            submenu: [
                { label: "Registro de Ingreso", view: "viewAsistencias" },
                { label: "Asistencia a Clases", view: "viewAsistenciaClases" },
                { label: "Ingresos al Gimnasio", view: "viewIngresosEstablecimiento" },
                { label: "Historial de Asistencias", view: "viewHistorialAsistencias" }
            ]
        },
        { 
            id: "reportes", 
            label: "Reportes", 
            icon: "fas fa-chart-line", 
            submenu: [
                { label: "Ingresos por Membresías", view: "viewReporteIngresos" },
                { label: "Asistencia de miembros a clases", view: "viewReporteAsistenciaMiembrosClases" },
                { label: "Asistencia de miembros a gimnasio", view: "viewReporteAsistenciaMiembrosGimnasio" },
                { label: "Asistencia Entrenadores a Clases", view: "viewReporteAsistenciaEntrenadores" }
            ]
        }
    ],
    recepcion: [
        { 
            id: "dashboard", 
            label: "Panel de Control", 
            icon: "fas fa-tachometer-alt", 
            view: "viewDashboard"
        },
        { 
            id: "miembros", 
            label: "Gestión de Miembros", 
            icon: "fas fa-users", 
            submenu: [
                { label: "Registrar Miembro", view: "viewRegistrarMiembro" },
                { label: "Modificar Miembro", view: "viewModificarMiembro" },
                { label: "Consultar Miembro", view: "viewConsultarMiembro" },
            ]
        },
        { 
            id: "membresias", 
            label: "Gestión de Membresías", 
            icon: "fas fa-tags", 
            submenu: [
                { label: "Consultar Membresía", view: "viewConsultarMembresia" },
                { label: "Imprimir Membresía", view: "viewImprimirMembresia" },
                { label: "Ver Estado de Pago", view: "viewEstadoPagoMembresia" }
            ]
        },
        { 
            id: "clases", 
            label: "Clases", 
            icon: "fas fa-calendar-alt", 
            submenu: [
                { label: "Registrar Clase", view: "viewRegistrarClase" },
                { label: "Modificar Clase", view: "viewModificarClase" },
                { label: "Consultar Clase", view: "viewConsultarClase" },
                { label: "Eliminar Clase", view: "viewEliminarClase" },
                { label: "Imprimir Listado de Clases", view: "viewImprimirListadoClases" },
                { label: "Asignar Entrenador a Clase", view: "viewAsignarEntrenadorClase" },
                { label: "Inscribir Miembros a Clases", view: "viewInscribirMiembrosClase" }
            ]
        },
        { 
            id: "entrenadores", 
            label: "Gestión de Entrenadores", 
            icon: "fas fa-chalkboard-teacher", 
            submenu: [
                { label: "Consultar Entrenador", view: "viewConsultarEntrenador" },
                { label: "Imprimir Listado de Entrenadores", view: "viewImprimirListadoEntrenadores" }
            ]
        },
        { 
            id: "asistencias", 
            label: "Asistencias", 
            icon: "fas fa-clipboard-list", 
            submenu: [
                { label: "Registro de Ingreso", view: "viewAsistencias" },
                { label: "Asistencia a Clases", view: "viewAsistenciaClases" },
                { label: "Ingresos al Gimnasio", view: "viewIngresosEstablecimiento" },
                { label: "Historial de Asistencias", view: "viewHistorialAsistencias" }
            ]
        },
        { 
            id: "pagos", 
            label: "Gestión de Pagos", 
            icon: "fas fa-money-bill", 
            submenu: [
                { label: "Registrar Cobro", view: "viewRegistrarCobro" },
                { label: "Ver Historial de Pagos", view: "viewHistorialPagos" }
            ]
        }
    ],
    miembro: [
        { 
            id: "dashboard", 
            label: "Panel de Control", 
            icon: "fas fa-tachometer-alt", 
            view: "viewDashboard"
        },
        { id: "miAsistencia", label: "Registrar Asistencia", icon: "fas fa-fingerprint", view: "viewMiAsistencia" },
        { id: "misIngresos", label: "Mis Ingresos", icon: "fas fa-history", view: "viewMisIngresos" },
        { id: "clasesDisponibles", label: "Clases Disponibles", icon: "fas fa-calendar-plus", view: "viewClasesDisponibles" }
    ],
    entrenador: [
        { 
            id: "dashboard", 
            label: "Panel de Control", 
            icon: "fas fa-tachometer-alt", 
            view: "viewDashboard"
        },
        { id: "misClases", label: "Mis Clases", icon: "fas fa-dumbbell", view: "viewMisClasesEntrenador" }
    ]
};


// Render del menu
function renderMenu() {
    const menuUl = document.getElementById('dynamicMenu');
    if (!menuUl) {
        console.error("No se encontró el elemento dynamicMenu");
        return;
    }
    
    menuUl.innerHTML = '';
    const menus = roleMenus[currentUser.role] || [];
    
    menus.forEach(item => {
        const li = document.createElement('li');
        
        if (item.submenu) {
            // Item con submenú
            li.style.display = 'block';
            li.style.padding = '0';
            
            const principalDiv = document.createElement('div');
            principalDiv.className = 'menu-item-principal';
            principalDiv.setAttribute('data-has-submenu', 'true');
            
            const iconSpan = document.createElement('i');
            iconSpan.className = item.icon;
            
            const textSpan = document.createElement('span');
            textSpan.textContent = item.label;
            
            const chevronSpan = document.createElement('i');
            chevronSpan.className = 'fas fa-chevron-down chevron';
            
            principalDiv.appendChild(iconSpan);
            principalDiv.appendChild(textSpan);
            principalDiv.appendChild(chevronSpan);
            
            const submenuDiv = document.createElement('div');
            submenuDiv.className = 'submenu-container';
            
            item.submenu.forEach(sub => {
                const subItem = document.createElement('div');
                subItem.className = 'submenu-item';
                
                const subIcon = document.createElement('i');
                subIcon.className = 'fas fa-circle';
                subIcon.style.fontSize = '0.5rem';
                subIcon.style.verticalAlign = 'middle';
                
                const subText = document.createElement('span');
                subText.textContent = sub.label;
                
                subItem.appendChild(subIcon);
                subItem.appendChild(subText);
                
                subItem.onclick = (e) => {
                    e.stopPropagation();
                    if (typeof window[sub.view] === 'function') {
                        window[sub.view]();
                    }
                    document.querySelectorAll('.submenu-item').forEach(si => si.classList.remove('active'));
                    subItem.classList.add('active');
                    

                };
                
                submenuDiv.appendChild(subItem);
            });
            
            li.appendChild(principalDiv);
            li.appendChild(submenuDiv);
            
            principalDiv.onclick = (e) => {
                e.stopPropagation();
                
                document.querySelectorAll('.submenu-container').forEach(container => {
                    if (container !== submenuDiv) {
                        container.classList.remove('show');
                        const otherChevron = container.parentElement?.querySelector('.chevron');
                        if (otherChevron) otherChevron.classList.remove('rotated');
                    }
                });
                
                submenuDiv.classList.toggle('show');
                chevronSpan.classList.toggle('rotated');
            };
            
        } else {
            const principalDiv = document.createElement('div');
            principalDiv.className = 'menu-item-principal';
            
            const iconSpan = document.createElement('i');
            iconSpan.className = item.icon;
            
            const textSpan = document.createElement('span');
            textSpan.textContent = item.label;
            
            principalDiv.appendChild(iconSpan);
            principalDiv.appendChild(textSpan);
            
            principalDiv.onclick = () => {
                if (typeof window[item.view] === 'function') {
                    window[item.view]();
                }
                document.querySelectorAll('.menu-item-principal').forEach(mi => mi.classList.remove('active'));
                principalDiv.classList.add('active');
            };
            
            li.appendChild(principalDiv);
        }
        
        menuUl.appendChild(li);
    });
    
    console.log("Menú renderizado correctamente para rol:", currentUser.role);
}





function showNotification(msg, isError = false) {
    const area = document.getElementById('notificationArea');
    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.style.backgroundColor = isError ? '#f56565' : '#48bb78';
    notif.innerText = msg;
    area.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}



















// ----------- Modulo Miembros ------------

// Registrar miembro
function viewRegistrarMiembro() {
    document.getElementById('pageTitle').innerText = "Registrar Nuevo Miembro";
    const container = document.getElementById('dynamicContent');
    
    let fotoSubida = false;
    let fotoData = null;
    
    container.innerHTML = `
        <div class="card">
            <h3><i class="fas fa-user-plus"></i> Registrar Nuevo Miembro</h3>
            <div class="form-group"><label>Nombre y Apellido *</label><input type="text" id="newNombre" placeholder="Nombre y Apellido"></div>
            <div class="form-group"><label>Dirección *</label><input type="text" id="newDireccion" placeholder="Dirección"></div>
            <div class="form-group"><label>Teléfono *</label><input type="text" id="newTelefono" placeholder="Teléfono"></div>
            <div class="form-group"><label>Fecha de Nacimiento *</label><input type="date" id="newFechaNac"></div>
            <div class="form-group"><label>DNI *</label><input type="text" id="newDni" placeholder="Documento Nacional de Identidad"></div>
            <div class="form-group"><label>Tipo de Membresía *</label><select id="newMembresia">${db.membresias.map(m => `<option>${m.nombre}</option>`).join('')}</select></div>
            <div class="form-group">
                <label>Fotografía * (obligatoria para el carnet)</label>
                <input type="file" id="fotoInput" accept="image/*">
                <div id="fotoPreview" style="margin-top: 10px; display: none;"></div>
            </div>
            <div style="display: flex; gap: 0.5rem;">
                <button id="guardarMiembroBtn" class="btn-success">Guardar</button>
                <button id="cancelarMiembroBtn" class="btn-secondary">Cancelar</button>
            </div>
            <div id="registroMsg" style="margin-top: 0.5rem;"></div>
        </div>
        <div id="carnetGenerado" style="display:none;" class="card"></div>
    `;
    
    document.getElementById('fotoInput').onchange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function(event) {
                fotoData = event.target.result;
                fotoSubida = true;
                const preview = document.getElementById('fotoPreview');
                preview.style.display = 'block';
                preview.innerHTML = `<img src="${fotoData}" style="max-width: 100px; border-radius: 10px;"> <span style="color:green;">✓ Foto cargada</span>`;
                showNotification("Foto cargada correctamente", false);
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            fotoSubida = false;
            fotoData = null;
            document.getElementById('fotoPreview').style.display = 'none';
        }
    };
    
    document.getElementById('guardarMiembroBtn').onclick = () => {
        const nombre = document.getElementById('newNombre').value.trim();
        const direccion = document.getElementById('newDireccion').value.trim();
        const telefono = document.getElementById('newTelefono').value.trim();
        const fechaNac = document.getElementById('newFechaNac').value;
        const dni = document.getElementById('newDni').value.trim();
        const tipo = document.getElementById('newMembresia').value;
        const registroMsg = document.getElementById('registroMsg');

        if (!nombre) { 
            showNotification("Por favor, completar el campo Nombre y Apellido", true);
            registroMsg.innerHTML = '<p style="color: red;">⚠️ Por favor, completar el campo Nombre y Apellido</p>';
            return; 
        }
        if (!direccion) { 
            showNotification("Por favor, completar el campo Dirección", true);
            registroMsg.innerHTML = '<p style="color: red;">⚠️ Por favor, completar el campo Dirección</p>';
            return; 
        }
        if (!telefono) { 
            showNotification("Por favor, completar el campo Teléfono", true);
            registroMsg.innerHTML = '<p style="color: red;">⚠️ Por favor, completar el campo Teléfono</p>';
            return; 
        }
        if (!fechaNac) { 
            showNotification("Por favor, completar el campo Fecha de Nacimiento", true);
            registroMsg.innerHTML = '<p style="color: red;">⚠️ Por favor, completar el campo Fecha de Nacimiento</p>';
            return; 
        }
        if (!dni) { 
            showNotification("Por favor, completar el campo DNI", true);
            registroMsg.innerHTML = '<p style="color: red;">⚠️ Por favor, completar el campo DNI</p>';
            return; 
        }
        if (!fotoSubida || !fotoData) { 
            showNotification("Por favor, tomar una foto", true);
            registroMsg.innerHTML = '<p style="color: red;">⚠️ Por favor, tomar una foto</p>';
            return; 
        }

        const newId = db.miembros.length + 1;
        const nuevoMiembro = {
            id: newId,
            nombre,
            direccion,
            telefono,
            fechaNac,
            dni,
            tipoMembresia: tipo,
            foto: fotoData,
            estadoPago: "Pendiente"
        };
        db.miembros.push(nuevoMiembro);
        saveDB();
        
        showNotification("Datos guardados correctamente", false);
        showNotification("Carnet creado con éxito", false);
        registroMsg.innerHTML = '<p style="color: green;">✅ Datos guardados correctamente. Carnet creado con éxito.</p>';
        
        // Mostrar carnet generado con código de barras JsBarcode
        const carnetDiv = document.getElementById('carnetGenerado');
        carnetDiv.style.display = 'block';
        const carnet = mostrarCarnet(nuevoMiembro);
        carnetDiv.innerHTML = `
            <h3><i class="fas fa-id-card"></i> Carnet Generado</h3>
            ${carnet.html}
            <button id="cerrarCarnetBtn" class="btn-secondary" style="margin-top: 1rem;">Cerrar</button>
            <button id="imprimirCarnetBtn" class="btn-print" style="margin-top: 1rem; margin-left: 0.5rem;">Imprimir Carnet</button>
        `;
        
        // Generar código de barras
        generarCodigoBarrasEnCarnet(carnet.barcodeId, carnet.barcodeText);
        
        document.getElementById('cerrarCarnetBtn').onclick = () => {
            carnetDiv.style.display = 'none';
        };
        
        document.getElementById('imprimirCarnetBtn').onclick = () => {
            const contenido = carnetDiv.innerHTML;
            const ventana = window.open('', '_blank');
            ventana.document.write(`
                <html>
                <head>
                    <title>Carnet de ${nuevoMiembro.nombre}</title>
                    <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"><\/script>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f7fa; }
                        @media print {
                            body { margin: 0; padding: 0; }
                            .no-print { display: none; }
                        }
                    </style>
                </head>
                <body>
                    <div id="carnetPrint">${carnet.html}</div>
                    <script>
                        const codigoTexto = "${carnet.barcodeText}";
                        const svg = document.querySelector('#carnetPrint svg');
                        if (svg && typeof JsBarcode !== 'undefined') {
                            JsBarcode(svg, codigoTexto, {
                                format: "CODE128",
                                width: 1.5,
                                height: 40,
                                displayValue: false,
                                background: "white",
                                lineColor: "#227c6c"
                            });
                        }
                        setTimeout(() => { window.print(); window.close(); }, 500);
                    <\/script>
                </body>
                </html>
            `);
            ventana.document.close();
        };
        
        // Limpiar formulario
        document.getElementById('newNombre').value = '';
        document.getElementById('newDireccion').value = '';
        document.getElementById('newTelefono').value = '';
        document.getElementById('newFechaNac').value = '';
        document.getElementById('newDni').value = '';
        document.getElementById('fotoInput').value = '';
        document.getElementById('fotoPreview').style.display = 'none';
        fotoSubida = false;
        fotoData = null;
        
        setTimeout(() => {
            registroMsg.innerHTML = '';
        }, 3000);
    };
    
    document.getElementById('cancelarMiembroBtn').onclick = () => {
        document.getElementById('newNombre').value = '';
        document.getElementById('newDireccion').value = '';
        document.getElementById('newTelefono').value = '';
        document.getElementById('newFechaNac').value = '';
        document.getElementById('newDni').value = '';
        document.getElementById('fotoInput').value = '';
        document.getElementById('fotoPreview').style.display = 'none';
        document.getElementById('registroMsg').innerHTML = '';
        fotoSubida = false;
        fotoData = null;
        showNotification("Campos limpiados", false);
    };
}

// Modificar miembro
function viewModificarMiembro() {
    document.getElementById('pageTitle').innerText = "Modificar Miembro";
    const container = document.getElementById('dynamicContent');
    
    let nuevaFotoData = null;
    let nuevaFotoSubida = false;
    
    function actualizarSelectMiembros() {
        const select = document.getElementById('selectMiembroModificar');
        if (select) {
            select.innerHTML = '<option value="">-- Seleccione un miembro --</option>' + 
                db.miembros.map(m => `<option value="${m.id}">${m.nombre} (DNI: ${m.dni})</option>`).join('');
        }
    }
    
    function cargarDatosMiembro() {
        const id = parseInt(document.getElementById('selectMiembroModificar').value);
        if (!id) {
            document.getElementById('editNombre').value = '';
            document.getElementById('editDireccion').value = '';
            document.getElementById('editTelefono').value = '';
            document.getElementById('editFechaNac').value = '';
            document.getElementById('editDni').value = '';
            document.getElementById('editMembresia').value = '';
            document.getElementById('fotoPreviewEdit').style.display = 'none';
            nuevaFotoSubida = false;
            nuevaFotoData = null;
            return;
        }
        const m = db.miembros.find(x => x.id === id);
        if (m) {
            document.getElementById('editNombre').value = m.nombre;
            document.getElementById('editDireccion').value = m.direccion;
            document.getElementById('editTelefono').value = m.telefono;
            document.getElementById('editFechaNac').value = m.fechaNac;
            document.getElementById('editDni').value = m.dni;
            document.getElementById('editMembresia').value = m.tipoMembresia;
            
            const fotoPreview = document.getElementById('fotoPreviewEdit');
            if (m.foto) {
                fotoPreview.style.display = 'block';
                fotoPreview.innerHTML = `
                    <p>Foto actual:</p>
                    <img src="${m.foto}" style="max-width: 100px; border-radius: 10px;">
                    <p><small>Seleccione una nueva foto si desea cambiarla</small></p>
                `;
            } else {
                fotoPreview.style.display = 'block';
                fotoPreview.innerHTML = '<p>No hay foto registrada</p>';
            }
            nuevaFotoSubida = false;
            nuevaFotoData = null;
        }
    }
    
    container.innerHTML = `
        <div class="card">
            <h3><i class="fas fa-edit"></i> Modificar Datos de Miembro</h3>
            <div class="form-group">
                <label>Seleccionar Miembro</label>
                <select id="selectMiembroModificar">
                    <option value="">-- Seleccione un miembro --</option>
                    ${db.miembros.map(m => `<option value="${m.id}">${m.nombre} (DNI: ${m.dni})</option>`).join('')}
                </select>
            </div>
            <div class="form-group"><label>Nombre y Apellido</label><input type="text" id="editNombre" placeholder="Nombre y Apellido"></div>
            <div class="form-group"><label>Dirección</label><input type="text" id="editDireccion" placeholder="Dirección"></div>
            <div class="form-group"><label>Teléfono</label><input type="text" id="editTelefono" placeholder="Teléfono"></div>
            <div class="form-group"><label>Fecha de Nacimiento</label><input type="date" id="editFechaNac"></div>
            <div class="form-group"><label>DNI</label><input type="text" id="editDni" placeholder="DNI"></div>
            <div class="form-group"><label>Tipo de Membresía</label><select id="editMembresia">${db.membresias.map(m => `<option>${m.nombre}</option>`).join('')}</select></div>
            <div class="form-group">
                <label>Fotografía (opcional - dejar vacío para mantener la actual)</label>
                <input type="file" id="editFotoInput" accept="image/*">
                <div id="fotoPreviewEdit" style="margin-top: 10px; display: none;"></div>
            </div>
            <div style="display: flex; gap: 0.5rem;">
                <button id="guardarModificacionBtn" class="btn-success">Guardar Cambios</button>
                <button id="cancelarModificacionBtn" class="btn-secondary">Cancelar</button>
            </div>
            <div id="modificacionMsg" style="margin-top: 0.5rem;"></div>
        </div>
        <div id="carnetActualizado" style="display:none;" class="card"></div>
    `;
    
    document.getElementById('selectMiembroModificar').onchange = cargarDatosMiembro;
    
    document.getElementById('editFotoInput').onchange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function(event) {
                nuevaFotoData = event.target.result;
                nuevaFotoSubida = true;
                const preview = document.getElementById('fotoPreviewEdit');
                preview.innerHTML = `
                    <p>Nueva foto seleccionada:</p>
                    <img src="${nuevaFotoData}" style="max-width: 100px; border-radius: 10px;">
                    <p style="color:green;">✓ Se actualizará la foto al guardar</p>
                `;
                showNotification("Nueva foto cargada, se actualizará al guardar", false);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    
    document.getElementById('guardarModificacionBtn').onclick = () => {
        const id = parseInt(document.getElementById('selectMiembroModificar').value);
        const modificacionMsg = document.getElementById('modificacionMsg');
        
        if (!id) {
            showNotification("Por favor, seleccione un miembro para modificar", true);
            modificacionMsg.innerHTML = '<p style="color: red;">⚠️ Por favor, seleccione un miembro para modificar</p>';
            return;
        }
        
        const nombre = document.getElementById('editNombre').value.trim();
        const direccion = document.getElementById('editDireccion').value.trim();
        const telefono = document.getElementById('editTelefono').value.trim();
        const fechaNac = document.getElementById('editFechaNac').value;
        const dni = document.getElementById('editDni').value.trim();
        const tipo = document.getElementById('editMembresia').value;
        
        if (!nombre) { 
            showNotification("Por favor, completar el campo Nombre y Apellido", true);
            modificacionMsg.innerHTML = '<p style="color: red;">⚠️ Por favor, completar el campo Nombre y Apellido</p>';
            return; 
        }
        if (!direccion) { 
            showNotification("Por favor, completar el campo Dirección", true);
            modificacionMsg.innerHTML = '<p style="color: red;">⚠️ Por favor, completar el campo Dirección</p>';
            return; 
        }
        if (!telefono) { 
            showNotification("Por favor, completar el campo Teléfono", true);
            modificacionMsg.innerHTML = '<p style="color: red;">⚠️ Por favor, completar el campo Teléfono</p>';
            return; 
        }
        if (!fechaNac) { 
            showNotification("Por favor, completar el campo Fecha de Nacimiento", true);
            modificacionMsg.innerHTML = '<p style="color: red;">⚠️ Por favor, completar el campo Fecha de Nacimiento</p>';
            return; 
        }
        if (!dni) { 
            showNotification("Por favor, completar el campo DNI", true);
            modificacionMsg.innerHTML = '<p style="color: red;">⚠️ Por favor, completar el campo DNI</p>';
            return; 
        }
        
        const index = db.miembros.findIndex(m => m.id === id);
        if (index !== -1) {
            db.miembros[index] = {
                ...db.miembros[index],
                nombre,
                direccion,
                telefono,
                fechaNac,
                dni,
                tipoMembresia: tipo,
                foto: nuevaFotoSubida ? nuevaFotoData : db.miembros[index].foto
            };
            saveDB();
            
            showNotification("Modificación realizada correctamente", false);
            modificacionMsg.innerHTML = '<p style="color: green;">✅ Modificación realizada correctamente</p>';
            
            const carnetDiv = document.getElementById('carnetActualizado');
            carnetDiv.style.display = 'block';
            const carnet = mostrarCarnet(db.miembros[index]);
            carnetDiv.innerHTML = `
                <h3><i class="fas fa-id-card"></i> Carnet Actualizado</h3>
                ${carnet.html}
                <button id="cerrarCarnetActualizadoBtn" class="btn-secondary" style="margin-top: 1rem;">Cerrar</button>
                <button id="imprimirCarnetActualizadoBtn" class="btn-print" style="margin-top: 1rem; margin-left: 0.5rem;">Imprimir Carnet</button>
            `;
            
            generarCodigoBarrasEnCarnet(carnet.barcodeId, carnet.barcodeText);
            
            document.getElementById('cerrarCarnetActualizadoBtn').onclick = () => {
                carnetDiv.style.display = 'none';
            };
            
            document.getElementById('imprimirCarnetActualizadoBtn').onclick = () => {
                const miembroActual = db.miembros[index];
                const nuevoCarnet = mostrarCarnet(miembroActual);
                const ventana = window.open('', '_blank');
                ventana.document.write(`
                    <html>
                    <head>
                        <title>Carnet de ${miembroActual.nombre}</title>
                        <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"><\/script>
                        <style>
                            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f7fa; }
                            @media print { body { margin: 0; padding: 0; } }
                        </style>
                    </head>
                    <body>
                        <div id="carnetPrint">${nuevoCarnet.html}</div>
                        <script>
                            const codigoTexto = "${nuevoCarnet.barcodeText}";
                            const svg = document.querySelector('#carnetPrint svg');
                            if (svg && typeof JsBarcode !== 'undefined') {
                                JsBarcode(svg, codigoTexto, {
                                    format: "CODE128",
                                    width: 1.5,
                                    height: 40,
                                    displayValue: false,
                                    background: "white",
                                    lineColor: "#227c6c"
                                });
                            }
                            setTimeout(() => { window.print(); window.close(); }, 500);
                        <\/script>
                    </body>
                    </html>
                `);
                ventana.document.close();
            };
            
            actualizarSelectMiembros();
            
            setTimeout(() => {
                modificacionMsg.innerHTML = '';
            }, 3000);
        }
    };
    
    document.getElementById('cancelarModificacionBtn').onclick = () => {
        document.getElementById('selectMiembroModificar').value = '';
        document.getElementById('editNombre').value = '';
        document.getElementById('editDireccion').value = '';
        document.getElementById('editTelefono').value = '';
        document.getElementById('editFechaNac').value = '';
        document.getElementById('editDni').value = '';
        document.getElementById('editFotoInput').value = '';
        document.getElementById('fotoPreviewEdit').style.display = 'none';
        document.getElementById('modificacionMsg').innerHTML = '';
        nuevaFotoSubida = false;
        nuevaFotoData = null;
        showNotification("Modificación cancelada", false);
    };
}

// Consultar miembro
function viewConsultarMiembro() {
    document.getElementById('pageTitle').innerText = "Consultar Miembro";
    const container = document.getElementById('dynamicContent');
    
    container.innerHTML = `
        <div class="card">
            <h3><i class="fas fa-search"></i> Consultar Datos de Miembro</h3>
            <div class="form-group">
                <label>Seleccionar Miembro</label>
                <select id="selectMiembroConsultar">
                    <option value="">-- Seleccione un miembro --</option>
                    ${db.miembros.map(m => `<option value="${m.id}">${m.nombre} (DNI: ${m.dni})</option>`).join('')}
                </select>
            </div>
            <button id="consultarBtn" class="btn-info">Consultar</button>
            <div id="miembroData" style="margin-top:1rem;"></div>
            <div id="consultaMsg" style="margin-top: 0.5rem;"></div>
        </div>
    `;
    
    document.getElementById('consultarBtn').onclick = () => {
        const id = parseInt(document.getElementById('selectMiembroConsultar').value);
        const consultaMsg = document.getElementById('consultaMsg');
        
        if (!id) {
            showNotification("Por favor, seleccione un miembro", true);
            consultaMsg.innerHTML = '<p style="color: red;">⚠️ Por favor, seleccione un miembro</p>';
            return;
        }
        const m = db.miembros.find(x => x.id === id);
        if (m) {
            const carnet = mostrarCarnet(m);
            document.getElementById('miembroData').innerHTML = `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div style="background:#f8fafc; padding:1rem; border-radius:12px;">
                        <p><strong><i class="fas fa-user"></i> Nombre:</strong> ${m.nombre}</p>
                        <p><strong><i class="fas fa-id-card"></i> DNI:</strong> ${m.dni}</p>
                        <p><strong><i class="fas fa-home"></i> Dirección:</strong> ${m.direccion}</p>
                        <p><strong><i class="fas fa-phone"></i> Teléfono:</strong> ${m.telefono}</p>
                        <p><strong><i class="fas fa-calendar"></i> Fecha Nacimiento:</strong> ${m.fechaNac}</p>
                        <p><strong><i class="fas fa-tag"></i> Membresía:</strong> ${m.tipoMembresia}</p>
                        <p><strong><i class="fas fa-credit-card"></i> Estado Pago:</strong> <span style="color: ${m.estadoPago === 'Pagado' ? 'green' : 'red'}">${m.estadoPago}</span></p>
                    </div>
                    <div id="carnetContainer">
                        ${carnet.html}
                    </div>
                </div>
            `;
            generarCodigoBarrasEnCarnet(carnet.barcodeId, carnet.barcodeText);
            consultaMsg.innerHTML = '';
        }
    };
    
}

// Eliminar miembro
function viewEliminarMiembro() {
    document.getElementById('pageTitle').innerText = "Eliminar Miembro";
    const container = document.getElementById('dynamicContent');
    
    function actualizarSelectMiembros() {
        const select = document.getElementById('selectMiembroEliminar');
        if (select) {
            select.innerHTML = '<option value="">-- Seleccione un miembro --</option>' + 
                db.miembros.map(m => `<option value="${m.id}">${m.nombre} (DNI: ${m.dni})</option>`).join('');
        }
    }
    
    container.innerHTML = `
        <div class="card">
            <h3><i class="fas fa-trash-alt"></i> Eliminar Miembro</h3>
            <div class="form-group">
                <label>Seleccionar Miembro</label>
                <select id="selectMiembroEliminar">
                    <option value="">-- Seleccione un miembro --</option>
                    ${db.miembros.map(m => `<option value="${m.id}">${m.nombre} (DNI: ${m.dni})</option>`).join('')}
                </select>
            </div>
            <button id="eliminarBtn" class="btn-danger">Eliminar</button>
            <div id="eliminarMsg" style="margin-top: 0.5rem;"></div>
        </div>
    `;
    
    document.getElementById('eliminarBtn').onclick = () => {
        const id = parseInt(document.getElementById('selectMiembroEliminar').value);
        const eliminarMsg = document.getElementById('eliminarMsg');
        
        if (!id) {
            showNotification("Por favor, seleccione un miembro", true);
            eliminarMsg.innerHTML = '<p style="color: red;">⚠️ Por favor, seleccione un miembro</p>';
            return;
        }
        const miembro = db.miembros.find(m => m.id === id);
        if (confirm(`¿Está seguro de eliminar a ${miembro.nombre}?`)) {
            db.miembros = db.miembros.filter(m => m.id !== id);
            saveDB();
            showNotification("Eliminación realizada correctamente", false);
            eliminarMsg.innerHTML = '<p style="color: green;">✅ Miembro eliminado correctamente</p>';
            actualizarSelectMiembros();
            
            setTimeout(() => {
                eliminarMsg.innerHTML = '';
            }, 3000);
        }
    };
    
}


// ----- Generar codigo de barras -----
function mostrarCarnet(miembro) {
    const fechaEmision = new Date().toLocaleDateString('es-AR');
    const codigoTexto = `${miembro.dni}-${miembro.id}`;
    const carnetId = `barcode-${miembro.id}-${Date.now()}`;
    
    const carnetHTML = `
        <div style="background: linear-gradient(135deg, #227c6c 0%, #1a5f52 100%); border-radius: 20px; padding: 20px; color: white; max-width: 450px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 15px;">
                <h2 style="margin: 0; font-size: 24px;">Cuerpo Sano</h2>
                <p style="margin: 0; font-size: 12px;">Gimnasio "Su Mejor Peso"</p>
            </div>
            <div style="display: flex; gap: 15px; background: white; border-radius: 15px; padding: 15px; color: #333;">
                ${miembro.foto ? `<div style="width: 100px; height: 100px; border-radius: 10px; overflow: hidden; background: #f0f0f0;">
                    <img src="${miembro.foto}" style="width: 100%; height: 100%; object-fit: cover;">
                </div>` : '<div style="width: 100px; height: 100px; border-radius: 10px; background: #e2e8f0; display: flex; align-items: center; justify-content: center;"><i class="fas fa-user" style="font-size: 40px; color: #94a3b8;"></i></div>'}
                <div style="flex: 1;">
                    <p><strong>${miembro.nombre}</strong></p>
                    <p style="font-size: 12px;">DNI: ${miembro.dni}</p>
                    <p style="font-size: 12px;">Membresía: ${miembro.tipoMembresia}</p>
                    <p style="font-size: 12px;">Emisión: ${fechaEmision}</p>
                </div>
            </div>
            <div style="background: white; margin-top: 15px; padding: 10px; border-radius: 10px; text-align: center;">
                <svg id="${carnetId}" style="width: 100%; height: auto;"></svg>
                <p style="font-size: 10px; color: #666; margin-top: 5px;">${codigoTexto}</p>
            </div>
            <div style="text-align: center; margin-top: 15px; font-size: 10px;">
                <p>Presente este carnet al ingresar al establecimiento</p>
            </div>
        </div>
    `;
    
    // Retornar el HTML y el ID para generar el código de barras después
    return { html: carnetHTML, barcodeId: carnetId, barcodeText: codigoTexto };
}

// Función para generar el código de barras en el SVG
function generarCodigoBarrasEnCarnet(id, texto) {
    setTimeout(() => {
        const svg = document.getElementById(id);
        if (svg && typeof JsBarcode !== 'undefined') {
            JsBarcode(svg, texto, {
                format: "CODE128",
                width: 1.5,
                height: 40,
                displayValue: false,
                background: "white",
                lineColor: "#227c6c"
            });
        }
    }, 100);
}




















// ----------- Modulo Membresias ------------

// Registrar membresia
function viewRegistrarMembresia() {
    document.getElementById('pageTitle').innerText = "Registrar Nueva Membresía";
    const container = document.getElementById('dynamicContent');
    
    container.innerHTML = `
        <div class="card">
            <h3><i class="fas fa-plus-circle"></i> Registrar Nueva Membresía</h3>
            <div class="form-group">
                <label>Nombre *</label>
                <input type="text" id="memNombre" placeholder="Ej: Mensual, Cuatrimestral, Semestral, Anual">
            </div>
            <div class="form-group">
                <label>Precio *</label>
                <input type="number" id="memPrecio" placeholder="Precio en pesos">
            </div>
            <div class="form-group">
                <label>Duración (días) *</label>
                <input type="number" id="memDuracion" placeholder="Ej: 30, 120, 180, 365">
            </div>
            <div style="display: flex; gap: 0.5rem;">
                <button id="guardarMemBtn" class="btn-success">Guardar</button>
                <button id="cancelarMemBtn" class="btn-secondary">Cancelar</button>
            </div>
            <div id="registroMemMsg" style="margin-top: 0.5rem;"></div>
        </div>
    `;
    
    document.getElementById('guardarMemBtn').onclick = () => {
        const nombre = document.getElementById('memNombre').value.trim();
        const precio = parseFloat(document.getElementById('memPrecio').value);
        const duracion = parseInt(document.getElementById('memDuracion').value);
        
        if (!nombre) {
            showNotification("Por favor, completar el campo Nombre", true);
            return;
        }
        if (!precio || isNaN(precio)) {
            showNotification("Por favor, completar el campo Precio con un valor válido", true);
            return;
        }
        if (!duracion || isNaN(duracion)) {
            showNotification("Por favor, completar el campo Duración con un valor válido", true);
            return;
        }
        
        const newId = db.membresias.length + 1;
        db.membresias.push({ id: newId, nombre, precio, duracion });
        saveDB();
        
        document.getElementById('registroMemMsg').innerHTML = '<p style="color:green;">✅ Datos guardados correctamente</p>';
        showNotification("Datos guardados correctamente", false);
        
        document.getElementById('memNombre').value = '';
        document.getElementById('memPrecio').value = '';
        document.getElementById('memDuracion').value = '';
        
        setTimeout(() => {
            document.getElementById('registroMemMsg').innerHTML = '';
        }, 3000);
    };
    
    document.getElementById('cancelarMemBtn').onclick = () => {
        document.getElementById('memNombre').value = '';
        document.getElementById('memPrecio').value = '';
        document.getElementById('memDuracion').value = '';
        document.getElementById('registroMemMsg').innerHTML = '';
        showNotification("Registro cancelado", false);
    };
}

// Modificar membresia
function viewModificarMembresia() {
    document.getElementById('pageTitle').innerText = "Modificar Membresía";
    const container = document.getElementById('dynamicContent');
    
    function cargarDatosMembresia() {
        const id = parseInt(document.getElementById('selectMembresiaModificar').value);
        if (!id) {
            document.getElementById('editMemNombre').value = '';
            document.getElementById('editMemPrecio').value = '';
            document.getElementById('editMemDuracion').value = '';
            return;
        }
        const m = db.membresias.find(x => x.id === id);
        if (m) {
            document.getElementById('editMemNombre').value = m.nombre;
            document.getElementById('editMemPrecio').value = m.precio;
            document.getElementById('editMemDuracion').value = m.duracion;
        }
    }
    
    container.innerHTML = `
        <div class="card">
            <h3><i class="fas fa-edit"></i> Modificar Membresía</h3>
            <div class="form-group">
                <label>Seleccionar Membresía</label>
                <select id="selectMembresiaModificar">
                    <option value="">-- Seleccione una membresía --</option>
                    ${db.membresias.map(m => `<option value="${m.id}">${m.nombre}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label>Nombre</label>
                <input type="text" id="editMemNombre" placeholder="Nombre">
            </div>
            <div class="form-group">
                <label>Precio</label>
                <input type="number" id="editMemPrecio" placeholder="Precio">
            </div>
            <div class="form-group">
                <label>Duración (días)</label>
                <input type="number" id="editMemDuracion" placeholder="Duración">
            </div>
            <div style="display: flex; gap: 0.5rem;">
                <button id="guardarModificacionMemBtn" class="btn-success">Guardar Cambios</button>
                <button id="cancelarModificacionMemBtn" class="btn-secondary">Cancelar</button>
            </div>
            <div id="modificacionMemMsg" style="margin-top:1rem;"></div>
        </div>
    `;
    
    document.getElementById('selectMembresiaModificar').onchange = cargarDatosMembresia;
    
    document.getElementById('guardarModificacionMemBtn').onclick = () => {
        const id = parseInt(document.getElementById('selectMembresiaModificar').value);
        if (!id) {
            showNotification("Por favor, seleccione una membresía para modificar", true);
            return;
        }
        
        const nombre = document.getElementById('editMemNombre').value.trim();
        const precio = parseFloat(document.getElementById('editMemPrecio').value);
        const duracion = parseInt(document.getElementById('editMemDuracion').value);
        
        if (!nombre) {
            showNotification("Por favor, completar el campo Nombre", true);
            return;
        }
        if (!precio || isNaN(precio)) {
            showNotification("Por favor, completar el campo Precio", true);
            return;
        }
        if (!duracion || isNaN(duracion)) {
            showNotification("Por favor, completar el campo Duración", true);
            return;
        }
        
        const index = db.membresias.findIndex(m => m.id === id);
        if (index !== -1) {
            db.membresias[index] = { id, nombre, precio, duracion };
            saveDB();
            document.getElementById('modificacionMemMsg').innerHTML = '<p style="color:green;">✅ Modificación realizada correctamente</p>';
            showNotification("Modificación realizada correctamente", false);
            
            // Actualizar select
            const select = document.getElementById('selectMembresiaModificar');
            select.innerHTML = '<option value="">-- Seleccione una membresía --</option>' + 
                db.membresias.map(m => `<option value="${m.id}">${m.nombre}</option>`).join('');
        }
        
        setTimeout(() => {
            document.getElementById('modificacionMemMsg').innerHTML = '';
        }, 3000);
    };
    
    document.getElementById('cancelarModificacionMemBtn').onclick = () => {
        document.getElementById('selectMembresiaModificar').value = '';
        document.getElementById('editMemNombre').value = '';
        document.getElementById('editMemPrecio').value = '';
        document.getElementById('editMemDuracion').value = '';
        document.getElementById('modificacionMemMsg').innerHTML = '';
        showNotification("Modificación cancelada", false);
    };
}

// Consultar membresia
function viewConsultarMembresia() {
    document.getElementById('pageTitle').innerText = "Consultar Membresía";
    const container = document.getElementById('dynamicContent');
    
    container.innerHTML = `
        <div class="card">
            <h3><i class="fas fa-search"></i> Consultar Membresía</h3>
            <div class="form-group">
                <label>Seleccionar Membresía</label>
                <select id="selectMembresiaConsultar">
                    <option value="">-- Seleccione una membresía --</option>
                    ${db.membresias.map(m => `<option value="${m.id}">${m.nombre}</option>`).join('')}
                </select>
            </div>
            <button id="consultarMemBtn" class="btn-info">Consultar</button>
            <div id="consultaMemMsg" style="margin-top: 0.5rem;"></div>
        </div>
        
        <div id="memDataContainer" style="display: none;">
            <div class="card">
                <h3><i class="fas fa-info-circle"></i> Información de la Membresía</h3>
                <div id="memData" style="padding: 1rem; background: #f8fafc; border-radius: 12px;"></div>
            </div>
            
            <div class="card">
                <h3><i class="fas fa-users"></i> Miembros con esta Membresía</h3>
                <div class="table-responsive">
                    <table id="miembrosMembresiaTable">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre y Apellido</th>
                                <th>DNI</th>
                                <th>Teléfono</th>
                                <th>Estado de Pago</th>
                            </thead>
                        <tbody id="miembrosMembresiaBody">
                            <tr><td colspan="5" style="text-align: center;">Seleccione una membresía para ver los miembros</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        
    `;
    
    document.getElementById('consultarMemBtn').onclick = () => {
        const id = parseInt(document.getElementById('selectMembresiaConsultar').value);
        const consultaMsg = document.getElementById('consultaMemMsg');
        
        if (!id) {
            showNotification("Por favor, seleccione una membresía", true);
            consultaMsg.innerHTML = '<p style="color: red;">⚠️ Por favor, seleccione una membresía</p>';
            return;
        }
        
        const m = db.membresias.find(x => x.id === id);
        if (m) {
            const miembrosConMembresia = db.miembros.filter(mi => mi.tipoMembresia === m.nombre);
            
            document.getElementById('memData').innerHTML = `
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
                    <div><strong><i class="fas fa-tag"></i> Nombre:</strong> ${m.nombre}</div>
                    <div><strong><i class="fas fa-dollar-sign"></i> Precio:</strong> $${m.precio.toLocaleString('es-AR')}</div>
                    <div><strong><i class="fas fa-calendar-alt"></i> Duración:</strong> ${m.duracion} días</div>
                    <div><strong><i class="fas fa-users"></i> Total Miembros:</strong> ${miembrosConMembresia.length}</div>
                </div>
            `;
            
            const tbody = document.getElementById('miembrosMembresiaBody');
            if (miembrosConMembresia.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No hay miembros con esta membresía</td></tr>';
            } else {
                tbody.innerHTML = miembrosConMembresia.map(mi => `
                    <tr>
                        <td>${mi.id}</td>
                        <td><strong>${mi.nombre}</strong></td>
                        <td>${mi.dni}</td>
                        <td>${mi.telefono}</td>
                        <td style="color: ${mi.estadoPago === 'Pagado' ? 'green' : 'red'}; font-weight: bold;">
                            ${mi.estadoPago === 'Pagado' ? '✅ Pagado' : mi.estadoPago === 'Vencido' ? '❌ Vencido' : '⏳ Pendiente'}
                        </td>
                    </tr>
                `).join('');
            }
            
            document.getElementById('memDataContainer').style.display = 'block';
            consultaMsg.innerHTML = '<p style="color: green;">✅ Consulta realizada correctamente</p>';
            showNotification(`Se encontraron ${miembrosConMembresia.length} miembros con la membresía ${m.nombre}`, false);
            
            setTimeout(() => {
                consultaMsg.innerHTML = '';
            }, 3000);
        }
    };
    
}

// Eliminar membresia
function viewEliminarMembresia() {
    document.getElementById('pageTitle').innerText = "Eliminar Membresía";
    const container = document.getElementById('dynamicContent');
    
    function actualizarSelectMembresias() {
        const select = document.getElementById('selectMembresiaEliminar');
        if (select) {
            select.innerHTML = '<option value="">-- Seleccione una membresía --</option>' + 
                db.membresias.map(m => `<option value="${m.id}">${m.nombre}</option>`).join('');
        }
    }
    
    container.innerHTML = `
        <div class="card">
            <h3><i class="fas fa-trash-alt"></i> Eliminar Membresía</h3>
            <div class="form-group">
                <label>Seleccionar Membresía</label>
                <select id="selectMembresiaEliminar">
                    <option value="">-- Seleccione una membresía --</option>
                    ${db.membresias.map(m => `<option value="${m.id}">${m.nombre}</option>`).join('')}
                </select>
            </div>
            <button id="eliminarMemBtn" class="btn-danger">Eliminar</button>
            <div id="eliminarMemMsg" style="margin-top:1rem;"></div>
        </div>
    `;
    
    document.getElementById('eliminarMemBtn').onclick = () => {
        const id = parseInt(document.getElementById('selectMembresiaEliminar').value);
        if (!id) {
            showNotification("Por favor, seleccione una membresía para eliminar", true);
            return;
        }
        const membresia = db.membresias.find(m => m.id === id);
        if (confirm(`¿Está seguro de eliminar la membresía "${membresia.nombre}"?`)) {
            db.membresias = db.membresias.filter(m => m.id !== id);
            saveDB();
            showNotification("Eliminación realizada correctamente", false);
            document.getElementById('eliminarMemMsg').innerHTML = '<p style="color:green;">✅ Membresía eliminada correctamente</p>';
            actualizarSelectMembresias();
            setTimeout(() => {
                document.getElementById('eliminarMemMsg').innerHTML = '';
            }, 3000);
        }
    };
    
}

// Imprimir membresia
function viewImprimirMembresia() {
    document.getElementById('pageTitle').innerText = "Imprimir Información de Membresía";
    const container = document.getElementById('dynamicContent');
    
    container.innerHTML = `
        <div class="card">
            <h3><i class="fas fa-print"></i> Imprimir Información de Membresía</h3>
            <div class="form-group">
                <label>Seleccionar Membresía</label>
                <select id="selectMembresiaImprimir">
                    <option value="">-- Seleccione una membresía --</option>
                    ${db.membresias.map(m => `<option value="${m.id}">${m.nombre}</option>`).join('')}
                </select>
            </div>
            <button id="imprimirMemBtn" class="btn-print">Imprimir</button>
            <div id="impresionMemMsg" style="margin-top:1rem;"></div>
        </div>
    `;
    
    document.getElementById('imprimirMemBtn').onclick = () => {
        const id = parseInt(document.getElementById('selectMembresiaImprimir').value);
        if (!id) {
            showNotification("Por favor, seleccione una membresía para imprimir", true);
            return;
        }
        const m = db.membresias.find(x => x.id === id);
        if (m) {
            // Crear contenido para impresión
            const contenido = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Información de Membresía - ${m.nombre}</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 40px; }
                        .container { max-width: 600px; margin: 0 auto; border: 1px solid #ccc; padding: 20px; border-radius: 10px; }
                        h1 { color: #227c6c; text-align: center; }
                        .info { margin: 20px 0; }
                        .label { font-weight: bold; }
                        .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Cuerpo Sano - Gimnasio "Su Mejor Peso"</h1>
                        <h2>Información de Membresía</h2>
                        <div class="info">
                            <p><span class="label">Nombre:</span> ${m.nombre}</p>
                            <p><span class="label">Precio:</span> $${m.precio.toLocaleString('es-AR')}</p>
                            <p><span class="label">Duración:</span> ${m.duracion} días</p>
                        </div>
                        <div class="footer">
                            <p>Documento generado el ${new Date().toLocaleString('es-AR')}</p>
                            <p>Este documento es una constancia de la información de membresía.</p>
                        </div>
                    </div>
                </body>
                </html>
            `;
            
            const ventana = window.open('', '_blank');
            ventana.document.write(contenido);
            ventana.document.close();
            ventana.print();
            
            document.getElementById('impresionMemMsg').innerHTML = '<p style="color:green;">✅ Enviando a impresión...</p>';
            showNotification("Imprimiendo información de membresía...", false);
            setTimeout(() => {
                document.getElementById('impresionMemMsg').innerHTML = '';
            }, 2000);
        }
    };
    
}

// Estado de pago membresia
function viewEstadoPagoMembresia() {
    document.getElementById('pageTitle').innerText = "Estado de Pago de Membresías";
    const container = document.getElementById('dynamicContent');
    
    function getUltimoPago(miembroId) {
        const pagosMiembro = db.pagos.filter(p => p.miembroId === parseInt(miembroId)).sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        return pagosMiembro.length > 0 ? pagosMiembro[0] : null;
    }
    
    function calcularVigencia(miembro, ultimoPago) {
        if (!ultimoPago) return { estado: "Pendiente", color: "#f59e0b", mensaje: "No hay pagos registrados", icono: "⏳" };
        
        const membresia = db.membresias.find(m => m.nombre === miembro.tipoMembresia);
        if (!membresia) return { estado: "Desconocido", color: "#64748b", mensaje: "Tipo de membresía no encontrado", icono: "❓" };
        
        const fechaPago = new Date(ultimoPago.fecha);
        const fechaVencimiento = new Date(fechaPago);
        fechaVencimiento.setDate(fechaVencimiento.getDate() + membresia.duracion);
        const hoy = new Date();
        
        if (hoy > fechaVencimiento) {
            const diasVencido = Math.floor((hoy - fechaVencimiento) / (1000 * 60 * 60 * 24));
            return { 
                estado: "Vencido", 
                color: "#ef4444", 
                mensaje: `La membresía expiró el ${fechaVencimiento.toLocaleDateString('es-AR')} (hace ${diasVencido} días)`,
                icono: "❌"
            };
        } else {
            const diasRestantes = Math.ceil((fechaVencimiento - hoy) / (1000 * 60 * 60 * 24));
            return { 
                estado: "Pagado", 
                color: "#22c55e", 
                mensaje: `Próximo vencimiento: ${fechaVencimiento.toLocaleDateString('es-AR')} (${diasRestantes} días restantes)`,
                icono: "✅"
            };
        }
    }
    
    function consultarEstado() {
        const miembroId = document.getElementById('selectMiembroEstadoPago').value;
        const resultadoContainer = document.getElementById('resultadoContainer');
        const estadoMsg = document.getElementById('estadoPagoMsg');
        const consultaMsg = document.getElementById('consultaEstadoMsg');
        
        if (!miembroId) {
            showNotification("Por favor, seleccione un miembro", true);
            consultaMsg.innerHTML = '<p style="color: red;">⚠️ Por favor, seleccione un miembro</p>';
            resultadoContainer.style.display = 'none';
            estadoMsg.innerHTML = '';
            return;
        }
        
        const miembro = db.miembros.find(m => m.id === parseInt(miembroId));
        if (!miembro) {
            showNotification("Miembro no encontrado", true);
            consultaMsg.innerHTML = '<p style="color: red;">⚠️ Miembro no encontrado</p>';
            resultadoContainer.style.display = 'none';
            estadoMsg.innerHTML = '';
            return;
        }
        
        const ultimoPago = getUltimoPago(miembroId);
        const vigencia = calcularVigencia(miembro, ultimoPago);
        
        miembro.estadoPago = vigencia.estado;
        saveDB();
        
        document.getElementById('infoMiembroNombre').innerHTML = `<i class="fas fa-user"></i> ${miembro.nombre}`;
        document.getElementById('infoMiembroDNI').innerHTML = `<i class="fas fa-id-card"></i> ${miembro.dni}`;
        document.getElementById('infoMiembroTelefono').innerHTML = `<i class="fas fa-phone"></i> ${miembro.telefono}`;
        document.getElementById('infoMiembroDireccion').innerHTML = `<i class="fas fa-home"></i> ${miembro.direccion}`;
        document.getElementById('infoMiembroFechaNac').innerHTML = `<i class="fas fa-calendar"></i> ${miembro.fechaNac}`;
        
        const membresia = db.membresias.find(m => m.nombre === miembro.tipoMembresia);
        document.getElementById('infoMembresiaTipo').innerHTML = `<i class="fas fa-tag"></i> ${miembro.tipoMembresia}`;
        if (membresia) {
            document.getElementById('infoMembresiaPrecio').innerHTML = `<i class="fas fa-dollar-sign"></i> $${membresia.precio.toLocaleString('es-AR')}`;
            document.getElementById('infoMembresiaDuracion').innerHTML = `<i class="fas fa-calendar-alt"></i> ${membresia.duracion} días`;
        } else {
            document.getElementById('infoMembresiaPrecio').innerHTML = `<i class="fas fa-dollar-sign"></i> No especificado`;
            document.getElementById('infoMembresiaDuracion').innerHTML = `<i class="fas fa-calendar-alt"></i> No especificada`;
        }
        
        if (ultimoPago) {
            document.getElementById('infoUltimoPago').innerHTML = `
                <i class="fas fa-credit-card"></i> Último pago: $${ultimoPago.monto.toLocaleString('es-AR')} - ${ultimoPago.fecha} (${ultimoPago.medioPago})
            `;
        } else {
            document.getElementById('infoUltimoPago').innerHTML = '<i class="fas fa-exclamation-triangle"></i> No hay pagos registrados';
        }
        
        estadoMsg.innerHTML = `
            <div style="background: ${vigencia.color === '#22c55e' ? '#f0fdf9' : vigencia.color === '#ef4444' ? '#fef2f2' : '#fffbeb'}; border: 2px solid ${vigencia.color}; border-radius: 12px; padding: 1rem; margin-top: 1rem;">
                <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
                    <div style="font-size: 2rem;">${vigencia.icono}</div>
                    <div style="flex: 1;">
                        <p style="margin: 0; font-size: 1.2rem; font-weight: bold; color: ${vigencia.color};">${vigencia.estado.toUpperCase()}</p>
                        <p style="margin: 5px 0 0 0; font-size: 0.9rem;">${vigencia.mensaje}</p>
                    </div>
                </div>
            </div>
        `;
        
        resultadoContainer.style.display = 'block';
        consultaMsg.innerHTML = '<p style="color: green;">✅ Consulta realizada correctamente</p>';
        showNotification(`Estado de pago de ${miembro.nombre}: ${vigencia.estado}`, vigencia.estado !== 'Pagado');
        
        setTimeout(() => {
            consultaMsg.innerHTML = '';
        }, 3000);
    }
    
    container.innerHTML = `
        <div class="card">
            <h3><i class="fas fa-credit-card"></i> Consultar Estado de Pago de Membresía</h3>
            <div class="form-group">
                <label>Seleccionar Miembro:</label>
                <select id="selectMiembroEstadoPago">
                    <option value="">-- Seleccione un miembro --</option>
                    ${db.miembros.map(m => `<option value="${m.id}">${m.nombre} (DNI: ${m.dni})</option>`).join('')}
                </select>
            </div>
            <button id="consultarEstadoBtn" class="btn-info">Consultar Estado</button>
            <div id="consultaEstadoMsg" style="margin-top: 0.5rem;"></div>
            <div id="estadoPagoMsg" style="margin-top: 1rem;"></div>
        </div>
        
        <div id="resultadoContainer" style="display: none;">
            <div class="card">
                <h3><i class="fas fa-user-circle"></i> Información del Miembro</h3>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
                    <div><strong>Nombre:</strong> <span id="infoMiembroNombre">-</span></div>
                    <div><strong>DNI:</strong> <span id="infoMiembroDNI">-</span></div>
                    <div><strong>Teléfono:</strong> <span id="infoMiembroTelefono">-</span></div>
                    <div><strong>Dirección:</strong> <span id="infoMiembroDireccion">-</span></div>
                    <div><strong>Fecha de Nacimiento:</strong> <span id="infoMiembroFechaNac">-</span></div>
                </div>
            </div>
            
            <div class="card">
                <h3><i class="fas fa-tags"></i> Información de la Membresía</h3>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                    <div><strong>Tipo:</strong> <span id="infoMembresiaTipo">-</span></div>
                    <div><strong>Precio:</strong> <span id="infoMembresiaPrecio">-</span></div>
                    <div><strong>Duración:</strong> <span id="infoMembresiaDuracion">-</span></div>
                </div>
                <div style="margin-top: 1rem;">
                    <strong>Último pago:</strong> <span id="infoUltimoPago">-</span>
                </div>
            </div>
        </div>
        
    `;
    
    document.getElementById('consultarEstadoBtn').onclick = () => {
        consultarEstado();
    };
    
}
















// --------------- Modulo Asistencias --------------------

// Registro de asistencias (Personal)
function viewAsistencias() {
    document.getElementById('pageTitle').innerText = "Registro de Asistencias";
    document.getElementById('dynamicContent').innerHTML = `
        <div class="card">
            <h3>Registro de Asistencia de Miembros</h3>
            <button id="codigoBarrasBtn" class="btn-info">Código de Barras</button>
            <button id="huellaBtn" class="btn-info">Huella Digital</button>
            <div id="lectorMsg" style="margin-top:1rem;"></div>
        </div>
    `;
    document.getElementById('codigoBarrasBtn').onclick = () => document.getElementById('lectorMsg').innerHTML = "<p style='color:green'>✅ Bienvenido a Su Mejor Peso</p>";
    document.getElementById('huellaBtn').onclick = () => document.getElementById('lectorMsg').innerHTML = "<p style='color:green'>✅ Bienvenido a Su Mejor Peso</p>";
}

// Registro de asistencias (Miembro)
function viewMiAsistencia() {
    document.getElementById('pageTitle').innerText = "Registrar Mi Asistencia";
    const container = document.getElementById('dynamicContent');
    
    const miembroActual = db.miembros[0];
    
    container.innerHTML = `
        <div class="card" style="text-align: center;">
            <h3><i class="fas fa-fingerprint"></i> Registro de Ingreso</h3>
            <p style="margin-bottom: 0.5rem;">${miembroActual.nombre}, seleccione el método para registrar su llegada al gimnasio:</p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin: 1.5rem 0;">
                <button id="miCodigoBarrasBtn" class="btn-info" style="padding: 1rem 2rem; font-size: 1.1rem;">
                    <i class="fas fa-barcode"></i> Código de Barras
                </button>
                <button id="miHuellaBtn" class="btn-info" style="padding: 1rem 2rem; font-size: 1.1rem;">
                    <i class="fas fa-hand-peace"></i> Huella Digital
                </button>
            </div>
            <div id="miLectorMsg" style="margin-top: 1rem; font-size: 1.1rem;"></div>
            <div id="miUltimoIngreso" style="margin-top: 1rem; padding: 0.8rem; background: #f0fdf9; border-radius: 12px; display: none;"></div>
        </div>
    `;
    
    function procesarIngresoMiembro(metodo) {
        const { fecha, horario } = registrarIngresoEstablecimiento(miembroActual.id);
        
        const lectorMsg = document.getElementById('miLectorMsg');
        lectorMsg.innerHTML = `<p style="color:green; font-size: 1.3rem;">✅ Bienvenido/a ${miembroActual.nombre} a Su Mejor Peso</p>`;
        showNotification(`Bienvenido/a ${miembroActual.nombre} a Su Mejor Peso`, false);
        
        const ultimoIngresoDiv = document.getElementById('miUltimoIngreso');
        ultimoIngresoDiv.style.display = 'block';
        ultimoIngresoDiv.innerHTML = `
            <p><strong>Ingreso registrado:</strong></p>
            <p>Fecha: ${fecha}</p>
            <p>Horario: ${horario}</p>
            <p>Método: ${metodo}</p>
        `;
        
        setTimeout(() => {
            if (lectorMsg.innerHTML.includes("Bienvenido")) {
                lectorMsg.innerHTML = '';
            }
        }, 5000);
    }
    
    document.getElementById('miCodigoBarrasBtn').onclick = () => {
        procesarIngresoMiembro("Código de Barras");
    };
    
    document.getElementById('miHuellaBtn').onclick = () => {
        procesarIngresoMiembro("Huella Digital");
    };
    
}

// Consulta asistencias miembros a clases
function viewAsistenciaClases() {
    document.getElementById('pageTitle').innerText = "Asistencia de Miembros a Clases";
    const container = document.getElementById('dynamicContent');
    
    function getClasesPorMiembro(miembroId) {
        return db.clases.filter(clase => clase.inscritos.includes(parseInt(miembroId)));
    }
    
    function getEstadoAsistencia(miembroId, claseId) {
        const fechaHoy = new Date().toISOString().split('T')[0];
        const asistencia = db.asistenciasClases.find(a => 
            a.miembroId === parseInt(miembroId) && 
            a.claseId === parseInt(claseId) && 
            a.fecha === fechaHoy
        );
        return asistencia ? asistencia.estado : "No registrado";
    }
    
    function guardarEstadoAsistencia(miembroId, claseId, nuevoEstado) {
        const fechaHoy = new Date().toISOString().split('T')[0];
        const existe = db.asistenciasClases.findIndex(a => 
            a.miembroId === parseInt(miembroId) && 
            a.claseId === parseInt(claseId) && 
            a.fecha === fechaHoy
        );
        
        if (existe !== -1) {
            db.asistenciasClases[existe].estado = nuevoEstado;
        } else {
            const newId = db.asistenciasClases.length + 1;
            db.asistenciasClases.push({
                id: newId,
                miembroId: parseInt(miembroId),
                claseId: parseInt(claseId),
                fecha: fechaHoy,
                estado: nuevoEstado
            });
        }
        saveDB();
        showNotification(`Estado de asistencia actualizado a: ${nuevoEstado}`);
    }
    
    container.innerHTML = `
        <div class="card">
            <h3><i class="fas fa-clipboard-list"></i> Consultar Asistencia de Miembros</h3>
            <div class="form-group">
                <label>Seleccionar Miembro:</label>
                <select id="selectMiembroAsistencia">
                    <option value="">-- Seleccione un miembro --</option>
                    ${db.miembros.map(m => `<option value="${m.id}">${m.nombre} (${m.dni})</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label>Seleccionar Clase:</label>
                <select id="selectClaseAsistencia" disabled>
                    <option value="">-- Primero seleccione un miembro --</option>
                </select>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Horario:</label>
                    <input type="text" id="horarioClase" readonly placeholder="Seleccione una clase">
                </div>
                <div class="form-group">
                    <label>Estado:</label>
                    <input type="text" id="estadoAsistencia" readonly placeholder="Seleccione una clase">
                </div>
            </div>
            <div class="form-group">
                <label>Cambiar Estado:</label>
                <select id="cambiarEstadoSelect">
                    <option value="">-- Cambiar estado --</option>
                    <option value="Presente">Presente</option>
                    <option value="Ausente">Ausente</option>
                </select>
                <button id="guardarEstadoBtn" class="btn-success" style="margin-top: 0.5rem;">Guardar Cambio</button>
            </div>
            <div id="asistenciaInfo" style="margin-top: 1rem; padding: 1rem; background: #f0f0f0; border-radius: 8px;"></div>
        </div>
    `;
    
    const selectMiembro = document.getElementById('selectMiembroAsistencia');
    const selectClase = document.getElementById('selectClaseAsistencia');
    const horarioInput = document.getElementById('horarioClase');
    const estadoInput = document.getElementById('estadoAsistencia');
    const cambiarEstadoSelect = document.getElementById('cambiarEstadoSelect');
    const guardarBtn = document.getElementById('guardarEstadoBtn');
    
    selectMiembro.addEventListener('change', () => {
        const miembroId = selectMiembro.value;
        if (!miembroId) {
            selectClase.disabled = true;
            selectClase.innerHTML = '<option value="">-- Primero seleccione un miembro --</option>';
            horarioInput.value = '';
            estadoInput.value = '';
            cambiarEstadoSelect.value = '';
            return;
        }
        
        const clasesMiembro = getClasesPorMiembro(miembroId);
        if (clasesMiembro.length === 0) {
            selectClase.disabled = false;
            selectClase.innerHTML = '<option value="">-- Este miembro no está inscripto a ninguna clase --</option>';
            horarioInput.value = '';
            estadoInput.value = '';
        } else {
            selectClase.disabled = false;
            selectClase.innerHTML = '<option value="">-- Seleccione una clase --</option>' + 
                clasesMiembro.map(c => `<option value="${c.id}">${c.nombre}</option>`).join('');
        }
        cambiarEstadoSelect.value = '';
    });
    
    selectClase.addEventListener('change', () => {
        const miembroId = selectMiembro.value;
        const claseId = selectClase.value;
        
        if (!miembroId || !claseId) {
            horarioInput.value = '';
            estadoInput.value = '';
            return;
        }
        
        const clase = db.clases.find(c => c.id === parseInt(claseId));
        if (clase) {
            horarioInput.value = `${clase.horarioInicio} - ${clase.horarioFin}`;
        }
        
        const estado = getEstadoAsistencia(miembroId, claseId);
        estadoInput.value = estado;
        
        if (estado !== "No registrado") {
            cambiarEstadoSelect.value = estado;
        } else {
            cambiarEstadoSelect.value = "";
        }
    });
    
    guardarBtn.addEventListener('click', () => {
        const miembroId = selectMiembro.value;
        const claseId = selectClase.value;
        const nuevoEstado = cambiarEstadoSelect.value;
        
        if (!miembroId) {
            showNotification("Por favor, seleccione un miembro.", true);
            return;
        }
        if (!claseId) {
            showNotification("Por favor, seleccione una clase.", true);
            return;
        }
        if (!nuevoEstado) {
            showNotification("Por favor, seleccione un estado (Presente/Ausente).", true);
            return;
        }
        
        guardarEstadoAsistencia(miembroId, claseId, nuevoEstado);
        
        estadoInput.value = nuevoEstado;
        
        const miembro = db.miembros.find(m => m.id === parseInt(miembroId));
        const clase = db.clases.find(c => c.id === parseInt(claseId));
        document.getElementById('asistenciaInfo').innerHTML = `
            <p style="color: green; margin: 0;">✅ Asistencia actualizada: <strong>${miembro.nombre}</strong> - 
            <strong>${clase.nombre}</strong> (${horarioInput.value}) → <strong>${nuevoEstado}</strong></p>
        `;
        setTimeout(() => {
            document.getElementById('asistenciaInfo').innerHTML = '';
        }, 3000);
    });
    
}


// Fecha y horario de ingreso
function viewIngresosEstablecimiento() {
    document.getElementById('pageTitle').innerText = "Ingresos de Miembros al Establecimiento";
    const container = document.getElementById('dynamicContent');
    
    container.innerHTML = `
        <div class="card">
            <h3><i class="fas fa-door-open"></i> Consultar Ingresos de Miembros</h3>
            <div class="form-group">
                <label>Seleccionar Miembro:</label>
                <select id="selectMiembroIngreso">
                    <option value="">-- Seleccione un miembro --</option>
                    ${db.miembros.map(m => `<option value="${m.id}">${m.nombre} (${m.dni})</option>`).join('')}
                </select>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Última Fecha de Ingreso:</label>
                    <input type="text" id="ultimaFechaIngreso" readonly placeholder="Seleccione un miembro" class="readonly-field">
                </div>
                <div class="form-group">
                    <label>Último Horario de Ingreso:</label>
                    <input type="text" id="ultimoHorarioIngreso" readonly placeholder="Seleccione un miembro" class="readonly-field">
                </div>
            </div>
            <button id="refreshIngresosBtn" class="btn-info">Actualizar</button>
        </div>
        <div class="card">
            <h3>Historial de Ingresos</h3>
            <div class="table-responsive">
                <table id="historialIngresosTable">
                    <thead>
                        <tr><th>Fecha</th><th>Horario</th><th>Día</th></tr>
                    </thead>
                    <tbody>
                        <tr><td colspan="3" style="text-align: center;">Seleccione un miembro para ver su historial</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    const selectMiembro = document.getElementById('selectMiembroIngreso');
    const ultimaFechaInput = document.getElementById('ultimaFechaIngreso');
    const ultimoHorarioInput = document.getElementById('ultimoHorarioIngreso');
    const refreshBtn = document.getElementById('refreshIngresosBtn');
    
    function actualizarInfoMiembro() {
        const miembroId = selectMiembro.value;
        if (!miembroId) {
            ultimaFechaInput.value = '';
            ultimoHorarioInput.value = '';
            document.querySelector('#historialIngresosTable tbody').innerHTML = '<tr><td colspan="3" style="text-align: center;">Seleccione un miembro para ver su historial</td></tr>';
            return;
        }
        
        const ultimoIngreso = getUltimoIngreso(miembroId);
        if (ultimoIngreso) {
            ultimaFechaInput.value = ultimoIngreso.fecha;
            ultimoHorarioInput.value = ultimoIngreso.horario;
        } else {
            ultimaFechaInput.value = 'Sin registros';
            ultimoHorarioInput.value = 'Sin registros';
        }
        
        const historial = getHistorialIngresos(miembroId, 15);
        const tbody = document.querySelector('#historialIngresosTable tbody');
        if (historial.length === 0) {
            tbody.innerHTML = '<tr><td colspan="3" style="text-align: center;">No hay registros de ingreso para este miembro</td></tr>';
        } else {
            tbody.innerHTML = historial.map(ingreso => {
                const fechaObj = new Date(`${ingreso.fecha}T${ingreso.horario}`);
                const diaSemana = fechaObj.toLocaleDateString('es-ES', { weekday: 'long' });
                return `
                    <tr>
                        <td>${ingreso.fecha}</td>
                        <td>${ingreso.horario}</td>
                        <td>${diaSemana}</td>
                    </tr>
                `;
            }).join('');
        }
    }
    
    selectMiembro.addEventListener('change', actualizarInfoMiembro);
    refreshBtn.addEventListener('click', actualizarInfoMiembro);

    if (selectMiembro.value) actualizarInfoMiembro();
}

// "Mis ingresos" (Miembro)
function viewMisIngresos() {
    document.getElementById('pageTitle').innerText = "Mis Ingresos al Gimnasio";
    const container = document.getElementById('dynamicContent');
    
    const miembroActual = db.miembros[0];
    const historial = getHistorialIngresos(miembroActual.id, 50);
    
    container.innerHTML = `
        <div class="card">
            <h3><i class="fas fa-history"></i> Historial de Ingresos</h3>
            <p><strong>Miembro:</strong> ${miembroActual.nombre} (DNI: ${miembroActual.dni})</p>
            <p><strong>Total de ingresos:</strong> ${historial.length}</p>
            <div class="table-responsive">
                <table>
                    <thead>
                        <tr><th>#</th><th>Fecha</th><th>Horario</th><th>Día</th></tr>
                    </thead>
                    <tbody>
                        ${historial.length === 0 ? 
                            '<tr><td colspan="4" style="text-align: center;">No hay registros de ingreso</td></tr>' : 
                            historial.map((ingreso, index) => {
                                const fechaObj = new Date(`${ingreso.fecha}T${ingreso.horario}`);
                                const diaSemana = fechaObj.toLocaleDateString('es-ES', { weekday: 'long' });
                                return `<tr>
                                    <td>${index + 1}</td>
                                    <td>${ingreso.fecha}</td>
                                    <td>${ingreso.horario}</td>
                                    <td>${diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1)}</td>
                                </tr>`;
                            }).join('')
                        }
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
}

//Asistencia a clases (Admin y Personal)
function viewAsistenciaClases() {
    document.getElementById('pageTitle').innerText = "Asistencia de Miembros y Entrenadores a Clases";
    const container = document.getElementById('dynamicContent');
    
    const fechaHoy = new Date().toISOString().split('T')[0];
    
    function getClasesPorMiembro(miembroId) {
        return db.clases.filter(clase => clase.inscritos && clase.inscritos.includes(parseInt(miembroId)));
    }
    
    function getEstadoAsistenciaMiembro(miembroId, claseId, fecha) {
        const asistencia = db.asistenciasClases.find(a => 
            a.miembroId === parseInt(miembroId) && 
            a.claseId === parseInt(claseId) && 
            a.fecha === fecha
        );
        return asistencia ? asistencia.estado : "No registrado";
    }
    
    function guardarEstadoAsistenciaMiembro(miembroId, claseId, nuevoEstado, fecha) {
        const existe = db.asistenciasClases.findIndex(a => 
            a.miembroId === parseInt(miembroId) && 
            a.claseId === parseInt(claseId) && 
            a.fecha === fecha
        );
        
        if (existe !== -1) {
            db.asistenciasClases[existe].estado = nuevoEstado;
        } else {
            const newId = db.asistenciasClases.length + 1;
            db.asistenciasClases.push({
                id: newId,
                miembroId: parseInt(miembroId),
                claseId: parseInt(claseId),
                fecha: fecha,
                estado: nuevoEstado
            });
        }
        saveDB();
        showNotification(`Estado de asistencia actualizado a: ${nuevoEstado}`);
    }
    
    function getClasesPorEntrenador(entrenadorId) {
        return db.clases.filter(clase => clase.entrenadorId === parseInt(entrenadorId));
    }
    
    function getEstadoAsistenciaEntrenador(entrenadorId, claseId, fecha) {
        const asistencia = db.asistenciasEntrenadores.find(a => 
            a.entrenadorId === parseInt(entrenadorId) && 
            a.claseId === parseInt(claseId) && 
            a.fecha === fecha
        );
        return asistencia ? asistencia.estado : "No registrado";
    }
    
    function guardarEstadoAsistenciaEntrenador(entrenadorId, claseId, nuevoEstado, fecha) {
        const existe = db.asistenciasEntrenadores.findIndex(a => 
            a.entrenadorId === parseInt(entrenadorId) && 
            a.claseId === parseInt(claseId) && 
            a.fecha === fecha
        );
        
        if (existe !== -1) {
            db.asistenciasEntrenadores[existe].estado = nuevoEstado;
        } else {
            const newId = db.asistenciasEntrenadores.length + 1;
            db.asistenciasEntrenadores.push({
                id: newId,
                entrenadorId: parseInt(entrenadorId),
                claseId: parseInt(claseId),
                fecha: fecha,
                estado: nuevoEstado
            });
        }
        saveDB();
        showNotification(`Estado de asistencia del entrenador actualizado a: ${nuevoEstado}`);
    }
    
    container.innerHTML = `
        <div class="card">
            <h3><i class="fas fa-users"></i> Asistencia de Miembros a Clases</h3>
            <div class="form-row">
                <div class="form-group">
                    <label>Seleccionar Miembro:</label>
                    <select id="selectMiembroAsistencia">
                        <option value="">-- Seleccione un miembro --</option>
                        ${db.miembros.map(m => `<option value="${m.id}">${m.nombre} (${m.dni})</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Fecha:</label>
                    <input type="date" id="fechaAsistenciaMiembro" value="${fechaHoy}">
                </div>
            </div>
            <div class="form-group">
                <label>Seleccionar Clase:</label>
                <select id="selectClaseAsistencia" disabled>
                    <option value="">-- Primero seleccione un miembro --</option>
                </select>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Horario:</label>
                    <input type="text" id="horarioClase" readonly placeholder="Seleccione una clase">
                </div>
                <div class="form-group">
                    <label>Estado:</label>
                    <input type="text" id="estadoAsistencia" readonly placeholder="Seleccione una clase">
                </div>
            </div>
            <div class="form-group">
                <label>Cambiar Estado:</label>
                <select id="cambiarEstadoSelect">
                    <option value="">-- Cambiar estado --</option>
                    <option value="Presente">Presente</option>
                    <option value="Ausente">Ausente</option>
                </select>
                <button id="guardarEstadoBtn" class="btn-success" style="margin-top: 0.5rem;">Guardar Cambio</button>
            </div>
            <div id="asistenciaInfo" style="margin-top: 1rem; padding: 1rem; background: #f0fdf9; border-radius: 12px;"></div>
        </div>
        
        <div class="card">
            <h3><i class="fas fa-chalkboard-teacher"></i> Asistencia de Entrenadores a Clases</h3>
            <div class="form-row">
                <div class="form-group">
                    <label>Seleccionar Entrenador:</label>
                    <select id="selectEntrenadorAsistencia">
                        <option value="">-- Seleccione un entrenador --</option>
                        ${db.entrenadores.map(e => `<option value="${e.id}">${e.nombre} (DNI: ${e.dni})</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Fecha:</label>
                    <input type="date" id="fechaAsistenciaEntrenador" value="${fechaHoy}">
                </div>
            </div>
            <div class="form-group">
                <label>Seleccionar Clase:</label>
                <select id="selectClaseAsistenciaEntrenador" disabled>
                    <option value="">-- Primero seleccione un entrenador --</option>
                </select>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Horario:</label>
                    <input type="text" id="horarioClaseEntrenador" readonly placeholder="Seleccione una clase">
                </div>
                <div class="form-group">
                    <label>Estado del Entrenador:</label>
                    <input type="text" id="estadoAsistenciaEntrenador" readonly placeholder="Seleccione una clase">
                </div>
            </div>
            <div class="form-group">
                <label>Cambiar Estado del Entrenador:</label>
                <select id="cambiarEstadoEntrenadorSelect">
                    <option value="">-- Cambiar estado --</option>
                    <option value="Presente">Presente</option>
                    <option value="Ausente">Ausente</option>
                </select>
                <button id="guardarEstadoEntrenadorBtn" class="btn-success" style="margin-top: 0.5rem;">Guardar Cambio</button>
            </div>
            <div id="asistenciaEntrenadorInfo" style="margin-top: 1rem; padding: 1rem; background: #f0fdf9; border-radius: 12px;"></div>
        </div>
        
    `;
    
    const selectMiembro = document.getElementById('selectMiembroAsistencia');
    const selectClase = document.getElementById('selectClaseAsistencia');
    const horarioInput = document.getElementById('horarioClase');
    const estadoInput = document.getElementById('estadoAsistencia');
    const cambiarEstadoSelect = document.getElementById('cambiarEstadoSelect');
    const guardarBtn = document.getElementById('guardarEstadoBtn');
    const fechaMiembro = document.getElementById('fechaAsistenciaMiembro');
    
    function actualizarDatosMiembro() {
        const miembroId = selectMiembro.value;
        const fecha = fechaMiembro.value;
        
        if (!miembroId) {
            selectClase.disabled = true;
            selectClase.innerHTML = '<option value="">-- Primero seleccione un miembro --</option>';
            horarioInput.value = '';
            estadoInput.value = '';
            cambiarEstadoSelect.value = '';
            return;
        }
        
        const clasesMiembro = getClasesPorMiembro(miembroId);
        if (clasesMiembro.length === 0) {
            selectClase.disabled = false;
            selectClase.innerHTML = '<option value="">-- Este miembro no está inscripto a ninguna clase --</option>';
            horarioInput.value = '';
            estadoInput.value = '';
        } else {
            selectClase.disabled = false;
            selectClase.innerHTML = '<option value="">-- Seleccione una clase --</option>' + 
                clasesMiembro.map(c => `<option value="${c.id}">${c.nombre}</option>`).join('');
        }
        cambiarEstadoSelect.value = '';
    }
    
    selectMiembro.addEventListener('change', actualizarDatosMiembro);
    fechaMiembro.addEventListener('change', () => {
        if (selectMiembro.value && selectClase.value) {
            actualizarEstadoMiembro();
        }
    });
    
    function actualizarEstadoMiembro() {
        const miembroId = selectMiembro.value;
        const claseId = selectClase.value;
        const fecha = fechaMiembro.value;
        
        if (!miembroId || !claseId || !fecha) {
            horarioInput.value = '';
            estadoInput.value = '';
            return;
        }
        
        const clase = db.clases.find(c => c.id === parseInt(claseId));
        if (clase) {
            horarioInput.value = `${clase.horarioInicio} - ${clase.horarioFin}`;
        }
        
        const estado = getEstadoAsistenciaMiembro(miembroId, claseId, fecha);
        estadoInput.value = estado;
        
        if (estado !== "No registrado") {
            cambiarEstadoSelect.value = estado;
        } else {
            cambiarEstadoSelect.value = "";
        }
    }
    
    selectClase.addEventListener('change', actualizarEstadoMiembro);
    
    guardarBtn.addEventListener('click', () => {
        const miembroId = selectMiembro.value;
        const claseId = selectClase.value;
        const nuevoEstado = cambiarEstadoSelect.value;
        const fecha = fechaMiembro.value;
        
        if (!miembroId) {
            showNotification("Por favor, seleccione un miembro.", true);
            document.getElementById('asistenciaInfo').innerHTML = '<p style="color: red;">⚠️ Por favor, seleccione un miembro</p>';
            return;
        }
        if (!claseId) {
            showNotification("Por favor, seleccione una clase.", true);
            document.getElementById('asistenciaInfo').innerHTML = '<p style="color: red;">⚠️ Por favor, seleccione una clase</p>';
            return;
        }
        if (!fecha) {
            showNotification("Por favor, seleccione una fecha.", true);
            document.getElementById('asistenciaInfo').innerHTML = '<p style="color: red;">⚠️ Por favor, seleccione una fecha</p>';
            return;
        }
        if (!nuevoEstado) {
            showNotification("Por favor, seleccione un estado (Presente/Ausente).", true);
            document.getElementById('asistenciaInfo').innerHTML = '<p style="color: red;">⚠️ Por favor, seleccione un estado</p>';
            return;
        }
        
        guardarEstadoAsistenciaMiembro(miembroId, claseId, nuevoEstado, fecha);
        estadoInput.value = nuevoEstado;
        
        const miembro = db.miembros.find(m => m.id === parseInt(miembroId));
        const clase = db.clases.find(c => c.id === parseInt(claseId));
        document.getElementById('asistenciaInfo').innerHTML = `
            <p style="color: green; margin: 0;">✅ Asistencia actualizada: <strong>${miembro.nombre}</strong> - 
            <strong>${clase.nombre}</strong> (${fecha} - ${horarioInput.value}) → <strong>${nuevoEstado}</strong></p>
        `;
        setTimeout(() => {
            document.getElementById('asistenciaInfo').innerHTML = '';
        }, 3000);
    });
    
    const selectEntrenador = document.getElementById('selectEntrenadorAsistencia');
    const selectClaseEntrenador = document.getElementById('selectClaseAsistenciaEntrenador');
    const horarioInputEntrenador = document.getElementById('horarioClaseEntrenador');
    const estadoInputEntrenador = document.getElementById('estadoAsistenciaEntrenador');
    const cambiarEstadoEntrenadorSelect = document.getElementById('cambiarEstadoEntrenadorSelect');
    const guardarEntrenadorBtn = document.getElementById('guardarEstadoEntrenadorBtn');
    const fechaEntrenador = document.getElementById('fechaAsistenciaEntrenador');
    
    function actualizarDatosEntrenador() {
        const entrenadorId = selectEntrenador.value;
        const fecha = fechaEntrenador.value;
        
        if (!entrenadorId) {
            selectClaseEntrenador.disabled = true;
            selectClaseEntrenador.innerHTML = '<option value="">-- Primero seleccione un entrenador --</option>';
            horarioInputEntrenador.value = '';
            estadoInputEntrenador.value = '';
            cambiarEstadoEntrenadorSelect.value = '';
            return;
        }
        
        const clasesEntrenador = getClasesPorEntrenador(entrenadorId);
        if (clasesEntrenador.length === 0) {
            selectClaseEntrenador.disabled = false;
            selectClaseEntrenador.innerHTML = '<option value="">-- Este entrenador no está asignado a ninguna clase --</option>';
            horarioInputEntrenador.value = '';
            estadoInputEntrenador.value = '';
        } else {
            selectClaseEntrenador.disabled = false;
            selectClaseEntrenador.innerHTML = '<option value="">-- Seleccione una clase --</option>' + 
                clasesEntrenador.map(c => `<option value="${c.id}">${c.nombre}</option>`).join('');
        }
        cambiarEstadoEntrenadorSelect.value = '';
    }
    
    selectEntrenador.addEventListener('change', actualizarDatosEntrenador);
    fechaEntrenador.addEventListener('change', () => {
        if (selectEntrenador.value && selectClaseEntrenador.value) {
            actualizarEstadoEntrenador();
        }
    });
    
    function actualizarEstadoEntrenador() {
        const entrenadorId = selectEntrenador.value;
        const claseId = selectClaseEntrenador.value;
        const fecha = fechaEntrenador.value;
        
        if (!entrenadorId || !claseId || !fecha) {
            horarioInputEntrenador.value = '';
            estadoInputEntrenador.value = '';
            return;
        }
        
        const clase = db.clases.find(c => c.id === parseInt(claseId));
        if (clase) {
            horarioInputEntrenador.value = `${clase.horarioInicio} - ${clase.horarioFin}`;
        }
        
        const estado = getEstadoAsistenciaEntrenador(entrenadorId, claseId, fecha);
        estadoInputEntrenador.value = estado;
        
        if (estado !== "No registrado") {
            cambiarEstadoEntrenadorSelect.value = estado;
        } else {
            cambiarEstadoEntrenadorSelect.value = "";
        }
    }
    
    selectClaseEntrenador.addEventListener('change', actualizarEstadoEntrenador);
    
    guardarEntrenadorBtn.addEventListener('click', () => {
        const entrenadorId = selectEntrenador.value;
        const claseId = selectClaseEntrenador.value;
        const nuevoEstado = cambiarEstadoEntrenadorSelect.value;
        const fecha = fechaEntrenador.value;
        
        if (!entrenadorId) {
            showNotification("Por favor, seleccione un entrenador.", true);
            document.getElementById('asistenciaEntrenadorInfo').innerHTML = '<p style="color: red;">⚠️ Por favor, seleccione un entrenador</p>';
            return;
        }
        if (!claseId) {
            showNotification("Por favor, seleccione una clase.", true);
            document.getElementById('asistenciaEntrenadorInfo').innerHTML = '<p style="color: red;">⚠️ Por favor, seleccione una clase</p>';
            return;
        }
        if (!fecha) {
            showNotification("Por favor, seleccione una fecha.", true);
            document.getElementById('asistenciaEntrenadorInfo').innerHTML = '<p style="color: red;">⚠️ Por favor, seleccione una fecha</p>';
            return;
        }
        if (!nuevoEstado) {
            showNotification("Por favor, seleccione un estado (Presente/Ausente).", true);
            document.getElementById('asistenciaEntrenadorInfo').innerHTML = '<p style="color: red;">⚠️ Por favor, seleccione un estado</p>';
            return;
        }
        
        guardarEstadoAsistenciaEntrenador(entrenadorId, claseId, nuevoEstado, fecha);
        estadoInputEntrenador.value = nuevoEstado;
        
        const entrenador = db.entrenadores.find(e => e.id === parseInt(entrenadorId));
        const clase = db.clases.find(c => c.id === parseInt(claseId));
        document.getElementById('asistenciaEntrenadorInfo').innerHTML = `
            <p style="color: green; margin: 0;">✅ Asistencia del entrenador actualizada: <strong>${entrenador.nombre}</strong> - 
            <strong>${clase.nombre}</strong> (${fecha} - ${horarioInputEntrenador.value}) → <strong>${nuevoEstado}</strong></p>
        `;
        setTimeout(() => {
            document.getElementById('asistenciaEntrenadorInfo').innerHTML = '';
        }, 3000);
    });
    
}

// Registro de asistencias (Personal)
function viewAsistencias() {
    document.getElementById('pageTitle').innerText = "Registro de Ingreso al Gimnasio";
    const container = document.getElementById('dynamicContent');
    
    container.innerHTML = `
        <div class="card" style="text-align: center;">
            <h3><i class="fas fa-fingerprint"></i> Registro de Ingreso de Miembros</h3>
            <p style="margin-bottom: 1rem;">Seleccione un miembro y luego el método de ingreso:</p>
            
            <div class="form-group">
                <label>Seleccionar Miembro:</label>
                <select id="selectMiembroIngresoRecepcion">
                    <option value="">-- Seleccione un miembro --</option>
                    ${db.miembros.map(m => `<option value="${m.id}">${m.nombre} (${m.dni})</option>`).join('')}
                </select>
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin: 1.5rem 0;">
                <button id="codigoBarrasBtn" class="btn-info" style="padding: 1rem 2rem; font-size: 1.1rem;">
                    <i class="fas fa-barcode"></i> Código de Barras
                </button>
                <button id="huellaBtn" class="btn-info" style="padding: 1rem 2rem; font-size: 1.1rem;">
                    <i class="fas fa-hand-peace"></i> Huella Digital
                </button>
            </div>
            
            <div id="lectorMsg" style="margin-top: 1rem; font-size: 1.1rem; font-weight: bold;"></div>
            <div id="ultimoIngresoInfo" style="margin-top: 1rem; padding: 0.8rem; background: #f0f0f0; border-radius: 8px; display: none;"></div>
        </div>
    `;
    
    const selectMiembro = document.getElementById('selectMiembroIngresoRecepcion');
    const lectorMsg = document.getElementById('lectorMsg');
    const ultimoIngresoInfo = document.getElementById('ultimoIngresoInfo');
    
    function procesarIngreso(miembroId, metodo) {
        if (!miembroId) {
            lectorMsg.innerHTML = "<p style='color:red'>❌ Error: Por favor, seleccione un miembro primero.</p>";
            showNotification("Por favor, seleccione un miembro", true);
            return false;
        }
        
        const miembro = db.miembros.find(m => m.id === parseInt(miembroId));
        if (!miembro) {
            lectorMsg.innerHTML = "<p style='color:red'>❌ Error: Miembro no encontrado.</p>";
            return false;
        }
        
        const { fecha, horario } = registrarIngresoEstablecimiento(miembroId);
        
        lectorMsg.innerHTML = `<p style='color:green'>✅ Bienvenido/a ${miembro.nombre} a Su Mejor Peso</p>`;
        showNotification(`Bienvenido/a ${miembro.nombre} a Su Mejor Peso`, false);
        
        ultimoIngresoInfo.style.display = 'block';
        ultimoIngresoInfo.innerHTML = `
            <p><strong>Último ingreso registrado:</strong></p>
            <p>Fecha: ${fecha}</p>
            <p>Horario: ${horario}</p>
            <p>Método: ${metodo}</p>
        `;
        
        setTimeout(() => {
            if (lectorMsg.innerHTML.includes("Bienvenido")) {
                lectorMsg.innerHTML = "";
            }
        }, 3000);
        
        return true;
    }
    
    document.getElementById('codigoBarrasBtn').onclick = () => {
        const miembroId = selectMiembro.value;
        procesarIngreso(miembroId, "Código de Barras");
    };
    
    document.getElementById('huellaBtn').onclick = () => {
        const miembroId = selectMiembro.value;
        procesarIngreso(miembroId, "Huella Digital");
    };
    
}


// Registrar ingreso al establecimiento
function registrarIngresoEstablecimiento(miembroId) {
    const ahora = new Date();
    const fecha = ahora.toISOString().split('T')[0];
    const horario = ahora.toTimeString().split(' ')[0];
    
    const nuevoIngreso = {
        id: db.ingresosEstablecimiento.length + 1,
        miembroId: parseInt(miembroId),
        fecha: fecha,
        horario: horario
    };
    db.ingresosEstablecimiento.push(nuevoIngreso);
    saveDB();
    
    const miembro = db.miembros.find(m => m.id === parseInt(miembroId));
    console.log(`Ingreso registrado: ${miembro?.nombre} - ${fecha} ${horario}`);
    return { fecha, horario };
}

// Obtener último ingreso de un miembro
function getUltimoIngreso(miembroId) {
    const ingresos = db.ingresosEstablecimiento
        .filter(i => i.miembroId === parseInt(miembroId))
        .sort((a, b) => {
            const dateA = new Date(`${a.fecha}T${a.horario}`);
            const dateB = new Date(`${b.fecha}T${b.horario}`);
            return dateB - dateA;
        });
    return ingresos.length > 0 ? ingresos[0] : null;
}

// Obtener historial de ingresos de un miembro
function getHistorialIngresos(miembroId, limite = 10) {
    return db.ingresosEstablecimiento
        .filter(i => i.miembroId === parseInt(miembroId))
        .sort((a, b) => {
            const dateA = new Date(`${a.fecha}T${a.horario}`);
            const dateB = new Date(`${b.fecha}T${b.horario}`);
            return dateB - dateA;
        })
        .slice(0, limite);
}

// "Mis clases" (Entrenador)
function viewMisClasesEntrenador() {
    document.getElementById('pageTitle').innerText = "Mis Clases Asignadas";
    const container = document.getElementById('dynamicContent');
    
    const entrenadorActual = db.entrenadores[0];
    
    const clasesAsignadas = db.clases.filter(c => c.entrenadorId === entrenadorActual.id);
    
    container.innerHTML = `
        <div class="card">
            <h3><i class="fas fa-chalkboard-teacher"></i> Mis Clases Asignadas</h3>
            <p><strong>Entrenador:</strong> ${entrenadorActual.nombre}</p>
            <p><strong>Total de clases asignadas:</strong> ${clasesAsignadas.length}</p>
            
            ${clasesAsignadas.length === 0 ? 
                `<p style="color: #64748b;">No tienes clases asignadas actualmente.</p>` :
                `<div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Clase</th>
                                <th>Horario</th>
                                <th>Sala</th>
                                <th>Inscriptos</th>
                                <th>Estado de Asistencia</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${clasesAsignadas.map(clase => {
                                const inscritos = clase.inscritos ? clase.inscritos.length : 0;
                                
                                const fechaHoy = new Date().toISOString().split('T')[0];
                                const asistenciaExistente = db.asistenciasEntrenadores.find(a => 
                                    a.entrenadorId === entrenadorActual.id && 
                                    a.claseId === clase.id && 
                                    a.fecha === fechaHoy
                                );
                                
                                let estadoAsistencia = '';
                                if (asistenciaExistente) {
                                    estadoAsistencia = asistenciaExistente.estado === 'Presente' ? 
                                        '<span style="color: green; font-weight: bold;">✅ Presente</span>' : 
                                        '<span style="color: red; font-weight: bold;">❌ Ausente</span>';
                                } else {
                                    estadoAsistencia = '<span style="color: #94a3b8;">⏳ No registrado</span>';
                                }
                                
                                return `
                                    <tr>
                                        <td><strong>${clase.nombre}</strong></td>
                                        <td>${clase.horarioInicio} - ${clase.horarioFin}</td>
                                        <td>${clase.sala}</td>
                                        <td>${inscritos} miembros</td>
                                        <td>${estadoAsistencia}</td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>`
            }
            
        </div>
    `;
    

}


// Historial Asistencias a clases (miembros y entrenadores)
function viewHistorialAsistencias() {
    document.getElementById('pageTitle').innerText = "Historial de Asistencias a Clases";
    const container = document.getElementById('dynamicContent');
    
    const todasLasFechas = [...new Set([
        ...db.asistenciasClases.map(a => a.fecha),
        ...db.asistenciasEntrenadores.map(a => a.fecha)
    ])].sort().reverse();
    
    function renderizarHistorial() {
        const tipo = document.getElementById('filtroTipo')?.value || 'todos';
        const fecha = document.getElementById('filtroFecha')?.value || '';
        const claseId = document.getElementById('filtroClase')?.value || '';
        
        let asistenciasMiembros = [...db.asistenciasClases];
        if (fecha) asistenciasMiembros = asistenciasMiembros.filter(a => a.fecha === fecha);
        if (claseId) asistenciasMiembros = asistenciasMiembros.filter(a => a.claseId === parseInt(claseId));
        
        let asistenciasEntrenadores = [...db.asistenciasEntrenadores];
        if (fecha) asistenciasEntrenadores = asistenciasEntrenadores.filter(a => a.fecha === fecha);
        if (claseId) asistenciasEntrenadores = asistenciasEntrenadores.filter(a => a.claseId === parseInt(claseId));
        
        if (tipo === 'miembros') {
            asistenciasEntrenadores = [];
        } else if (tipo === 'entrenadores') {
            asistenciasMiembros = [];
        }
        
        asistenciasMiembros.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        asistenciasEntrenadores.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        
        const tbodyMiembros = document.getElementById('historialMiembrosBody');
        if (asistenciasMiembros.length === 0) {
            tbodyMiembros.innerHTML = '<tr><td colspan="5" style="text-align: center;">No hay asistencias de miembros registradas para los filtros seleccionados</td></tr>';
        } else {
            tbodyMiembros.innerHTML = asistenciasMiembros.map(asistencia => {
                const miembro = db.miembros.find(m => m.id === asistencia.miembroId);
                const clase = db.clases.find(c => c.id === asistencia.claseId);
                return `
                    <tr>
                        <td>${miembro ? miembro.nombre : 'N/A'}</td>
                        <td>${clase ? clase.nombre : 'N/A'}</td>
                        <td>${asistencia.fecha}</td>
                        <td style="color: ${asistencia.estado === 'Presente' ? 'green' : 'red'}; font-weight: bold;">
                            ${asistencia.estado === 'Presente' ? '✅ Presente' : '❌ Ausente'}
                        </td>
                        <td>${clase ? clase.entrenadorNombre || 'Sin asignar' : 'N/A'}</td>
                    </tr>
                `;
            }).join('');
        }
        
        const tbodyEntrenadores = document.getElementById('historialEntrenadoresBody');
        if (asistenciasEntrenadores.length === 0) {
            tbodyEntrenadores.innerHTML = '<tr><td colspan="4" style="text-align: center;">No hay asistencias de entrenadores registradas para los filtros seleccionados</td></tr>';
        } else {
            tbodyEntrenadores.innerHTML = asistenciasEntrenadores.map(asistencia => {
                const entrenador = db.entrenadores.find(e => e.id === asistencia.entrenadorId);
                const clase = db.clases.find(c => c.id === asistencia.claseId);
                return `
                    <tr>
                        <td>${entrenador ? entrenador.nombre : 'N/A'}</td>
                        <td>${clase ? clase.nombre : 'N/A'}</td>
                        <td>${asistencia.fecha}</td>
                        <td style="color: ${asistencia.estado === 'Presente' ? 'green' : 'red'}; font-weight: bold;">
                            ${asistencia.estado === 'Presente' ? '✅ Presente' : '❌ Ausente'}
                        </td>
                    </tr>
                `;
            }).join('');
        }
    }
    
    container.innerHTML = `
        <div class="card">
            <h3><i class="fas fa-history"></i> Historial de Asistencias a Clases</h3>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
                <div class="form-group">
                    <label>Filtrar por Tipo:</label>
                    <select id="filtroTipo">
                        <option value="todos">Todos</option>
                        <option value="miembros">Miembros</option>
                        <option value="entrenadores">Entrenadores</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Filtrar por Fecha:</label>
                    <select id="filtroFecha">
                        <option value="">Todas las fechas</option>
                        ${todasLasFechas.map(f => `<option value="${f}">${f}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Filtrar por Clase:</label>
                    <select id="filtroClase">
                        <option value="">Todas las clases</option>
                        ${db.clases.map(c => `<option value="${c.id}">${c.nombre}</option>`).join('')}
                    </select>
                </div>
            </div>
            
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
                <button id="aplicarFiltrosBtn" class="btn-info">Aplicar Filtros</button>
                <button id="limpiarFiltrosBtn" class="btn-secondary">Limpiar Filtros</button>
                <button id="exportarHistorialBtn" class="btn-print">Exportar Historial</button>
            </div>
            
            <div id="historialMsg" style="margin-top: 0.5rem;"></div>
        </div>
        
        <div class="card">
            <h3><i class="fas fa-users"></i> Asistencias de Miembros a Clases</h3>
            <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>Miembro</th>
                            <th>Clase</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                            <th>Entrenador</th>
                        </tr>
                    </thead>
                    <tbody id="historialMiembrosBody">
                        <tr><td colspan="5" style="text-align: center;">Cargando datos...</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <div class="card">
            <h3><i class="fas fa-chalkboard-teacher"></i> Asistencias de Entrenadores a Clases</h3>
            <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>Entrenador</th>
                            <th>Clase</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody id="historialEntrenadoresBody">
                        <tr><td colspan="4" style="text-align: center;">Cargando datos...</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        
    `;
    
    document.getElementById('aplicarFiltrosBtn').onclick = () => {
        renderizarHistorial();
        document.getElementById('historialMsg').innerHTML = '<p style="color: green;">✅ Filtros aplicados correctamente</p>';
        setTimeout(() => {
            document.getElementById('historialMsg').innerHTML = '';
        }, 3000);
    };
    
    document.getElementById('limpiarFiltrosBtn').onclick = () => {
        document.getElementById('filtroTipo').value = 'todos';
        document.getElementById('filtroFecha').value = '';
        document.getElementById('filtroClase').value = '';
        renderizarHistorial();
        document.getElementById('historialMsg').innerHTML = '<p style="color: orange;">🔄 Filtros limpiados</p>';
        setTimeout(() => {
            document.getElementById('historialMsg').innerHTML = '';
        }, 3000);
    };
    
    document.getElementById('exportarHistorialBtn').onclick = () => {
        const tipo = document.getElementById('filtroTipo').value;
        const fecha = document.getElementById('filtroFecha').value;
        const claseId = document.getElementById('filtroClase').value;
        
        let contenido = "HISTORIAL DE ASISTENCIAS A CLASES\n";
        contenido += "=".repeat(60) + "\n";
        contenido += `Generado: ${new Date().toLocaleString('es-AR')}\n`;
        contenido += `Tipo: ${tipo === 'todos' ? 'Todos' : tipo === 'miembros' ? 'Miembros' : 'Entrenadores'}\n`;
        contenido += `Fecha: ${fecha || 'Todas'}\n`;
        contenido += `Clase: ${claseId ? db.clases.find(c => c.id === parseInt(claseId))?.nombre || 'Seleccionada' : 'Todas'}\n\n`;
        
        const miembroRows = document.querySelectorAll('#historialMiembrosBody tr');
        const entrenadorRows = document.querySelectorAll('#historialEntrenadoresBody tr');
        
        const hayMiembros = miembroRows.length > 0 && !miembroRows[0].textContent.includes('No hay asistencias');
        const hayEntrenadores = entrenadorRows.length > 0 && !entrenadorRows[0].textContent.includes('No hay asistencias');
        
        if (hayMiembros) {
            contenido += "ASISTENCIAS DE MIEMBROS\n";
            contenido += "-".repeat(40) + "\n";
            contenido += "Miembro | Clase | Fecha | Estado | Entrenador\n";
            miembroRows.forEach(row => {
                const cells = row.querySelectorAll('td');
                if (cells.length > 1) {
                    contenido += `${cells[0].textContent} | ${cells[1].textContent} | ${cells[2].textContent} | ${cells[3].textContent} | ${cells[4].textContent}\n`;
                }
            });
            contenido += "\n";
        }
        
        if (hayEntrenadores) {
            contenido += "ASISTENCIAS DE ENTRENADORES\n";
            contenido += "-".repeat(40) + "\n";
            contenido += "Entrenador | Clase | Fecha | Estado\n";
            entrenadorRows.forEach(row => {
                const cells = row.querySelectorAll('td');
                if (cells.length > 1) {
                    contenido += `${cells[0].textContent} | ${cells[1].textContent} | ${cells[2].textContent} | ${cells[3].textContent}\n`;
                }
            });
            contenido += "\n";
        }
        
        if (!hayMiembros && !hayEntrenadores) {
            contenido += "No hay asistencias registradas para los filtros seleccionados.\n";
        }
        
        const blob = new Blob([contenido], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `historial_asistencias_${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showNotification("Historial exportado correctamente", false);
        document.getElementById('historialMsg').innerHTML = '<p style="color: green;">✅ Historial exportado correctamente</p>';
        setTimeout(() => {
            document.getElementById('historialMsg').innerHTML = '';
        }, 3000);
    };
    
    
    renderizarHistorial();
}


window.viewEntrenadorAsistenciaClase = (claseId) => {
    viewEntrenadorAsistencia(claseId);
};




















// --------------------- Modulo Clases y Horarios --------------------

// Registrar clase
function viewRegistrarClase() {
    document.getElementById('pageTitle').innerText = "Registrar Nueva Clase";
    const container = document.getElementById('dynamicContent');
    
    container.innerHTML = `
        <div class="card">
            <h3><i class="fas fa-plus-circle"></i> Registrar Nueva Clase</h3>
            <div class="form-row">
                <div class="form-group">
                    <label>Nombre *</label>
                    <input type="text" id="claseNombre" placeholder="Ej: Yoga, CrossFit, Spinning">
                </div>
                <div class="form-group">
                    <label>Entrenador *</label>
                    <select id="claseEntrenador">
                        <option value="">-- Seleccione un entrenador --</option>
                        ${db.entrenadores.map(e => `<option value="${e.id}" data-nombre="${e.nombre}">${e.nombre}</option>`).join('')}
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Horario de Inicio *</label>
                    <input type="time" id="claseHorarioInicio">
                </div>
                <div class="form-group">
                    <label>Horario de Finalización *</label>
                    <input type="time" id="claseHorarioFin">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Sala *</label>
                    <input type="text" id="claseSala" placeholder="Ej: Sala A, Salón Principal">
                </div>
                <div class="form-group">
                    <label>Cupos *</label>
                    <input type="number" id="claseCupos" min="1" placeholder="Cantidad máxima de alumnos">
                </div>
            </div>
            <div class="form-group">
                <label>Descripción (opcional)</label>
                <textarea id="claseDescripcion" rows="2" placeholder="Breve descripción de la clase..."></textarea>
            </div>
            <div style="display: flex; gap: 0.5rem;">
                <button id="guardarClaseBtn" class="btn-success">Guardar</button>
                <button id="cancelarClaseBtn" class="btn-secondary">Cancelar</button>
            </div>
            <div id="registroClaseMsg" style="margin-top: 0.5rem;"></div>
        </div>
    `;
    
    document.getElementById('guardarClaseBtn').onclick = () => {
        const nombre = document.getElementById('claseNombre').value.trim();
        const entrenadorId = document.getElementById('claseEntrenador').value;
        const horarioInicio = document.getElementById('claseHorarioInicio').value;
        const horarioFin = document.getElementById('claseHorarioFin').value;
        const sala = document.getElementById('claseSala').value.trim();
        const cupos = document.getElementById('claseCupos').value;
        const descripcion = document.getElementById('claseDescripcion').value.trim();
        
        if (!nombre) { showNotification("Por favor, completar el campo Nombre", true); return; }
        if (!entrenadorId) { showNotification("Por favor, completar el campo Entrenador", true); return; }
        if (!horarioInicio) { showNotification("Por favor, completar el campo Horario de Inicio", true); return; }
        if (!horarioFin) { showNotification("Por favor, completar el campo Horario de Finalización", true); return; }
        if (!sala) { showNotification("Por favor, completar el campo Sala", true); return; }
        if (!cupos) { showNotification("Por favor, completar el campo Cupos", true); return; }
        
        const entrenador = db.entrenadores.find(e => e.id === parseInt(entrenadorId));
        const entrenadorNombre = entrenador ? entrenador.nombre : '';
        
        const newId = db.clases.length + 1;
        const nuevaClase = {
            id: newId,
            nombre,
            entrenadorId: parseInt(entrenadorId),
            entrenadorNombre,
            horarioInicio,
            horarioFin,
            sala,
            cupos: parseInt(cupos),
            descripcion,
            inscritos: []
        };
        db.clases.push(nuevaClase);
        saveDB();
        
        document.getElementById('registroClaseMsg').innerHTML = '<p style="color:green;">✅ Datos guardados correctamente</p>';
        showNotification("Datos guardados correctamente", false);
        
        document.getElementById('claseNombre').value = '';
        document.getElementById('claseEntrenador').value = '';
        document.getElementById('claseHorarioInicio').value = '';
        document.getElementById('claseHorarioFin').value = '';
        document.getElementById('claseSala').value = '';
        document.getElementById('claseCupos').value = '';
        document.getElementById('claseDescripcion').value = '';
        
        setTimeout(() => {
            document.getElementById('registroClaseMsg').innerHTML = '';
        }, 3000);
    };
    
    document.getElementById('cancelarClaseBtn').onclick = () => {
        document.getElementById('claseNombre').value = '';
        document.getElementById('claseEntrenador').value = '';
        document.getElementById('claseHorarioInicio').value = '';
        document.getElementById('claseHorarioFin').value = '';
        document.getElementById('claseSala').value = '';
        document.getElementById('claseCupos').value = '';
        document.getElementById('claseDescripcion').value = '';
        document.getElementById('registroClaseMsg').innerHTML = '';
        showNotification("Registro cancelado", false);
    };
}

// Modificar clase
function viewModificarClase() {
    document.getElementById('pageTitle').innerText = "Modificar Clase";
    const container = document.getElementById('dynamicContent');
    
    function cargarDatosClase() {
        const id = parseInt(document.getElementById('selectClaseModificar').value);
        if (!id) {
            document.getElementById('editClaseNombre').value = '';
            document.getElementById('editClaseEntrenador').value = '';
            document.getElementById('editClaseHorarioInicio').value = '';
            document.getElementById('editClaseHorarioFin').value = '';
            document.getElementById('editClaseSala').value = '';
            document.getElementById('editClaseCupos').value = '';
            document.getElementById('editClaseDescripcion').value = '';
            return;
        }
        const clase = db.clases.find(c => c.id === id);
        if (clase) {
            document.getElementById('editClaseNombre').value = clase.nombre;
            document.getElementById('editClaseEntrenador').value = clase.entrenadorId || '';
            document.getElementById('editClaseHorarioInicio').value = clase.horarioInicio;
            document.getElementById('editClaseHorarioFin').value = clase.horarioFin;
            document.getElementById('editClaseSala').value = clase.sala;
            document.getElementById('editClaseCupos').value = clase.cupos;
            document.getElementById('editClaseDescripcion').value = clase.descripcion || '';
        }
    }
    
    container.innerHTML = `
        <div class="card">
            <h3><i class="fas fa-edit"></i> Modificar Clase</h3>
            <div class="form-group">
                <label>Seleccionar Clase</label>
                <select id="selectClaseModificar">
                    <option value="">-- Seleccione una clase --</option>
                    ${db.clases.map(c => `<option value="${c.id}">${c.nombre}</option>`).join('')}
                </select>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Nombre *</label>
                    <input type="text" id="editClaseNombre" placeholder="Nombre">
                </div>
                <div class="form-group">
                    <label>Entrenador *</label>
                    <select id="editClaseEntrenador">
                        <option value="">-- Seleccione un entrenador --</option>
                        ${db.entrenadores.map(e => `<option value="${e.id}" data-nombre="${e.nombre}">${e.nombre}</option>`).join('')}
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Horario de Inicio *</label>
                    <input type="time" id="editClaseHorarioInicio">
                </div>
                <div class="form-group">
                    <label>Horario de Finalización *</label>
                    <input type="time" id="editClaseHorarioFin">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Sala *</label>
                    <input type="text" id="editClaseSala" placeholder="Sala">
                </div>
                <div class="form-group">
                    <label>Cupos *</label>
                    <input type="number" id="editClaseCupos" min="1" placeholder="Cupos">
                </div>
            </div>
            <div class="form-group">
                <label>Descripción (opcional)</label>
                <textarea id="editClaseDescripcion" rows="2" placeholder="Descripción..."></textarea>
            </div>
            <div style="display: flex; gap: 0.5rem;">
                <button id="guardarModificacionClaseBtn" class="btn-success">Guardar Cambios</button>
                <button id="cancelarModificacionClaseBtn" class="btn-secondary">Cancelar</button>
            </div>
            <div id="modificacionClaseMsg" style="margin-top:1rem;"></div>
        </div>
    `;
    
    document.getElementById('selectClaseModificar').onchange = cargarDatosClase;
    
    document.getElementById('guardarModificacionClaseBtn').onclick = () => {
        const id = parseInt(document.getElementById('selectClaseModificar').value);
        if (!id) {
            showNotification("Por favor, seleccione una clase para modificar", true);
            return;
        }
        
        const nombre = document.getElementById('editClaseNombre').value.trim();
        const entrenadorId = document.getElementById('editClaseEntrenador').value;
        const horarioInicio = document.getElementById('editClaseHorarioInicio').value;
        const horarioFin = document.getElementById('editClaseHorarioFin').value;
        const sala = document.getElementById('editClaseSala').value.trim();
        const cupos = document.getElementById('editClaseCupos').value;
        const descripcion = document.getElementById('editClaseDescripcion').value.trim();
        
        if (!nombre) { showNotification("Por favor, completar el campo Nombre", true); return; }
        if (!entrenadorId) { showNotification("Por favor, completar el campo Entrenador", true); return; }
        if (!horarioInicio) { showNotification("Por favor, completar el campo Horario de Inicio", true); return; }
        if (!horarioFin) { showNotification("Por favor, completar el campo Horario de Finalización", true); return; }
        if (!sala) { showNotification("Por favor, completar el campo Sala", true); return; }
        if (!cupos) { showNotification("Por favor, completar el campo Cupos", true); return; }
        
        const entrenador = db.entrenadores.find(e => e.id === parseInt(entrenadorId));
        const entrenadorNombre = entrenador ? entrenador.nombre : '';
        
        const index = db.clases.findIndex(c => c.id === id);
        if (index !== -1) {
            db.clases[index] = {
                ...db.clases[index],
                nombre,
                entrenadorId: parseInt(entrenadorId),
                entrenadorNombre,
                horarioInicio,
                horarioFin,
                sala,
                cupos: parseInt(cupos),
                descripcion
            };
            saveDB();
            document.getElementById('modificacionClaseMsg').innerHTML = '<p style="color:green;">✅ Modificación realizada correctamente</p>';
            showNotification("Modificación realizada correctamente", false);
            
            const select = document.getElementById('selectClaseModificar');
            select.innerHTML = '<option value="">-- Seleccione una clase --</option>' + 
                db.clases.map(c => `<option value="${c.id}">${c.nombre}</option>`).join('');
        }
        
        setTimeout(() => {
            document.getElementById('modificacionClaseMsg').innerHTML = '';
        }, 3000);
    };
    
    document.getElementById('cancelarModificacionClaseBtn').onclick = () => {
        document.getElementById('selectClaseModificar').value = '';
        document.getElementById('editClaseNombre').value = '';
        document.getElementById('editClaseEntrenador').value = '';
        document.getElementById('editClaseHorarioInicio').value = '';
        document.getElementById('editClaseHorarioFin').value = '';
        document.getElementById('editClaseSala').value = '';
        document.getElementById('editClaseCupos').value = '';
        document.getElementById('editClaseDescripcion').value = '';
        document.getElementById('modificacionClaseMsg').innerHTML = '';
        showNotification("Modificación cancelada", false);
    };
}

// Consultar clase
function viewConsultarClase() {
    document.getElementById('pageTitle').innerText = "Consultar Clase";
    const container = document.getElementById('dynamicContent');
    
    container.innerHTML = `
        <div class="card">
            <h3><i class="fas fa-search"></i> Consultar Clase</h3>
            <div class="form-group">
                <label>Seleccionar Clase:</label>
                <select id="selectClaseConsultar">
                    <option value="">-- Seleccione una clase --</option>
                    ${db.clases.map(c => `<option value="${c.id}">${c.nombre} (${c.horarioInicio} - ${c.horarioFin})</option>`).join('')}
                </select>
            </div>
            <button id="consultarClaseBtn" class="btn-info">Consultar</button>
            <div id="claseData" style="margin-top:1rem; padding:1rem; background:#f8fafc; border-radius:12px;"></div>
            <div id="consultaClaseMsg" style="margin-top: 0.5rem;"></div>
        </div>
    `;
    
    const selectClase = document.getElementById('selectClaseConsultar');
    const consultarBtn = document.getElementById('consultarClaseBtn');
    const claseDataDiv = document.getElementById('claseData');
    const consultaMsg = document.getElementById('consultaClaseMsg');
    
    function consultarClase() {
        const id = parseInt(selectClase.value);
        
        if (!id) {
            showNotification("Por favor, seleccione una clase", true);
            consultaMsg.innerHTML = '<p style="color: red;">⚠️ Por favor, seleccione una clase</p>';
            claseDataDiv.innerHTML = '';
            return;
        }
        
        const clase = db.clases.find(c => c.id === id);
        if (clase) {
            const cuposDisponibles = clase.cupos - (clase.inscritos ? clase.inscritos.length : 0);
            const entrenador = db.entrenadores.find(e => e.id === clase.entrenadorId);
            
            let miembrosInscriptos = [];
            if (clase.inscritos && clase.inscritos.length > 0) {
                miembrosInscriptos = clase.inscritos.map(id => {
                    const miembro = db.miembros.find(m => m.id === id);
                    return miembro ? miembro.nombre : 'Desconocido';
                });
            }
            
            claseDataDiv.innerHTML = `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div>
                        <p><strong><i class="fas fa-dumbbell"></i> Nombre:</strong> ${clase.nombre}</p>
                        <p><strong><i class="fas fa-chalkboard-teacher"></i> Entrenador:</strong> ${clase.entrenadorNombre || 'Sin asignar'}</p>
                        <p><strong><i class="fas fa-clock"></i> Horario:</strong> ${clase.horarioInicio} - ${clase.horarioFin}</p>
                        <p><strong><i class="fas fa-door-open"></i> Sala:</strong> ${clase.sala}</p>
                    </div>
                    <div>
                        <p><strong><i class="fas fa-users"></i> Cupos:</strong> ${clase.cupos}</p>
                        <p><strong><i class="fas fa-user-check"></i> Inscriptos:</strong> ${clase.inscritos ? clase.inscritos.length : 0}</p>
                        <p><strong><i class="fas fa-user-plus"></i> Cupos disponibles:</strong> <span style="color: ${cuposDisponibles > 0 ? 'green' : 'red'}; font-weight: bold;">${cuposDisponibles}</span></p>
                        <p><strong><i class="fas fa-file-alt"></i> Descripción:</strong> ${clase.descripcion || 'Sin descripción'}</p>
                    </div>
                </div>
                ${miembrosInscriptos.length > 0 ? `
                    <div style="margin-top: 1rem; border-top: 1px solid #eef2f6; padding-top: 1rem;">
                        <p><strong><i class="fas fa-list"></i> Miembros inscriptos:</strong></p>
                        <ul style="margin: 0.5rem 0; padding-left: 1.5rem; columns: 2;">
                            ${miembrosInscriptos.map(nombre => `<li>${nombre}</li>`).join('')}
                        </ul>
                    </div>
                ` : `
                    <div style="margin-top: 1rem; border-top: 1px solid #eef2f6; padding-top: 1rem;">
                        <p style="color: #64748b;"><i class="fas fa-info-circle"></i> No hay miembros inscriptos en esta clase</p>
                    </div>
                `}
            `;
            consultaMsg.innerHTML = '<p style="color: green;">✅ Consulta realizada correctamente</p>';
            showNotification(`Mostrando información de ${clase.nombre}`, false);
            
            setTimeout(() => {
                consultaMsg.innerHTML = '';
            }, 3000);
        } else {
            consultaMsg.innerHTML = '<p style="color: red;">⚠️ Clase no encontrada</p>';
            claseDataDiv.innerHTML = '';
        }
    }
    
    consultarBtn.onclick = consultarClase;
    
    selectClase.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            consultarClase();
        }
    });
    
}

// Eliminar clase
function viewEliminarClase() {
    document.getElementById('pageTitle').innerText = "Eliminar Clase";
    const container = document.getElementById('dynamicContent');
    
    function actualizarSelectClases() {
        const select = document.getElementById('selectClaseEliminar');
        if (select) {
            select.innerHTML = '<option value="">-- Seleccione una clase --</option>' + 
                db.clases.map(c => `<option value="${c.id}">${c.nombre}</option>`).join('');
        }
    }
    
    container.innerHTML = `
        <div class="card">
            <h3><i class="fas fa-trash-alt"></i> Eliminar Clase</h3>
            <div class="form-group">
                <label>Seleccionar Clase</label>
                <select id="selectClaseEliminar">
                    <option value="">-- Seleccione una clase --</option>
                    ${db.clases.map(c => `<option value="${c.id}">${c.nombre}</option>`).join('')}
                </select>
            </div>
            <button id="eliminarClaseBtn" class="btn-danger">Eliminar</button>
            <div id="eliminarClaseMsg" style="margin-top:1rem;"></div>
        </div>
    `;
    
    document.getElementById('eliminarClaseBtn').onclick = () => {
        const id = parseInt(document.getElementById('selectClaseEliminar').value);
        if (!id) {
            showNotification("Por favor, seleccione una clase para eliminar", true);
            return;
        }
        const clase = db.clases.find(c => c.id === id);
        if (confirm(`¿Está seguro de eliminar la clase "${clase.nombre}"?`)) {
            db.clases = db.clases.filter(c => c.id !== id);
            saveDB();
            showNotification("Eliminación realizada correctamente", false);
            document.getElementById('eliminarClaseMsg').innerHTML = '<p style="color:green;">✅ Clase eliminada correctamente</p>';
            actualizarSelectClases();
            setTimeout(() => {
                document.getElementById('eliminarClaseMsg').innerHTML = '';
            }, 3000);
        }
    };
    
}

// Imprimir clases
function viewImprimirListadoClases() {
    document.getElementById('pageTitle').innerText = "Imprimir Listado de Clases";
    const container = document.getElementById('dynamicContent');
    
    container.innerHTML = `
        <div class="card">
            <h3><i class="fas fa-print"></i> Imprimir Listado Completo de Actividades</h3>
            <p>Se generará un listado con todas las clases disponibles, incluyendo horarios, entrenadores, sala, cupos e inscriptos.</p>
            <button id="imprimirListadoClasesBtn" class="btn-print">Imprimir Listado</button>
            <div id="impresionClaseMsg" style="margin-top:1rem;"></div>
        </div>
    `;
    
    document.getElementById('imprimirListadoClasesBtn').onclick = () => {
        let tablaClases = '';
        db.clases.forEach((clase, index) => {
            const cuposDisponibles = clase.cupos - (clase.inscritos ? clase.inscritos.length : 0);
            tablaClases += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${clase.nombre}</td>
                    <td>${clase.entrenadorNombre || 'Sin asignar'}</td>
                    <td>${clase.horarioInicio} - ${clase.horarioFin}</td>
                    <td>${clase.sala}</td>
                    <td>${clase.cupos}</td>
                    <td>${clase.inscritos ? clase.inscritos.length : 0} (${cuposDisponibles} libres)</td>
                    <td>${clase.descripcion || '-'}</td>
                </tr>
            `;
        });
        
        const contenido = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Listado de Clases - Cuerpo Sano</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; }
                    .container { max-width: 1200px; margin: 0 auto; }
                    h1 { color: #227c6c; text-align: center; }
                    h2 { text-align: center; color: #475569; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background-color: #f2f2f2; }
                    .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Cuerpo Sano - Gimnasio "Su Mejor Peso"</h1>
                    <h2>LISTADO COMPLETO DE ACTIVIDADES</h2>
                    <p>Fecha de generación: ${new Date().toLocaleString('es-AR')}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th><th>Clase</th><th>Entrenador</th><th>Horario</th>
                                <th>Sala</th><th>Cupos</th><th>Inscriptos</th><th>Descripción</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tablaClases || '<tr><td colspan="8" style="text-align:center;">No hay clases registradas</td></tr>'}
                        </tbody>
                    </table>
                    <div class="footer">
                        <p>Total de clases: ${db.clases.length}</p>
                        <p>Documento generado automáticamente por el sistema Cuerpo Sano</p>
                    </div>
                </div>
            </body>
            </html>
        `;
        
        const ventana = window.open('', '_blank');
        ventana.document.write(contenido);
        ventana.document.close();
        ventana.print();
        
        document.getElementById('impresionClaseMsg').innerHTML = '<p style="color:green;">✅ Enviando a impresión...</p>';
        showNotification("Imprimiendo listado de clases...", false);
        
        setTimeout(() => {
            document.getElementById('impresionClaseMsg').innerHTML = '';
        }, 2000);
    };
    
}

// Clases disponibles miembros (Inscripcion)
function viewClasesDisponibles() {
    document.getElementById('pageTitle').innerText = "Clases Disponibles";
    const container = document.getElementById('dynamicContent');
    
    const miembroActual = db.miembros[0];
    
    function renderClasesDisponibles() {
        container.innerHTML = `
            <div class="card">
                <h3><i class="fas fa-calendar-alt"></i> Clases Disponibles</h3>
                <p><strong>Miembro:</strong> ${miembroActual.nombre} (DNI: ${miembroActual.dni})</p>
                <div style="margin: 1rem 0; display: flex; gap: 1rem; flex-wrap: wrap;">
                    <div class="form-group" style="flex: 1; min-width: 200px;">
                        <label>Filtrar por Clase:</label>
                        <select id="filtroClase">
                            <option value="todas">Todas las clases</option>
                            ${db.clases.map(c => `<option value="${c.id}">${c.nombre}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group" style="flex: 1; min-width: 200px;">
                        <label>Filtrar por Estado:</label>
                        <select id="filtroEstado">
                            <option value="todas">Todas</option>
                            <option value="inscripto">Mis clases</option>
                            <option value="disponible">Disponibles</option>
                            <option value="completo">Sin cupos</option>
                        </select>
                    </div>
                    <div style="display: flex; align-items: flex-end; gap: 0.5rem;">
                        <button id="aplicarFiltroBtn" class="btn-info">Aplicar Filtro</button>
                        <button id="limpiarFiltroBtn" class="btn-secondary">Limpiar</button>
                    </div>
                </div>
                <div id="inscripcionMsg" style="margin-top: 0.5rem;"></div>
                <div class="table-responsive">
                    <table id="tablaClasesDisponibles">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Entrenador</th>
                                <th>Horario</th>
                                <th>Sala</th>
                                <th>Cupos Totales</th>
                                <th>Inscriptos</th>
                                <th>Cupos Libres</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody id="clasesDisponiblesBody">
                            ${renderizarFilasClases('todas', 'todas')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        
        document.getElementById('aplicarFiltroBtn').onclick = () => {
            const filtroClase = document.getElementById('filtroClase').value;
            const filtroEstado = document.getElementById('filtroEstado').value;
            const tbody = document.getElementById('clasesDisponiblesBody');
            tbody.innerHTML = renderizarFilasClases(filtroClase, filtroEstado);
        };
        
        document.getElementById('limpiarFiltroBtn').onclick = () => {
            document.getElementById('filtroClase').value = 'todas';
            document.getElementById('filtroEstado').value = 'todas';
            const tbody = document.getElementById('clasesDisponiblesBody');
            tbody.innerHTML = renderizarFilasClases('todas', 'todas');
        };
        
    }
    
    function renderizarFilasClases(filtroClase, filtroEstado) {
        let clasesFiltradas = [...db.clases];
        
        if (filtroClase !== 'todas') {
            clasesFiltradas = clasesFiltradas.filter(c => c.id === parseInt(filtroClase));
        }
        
        if (filtroEstado === 'inscripto') {
            clasesFiltradas = clasesFiltradas.filter(c => c.inscritos && c.inscritos.includes(miembroActual.id));
        } else if (filtroEstado === 'disponible') {
            clasesFiltradas = clasesFiltradas.filter(c => {
                const inscritos = c.inscritos ? c.inscritos.length : 0;
                const cuposLibres = c.cupos - inscritos;
                return cuposLibres > 0 && !(c.inscritos && c.inscritos.includes(miembroActual.id));
            });
        } else if (filtroEstado === 'completo') {
            clasesFiltradas = clasesFiltradas.filter(c => {
                const inscritos = c.inscritos ? c.inscritos.length : 0;
                const cuposLibres = c.cupos - inscritos;
                return cuposLibres <= 0;
            });
        }
        
        if (clasesFiltradas.length === 0) {
            return '<tr><td colspan="8" style="text-align: center;">No hay clases que coincidan con los filtros seleccionados</td></tr>';
        }
        
        return clasesFiltradas.map(clase => {
            const inscritos = clase.inscritos ? clase.inscritos.length : 0;
            const cuposLibres = clase.cupos - inscritos;
            const yaInscripto = clase.inscritos ? clase.inscritos.includes(miembroActual.id) : false;
            
            let botonAccion = '';
            if (yaInscripto) {
                botonAccion = `
                    <div style="display: flex; flex-direction: column; gap: 0.25rem;">
                        <span style="color: green; font-weight: bold;">✅ Inscripto</span>
                        <button class="btn-danger btn-sm" onclick="window.desinscribirDeClase(${clase.id})">Desinscribirse</button>
                    </div>
                `;
            } else if (cuposLibres > 0) {
                botonAccion = `<button class="btn-success btn-sm" onclick="window.inscribirAClase(${clase.id})">Inscribirse</button>`;
            } else {
                botonAccion = `<button class="btn-secondary btn-sm" disabled style="background: gray; cursor: not-allowed;">Sin cupos</button>`;
            }
            
            return `
                <tr>
                    <td><strong>${clase.nombre}</strong></td>
                    <td>${clase.entrenadorNombre || 'Sin asignar'}</td>
                    <td>${clase.horarioInicio} - ${clase.horarioFin}</td>
                    <td>${clase.sala}</td>
                    <td>${clase.cupos}</td>
                    <td>${inscritos}</td>
                    <td style="color: ${cuposLibres > 0 ? 'green' : 'red'}; font-weight: bold;">${cuposLibres}</td>
                    <td>${botonAccion}</td>
                </tr>
            `;
        }).join('');
    }
    
    window.inscribirAClase = (claseId) => {
        const clase = db.clases.find(c => c.id === claseId);
        const inscripcionMsg = document.getElementById('inscripcionMsg');
        
        if (!clase) {
            showNotification("Clase no encontrada", true);
            if (inscripcionMsg) inscripcionMsg.innerHTML = '<p style="color: red;">⚠️ Clase no encontrada</p>';
            return;
        }
        
        const inscritosActuales = clase.inscritos ? clase.inscritos.length : 0;
        const cuposDisponibles = clase.cupos - inscritosActuales;
        
        if (cuposDisponibles <= 0) {
            showNotification("No hay cupos disponibles para esta clase", true);
            if (inscripcionMsg) inscripcionMsg.innerHTML = `<p style="color: red;">⚠️ No hay cupos disponibles para ${clase.nombre}</p>`;
            return;
        }
        
        if (clase.inscritos && clase.inscritos.includes(miembroActual.id)) {
            showNotification("Ya está inscripto en esta clase", true);
            if (inscripcionMsg) inscripcionMsg.innerHTML = `<p style="color: orange;">⚠️ Ya está inscripto en ${clase.nombre}</p>`;
            return;
        }
        
        if (!clase.inscritos) clase.inscritos = [];
        clase.inscritos.push(miembroActual.id);
        saveDB();
        
        showNotification(`¡Inscripción exitosa a ${clase.nombre}!`, false);
        if (inscripcionMsg) inscripcionMsg.innerHTML = `<p style="color: green;">✅ Inscripción exitosa a ${clase.nombre}</p>`;
        
        const filtroClase = document.getElementById('filtroClase')?.value || 'todas';
        const filtroEstado = document.getElementById('filtroEstado')?.value || 'todas';
        const tbody = document.getElementById('clasesDisponiblesBody');
        if (tbody) {
            tbody.innerHTML = renderizarFilasClases(filtroClase, filtroEstado);
        }
        
        setTimeout(() => {
            if (inscripcionMsg) inscripcionMsg.innerHTML = '';
        }, 3000);
    };
    
    window.desinscribirDeClase = (claseId) => {
        const clase = db.clases.find(c => c.id === claseId);
        const inscripcionMsg = document.getElementById('inscripcionMsg');
        
        if (!clase) {
            showNotification("Clase no encontrada", true);
            if (inscripcionMsg) inscripcionMsg.innerHTML = '<p style="color: red;">⚠️ Clase no encontrada</p>';
            return;
        }
        
        if (!clase.inscritos || !clase.inscritos.includes(miembroActual.id)) {
            showNotification("No está inscripto en esta clase", true);
            if (inscripcionMsg) inscripcionMsg.innerHTML = `<p style="color: orange;">⚠️ No está inscripto en ${clase.nombre}</p>`;
            return;
        }
        
        if (confirm(`¿Está seguro que desea desinscribirse de la clase "${clase.nombre}"?`)) {
            clase.inscritos = clase.inscritos.filter(id => id !== miembroActual.id);
            saveDB();
            
            showNotification(`Desinscripción exitosa de ${clase.nombre}`, false);
            if (inscripcionMsg) inscripcionMsg.innerHTML = `<p style="color: green;">✅ Desinscripción exitosa de ${clase.nombre}</p>`;
            
            const filtroClase = document.getElementById('filtroClase')?.value || 'todas';
            const filtroEstado = document.getElementById('filtroEstado')?.value || 'todas';
            const tbody = document.getElementById('clasesDisponiblesBody');
            if (tbody) {
                tbody.innerHTML = renderizarFilasClases(filtroClase, filtroEstado);
            }
            
            setTimeout(() => {
                if (inscripcionMsg) inscripcionMsg.innerHTML = '';
            }, 3000);
        }
    };
    
    renderClasesDisponibles();
}

// Inscribir miembro clase
function viewInscribirMiembrosClase() {
    document.getElementById('pageTitle').innerText = "Inscribir / Desinscribir Miembros a Clases";
    const container = document.getElementById('dynamicContent');
    
    function actualizarInfoClase() {
        const claseId = document.getElementById('selectClaseInscripcion').value;
        const infoClaseDiv = document.getElementById('infoClaseSeleccionada');
        const miembrosInscriptosDiv = document.getElementById('miembrosInscriptosLista');
        const inscribirSection = document.getElementById('inscribirSection');
        
        if (!claseId) {
            infoClaseDiv.innerHTML = '<p style="color: #64748b;">Seleccione una clase para ver la información</p>';
            miembrosInscriptosDiv.innerHTML = '';
            inscribirSection.style.display = 'none';
            return;
        }
        
        const clase = db.clases.find(c => c.id === parseInt(claseId));
        if (!clase) {
            infoClaseDiv.innerHTML = '<p style="color: red;">⚠️ Clase no encontrada</p>';
            return;
        }
        
        const cuposDisponibles = clase.cupos - (clase.inscritos ? clase.inscritos.length : 0);
        
        infoClaseDiv.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div>
                    <p><strong><i class="fas fa-dumbbell"></i> Clase:</strong> ${clase.nombre}</p>
                    <p><strong><i class="fas fa-chalkboard-teacher"></i> Entrenador:</strong> ${clase.entrenadorNombre || 'Sin asignar'}</p>
                    <p><strong><i class="fas fa-clock"></i> Horario:</strong> ${clase.horarioInicio} - ${clase.horarioFin}</p>
                </div>
                <div>
                    <p><strong><i class="fas fa-users"></i> Cupos totales:</strong> ${clase.cupos}</p>
                    <p><strong><i class="fas fa-user-check"></i> Inscriptos:</strong> ${clase.inscritos ? clase.inscritos.length : 0}</p>
                    <p><strong><i class="fas fa-user-plus"></i> Cupos disponibles:</strong> <span style="color: ${cuposDisponibles > 0 ? 'green' : 'red'}; font-weight: bold;">${cuposDisponibles}</span></p>
                </div>
            </div>
        `;
        
        if (clase.inscritos && clase.inscritos.length > 0) {
            miembrosInscriptosDiv.innerHTML = `
                <div style="margin-top: 0.5rem;">
                    <p><strong>Miembros inscriptos:</strong></p>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-top: 0.5rem;">
                        ${clase.inscritos.map(id => {
                            const miembro = db.miembros.find(m => m.id === id);
                            return `
                                <div style="background: white; padding: 0.5rem 0.75rem; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; border: 1px solid #eef2f6;">
                                    <span>${miembro ? miembro.nombre : 'Desconocido'} (ID: ${id})</span>
                                    <button class="btn-danger btn-sm" onclick="desinscribirMiembro(${clase.id}, ${id})" style="padding: 0.2rem 0.6rem; font-size: 0.7rem;">
                                        <i class="fas fa-times"></i> Quitar
                                    </button>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
            inscribirSection.style.display = 'block';
        } else {
            miembrosInscriptosDiv.innerHTML = '<p style="color: #64748b;">No hay miembros inscriptos en esta clase</p>';
            inscribirSection.style.display = 'block';
        }
        
        const selectMiembro = document.getElementById('selectMiembroInscribir');
        if (selectMiembro) {
            const miembrosInscriptosIds = clase.inscritos || [];
            const miembrosDisponibles = db.miembros.filter(m => !miembrosInscriptosIds.includes(m.id));
            
            if (miembrosDisponibles.length === 0 || cuposDisponibles <= 0) {
                selectMiembro.innerHTML = '<option value="">-- No hay miembros disponibles para inscribir --</option>';
                document.getElementById('inscribirBtn').disabled = true;
            } else {
                selectMiembro.innerHTML = `
                    <option value="">-- Seleccione un miembro --</option>
                    ${miembrosDisponibles.map(m => `<option value="${m.id}">${m.nombre} (DNI: ${m.dni})</option>`).join('')}
                `;
                document.getElementById('inscribirBtn').disabled = false;
            }
        }
    }
    
    window.desinscribirMiembro = (claseId, miembroId) => {
        const clase = db.clases.find(c => c.id === parseInt(claseId));
        const miembro = db.miembros.find(m => m.id === parseInt(miembroId));
        const mensajeDiv = document.getElementById('inscripcionMsg');
        
        if (!clase || !miembro) {
            showNotification("Clase o miembro no encontrado", true);
            mensajeDiv.innerHTML = '<p style="color: red;">⚠️ Clase o miembro no encontrado</p>';
            return;
        }
        
        if (!clase.inscritos || !clase.inscritos.includes(miembro.id)) {
            showNotification(`El miembro ${miembro.nombre} no está inscripto en esta clase`, true);
            mensajeDiv.innerHTML = `<p style="color: orange;">⚠️ ${miembro.nombre} no está inscripto en ${clase.nombre}</p>`;
            return;
        }
        
        if (confirm(`¿Está seguro que desea desinscribir a ${miembro.nombre} de la clase "${clase.nombre}"?`)) {
            clase.inscritos = clase.inscritos.filter(id => id !== miembro.id);
            saveDB();
            
            showNotification(`✅ ${miembro.nombre} desinscripto exitosamente de ${clase.nombre}`, false);
            mensajeDiv.innerHTML = `<p style="color: green;">✅ ${miembro.nombre} desinscripto exitosamente de ${clase.nombre}</p>`;
            
            actualizarInfoClase();
            
            setTimeout(() => {
                mensajeDiv.innerHTML = '';
            }, 3000);
        }
    };
    
    function inscribirMiembro() {
        const claseId = document.getElementById('selectClaseInscripcion').value;
        const miembroId = document.getElementById('selectMiembroInscribir').value;
        const mensajeDiv = document.getElementById('inscripcionMsg');
        
        if (!claseId) {
            showNotification("Por favor, seleccione una clase", true);
            mensajeDiv.innerHTML = '<p style="color: red;">⚠️ Por favor, seleccione una clase</p>';
            return;
        }
        
        if (!miembroId) {
            showNotification("Por favor, seleccione un miembro", true);
            mensajeDiv.innerHTML = '<p style="color: red;">⚠️ Por favor, seleccione un miembro</p>';
            return;
        }
        
        const clase = db.clases.find(c => c.id === parseInt(claseId));
        const miembro = db.miembros.find(m => m.id === parseInt(miembroId));
        
        if (!clase || !miembro) {
            showNotification("Clase o miembro no encontrado", true);
            mensajeDiv.innerHTML = '<p style="color: red;">⚠️ Clase o miembro no encontrado</p>';
            return;
        }
        
        const cuposDisponibles = clase.cupos - (clase.inscritos ? clase.inscritos.length : 0);
        if (cuposDisponibles <= 0) {
            showNotification("No hay cupos disponibles para esta clase", true);
            mensajeDiv.innerHTML = `<p style="color: red;">⚠️ No hay cupos disponibles para ${clase.nombre}</p>`;
            return;
        }
        
        if (!clase.inscritos) clase.inscritos = [];
        if (clase.inscritos.includes(miembro.id)) {
            showNotification("El miembro ya está inscripto en esta clase", true);
            mensajeDiv.innerHTML = `<p style="color: orange;">⚠️ ${miembro.nombre} ya está inscripto en ${clase.nombre}</p>`;
            return;
        }
        
        clase.inscritos.push(miembro.id);
        saveDB();
        
        showNotification(`✅ ${miembro.nombre} inscrito exitosamente en ${clase.nombre}`, false);
        mensajeDiv.innerHTML = `<p style="color: green;">✅ ${miembro.nombre} inscrito exitosamente en ${clase.nombre}</p>`;
        
        actualizarInfoClase();
        
        setTimeout(() => {
            mensajeDiv.innerHTML = '';
        }, 3000);
    }
    
    container.innerHTML = `
        <div class="card">
            <h3><i class="fas fa-user-plus"></i> Inscribir / Desinscribir Miembros a Clases</h3>
            
            <div class="form-group">
                <label>Seleccionar Clase:</label>
                <select id="selectClaseInscripcion">
                    <option value="">-- Seleccione una clase --</option>
                    ${db.clases.map(c => `<option value="${c.id}">${c.nombre} (${c.horarioInicio} - ${c.horarioFin})</option>`).join('')}
                </select>
            </div>
            
            <div id="infoClaseSeleccionada" style="padding: 1rem; background: #f8fafc; border-radius: 12px; margin-bottom: 1rem;">
                <p style="color: #64748b;">Seleccione una clase para ver la información</p>
            </div>
            
            <div id="miembrosInscriptosLista" style="padding: 0.5rem; background: #f0fdf9; border-radius: 12px; margin-bottom: 1rem;"></div>
            
            <div id="inscribirSection" style="border-top: 1px solid #eef2f6; padding-top: 1rem; margin-top: 0.5rem; display: none;">
                <div class="form-group">
                    <label>Seleccionar Miembro a Inscribir:</label>
                    <select id="selectMiembroInscribir">
                        <option value="">-- Seleccione un miembro --</option>
                        ${db.miembros.map(m => `<option value="${m.id}">${m.nombre} (DNI: ${m.dni})</option>`).join('')}
                    </select>
                </div>
                <button id="inscribirBtn" class="btn-success">Inscribir Miembro</button>
                <div id="inscripcionMsg" style="margin-top: 0.5rem;"></div>
            </div>
            
        </div>
    `;
    
    document.getElementById('selectClaseInscripcion').addEventListener('change', actualizarInfoClase);
    document.getElementById('inscribirBtn').onclick = inscribirMiembro;
    
    
    const selectClase = document.getElementById('selectClaseInscripcion');
    if (db.clases.length > 0) {
        selectClase.value = db.clases[0].id;
        actualizarInfoClase();
    }
}


// Asignar Entrenador a clase
function viewAsignarEntrenadorClase() {
    document.getElementById('pageTitle').innerText = "Asignar Entrenador a Clase";
    const container = document.getElementById('dynamicContent');
    
    function actualizarSelects() {
        const entrenadorSelect = document.getElementById('asignarEntrenadorSelect');
        const claseSelect = document.getElementById('asignarClaseSelect');
        
        if (entrenadorSelect) {
            entrenadorSelect.innerHTML = '<option value="">-- Seleccione un entrenador --</option>' +
                db.entrenadores.map(e => `<option value="${e.id}" data-nombre="${e.nombre}">${e.nombre}</option>`).join('');
        }
        if (claseSelect) {
            claseSelect.innerHTML = '<option value="">-- Seleccione una clase --</option>' +
                db.clases.map(c => `<option value="${c.id}" data-nombre="${c.nombre}">${c.nombre} (${c.horarioInicio} - ${c.horarioFin})</option>`).join('');
        }
    }
    
    container.innerHTML = `
        <div class="card">
            <h3><i class="fas fa-exchange-alt"></i> Asignar Entrenador a Clase</h3>
            <div class="form-row">
                <div class="form-group">
                    <label>Seleccionar Entrenador</label>
                    <select id="asignarEntrenadorSelect">
                        <option value="">-- Seleccione un entrenador --</option>
                        ${db.entrenadores.map(e => `<option value="${e.id}" data-nombre="${e.nombre}">${e.nombre}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Seleccionar Clase</label>
                    <select id="asignarClaseSelect">
                        <option value="">-- Seleccione una clase --</option>
                        ${db.clases.map(c => `<option value="${c.id}" data-nombre="${c.nombre}">${c.nombre} (${c.horarioInicio} - ${c.horarioFin})</option>`).join('')}
                    </select>
                </div>
            </div>
            <button id="asignarEntrenadorBtn" class="btn-success">Asignar</button>
            <div id="asignacionMsg" style="margin-top:1rem;"></div>
        </div>
        <div class="card">
            <h3><i class="fas fa-list"></i> Asignaciones Actuales</h3>
            <div class="table-responsive">
                <table id="tablaAsignaciones">
                    <thead>
                        <tr><th>Clase</th><th>Entrenador Asignado</th><th>Horario</th><th>Sala</th></tr>
                    </thead>
                    <tbody>
                        ${db.clases.map(clase => `
                            <tr>
                                <td>${clase.nombre}</td>
                                <td>${clase.entrenadorNombre || 'Sin asignar'}</td>
                                <td>${clase.horarioInicio} - ${clase.horarioFin}</td>
                                <td>${clase.sala}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    document.getElementById('asignarEntrenadorBtn').onclick = () => {
        const entrenadorId = document.getElementById('asignarEntrenadorSelect').value;
        const claseId = document.getElementById('asignarClaseSelect').value;
        
        if (!entrenadorId) {
            showNotification("Por favor, seleccione un entrenador", true);
            return;
        }
        if (!claseId) {
            showNotification("Por favor, seleccione una clase", true);
            return;
        }
        
        const entrenador = db.entrenadores.find(e => e.id === parseInt(entrenadorId));
        const clase = db.clases.find(c => c.id === parseInt(claseId));
        
        if (entrenador && clase) {
            clase.entrenadorId = entrenador.id;
            clase.entrenadorNombre = entrenador.nombre;
            saveDB();
            showNotification(`Entrenador ${entrenador.nombre} asignado a la clase ${clase.nombre}`, false);
            document.getElementById('asignacionMsg').innerHTML = `<p style="color:green;">✅ Entrenador asignado correctamente a ${clase.nombre}</p>`;
            
            // Actualizar tabla de asignaciones
            const tbody = document.querySelector('#tablaAsignaciones tbody');
            if (tbody) {
                tbody.innerHTML = db.clases.map(clase => `
                    <tr>
                        <td>${clase.nombre}</td>
                        <td>${clase.entrenadorNombre || 'Sin asignar'}</td>
                        <td>${clase.horarioInicio} - ${clase.horarioFin}</td>
                        <td>${clase.sala}</td>
                    </tr>
                `).join('');
            }
            
            setTimeout(() => {
                document.getElementById('asignacionMsg').innerHTML = '';
            }, 3000);
        }
    };
    
}










// ------------------ Modulo Entrenadores ---------------------

// Registrar Entrenador
function viewRegistrarEntrenador() {
    document.getElementById('pageTitle').innerText = "Registrar Nuevo Entrenador";
    const container = document.getElementById('dynamicContent');
    
    let certificacionesTemp = [];
    let certificadosTemp = [];
    
    function actualizarListaCertificaciones() {
        const listaDiv = document.getElementById('listaCertificaciones');
        if (listaDiv) {
            if (certificacionesTemp.length === 0) {
                listaDiv.innerHTML = '<span style="color: #94a3b8; font-size: 0.8rem;">No hay certificaciones agregadas</span>';
            } else {
                listaDiv.innerHTML = certificacionesTemp.map((cert, idx) => `
                    <span style="background: #f1f5f9; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 0.5rem;">
                        ${cert}
                        <button type="button" class="btn-remove-cert" data-idx="${idx}" style="background: none; border: none; color: #ef4444; cursor: pointer; padding: 0; margin: 0;">&times;</button>
                    </span>
                `).join('');
                
                document.querySelectorAll('.btn-remove-cert').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const idx = parseInt(btn.getAttribute('data-idx'));
                        certificacionesTemp.splice(idx, 1);
                        actualizarListaCertificaciones();
                        actualizarEstadoValidacion();
                    });
                });
            }
        }
        actualizarEstadoValidacion();
    }
    
    function actualizarListaCertificados() {
        const listaDiv = document.getElementById('listaCertificados');
        if (listaDiv) {
            if (certificadosTemp.length === 0) {
                listaDiv.innerHTML = '<span style="color: #94a3b8; font-size: 0.8rem;">No hay certificados PDF subidos</span>';
            } else {
                listaDiv.innerHTML = certificadosTemp.map((cert, idx) => `
                    <span style="background: #f0fdf9; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 0.5rem; border: 1px solid #227c6c;">
                        <i class="fas fa-file-pdf" style="color: #dc2626;"></i>
                        ${cert.nombre}
                        <a href="${cert.data}" target="_blank" style="color: #227c6c; text-decoration: none; font-size: 0.7rem;">
                            <i class="fas fa-eye"></i> Ver
                        </a>
                        <button type="button" class="btn-remove-cert-pdf" data-idx="${idx}" style="background: none; border: none; color: #ef4444; cursor: pointer; padding: 0; margin: 0;">&times;</button>
                    </span>
                `).join('');
                
                document.querySelectorAll('.btn-remove-cert-pdf').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const idx = parseInt(btn.getAttribute('data-idx'));
                        certificadosTemp.splice(idx, 1);
                        actualizarListaCertificados();
                        actualizarEstadoValidacion();
                    });
                });
            }
        }
        actualizarEstadoValidacion();
    }
    
    function actualizarEstadoValidacion() {
        const mensajeValidacion = document.getElementById('validacionCertificadosMsg');
        const guardarBtn = document.getElementById('guardarEntrenadorBtn');
        const certificacionesCount = certificacionesTemp.length;
        const certificadosCount = certificadosTemp.length;
        
        if (certificacionesCount === 0) {
            mensajeValidacion.innerHTML = '<p style="color: orange;">⚠️ Debe agregar al menos una certificación</p>';
            mensajeValidacion.style.display = 'block';
            guardarBtn.disabled = true;
            return;
        }
        
        if (certificadosCount === 0) {
            mensajeValidacion.innerHTML = '<p style="color: orange;">⚠️ Debe subir al menos un certificado PDF</p>';
            mensajeValidacion.style.display = 'block';
            guardarBtn.disabled = true;
            return;
        }
        
        if (certificacionesCount !== certificadosCount) {
            mensajeValidacion.innerHTML = `<p style="color: orange;">⚠️ La cantidad de certificaciones (${certificacionesCount}) no coincide con la cantidad de PDFs subidos (${certificadosCount})</p>`;
            mensajeValidacion.style.display = 'block';
            guardarBtn.disabled = true;
            return;
        }
        
        mensajeValidacion.innerHTML = `<p style="color: green;">✅ ${certificacionesCount} certificaciones con sus respectivos PDFs</p>`;
        mensajeValidacion.style.display = 'block';
        guardarBtn.disabled = false;
    }
    
    container.innerHTML = `
        <div class="card">
            <h3><i class="fas fa-user-plus"></i> Registrar Nuevo Entrenador</h3>
            <div class="form-row">
                <div class="form-group">
                    <label>Nombre y Apellido *</label>
                    <input type="text" id="entrenadorNombre" placeholder="Nombre completo">
                </div>
                <div class="form-group">
                    <label>DNI *</label>
                    <input type="text" id="entrenadorDni" placeholder="Número de documento">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Fecha de Nacimiento *</label>
                    <input type="date" id="entrenadorFechaNac">
                </div>
                <div class="form-group">
                    <label>Teléfono *</label>
                    <input type="text" id="entrenadorTelefono" placeholder="Número de teléfono">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Dirección *</label>
                    <input type="text" id="entrenadorDireccion" placeholder="Dirección completa">
                </div>
            </div>
            
            <div class="form-group">
                <label>Certificaciones (texto) *</label>
                <p style="font-size: 0.8rem; color: #64748b;">Cada certificación debe tener su respectivo PDF</p>
                <div style="display: flex; gap: 0.5rem;">
                    <input type="text" id="entrenadorCertificacion" placeholder="Ej: CrossFit L1" style="flex: 1;">
                    <button type="button" id="agregarCertificacionBtn" class="btn-info btn-sm">+ Agregar</button>
                </div>
                <div id="listaCertificaciones" style="margin-top: 0.5rem; display: flex; flex-wrap: wrap; gap: 0.5rem;"></div>
            </div>
            
            <div class="form-group">
                <label>Certificados PDF *</label>
                <p style="font-size: 0.8rem; color: #64748b;">Debe subir un PDF por cada certificación</p>
                <div style="display: flex; gap: 0.5rem; align-items: center;">
                    <input type="file" id="certificadoPdfInput" accept=".pdf" style="flex: 1;">
                    <button type="button" id="agregarCertificadoBtn" class="btn-info btn-sm">+ Subir PDF</button>
                </div>
                <div id="listaCertificados" style="margin-top: 0.5rem; display: flex; flex-wrap: wrap; gap: 0.5rem;"></div>
            </div>
            
            <div id="validacionCertificadosMsg" style="margin-top: 0.5rem; padding: 0.5rem; border-radius: 8px; display: none;"></div>
            
            <div style="display: flex; gap: 0.5rem;">
                <button id="guardarEntrenadorBtn" class="btn-success" disabled>Guardar</button>
                <button id="cancelarEntrenadorBtn" class="btn-secondary">Cancelar</button>
            </div>
            <div id="registroEntrenadorMsg" style="margin-top: 0.5rem;"></div>
        </div>
    `;
    
    document.getElementById('agregarCertificacionBtn').onclick = () => {
        const input = document.getElementById('entrenadorCertificacion');
        const cert = input.value.trim();
        if (cert) {
            if (certificacionesTemp.includes(cert)) {
                showNotification(`La certificación "${cert}" ya está agregada`, true);
                return;
            }
            certificacionesTemp.push(cert);
            actualizarListaCertificaciones();
            input.value = '';
            actualizarEstadoValidacion();
        } else {
            showNotification("Por favor, ingrese el nombre de la certificación", true);
        }
    };
    
    document.getElementById('agregarCertificadoBtn').onclick = () => {
        const input = document.getElementById('certificadoPdfInput');
        const file = input.files[0];
        if (file) {
            if (file.type !== 'application/pdf') {
                showNotification("Por favor, seleccione un archivo PDF válido", true);
                return;
            }
            
            if (file.size > 5 * 1024 * 1024) {
                showNotification("El archivo no puede superar los 5MB", true);
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(event) {
                certificadosTemp.push({
                    nombre: file.name,
                    data: event.target.result,
                    size: file.size
                });
                actualizarListaCertificados();
                input.value = '';
                showNotification(`PDF "${file.name}" subido correctamente`, false);
                actualizarEstadoValidacion();
            };
            reader.readAsDataURL(file);
        } else {
            showNotification("Por favor, seleccione un archivo PDF", true);
        }
    };
    
    document.getElementById('guardarEntrenadorBtn').onclick = () => {
        const nombre = document.getElementById('entrenadorNombre').value.trim();
        const dni = document.getElementById('entrenadorDni').value.trim();
        const fechaNac = document.getElementById('entrenadorFechaNac').value;
        const telefono = document.getElementById('entrenadorTelefono').value.trim();
        const direccion = document.getElementById('entrenadorDireccion').value.trim();
        const registroMsg = document.getElementById('registroEntrenadorMsg');
        
        if (!nombre) { showNotification("Por favor, completar el campo Nombre y Apellido", true); registroMsg.innerHTML = '<p style="color: red;">⚠️ Por favor, completar el campo Nombre y Apellido</p>'; return; }
        if (!dni) { showNotification("Por favor, completar el campo DNI", true); registroMsg.innerHTML = '<p style="color: red;">⚠️ Por favor, completar el campo DNI</p>'; return; }
        if (!fechaNac) { showNotification("Por favor, completar el campo Fecha de Nacimiento", true); registroMsg.innerHTML = '<p style="color: red;">⚠️ Por favor, completar el campo Fecha de Nacimiento</p>'; return; }
        if (!telefono) { showNotification("Por favor, completar el campo Teléfono", true); registroMsg.innerHTML = '<p style="color: red;">⚠️ Por favor, completar el campo Teléfono</p>'; return; }
        if (!direccion) { showNotification("Por favor, completar el campo Dirección", true); registroMsg.innerHTML = '<p style="color: red;">⚠️ Por favor, completar el campo Dirección</p>'; return; }
        
        if (certificacionesTemp.length === 0) {
            showNotification("Debe agregar al menos una certificación", true);
            registroMsg.innerHTML = '<p style="color: red;">⚠️ Debe agregar al menos una certificación</p>';
            return;
        }
        if (certificadosTemp.length === 0) {
            showNotification("Debe subir al menos un certificado PDF", true);
            registroMsg.innerHTML = '<p style="color: red;">⚠️ Debe subir al menos un certificado PDF</p>';
            return;
        }
        if (certificacionesTemp.length !== certificadosTemp.length) {
            showNotification(`La cantidad de certificaciones (${certificacionesTemp.length}) no coincide con los PDFs (${certificadosTemp.length})`, true);
            registroMsg.innerHTML = `<p style="color: red;">⚠️ La cantidad de certificaciones (${certificacionesTemp.length}) no coincide con los PDFs (${certificadosTemp.length})</p>`;
            return;
        }
        
        const newId = db.entrenadores.length + 1;
        const nuevoEntrenador = {
            id: newId,
            nombre,
            dni,
            fechaNac,
            telefono,
            direccion,
            certificaciones: [...certificacionesTemp],
            certificados: [...certificadosTemp]
        };
        db.entrenadores.push(nuevoEntrenador);
        saveDB();
        
        registroMsg.innerHTML = '<p style="color: green;">✅ Datos guardados correctamente</p>';
        showNotification("Datos guardados correctamente", false);
        
        document.getElementById('entrenadorNombre').value = '';
        document.getElementById('entrenadorDni').value = '';
        document.getElementById('entrenadorFechaNac').value = '';
        document.getElementById('entrenadorTelefono').value = '';
        document.getElementById('entrenadorDireccion').value = '';
        document.getElementById('entrenadorCertificacion').value = '';
        document.getElementById('certificadoPdfInput').value = '';
        certificacionesTemp = [];
        certificadosTemp = [];
        actualizarListaCertificaciones();
        actualizarListaCertificados();
        actualizarEstadoValidacion();
        
        setTimeout(() => {
            registroMsg.innerHTML = '';
        }, 3000);
    };
    
    document.getElementById('cancelarEntrenadorBtn').onclick = () => {
        document.getElementById('entrenadorNombre').value = '';
        document.getElementById('entrenadorDni').value = '';
        document.getElementById('entrenadorFechaNac').value = '';
        document.getElementById('entrenadorTelefono').value = '';
        document.getElementById('entrenadorDireccion').value = '';
        document.getElementById('entrenadorCertificacion').value = '';
        document.getElementById('certificadoPdfInput').value = '';
        certificacionesTemp = [];
        certificadosTemp = [];
        actualizarListaCertificaciones();
        actualizarListaCertificados();
        actualizarEstadoValidacion();
        document.getElementById('registroEntrenadorMsg').innerHTML = '';
        document.getElementById('validacionCertificadosMsg').style.display = 'none';
        showNotification("Registro cancelado", false);
    };
    
    actualizarListaCertificaciones();
    actualizarListaCertificados();
    actualizarEstadoValidacion();
}

// Modificar Entrenador
function viewModificarEntrenador() {
    document.getElementById('pageTitle').innerText = "Modificar Entrenador";
    const container = document.getElementById('dynamicContent');
    let certificacionesEditTemp = [];
    let certificadosEditTemp = [];
    
    function actualizarListaCertificacionesEdit() {
        const listaDiv = document.getElementById('listaCertificacionesEdit');
        if (listaDiv) {
            if (certificacionesEditTemp.length === 0) {
                listaDiv.innerHTML = '<span style="color: #94a3b8; font-size: 0.8rem;">No hay certificaciones agregadas</span>';
            } else {
                listaDiv.innerHTML = certificacionesEditTemp.map((cert, idx) => `
                    <span style="background: #f1f5f9; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 0.5rem;">
                        ${cert}
                        <button type="button" class="btn-remove-cert-edit" data-idx="${idx}" style="background: none; border: none; color: #ef4444; cursor: pointer; padding: 0; margin: 0;">&times;</button>
                    </span>
                `).join('');
                
                document.querySelectorAll('.btn-remove-cert-edit').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const idx = parseInt(btn.getAttribute('data-idx'));
                        certificacionesEditTemp.splice(idx, 1);
                        actualizarListaCertificacionesEdit();
                        actualizarEstadoValidacionEdit();
                    });
                });
            }
        }
        actualizarEstadoValidacionEdit();
    }
    
    function actualizarListaCertificadosEdit() {
        const listaDiv = document.getElementById('listaCertificadosEdit');
        if (listaDiv) {
            if (certificadosEditTemp.length === 0) {
                listaDiv.innerHTML = '<span style="color: #94a3b8; font-size: 0.8rem;">No hay certificados PDF subidos</span>';
            } else {
                listaDiv.innerHTML = certificadosEditTemp.map((cert, idx) => `
                    <span style="background: #f0fdf9; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 0.5rem; border: 1px solid #227c6c;">
                        <i class="fas fa-file-pdf" style="color: #dc2626;"></i>
                        ${cert.nombre}
                        <a href="${cert.data}" target="_blank" style="color: #227c6c; text-decoration: none; font-size: 0.7rem;">
                            <i class="fas fa-eye"></i> Ver
                        </a>
                        <button type="button" class="btn-remove-cert-pdf-edit" data-idx="${idx}" style="background: none; border: none; color: #ef4444; cursor: pointer; padding: 0; margin: 0;">&times;</button>
                    </span>
                `).join('');
                
                document.querySelectorAll('.btn-remove-cert-pdf-edit').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const idx = parseInt(btn.getAttribute('data-idx'));
                        certificadosEditTemp.splice(idx, 1);
                        actualizarListaCertificadosEdit();
                        actualizarEstadoValidacionEdit();
                    });
                });
            }
        }
        actualizarEstadoValidacionEdit();
    }
    
    function actualizarEstadoValidacionEdit() {
        const mensajeValidacion = document.getElementById('validacionCertificadosEditMsg');
        const guardarBtn = document.getElementById('guardarModificacionEntrenadorBtn');
        const certificacionesCount = certificacionesEditTemp.length;
        const certificadosCount = certificadosEditTemp.length;
        
        if (certificacionesCount === 0) {
            mensajeValidacion.innerHTML = '<p style="color: orange;">⚠️ Debe tener al menos una certificación</p>';
            mensajeValidacion.style.display = 'block';
            guardarBtn.disabled = true;
            return;
        }
        
        if (certificadosCount === 0) {
            mensajeValidacion.innerHTML = '<p style="color: orange;">⚠️ Debe tener al menos un certificado PDF</p>';
            mensajeValidacion.style.display = 'block';
            guardarBtn.disabled = true;
            return;
        }
        
        if (certificacionesCount !== certificadosCount) {
            mensajeValidacion.innerHTML = `<p style="color: orange;">⚠️ La cantidad de certificaciones (${certificacionesCount}) no coincide con la cantidad de PDFs subidos (${certificadosCount})</p>`;
            mensajeValidacion.style.display = 'block';
            guardarBtn.disabled = true;
            return;
        }
        
        mensajeValidacion.innerHTML = `<p style="color: green;">✅ ${certificacionesCount} certificaciones con sus respectivos PDFs</p>`;
        mensajeValidacion.style.display = 'block';
        guardarBtn.disabled = false;
    }
    
    function cargarDatosEntrenador() {
        const id = parseInt(document.getElementById('selectEntrenadorModificar').value);
        if (!id) {
            document.getElementById('editEntrenadorNombre').value = '';
            document.getElementById('editEntrenadorDni').value = '';
            document.getElementById('editEntrenadorFechaNac').value = '';
            document.getElementById('editEntrenadorTelefono').value = '';
            document.getElementById('editEntrenadorDireccion').value = '';
            certificacionesEditTemp = [];
            certificadosEditTemp = [];
            actualizarListaCertificacionesEdit();
            actualizarListaCertificadosEdit();
            actualizarEstadoValidacionEdit();
            return;
        }
        const e = db.entrenadores.find(x => x.id === id);
        if (e) {
            document.getElementById('editEntrenadorNombre').value = e.nombre;
            document.getElementById('editEntrenadorDni').value = e.dni;
            document.getElementById('editEntrenadorFechaNac').value = e.fechaNac;
            document.getElementById('editEntrenadorTelefono').value = e.telefono;
            document.getElementById('editEntrenadorDireccion').value = e.direccion;
            certificacionesEditTemp = [...(e.certificaciones || [])];
            certificadosEditTemp = [...(e.certificados || [])];
            actualizarListaCertificacionesEdit();
            actualizarListaCertificadosEdit();
            actualizarEstadoValidacionEdit();
        }
    }
    
    container.innerHTML = `
        <div class="card">
            <h3><i class="fas fa-edit"></i> Modificar Entrenador</h3>
            <div class="form-group">
                <label>Seleccionar Entrenador</label>
                <select id="selectEntrenadorModificar">
                    <option value="">-- Seleccione un entrenador --</option>
                    ${db.entrenadores.map(e => `<option value="${e.id}">${e.nombre} (DNI: ${e.dni})</option>`).join('')}
                </select>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Nombre y Apellido *</label>
                    <input type="text" id="editEntrenadorNombre" placeholder="Nombre completo">
                </div>
                <div class="form-group">
                    <label>DNI *</label>
                    <input type="text" id="editEntrenadorDni" placeholder="Número de documento">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Fecha de Nacimiento *</label>
                    <input type="date" id="editEntrenadorFechaNac">
                </div>
                <div class="form-group">
                    <label>Teléfono *</label>
                    <input type="text" id="editEntrenadorTelefono" placeholder="Número de teléfono">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Dirección *</label>
                    <input type="text" id="editEntrenadorDireccion" placeholder="Dirección completa">
                </div>
            </div>
            
            <div class="form-group">
                <label>Certificaciones (texto) *</label>
                <p style="font-size: 0.8rem; color: #64748b;">Cada certificación debe tener su respectivo PDF</p>
                <div style="display: flex; gap: 0.5rem;">
                    <input type="text" id="editEntrenadorCertificacion" placeholder="Ej: CrossFit L1" style="flex: 1;">
                    <button type="button" id="agregarCertificacionEditBtn" class="btn-info btn-sm">+ Agregar</button>
                </div>
                <div id="listaCertificacionesEdit" style="margin-top: 0.5rem; display: flex; flex-wrap: wrap; gap: 0.5rem;"></div>
            </div>
            
            <div class="form-group">
                <label>Certificados PDF *</label>
                <p style="font-size: 0.8rem; color: #64748b;">Debe subir un PDF por cada certificación</p>
                <div style="display: flex; gap: 0.5rem; align-items: center;">
                    <input type="file" id="editCertificadoPdfInput" accept=".pdf" style="flex: 1;">
                    <button type="button" id="agregarCertificadoEditBtn" class="btn-info btn-sm">+ Subir PDF</button>
                </div>
                <div id="listaCertificadosEdit" style="margin-top: 0.5rem; display: flex; flex-wrap: wrap; gap: 0.5rem;"></div>
            </div>
            
            <div id="validacionCertificadosEditMsg" style="margin-top: 0.5rem; padding: 0.5rem; border-radius: 8px; display: none;"></div>
            
            <div style="display: flex; gap: 0.5rem;">
                <button id="guardarModificacionEntrenadorBtn" class="btn-success" disabled>Guardar Cambios</button>
                <button id="cancelarModificacionEntrenadorBtn" class="btn-secondary">Cancelar</button>
            </div>
            <div id="modificacionEntrenadorMsg" style="margin-top:1rem;"></div>
        </div>
    `;
    
    document.getElementById('selectEntrenadorModificar').onchange = cargarDatosEntrenador;
    
    document.getElementById('agregarCertificacionEditBtn').onclick = () => {
        const input = document.getElementById('editEntrenadorCertificacion');
        const cert = input.value.trim();
        if (cert) {
            if (certificacionesEditTemp.includes(cert)) {
                showNotification(`La certificación "${cert}" ya está agregada`, true);
                return;
            }
            certificacionesEditTemp.push(cert);
            actualizarListaCertificacionesEdit();
            input.value = '';
            actualizarEstadoValidacionEdit();
        } else {
            showNotification("Por favor, ingrese el nombre de la certificación", true);
        }
    };
    
    document.getElementById('agregarCertificadoEditBtn').onclick = () => {
        const input = document.getElementById('editCertificadoPdfInput');
        const file = input.files[0];
        if (file) {
            if (file.type !== 'application/pdf') {
                showNotification("Por favor, seleccione un archivo PDF válido", true);
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                showNotification("El archivo no puede superar los 5MB", true);
                return;
            }
            const reader = new FileReader();
            reader.onload = function(event) {
                certificadosEditTemp.push({
                    nombre: file.name,
                    data: event.target.result,
                    size: file.size
                });
                actualizarListaCertificadosEdit();
                input.value = '';
                showNotification(`PDF "${file.name}" subido correctamente`, false);
                actualizarEstadoValidacionEdit();
            };
            reader.readAsDataURL(file);
        } else {
            showNotification("Por favor, seleccione un archivo PDF", true);
        }
    };
    
    document.getElementById('guardarModificacionEntrenadorBtn').onclick = () => {
        const id = parseInt(document.getElementById('selectEntrenadorModificar').value);
        const modificacionMsg = document.getElementById('modificacionEntrenadorMsg');
        
        if (!id) {
            showNotification("Por favor, seleccione un entrenador para modificar", true);
            modificacionMsg.innerHTML = '<p style="color: red;">⚠️ Por favor, seleccione un entrenador para modificar</p>';
            return;
        }
        
        const nombre = document.getElementById('editEntrenadorNombre').value.trim();
        const dni = document.getElementById('editEntrenadorDni').value.trim();
        const fechaNac = document.getElementById('editEntrenadorFechaNac').value;
        const telefono = document.getElementById('editEntrenadorTelefono').value.trim();
        const direccion = document.getElementById('editEntrenadorDireccion').value.trim();
        
        if (!nombre) { showNotification("Por favor, completar el campo Nombre y Apellido", true); modificacionMsg.innerHTML = '<p style="color: red;">⚠️ Por favor, completar el campo Nombre y Apellido</p>'; return; }
        if (!dni) { showNotification("Por favor, completar el campo DNI", true); modificacionMsg.innerHTML = '<p style="color: red;">⚠️ Por favor, completar el campo DNI</p>'; return; }
        if (!fechaNac) { showNotification("Por favor, completar el campo Fecha de Nacimiento", true); modificacionMsg.innerHTML = '<p style="color: red;">⚠️ Por favor, completar el campo Fecha de Nacimiento</p>'; return; }
        if (!telefono) { showNotification("Por favor, completar el campo Teléfono", true); modificacionMsg.innerHTML = '<p style="color: red;">⚠️ Por favor, completar el campo Teléfono</p>'; return; }
        if (!direccion) { showNotification("Por favor, completar el campo Dirección", true); modificacionMsg.innerHTML = '<p style="color: red;">⚠️ Por favor, completar el campo Dirección</p>'; return; }
        
        if (certificacionesEditTemp.length === 0) {
            showNotification("Debe tener al menos una certificación", true);
            modificacionMsg.innerHTML = '<p style="color: red;">⚠️ Debe tener al menos una certificación</p>';
            return;
        }
        if (certificadosEditTemp.length === 0) {
            showNotification("Debe tener al menos un certificado PDF", true);
            modificacionMsg.innerHTML = '<p style="color: red;">⚠️ Debe tener al menos un certificado PDF</p>';
            return;
        }
        if (certificacionesEditTemp.length !== certificadosEditTemp.length) {
            showNotification(`La cantidad de certificaciones (${certificacionesEditTemp.length}) no coincide con los PDFs (${certificadosEditTemp.length})`, true);
            modificacionMsg.innerHTML = `<p style="color: red;">⚠️ La cantidad de certificaciones (${certificacionesEditTemp.length}) no coincide con los PDFs (${certificadosEditTemp.length})</p>`;
            return;
        }
        
        const index = db.entrenadores.findIndex(e => e.id === id);
        if (index !== -1) {
            db.entrenadores[index] = {
                ...db.entrenadores[index],
                nombre,
                dni,
                fechaNac,
                telefono,
                direccion,
                certificaciones: [...certificacionesEditTemp],
                certificados: [...certificadosEditTemp]
            };
            saveDB();
            modificacionMsg.innerHTML = '<p style="color: green;">✅ Modificación realizada correctamente</p>';
            showNotification("Modificación realizada correctamente", false);
            
            const select = document.getElementById('selectEntrenadorModificar');
            select.innerHTML = '<option value="">-- Seleccione un entrenador --</option>' + 
                db.entrenadores.map(e => `<option value="${e.id}">${e.nombre} (DNI: ${e.dni})</option>`).join('');
            
            setTimeout(() => {
                modificacionMsg.innerHTML = '';
            }, 3000);
        }
    };
    
    document.getElementById('cancelarModificacionEntrenadorBtn').onclick = () => {
        document.getElementById('selectEntrenadorModificar').value = '';
        document.getElementById('editEntrenadorNombre').value = '';
        document.getElementById('editEntrenadorDni').value = '';
        document.getElementById('editEntrenadorFechaNac').value = '';
        document.getElementById('editEntrenadorTelefono').value = '';
        document.getElementById('editEntrenadorDireccion').value = '';
        document.getElementById('editEntrenadorCertificacion').value = '';
        document.getElementById('editCertificadoPdfInput').value = '';
        certificacionesEditTemp = [];
        certificadosEditTemp = [];
        actualizarListaCertificacionesEdit();
        actualizarListaCertificadosEdit();
        actualizarEstadoValidacionEdit();
        document.getElementById('modificacionEntrenadorMsg').innerHTML = '';
        document.getElementById('validacionCertificadosEditMsg').style.display = 'none';
        showNotification("Modificación cancelada", false);
    };
    
    if (document.getElementById('selectEntrenadorModificar').value) {
        cargarDatosEntrenador();
    }
}

// Consultar Entrenador
function viewConsultarEntrenador() {
    document.getElementById('pageTitle').innerText = "Consultar Entrenador";
    const container = document.getElementById('dynamicContent');
    
    container.innerHTML = `
        <div class="card">
            <h3><i class="fas fa-search"></i> Consultar Entrenador</h3>
            <div class="form-group">
                <label>Seleccionar Entrenador:</label>
                <select id="selectEntrenadorConsultar">
                    <option value="">-- Seleccione un entrenador --</option>
                    ${db.entrenadores.map(e => `<option value="${e.id}">${e.nombre} (DNI: ${e.dni})</option>`).join('')}
                </select>
            </div>
            <button id="consultarEntrenadorBtn" class="btn-info">Consultar</button>
            <div id="entrenadorData" style="margin-top:1rem; padding:1rem; background:#f8fafc; border-radius:12px;"></div>
            <div id="consultaEntrenadorMsg" style="margin-top: 0.5rem;"></div>
        </div>
    `;
    
    const selectEntrenador = document.getElementById('selectEntrenadorConsultar');
    const consultarBtn = document.getElementById('consultarEntrenadorBtn');
    const entrenadorDataDiv = document.getElementById('entrenadorData');
    const consultaMsg = document.getElementById('consultaEntrenadorMsg');
    
    function consultarEntrenador() {
        const id = parseInt(selectEntrenador.value);
        
        if (!id) {
            showNotification("Por favor, seleccione un entrenador", true);
            consultaMsg.innerHTML = '<p style="color: red;">⚠️ Por favor, seleccione un entrenador</p>';
            entrenadorDataDiv.innerHTML = '';
            return;
        }
        
        const entrenador = db.entrenadores.find(e => e.id === id);
        if (entrenador) {
            const clasesAsignadas = db.clases.filter(c => c.entrenadorId === entrenador.id);
            
            let certificadosHTML = '';
            if (entrenador.certificados && entrenador.certificados.length > 0) {
                certificadosHTML = `
                    <div style="margin-top: 0.5rem;">
                        <p><strong><i class="fas fa-file-pdf"></i> Certificados PDF:</strong></p>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                            ${entrenador.certificados.map(cert => `
                                <div style="background: #f0fdf9; padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid #227c6c; display: flex; align-items: center; gap: 0.5rem;">
                                    <i class="fas fa-file-pdf" style="color: #dc2626;"></i>
                                    <span>${cert.nombre}</span>
                                    <a href="${cert.data}" target="_blank" style="color: #227c6c; text-decoration: none; font-size: 0.8rem;">
                                        <i class="fas fa-eye"></i> Ver PDF
                                    </a>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            } else {
                certificadosHTML = '<p style="color: #64748b; margin-top: 0.5rem;"><i class="fas fa-info-circle"></i> No hay certificados PDF subidos</p>';
            }
            
            entrenadorDataDiv.innerHTML = `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div>
                        <p><strong><i class="fas fa-user"></i> Nombre:</strong> ${entrenador.nombre}</p>
                        <p><strong><i class="fas fa-id-card"></i> DNI:</strong> ${entrenador.dni}</p>
                        <p><strong><i class="fas fa-calendar"></i> Fecha de Nacimiento:</strong> ${entrenador.fechaNac}</p>
                    </div>
                    <div>
                        <p><strong><i class="fas fa-phone"></i> Teléfono:</strong> ${entrenador.telefono}</p>
                        <p><strong><i class="fas fa-home"></i> Dirección:</strong> ${entrenador.direccion}</p>
                        <p><strong><i class="fas fa-certificate"></i> Certificaciones:</strong> ${entrenador.certificaciones && entrenador.certificaciones.length ? entrenador.certificaciones.join(', ') : 'Ninguna'}</p>
                    </div>
                </div>
                <div style="margin-top: 1rem; border-top: 1px solid #eef2f6; padding-top: 1rem;">
                    <p><strong><i class="fas fa-chalkboard-teacher"></i> Clases asignadas:</strong></p>
                    ${clasesAsignadas.length === 0 ? 
                        '<p style="color: #64748b;">No tiene clases asignadas</p>' :
                        `<ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
                            ${clasesAsignadas.map(c => `<li>${c.nombre} (${c.horarioInicio} - ${c.horarioFin}) - Sala: ${c.sala}</li>`).join('')}
                        </ul>`
                    }
                </div>
                <div style="margin-top: 1rem; border-top: 1px solid #eef2f6; padding-top: 1rem;">
                    ${certificadosHTML}
                </div>
            `;
            consultaMsg.innerHTML = '<p style="color: green;">✅ Consulta realizada correctamente</p>';
            showNotification(`Mostrando información de ${entrenador.nombre}`, false);
            
            setTimeout(() => {
                consultaMsg.innerHTML = '';
            }, 3000);
        } else {
            consultaMsg.innerHTML = '<p style="color: red;">⚠️ Entrenador no encontrado</p>';
            entrenadorDataDiv.innerHTML = '';
        }
    }
    
    consultarBtn.onclick = consultarEntrenador;
    
}

// Eliminar Entrendor
function viewEliminarEntrenador() {
    document.getElementById('pageTitle').innerText = "Eliminar Entrenador";
    const container = document.getElementById('dynamicContent');
    
    function actualizarSelectEntrenadores() {
        const select = document.getElementById('selectEntrenadorEliminar');
        if (select) {
            select.innerHTML = '<option value="">-- Seleccione un entrenador --</option>' + 
                db.entrenadores.map(e => `<option value="${e.id}">${e.nombre} (DNI: ${e.dni})</option>`).join('');
        }
    }
    
    container.innerHTML = `
        <div class="card">
            <h3><i class="fas fa-trash-alt"></i> Eliminar Entrenador</h3>
            <div class="form-group">
                <label>Seleccionar Entrenador</label>
                <select id="selectEntrenadorEliminar">
                    <option value="">-- Seleccione un entrenador --</option>
                    ${db.entrenadores.map(e => `<option value="${e.id}">${e.nombre} (DNI: ${e.dni})</option>`).join('')}
                </select>
            </div>
            <button id="eliminarEntrenadorBtn" class="btn-danger">Eliminar</button>
            <div id="eliminarEntrenadorMsg" style="margin-top:1rem;"></div>
        </div>
    `;
    
    document.getElementById('eliminarEntrenadorBtn').onclick = () => {
        const id = parseInt(document.getElementById('selectEntrenadorEliminar').value);
        if (!id) {
            showNotification("Por favor, seleccione un entrenador para eliminar", true);
            return;
        }
        const entrenador = db.entrenadores.find(e => e.id === id);
        if (confirm(`¿Está seguro de eliminar al entrenador "${entrenador.nombre}"?`)) {
            db.entrenadores = db.entrenadores.filter(e => e.id !== id);
            // Actualizar clases que tenían este entrenador
            db.clases.forEach(clase => {
                if (clase.entrenadorId === id) {
                    clase.entrenadorId = null;
                    clase.entrenadorNombre = 'Sin asignar';
                }
            });
            saveDB();
            showNotification("Eliminación realizada correctamente", false);
            document.getElementById('eliminarEntrenadorMsg').innerHTML = '<p style="color:green;">✅ Entrenador eliminado correctamente</p>';
            actualizarSelectEntrenadores();
            setTimeout(() => {
                document.getElementById('eliminarEntrenadorMsg').innerHTML = '';
            }, 3000);
        }
    };
    
}

// Imprimir Entrenador
function viewImprimirListadoEntrenadores() {
    document.getElementById('pageTitle').innerText = "Imprimir Listado de Entrenadores";
    const container = document.getElementById('dynamicContent');
    
    container.innerHTML = `
        <div class="card">
            <h3><i class="fas fa-print"></i> Imprimir Listado de Entrenadores</h3>
            <p>Se generará un listado con todos los entrenadores registrados, incluyendo sus datos personales y certificaciones.</p>
            <button id="imprimirListadoEntrenadoresBtn" class="btn-print">Imprimir Listado</button>
            <div id="impresionEntrenadorMsg" style="margin-top:1rem;"></div>
        </div>
    `;
    
    document.getElementById('imprimirListadoEntrenadoresBtn').onclick = () => {
        let tablaEntrenadores = '';
        db.entrenadores.forEach((entrenador, index) => {
            tablaEntrenadores += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${entrenador.nombre}</td>
                    <td>${entrenador.dni}</td>
                    <td>${entrenador.fechaNac}</td>
                    <td>${entrenador.telefono}</td>
                    <td>${entrenador.direccion}</td>
                    <td>${entrenador.certificaciones ? entrenador.certificaciones.join(', ') : '-'}</td>
                </tr>
            `;
        });
        
        const contenido = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Listado de Entrenadores - Cuerpo Sano</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; }
                    .container { max-width: 1200px; margin: 0 auto; }
                    h1 { color: #227c6c; text-align: center; }
                    h2 { text-align: center; color: #475569; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background-color: #f2f2f2; }
                    .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Cuerpo Sano - Gimnasio "Su Mejor Peso"</h1>
                    <h2>LISTADO DE ENTRENADORES</h2>
                    <p>Fecha de generación: ${new Date().toLocaleString('es-AR')}</p>
                    <p>Total de entrenadores: ${db.entrenadores.length}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th><th>Nombre</th><th>DNI</th><th>Fecha Nac.</th>
                                <th>Teléfono</th><th>Dirección</th><th>Certificaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tablaEntrenadores || '<tr><td colspan="7" style="text-align:center;">No hay entrenadores registrados</td></tr>'}
                        </tbody>
                    </table>
                    <div class="footer">
                        <p>Documento generado automáticamente por el sistema Cuerpo Sano</p>
                    </div>
                </div>
            </body>
            </html>
        `;
        
        const ventana = window.open('', '_blank');
        ventana.document.write(contenido);
        ventana.document.close();
        ventana.print();
        
        document.getElementById('impresionEntrenadorMsg').innerHTML = '<p style="color:green;">✅ Enviando a impresión...</p>';
        showNotification("Imprimiendo listado de entrenadores...", false);
        
        setTimeout(() => {
            document.getElementById('impresionEntrenadorMsg').innerHTML = '';
        }, 2000);
    };
    
}


















// --------------------- Modulo Pagos ---------------------------

// Generar PDF de comprobante
function generarComprobantePDF(datos) {
    const { miembro, tipoMembresia, monto, fecha, medioPago, comprobanteId } = datos;
    
    const contenidoHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Comprobante de Pago - Cuerpo Sano</title>
            <style>
                body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 40px; background: white; }
                .comprobante { max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
                .header { text-align: center; border-bottom: 2px solid #227c6c; padding-bottom: 20px; margin-bottom: 20px; }
                .header h1 { color: #227c6c; margin: 0; font-size: 24px; }
                .header p { color: #64748b; margin: 5px 0 0; }
                .titulo-comprobante { text-align: center; font-size: 18px; font-weight: bold; color: #1e293b; margin: 20px 0; }
                .detalle { margin: 20px 0; }
                .fila { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eef2f6; }
                .fila .label { font-weight: 600; color: #475569; }
                .fila .valor { color: #1e293b; }
                .total { margin-top: 20px; padding: 15px; background: #f0fdf9; border-radius: 12px; text-align: center; }
                .total .label { font-weight: 600; font-size: 16px; }
                .total .valor { font-size: 24px; font-weight: bold; color: #227c6c; }
                .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eef2f6; font-size: 12px; color: #94a3b8; }
            </style>
        </head>
        <body>
            <div class="comprobante">
                <div class="header">
                    <h1>Cuerpo Sano</h1>
                    <p>Gimnasio "Su Mejor Peso"</p>
                </div>
                <div class="titulo-comprobante">COMPROBANTE DE PAGO N° ${comprobanteId}</div>
                <div class="detalle">
                    <div class="fila"><span class="label">Miembro:</span><span class="valor">${miembro.nombre} (DNI: ${miembro.dni})</span></div>
                    <div class="fila"><span class="label">Tipo de Membresía:</span><span class="valor">${tipoMembresia}</span></div>
                    <div class="fila"><span class="label">Fecha de Pago:</span><span class="valor">${fecha}</span></div>
                    <div class="fila"><span class="label">Medio de Pago:</span><span class="valor">${medioPago}</span></div>
                </div>
                <div class="total"><div class="label">MONTO PAGADO</div><div class="valor">$${monto.toLocaleString('es-AR')}</div></div>
                <div class="footer"><p>Este comprobante es válido como constancia de pago.</p><p>Fecha de emisión: ${new Date().toLocaleString('es-AR')}</p></div>
            </div>
        </body>
        </html>
    `;
    
    const blob = new Blob([contenidoHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `comprobante_pago_${comprobanteId}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Registrar cobro
function viewRegistrarCobro() {
    document.getElementById('pageTitle').innerText = "Registrar Cobro de Membresía";
    const container = document.getElementById('dynamicContent');
    
    function cargarDatosMiembro() {
        const miembroId = document.getElementById('pagoMiembro').value;
        if (miembroId) {
            const miembro = db.miembros.find(m => m.id === parseInt(miembroId));
            if (miembro) {
                const membresia = db.membresias.find(m => m.nombre === miembro.tipoMembresia);
                if (membresia) {
                    document.getElementById('pagoTipoMembresia').value = membresia.nombre;
                    document.getElementById('pagoMonto').value = `$${membresia.precio.toLocaleString('es-AR')}`;
                    document.getElementById('pagoMontoRaw').value = membresia.precio;
                }
            }
        } else {
            document.getElementById('pagoTipoMembresia').value = '';
            document.getElementById('pagoMonto').value = '';
            document.getElementById('pagoMontoRaw').value = '';
        }
    }
    
    container.innerHTML = `
        <div class="card">
            <h3><i class="fas fa-credit-card"></i> Registrar Nuevo Cobro</h3>
            <div class="form-row">
                <div class="form-group">
                    <label>Miembro *</label>
                    <select id="pagoMiembro">
                        <option value="">-- Seleccione un miembro --</option>
                        ${db.miembros.map(m => `<option value="${m.id}">${m.nombre} (DNI: ${m.dni})</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Tipo de Membresía</label>
                    <input type="text" id="pagoTipoMembresia" readonly placeholder="Se autocompleta" class="readonly-field">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Monto</label>
                    <input type="text" id="pagoMonto" readonly placeholder="Se autocompleta" class="readonly-field">
                    <input type="hidden" id="pagoMontoRaw">
                </div>
                <div class="form-group">
                    <label>Fecha *</label>
                    <input type="date" id="pagoFecha" value="${new Date().toISOString().split('T')[0]}">
                </div>
            </div>
            <div class="form-group">
                <label>Medio de Pago *</label>
                <select id="pagoMedio">
                    <option value="">-- Seleccione un medio de pago --</option>
                    <option value="Efectivo">Efectivo</option>
                    <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
                    <option value="Tarjeta de Débito">Tarjeta de Débito</option>
                    <option value="Transferencia">Transferencia</option>
                </select>
            </div>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <button id="registrarCobroBtn" class="btn-success">Registrar Cobro</button>
                <button id="cancelarCobroBtn" class="btn-secondary">Cancelar</button>
            </div>
            <div id="cobroMsg" style="margin-top: 0.5rem;"></div>
        </div>
    `;
    
    document.getElementById('pagoMiembro').addEventListener('change', cargarDatosMiembro);
    
    document.getElementById('registrarCobroBtn').onclick = () => {
        const miembroId = document.getElementById('pagoMiembro').value;
        const fecha = document.getElementById('pagoFecha').value;
        const medioPago = document.getElementById('pagoMedio').value;
        const montoRaw = document.getElementById('pagoMontoRaw').value;
        
        if (!miembroId) {
            showNotification("Por favor, seleccione un miembro", true);
            document.getElementById('cobroMsg').innerHTML = '<p style="color: red;">⚠️ Por favor, seleccione un miembro</p>';
            return;
        }
        if (!fecha) {
            showNotification("Por favor, completar el campo Fecha", true);
            document.getElementById('cobroMsg').innerHTML = '<p style="color: red;">⚠️ Por favor, completar el campo Fecha</p>';
            return;
        }
        if (!medioPago) {
            showNotification("Por favor, seleccione un medio de pago", true);
            document.getElementById('cobroMsg').innerHTML = '<p style="color: red;">⚠️ Por favor, seleccione un medio de pago</p>';
            return;
        }
        
        const miembro = db.miembros.find(m => m.id === parseInt(miembroId));
        const membresia = db.membresias.find(m => m.nombre === miembro.tipoMembresia);
        const monto = membresia.precio;
        const tipoMembresia = miembro.tipoMembresia;
        
        const nuevoPago = {
            id: db.pagos.length + 1,
            miembroId: parseInt(miembroId),
            monto: monto,
            fecha: fecha,
            medioPago: medioPago,
            tipoMembresia: tipoMembresia
        };
        db.pagos.push(nuevoPago);
        miembro.estadoPago = "Pagado";
        saveDB();
        
        document.getElementById('cobroMsg').innerHTML = '<p style="color: green;">✅ Cobro realizado exitosamente</p>';
        showNotification("Cobro realizado exitosamente", false);
        
        generarComprobantePDF({
            miembro: miembro,
            tipoMembresia: tipoMembresia,
            monto: monto,
            fecha: fecha,
            medioPago: medioPago,
            comprobanteId: nuevoPago.id
        });
        
        document.getElementById('pagoMiembro').value = '';
        document.getElementById('pagoTipoMembresia').value = '';
        document.getElementById('pagoMonto').value = '';
        document.getElementById('pagoMontoRaw').value = '';
        document.getElementById('pagoMedio').value = '';
        document.getElementById('pagoFecha').value = new Date().toISOString().split('T')[0];
        
        setTimeout(() => {
            document.getElementById('cobroMsg').innerHTML = '';
        }, 3000);
    };
    
    document.getElementById('cancelarCobroBtn').onclick = () => {
        document.getElementById('pagoMiembro').value = '';
        document.getElementById('pagoTipoMembresia').value = '';
        document.getElementById('pagoMonto').value = '';
        document.getElementById('pagoMontoRaw').value = '';
        document.getElementById('pagoMedio').value = '';
        document.getElementById('pagoFecha').value = new Date().toISOString().split('T')[0];
        document.getElementById('cobroMsg').innerHTML = '';
        showNotification("Registro cancelado", false);
    };
}

// Ver historial de pagos
function viewHistorialPagos() {
    document.getElementById('pageTitle').innerText = "Gestión de Pagos - Registrar Cobro";
    const container = document.getElementById('dynamicContent');
    
    function cargarDatosMiembro() {
        const miembroId = document.getElementById('pagoMiembro').value;
        if (miembroId) {
            const miembro = db.miembros.find(m => m.id === parseInt(miembroId));
            if (miembro) {
                const membresia = db.membresias.find(m => m.nombre === miembro.tipoMembresia);
                if (membresia) {
                    document.getElementById('pagoTipoMembresia').value = membresia.nombre;
                    document.getElementById('pagoMonto').value = membresia.precio;
                }
            }
        } else {
            document.getElementById('pagoTipoMembresia').value = '';
            document.getElementById('pagoMonto').value = '';
        }
    }
    
    function actualizarHistorial() {
        const miembroId = document.getElementById('historialMiembro').value;
        const historialContainer = document.getElementById('historialContainer');
        const historialMsg = document.getElementById('historialMsg');
        
        if (!miembroId) {
            historialContainer.style.display = 'none';
            historialMsg.innerHTML = '<p style="color: orange;">⚠️ Por favor, seleccione un miembro</p>';
            return;
        }
        
        const pagosMiembro = db.pagos.filter(p => p.miembroId === parseInt(miembroId)).sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        const tbody = document.querySelector('#historialPagosTable tbody');
        const miembro = db.miembros.find(m => m.id === parseInt(miembroId));
        
        historialContainer.style.display = 'block';
        
        if (pagosMiembro.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">No hay pagos registrados para este miembro</td></tr>';
            historialMsg.innerHTML = `<p style="color: orange;">⚠️ El miembro ${miembro.nombre} no tiene pagos registrados</p>`;
        } else {
            tbody.innerHTML = pagosMiembro.map(pago => `
                <tr>
                    <td>$${pago.monto.toLocaleString('es-AR')}</td>
                    <td>${pago.fecha}</td>
                    <td>${pago.tipoMembresia}</td>
                    <td>${pago.medioPago}</td>
                </tr>
            `).join('');
            historialMsg.innerHTML = `<p style="color: green;">✅ Mostrando ${pagosMiembro.length} pago/s de ${miembro.nombre}</p>`;
        }
        
        setTimeout(() => {
            historialMsg.innerHTML = '';
        }, 3000);
    }
    
    container.innerHTML = `
        <div class="card">
            <h3><i class="fas fa-history"></i> Historial de Pagos por Miembro</h3>
            <div class="form-group">
                <label>Seleccionar Miembro:</label>
                <select id="historialMiembro">
                    <option value="">-- Seleccione un miembro --</option>
                    ${db.miembros.map(m => `<option value="${m.id}">${m.nombre} (DNI: ${m.dni})</option>`).join('')}
                </select>
            </div>
            <button id="consultarHistorialBtn" class="btn-info">Consultar Historial</button>
            <div id="historialMsg" style="margin-top: 0.5rem;"></div>
            <div id="historialContainer" style="display: none; margin-top: 1rem;">
                <div class="table-responsive">
                    <table id="historialPagosTable">
                        <thead>
                            <tr><th>Monto</th><th>Fecha de Pago</th><th>Tipo de Membresía</th><th>Medio de Pago</th></tr>
                        </thead>
                        <tbody>
                            <tr><td colspan="4" style="text-align: center;">Seleccione un miembro y presione Consultar Historial</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    

    
    document.getElementById('consultarHistorialBtn').onclick = () => {
        actualizarHistorial();
    };
    
}




















// ----------------- Modulo Reportes ------------------------

function generarReporteHTML(titulo, contenido, filename) {
    const contenidoHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>${titulo} - Cuerpo Sano</title>
            <style>
                body { font-family: 'Segoe UI', Arial, sans-serif; margin: 40px; background: #f5f7fa; }
                .reporte { max-width: 1200px; margin: 0 auto; background: white; border-radius: 16px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
                .header { text-align: center; border-bottom: 2px solid #227c6c; padding-bottom: 20px; margin-bottom: 20px; }
                .header h1 { color: #227c6c; margin: 0; font-size: 24px; }
                .header p { color: #64748b; margin: 5px 0 0; }
                .fecha { text-align: right; color: #94a3b8; font-size: 12px; margin-bottom: 20px; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { padding: 12px; text-align: left; border-bottom: 1px solid #eef2f6; }
                th { background: #f8fafc; font-weight: 600; color: #475569; }
                .total { margin-top: 20px; padding: 15px; background: #f0fdf9; border-radius: 12px; text-align: right; font-weight: bold; }
                .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eef2f6; font-size: 12px; color: #94a3b8; }
                .filtros { background: #f8fafc; padding: 15px; border-radius: 12px; margin-bottom: 20px; }
            </style>
        </head>
        <body>
            <div class="reporte">
                <div class="header">
                    <h1>Cuerpo Sano</h1>
                    <p>Gimnasio "Su Mejor Peso"</p>
                </div>
                <div class="fecha">Generado: ${new Date().toLocaleString('es-AR')}</div>
                <h2>${titulo}</h2>
                ${contenido}
                <div class="footer">Este reporte es generado automáticamente por el sistema Cuerpo Sano.</div>
            </div>
        </body>
        </html>
    `;
    
    const blob = new Blob([contenidoHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Reporte ingresos por membresias
function viewReporteIngresos() {
    document.getElementById('pageTitle').innerText = "Reporte de Ingresos por Membresías";
    const container = document.getElementById('dynamicContent');
    
    container.innerHTML = `
        <div class="card">
            <h3><i class="fas fa-chart-line"></i> Reporte de Ingresos por Membresías</h3>
            <div class="form-row">
                <div class="form-group">
                    <label>Período Desde:</label>
                    <input type="date" id="reporteIngresosDesde">
                </div>
                <div class="form-group">
                    <label>Período Hasta:</label>
                    <input type="date" id="reporteIngresosHasta">
                </div>
            </div>
            <div class="form-group">
                <label>Tipo de Membresía:</label>
                <select id="reporteIngresosTipo">
                    <option value="todos">Todos</option>
                    ${db.membresias.map(m => `<option value="${m.nombre}">${m.nombre}</option>`).join('')}
                </select>
            </div>
            <button id="generarReporteIngresosBtn" class="btn-success">Generar Reporte</button>
            <div id="reporteIngresosPreview" style="margin-top:1rem; display:none;"></div>
        </div>
    `;
    
    document.getElementById('generarReporteIngresosBtn').onclick = () => {
        const desde = document.getElementById('reporteIngresosDesde').value;
        const hasta = document.getElementById('reporteIngresosHasta').value;
        const tipoMembresia = document.getElementById('reporteIngresosTipo').value;
        
        let pagosFiltrados = [...db.pagos];
        
        if (desde) pagosFiltrados = pagosFiltrados.filter(p => p.fecha >= desde);
        if (hasta) pagosFiltrados = pagosFiltrados.filter(p => p.fecha <= hasta);
        if (tipoMembresia !== 'todos') pagosFiltrados = pagosFiltrados.filter(p => p.tipoMembresia === tipoMembresia);
        
        const totalIngresos = pagosFiltrados.reduce((sum, p) => sum + p.monto, 0);
        
        let filtrosTexto = '';
        if (desde || hasta) filtrosTexto += `Período: ${desde || 'inicio'} al ${hasta || 'hoy'}. `;
        if (tipoMembresia !== 'todos') filtrosTexto += `Tipo: ${tipoMembresia}.`;
        
        let tablaHtml = `<div class="filtros"><strong>Filtros aplicados:</strong> ${filtrosTexto || 'Sin filtros'}</div>`;
        tablaHtml += `
            <table>
                <thead><tr><th>Miembro</th><th>Tipo Membresía</th><th>Fecha</th><th>Monto</th><th>Medio Pago</th></tr></thead>
                <tbody>
        `;
        
        pagosFiltrados.forEach(pago => {
            const miembro = db.miembros.find(m => m.id === pago.miembroId);
            tablaHtml += `<tr>
                <td>${miembro ? miembro.nombre : 'N/A'}</td>
                <td>${pago.tipoMembresia}</td>
                <td>${pago.fecha}</td>
                <td>$${pago.monto.toLocaleString('es-AR')}</td>
                <td>${pago.medioPago}</td>
            </tr>`;
        });
        
        tablaHtml += `</tbody></table><div class="total">Total de Ingresos: $${totalIngresos.toLocaleString('es-AR')}</div>`;
        
        if (pagosFiltrados.length === 0) {
            tablaHtml = '<p>No hay pagos registrados en el período seleccionado.</p>';
        }
        
        generarReporteHTML(
            `Reporte de Ingresos por Membresías`,
            tablaHtml,
            `reporte_ingresos_${new Date().toISOString().split('T')[0]}`
        );
        showNotification("Reporte de ingresos generado correctamente", false);
    };
    
}

// Reporte asistencia miembros a clases
function viewReporteAsistenciaMiembrosClases() {
    document.getElementById('pageTitle').innerText = "Reporte de Asistencia de Miembros a Clases";
    const container = document.getElementById('dynamicContent');
    
    container.innerHTML = `
        <div class="card">
            <h3><i class="fas fa-users"></i> Reporte de Asistencia de Miembros a Clases</h3>
            <div class="form-row">
                <div class="form-group">
                    <label>Seleccionar Clase:</label>
                    <select id="reporteAsistenciaClase">
                        <option value="todas">Todas las clases</option>
                        ${db.clases.map(c => `<option value="${c.id}">${c.nombre}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Fecha:</label>
                    <input type="date" id="reporteAsistenciaFecha">
                </div>
            </div>
            <button id="generarReporteAsistenciaMiembrosClaseBtn" class="btn-success">Generar Reporte</button>
        </div>
    `;
    
    document.getElementById('generarReporteAsistenciaMiembrosClaseBtn').onclick = () => {
        const claseId = document.getElementById('reporteAsistenciaClase').value;
        const fecha = document.getElementById('reporteAsistenciaFecha').value;
        
        let asistenciasFiltradas = [...db.asistenciasClases];
        
        if (fecha) asistenciasFiltradas = asistenciasFiltradas.filter(a => a.fecha === fecha);
        if (claseId !== 'todas') asistenciasFiltradas = asistenciasFiltradas.filter(a => a.claseId === parseInt(claseId));
        
        const clasesMap = new Map();
        asistenciasFiltradas.forEach(asistencia => {
            const clase = db.clases.find(c => c.id === asistencia.claseId);
            if (!clase) return;
            if (!clasesMap.has(clase.id)) {
                clasesMap.set(clase.id, { clase, asistencias: [] });
            }
            const miembro = db.miembros.find(m => m.id === asistencia.miembroId);
            clasesMap.get(clase.id).asistencias.push({ miembro, estado: asistencia.estado });
        });
        
        let tablaHtml = '';
        if (claseId !== 'todas') {
            const clase = db.clases.find(c => c.id === parseInt(claseId));
            if (clase) {
                tablaHtml += `<div class="filtros"><strong>Clase:</strong> ${clase.nombre}<br><strong>Entrenador:</strong> ${clase.entrenadorNombre || 'Sin asignar'}<br><strong>Fecha:</strong> ${fecha || 'Todas las fechas'}</div>`;
            }
        } else {
            tablaHtml += `<div class="filtros"><strong>Clase:</strong> Todas las clases<br><strong>Fecha:</strong> ${fecha || 'Todas las fechas'}</div>`;
        }
        
        for (const [_, data] of clasesMap) {
            const clase = data.clase;
            tablaHtml += `<h3 style="margin-top: 20px;">Clase: ${clase.nombre}</h3>`;
            tablaHtml += `<p><strong>Entrenador:</strong> ${clase.entrenadorNombre || 'Sin asignar'}</p>`;
            tablaHtml += `<table><thead><tr><th>Miembro</th><th>Estado Asistencia</th></tr></thead><tbody>`;
            
            const miembrosInscriptos = clase.inscritos ? clase.inscritos.map(id => db.miembros.find(m => m.id === id)).filter(m => m) : [];
            miembrosInscriptos.forEach(miembro => {
                const asistencia = data.asistencias.find(a => a.miembro?.id === miembro.id);
                tablaHtml += `<tr><td>${miembro.nombre}</td><td>${asistencia ? asistencia.estado : 'No registrado'}</td></tr>`;
            });
            tablaHtml += `</tbody></table>`;
        }
        
        if (clasesMap.size === 0) {
            tablaHtml = '<p>No hay asistencias registradas para los filtros seleccionados.</p>';
        }
        
        generarReporteHTML(
            `Reporte de Asistencia de Miembros a Clases`,
            tablaHtml,
            `reporte_asistencia_miembros_clases_${new Date().toISOString().split('T')[0]}`
        );
        showNotification("Reporte de asistencia de miembros a clases generado", false);
    };
    
}

// Reporte asistencia miembros a gimnasio
function viewReporteAsistenciaMiembrosGimnasio() {
    document.getElementById('pageTitle').innerText = "Reporte de Asistencia de Miembros al Gimnasio";
    const container = document.getElementById('dynamicContent');
    
    container.innerHTML = `
        <div class="card">
            <h3><i class="fas fa-door-open"></i> Reporte de Asistencia de Miembros al Gimnasio</h3>
            <div class="form-row">
                <div class="form-group">
                    <label>Fecha Desde:</label>
                    <input type="date" id="reporteIngresosGimnasioDesde">
                </div>
                <div class="form-group">
                    <label>Fecha Hasta:</label>
                    <input type="date" id="reporteIngresosGimnasioHasta">
                </div>
            </div>
            <button id="generarReporteAsistenciaGimnasioBtn" class="btn-success">Generar Reporte</button>
        </div>
    `;
    
    document.getElementById('generarReporteAsistenciaGimnasioBtn').onclick = () => {
        const desde = document.getElementById('reporteIngresosGimnasioDesde').value;
        const hasta = document.getElementById('reporteIngresosGimnasioHasta').value;
        
        let ingresosFiltrados = [...db.ingresosEstablecimiento];
        
        if (desde) ingresosFiltrados = ingresosFiltrados.filter(i => i.fecha >= desde);
        if (hasta) ingresosFiltrados = ingresosFiltrados.filter(i => i.fecha <= hasta);
        
        ingresosFiltrados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        
        let filtrosTexto = `Período: ${desde || 'inicio'} al ${hasta || 'hoy'}`;
        let tablaHtml = `<div class="filtros"><strong>Filtros aplicados:</strong> ${filtrosTexto}</div>`;
        tablaHtml += `
            <table>
                <thead><tr><th>Miembro</th><th>Fecha</th><th>Horario</th><th>Día</th></tr></thead>
                <tbody>
        `;
        
        ingresosFiltrados.forEach(ingreso => {
            const miembro = db.miembros.find(m => m.id === ingreso.miembroId);
            const fechaObj = new Date(`${ingreso.fecha}T${ingreso.horario}`);
            const diaSemana = fechaObj.toLocaleDateString('es-ES', { weekday: 'long' });
            tablaHtml += `<tr>
                <td>${miembro ? miembro.nombre : 'N/A'}</td>
                <td>${ingreso.fecha}</td>
                <td>${ingreso.horario}</td>
                <td>${diaSemana}</td>
            </tr>`;
        });
        
        tablaHtml += `</tbody></table>`;
        
        if (ingresosFiltrados.length === 0) {
            tablaHtml = '<p>No hay ingresos registrados en el período seleccionado.</p>';
        }
        
        generarReporteHTML(
            `Reporte de Asistencia de Miembros al Gimnasio`,
            tablaHtml,
            `reporte_asistencia_gimnasio_${new Date().toISOString().split('T')[0]}`
        );
        showNotification("Reporte de asistencia de miembros al gimnasio generado", false);
    };
    
}

// Reporte asistencia entrenadores a clases
function viewReporteAsistenciaEntrenadores() {
    document.getElementById('pageTitle').innerText = "Reporte de Asistencia de Entrenadores a Clases";
    const container = document.getElementById('dynamicContent');
    
    container.innerHTML = `
        <div class="card">
            <h3><i class="fas fa-chalkboard-teacher"></i> Reporte de Asistencia de Entrenadores a Clases</h3>
            <div class="form-row">
                <div class="form-group">
                    <label>Seleccionar Entrenador:</label>
                    <select id="reporteAsistenciaEntrenador">
                        <option value="todos">Todos los entrenadores</option>
                        ${db.entrenadores.map(e => `<option value="${e.id}">${e.nombre}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Fecha Desde:</label>
                    <input type="date" id="reporteAsistenciaEntrenadorDesde">
                </div>
                <div class="form-group">
                    <label>Fecha Hasta:</label>
                    <input type="date" id="reporteAsistenciaEntrenadorHasta">
                </div>
            </div>
            <button id="generarReporteAsistenciaEntrenadoresBtn" class="btn-success">Generar Reporte</button>
        </div>
    `;
    
    document.getElementById('generarReporteAsistenciaEntrenadoresBtn').onclick = () => {
        const entrenadorId = document.getElementById('reporteAsistenciaEntrenador').value;
        const desde = document.getElementById('reporteAsistenciaEntrenadorDesde').value;
        const hasta = document.getElementById('reporteAsistenciaEntrenadorHasta').value;
        
        let asistenciasFiltradas = [...db.asistenciasEntrenadores];
        
        if (entrenadorId !== 'todos') asistenciasFiltradas = asistenciasFiltradas.filter(a => a.entrenadorId === parseInt(entrenadorId));
        if (desde) asistenciasFiltradas = asistenciasFiltradas.filter(a => a.fecha >= desde);
        if (hasta) asistenciasFiltradas = asistenciasFiltradas.filter(a => a.fecha <= hasta);
        
        asistenciasFiltradas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        
        let filtrosTexto = `Período: ${desde || 'inicio'} al ${hasta || 'hoy'}. `;
        if (entrenadorId !== 'todos') {
            const entrenador = db.entrenadores.find(e => e.id === parseInt(entrenadorId));
            filtrosTexto += `Entrenador: ${entrenador?.nombre || ''}`;
        } else {
            filtrosTexto += `Entrenador: Todos`;
        }
        
        let tablaHtml = `<div class="filtros"><strong>Filtros aplicados:</strong> ${filtrosTexto}</div>`;
        tablaHtml += `
            <table>
                <thead><tr><th>Entrenador</th><th>Clase</th><th>Fecha</th><th>Estado</th></tr></thead>
                <tbody>
        `;
        
        asistenciasFiltradas.forEach(asistencia => {
            const entrenador = db.entrenadores.find(e => e.id === asistencia.entrenadorId);
            const clase = db.clases.find(c => c.id === asistencia.claseId);
            tablaHtml += `<tr>
                <td>${entrenador ? entrenador.nombre : 'N/A'}</td>
                <td>${clase ? clase.nombre : 'N/A'}</td>
                <td>${asistencia.fecha}</td>
                <td>${asistencia.estado}</td>
            </tr>`;
        });
        
        tablaHtml += `</tbody></table>`;
        
        if (asistenciasFiltradas.length === 0) {
            tablaHtml = '<p>No hay asistencias de entrenadores registradas para los filtros seleccionados.</p>';
        }
        
        generarReporteHTML(
            `Reporte de Asistencia de Entrenadores a Clases`,
            tablaHtml,
            `reporte_asistencia_entrenadores_${new Date().toISOString().split('T')[0]}`
        );
        showNotification("Reporte de asistencia de entrenadores generado", false);
    };
    
}
























// ---- Login ----
document.getElementById('doLoginBtn').onclick = () => {
    const username = document.getElementById('loginUser').value.trim();
    const password = document.getElementById('loginPass').value.trim();
    const selectedRole = document.getElementById('loginRole').value;
    
    let foundRole = null;
    let displayName = null;
    
    for (const [roleKey, cred] of Object.entries(validCredentials)) {
        if (cred.user === username && cred.pass === password && roleKey === selectedRole) {
            foundRole = cred.role;
            displayName = cred.displayName;
            break;
        }
    }
    
    if (foundRole) {
        currentUser = { 
            role: foundRole, 
            username: username,
            displayName: displayName
        };
        document.getElementById('loginScreen').classList.remove('active');
        document.getElementById('appScreen').classList.add('active');
        
        // Mostrar el nombre personalizado en el sidebar
        if (foundRole === 'admin') {
            document.getElementById('userRoleDisplay').innerHTML = `<i class="fas fa-user-circle"></i> ${displayName} (ADMIN)`;
        } else if (foundRole === 'recepcion') {
            document.getElementById('userRoleDisplay').innerHTML = `<i class="fas fa-user-circle"></i> ${displayName}`;
        } else if (foundRole === 'miembro') {
            document.getElementById('userRoleDisplay').innerHTML = `<i class="fas fa-user-circle"></i> ${displayName} (Miembro)`;
        } else if (foundRole === 'entrenador') {
            document.getElementById('userRoleDisplay').innerHTML = `<i class="fas fa-user-circle"></i> ${displayName} (Entrenador)`;
        } else {
            document.getElementById('userRoleDisplay').innerHTML = `<i class="fas fa-user-circle"></i> ${foundRole.toUpperCase()} (${username})`;
        }
        
        initializeApp();
        document.getElementById('loginErrorMsg').style.display = 'none';
    } else {
        document.getElementById('loginErrorMsg').style.display = 'block';
        document.getElementById('loginErrorMsg').innerText = "Usuario o contraseña incorrectos.";
        showNotification("Usuario o contraseña incorrectos.", true);
    }
};

// ---- Log out ----
document.getElementById('logoutBtn').onclick = () => {
    console.log("Cerrando sesión...");
    
    // Limpiar datos de sesión
    currentUser = { role: null, username: null, id: null };
    
    // Ocultar pantalla de la aplicación
    document.getElementById('appScreen').classList.remove('active');
    
    // Limpiar el contenido dinámico
    document.getElementById('dynamicContent').innerHTML = '';
    
    // Limpiar el menú lateral
    document.getElementById('dynamicMenu').innerHTML = '';
    
    // Limpiar campos del login
    document.getElementById('loginUser').value = '';
    document.getElementById('loginPass').value = '';
    document.getElementById('loginRole').value = 'admin';
    
    // Ocultar mensaje de error si estaba visible
    document.getElementById('loginErrorMsg').style.display = 'none';
    
    // Mostrar pantalla de login
    document.getElementById('loginScreen').classList.add('active');
    
    showNotification("Sesión cerrada correctamente", false);
};


// ---- Menu en celular ----
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggleBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (!menuToggle || !sidebar || !overlay) {
        console.log("Elementos del menú móvil no encontrados");
        return;
    }
    
    function closeMenu() {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    }
    
    function openMenu() {
        sidebar.classList.add('open');
        overlay.classList.add('active');
    }
    
    menuToggle.onclick = (e) => {
        e.stopPropagation();
        if (sidebar.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    };
    
    overlay.onclick = () => {
        closeMenu();
    };
    
    document.addEventListener('click', (e) => {
        if (sidebar.classList.contains('open')) {
            const isClickInsideSidebar = sidebar.contains(e.target);
            const isClickOnToggle = menuToggle.contains(e.target);
            
            if (!isClickInsideSidebar && !isClickOnToggle) {
                closeMenu();
            }
        }
    });
    
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
    
    console.log("Menú móvil inicializado correctamente");
}

function saveDB() {
    localStorage.setItem('cuerpoSano_miembros', JSON.stringify(db.miembros));
    localStorage.setItem('cuerpoSano_membresias', JSON.stringify(db.membresias));
    localStorage.setItem('cuerpoSano_pagos', JSON.stringify(db.pagos));
    localStorage.setItem('cuerpoSano_asistenciasClases', JSON.stringify(db.asistenciasClases));
    localStorage.setItem('cuerpoSano_ingresos', JSON.stringify(db.ingresosEstablecimiento));
    localStorage.setItem('cuerpoSano_clases', JSON.stringify(db.clases));
    localStorage.setItem('cuerpoSano_entrenadores', JSON.stringify(db.entrenadores));
    localStorage.setItem('cuerpoSano_asistenciasEntrenadores', JSON.stringify(db.asistenciasEntrenadores));
}