// Funciones auxiliares para trabajar con Vue.js
// Este código se ejecutará después de que Vue esté inicializado
document.addEventListener('DOMContentLoaded', function() {
    // Navegación suave
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navegación móvil
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Header con scroll
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#fff';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    });

    // Animaciones al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animaciones a las tarjetas
    const cards = document.querySelectorAll('.vehicle-card, .service-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Formulario de contacto
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los valores del formulario
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const message = this.querySelector('textarea').value;
            
            // Validación básica
            if (!name || !email || !message) {
                alert('Por favor, completa todos los campos requeridos.');
                return;
            }
            
            // Simular envío del formulario
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Simular delay de envío
            setTimeout(() => {
                alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Botones de "Ver Detalles" en las tarjetas de vehículos
    const detailButtons = document.querySelectorAll('.vehicle-card .btn-secondary');
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const vehicleCard = this.closest('.vehicle-card');
            const vehicleName = vehicleCard.querySelector('h3').textContent;
            const vehiclePrice = vehicleCard.querySelector('.price').textContent;
            const vehicleYear = vehicleCard.querySelector('.year').textContent;
            
            // Crear modal con detalles del vehículo
            showVehicleModal(vehicleName, vehiclePrice, vehicleYear);
        });
    });

    // Contador de vehículos (ejemplo de funcionalidad adicional)
    updateVehicleCount();
});

// Función para mostrar modal de detalles del vehículo
function showVehicleModal(name, price, year) {
    // Crear modal
    const modal = document.createElement('div');
    modal.className = 'vehicle-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>${name}</h2>
            <div class="modal-details">
                <p><strong>Año:</strong> ${year}</p>
                <p><strong>Precio:</strong> ${price}</p>
                <p><strong>Estado:</strong> Excelente</p>
                <p><strong>Combustible:</strong> Gasolina</p>
                <p><strong>Transmisión:</strong> Automática</p>
                <p><strong>Color:</strong> Negro</p>
            </div>
            <div class="modal-actions">
                <button class="btn btn-primary">Solicitar Información</button>
                <button class="btn btn-secondary">Agendar Test Drive</button>
            </div>
        </div>
    `;

    // Agregar estilos del modal
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .vehicle-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
        }
        
        .modal-content {
            background: white;
            padding: 2rem;
            border-radius: 16px;
            max-width: 500px;
            width: 90%;
            position: relative;
        }
        
        .close-modal {
            position: absolute;
            top: 1rem;
            right: 1rem;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
        }
        
        .close-modal:hover {
            color: #333;
        }
        
        .modal-details {
            margin: 1.5rem 0;
        }
        
        .modal-details p {
            margin: 0.5rem 0;
            color: #666;
        }
        
        .modal-actions {
            display: flex;
            gap: 1rem;
            margin-top: 1.5rem;
        }
        
        @media (max-width: 768px) {
            .modal-actions {
                flex-direction: column;
            }
        }
    `;
    
    document.head.appendChild(modalStyles);
    document.body.appendChild(modal);

    // Cerrar modal
    const closeModal = modal.querySelector('.close-modal');
    closeModal.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    // Cerrar modal al hacer clic fuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });

    // Funcionalidad de los botones del modal
    const modalActions = modal.querySelectorAll('.btn');
    modalActions.forEach(button => {
        button.addEventListener('click', () => {
            if (button.textContent.includes('Solicitar')) {
                alert('¡Gracias! Un asesor te contactará pronto con más información sobre este vehículo.');
            } else if (button.textContent.includes('Test Drive')) {
                alert('¡Perfecto! Te contactaremos para agendar tu test drive.');
            }
            document.body.removeChild(modal);
        });
    });
}

// Función para actualizar contador de vehículos
function updateVehicleCount() {
    const vehicleCards = document.querySelectorAll('.vehicle-card');
    const count = vehicleCards.length;
    
    // Puedes agregar un contador en algún lugar de la página
    const vehiclesSection = document.querySelector('#vehiculos h2');
    if (vehiclesSection) {
        vehiclesSection.innerHTML = `Vehículos Disponibles <span style="color: #2563eb; font-size: 1rem;">(${count})</span>`;
    }
}

// Función para agregar efecto de parallax al hero
function initParallax() {
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Inicializar parallax cuando la página esté completamente cargada
window.addEventListener('load', initParallax);
