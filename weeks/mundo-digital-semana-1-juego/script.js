// Datos de los componentes basados en la tabla
const componentsData = [
    {
        name: "Mouse",
        type: "Entrada",
        description: "Lo usas para mover la flechita en la pantalla y hacer clic.",
        image: "imagenes/mouse.png"
    },
    {
        name: "Teclado",
        type: "Entrada",
        description: "Tiene letras y números para que puedas escribir.",
        image: "imagenes/teclado.png"
    },
    {
        name: "Monitor",
        type: "Salida",
        description: "Es la pantalla donde ves todo lo que haces en la computadora.",
        image: "imagenes/monitor.png"
    },
    {
        name: "Impresora",
        type: "Salida",
        description: "Imprime en papel lo que está en la computadora.",
        image: "imagenes/impresora.png"
    },
    {
        name: "Escáner",
        type: "Entrada",
        description: "Toma fotos de papeles o dibujos y los pone en la computadora.",
        image: "imagenes/escaner.png"
    },
    {
        name: "Sistema Operativo",
        type: "Software",
        description: "Es el programa principal que hace funcionar la computadora.",
        image: "imagenes/sistema_operativo.png"
    },
    {
        name: "Webcam",
        type: "Entrada",
        description: "Es una cámara que te graba para hacer videollamadas.",
        image: "imagenes/webcam.png"
    },
    {
        name: "Micrófono",
        type: "Entrada",
        description: "Sirve para que la computadora escuche tu voz.",
        image: "imagenes/micofono.png"
    },
    {
        name: "Software (Aplicaciones)",
        type: "Software",
        description: "Son los programas que usas para jugar, dibujar o escribir.",
        image: "imagenes/aplicaciones.png"
    },
    {
        name: "Proyector",
        type: "Salida",
        description: "Muestra lo que está en la computadora en una pared grande.",
        image: "imagenes/proyector.png"
    },
    {
        name: "Bocinas",
        type: "Salida",
        description: "Hacen que puedas escuchar música y sonidos de la computadora.",
        image: "imagenes/bocinas.png"
    },
    {
        name: "Audífonos",
        type: "Salida",
        description: "Son como bocinas pero solo tú puedes escuchar.",
        image: "imagenes/audifonos.png"
    }
];

// Estado del juego
let completedRows = new Set();
let shuffledComponentsData = [];
let shuffledRowsData = [];

// Función para mezclar un array (Fisher-Yates shuffle)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Inicializar la aplicación
function init() {
    // Mezclar los componentes y las filas de forma INDEPENDIENTE
    // para que no haya correlación entre sus posiciones
    shuffledComponentsData = shuffleArray(componentsData);
    shuffledRowsData = shuffleArray(componentsData);
    createComponentsArea();
    createTableRows();
}

// Crear área de componentes disponibles
function createComponentsArea() {
    const container = document.getElementById('componentsContainer');

    shuffledComponentsData.forEach((component, displayIndex) => {
        // Encontrar el índice original del componente
        const originalIndex = componentsData.findIndex(c => c.name === component.name);

        const componentDiv = document.createElement('div');
        componentDiv.className = 'component-item';
        componentDiv.draggable = true;
        componentDiv.dataset.componentIndex = originalIndex;
        componentDiv.dataset.componentName = component.name;
        componentDiv.dataset.componentType = component.type;

        componentDiv.innerHTML = `
            <img src="${component.image}" alt="${component.name}">
            <p>${component.name}</p>
        `;

        // Event listeners para drag
        componentDiv.addEventListener('dragstart', handleDragStart);
        componentDiv.addEventListener('dragend', handleDragEnd);

        container.appendChild(componentDiv);
    });
}

// Crear filas de la tabla
function createTableRows() {
    const tbody = document.querySelector('#componentsTable tbody');

    shuffledRowsData.forEach((component, displayIndex) => {
        // Encontrar el índice original del componente
        const originalIndex = componentsData.findIndex(c => c.name === component.name);

        const row = document.createElement('tr');
        row.dataset.rowIndex = originalIndex;
        row.dataset.correctType = component.type;

        row.innerHTML = `
            <td>
                <div class="component-cell" data-cell-type="component" data-row-index="${originalIndex}">
                    <span style="color: #999;">Arrastra aquí</span>
                </div>
            </td>
            <td>${component.type}</td>
            <td>${component.description}</td>
        `;

        tbody.appendChild(row);

        // Agregar event listeners a la celda de componente
        const componentCell = row.querySelector('.component-cell');
        componentCell.addEventListener('dragover', handleDragOver);
        componentCell.addEventListener('dragleave', handleDragLeave);
        componentCell.addEventListener('drop', handleDrop);
    });
}

// Manejadores de eventos de drag and drop
function handleDragStart(e) {
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
    e.dataTransfer.setData('componentIndex', this.dataset.componentIndex);
    e.dataTransfer.setData('componentName', this.dataset.componentName);
    e.dataTransfer.setData('componentType', this.dataset.componentType);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    this.classList.add('drag-over');
    return false;
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    e.preventDefault();

    this.classList.remove('drag-over');

    const componentIndex = e.dataTransfer.getData('componentIndex');
    const componentName = e.dataTransfer.getData('componentName');
    const componentType = e.dataTransfer.getData('componentType');
    const rowIndex = this.dataset.rowIndex;

    // Verificar si la celda ya está ocupada
    if (this.classList.contains('filled')) {
        return false;
    }

    // Colocar el componente en la celda
    const component = componentsData[componentIndex];
    this.innerHTML = `
        <div class="component-placeholder">
            <img src="${component.image}" alt="${component.name}">
            <p>${component.name}</p>
        </div>
    `;
    this.classList.add('filled');
    this.dataset.placedComponent = componentIndex;

    // Ocultar el componente del área de componentes
    const originalComponent = document.querySelector(`[data-component-index="${componentIndex}"]`);
    originalComponent.style.display = 'none';

    // Verificar si la fila está completa y correcta
    checkRow(rowIndex, componentIndex, componentType);

    return false;
}

function checkRow(rowIndex, placedComponentIndex, placedComponentType) {
    const row = document.querySelector(`tr[data-row-index="${rowIndex}"]`);
    const correctType = row.dataset.correctType;
    const correctComponentIndex = rowIndex; // El índice correcto es el mismo que el índice de la fila

    // Verificar si el componente colocado es el correcto para esta fila
    const isCorrectComponent = (parseInt(placedComponentIndex) === parseInt(correctComponentIndex));

    if (isCorrectComponent) {
        // Fila correcta - iluminar en verde
        row.classList.remove('incorrect');
        row.classList.add('correct');
        completedRows.add(parseInt(rowIndex));

        // Mover la fila al final de la tabla después de la animación verde
        setTimeout(() => {
            const tbody = document.querySelector('#componentsTable tbody');
            row.style.transition = 'all 0.5s ease';
            tbody.appendChild(row);

            // Pequeña animación de entrada en la nueva posición
            row.style.transform = 'translateX(-20px)';
            row.style.opacity = '0.7';
            setTimeout(() => {
                row.style.transform = 'translateX(0)';
                row.style.opacity = '1';
            }, 50);
        }, 1000);

        // Verificar si todas las filas están completas
        if (completedRows.size === componentsData.length) {
            setTimeout(() => {
                document.getElementById('completionMessage').classList.add('show');
            }, 1500);
        }
    } else {
        // Fila incorrecta - iluminar en rojo y devolver el componente
        row.classList.remove('correct');
        row.classList.add('incorrect');

        setTimeout(() => {
            row.classList.remove('incorrect');

            // Devolver el componente al área de componentes
            const componentCell = row.querySelector('.component-cell');
            componentCell.innerHTML = '<span style="color: #999;">Arrastra aquí</span>';
            componentCell.classList.remove('filled');
            delete componentCell.dataset.placedComponent;

            // Mostrar el componente nuevamente en el área de componentes
            const originalComponent = document.querySelector(`[data-component-index="${placedComponentIndex}"]`);
            originalComponent.style.display = 'block';

            // Animación de rebote al volver
            originalComponent.style.animation = 'bounceIn 0.5s ease';
            setTimeout(() => {
                originalComponent.style.animation = '';
            }, 500);
        }, 800);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);
