        // Variables globales
        const whatsappNumber = "584120348988";
        
        // Funcionalidad del menú móvil
        const menuToggle = document.querySelector('.menu-toggle');
        const closeMenu = document.querySelector('.close-menu');
        const nav = document.querySelector('nav');
        
        menuToggle.addEventListener('click', () => {
            nav.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        closeMenu.addEventListener('click', () => {
            nav.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // Cerrar menú al hacer clic en enlaces
        const navLinks = document.querySelectorAll('.nav-list a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
        
        // Función para enviar formulario de contacto por WhatsApp
        function enviarFormularioContacto() {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !subject || !message) {
                alert('Por favor, completa todos los campos obligatorios.');
                return;
            }
            
            let mensaje = `¡Hola! Mi nombre es ${name}.%0A%0A`;
            mensaje += `Me gustaría contactarlos por: ${subject}%0A%0A`;
            mensaje += `${message}%0A%0A`;
            mensaje += `Mis datos de contacto:%0A`;
            mensaje += `Email: ${email}%0A`;
            
            if (phone) {
                mensaje += `Teléfono: ${phone}%0A`;
            }
            
            window.open(`https://wa.me/${whatsappNumber}?text=${mensaje}`, '_blank');
            
            // Limpiar formulario
            document.getElementById('contactForm').reset();
            
            alert('¡Mensaje enviado! Nos pondremos en contacto contigo pronto.');
        }