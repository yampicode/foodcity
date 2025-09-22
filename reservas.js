    // Variables globales
    const whatsappNumber = "584120348988";

    // Establecer fecha mínima como hoy
    document.getElementById('date').min = new Date().toISOString().split("T")[0];

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

    // Función para enviar reserva por WhatsApp
    function enviarReserva() {
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;
      const guests = document.getElementById('guests').value;
      const notes = document.getElementById('notes').value;

      if (!name || !email || !phone || !date || !time || !guests) {
        alert('Por favor, completa todos los campos obligatorios.');
        return;
      }

      // Formatear fecha en español
      const fechaFormateada = new Date(date).toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      let mensaje = `¡Hola! Me gustaría hacer una reserva:%0A%0A`;
      mensaje += `*Nombre:* ${name}%0A`;
      mensaje += `*Fecha:* ${fechaFormateada}%0A`;
      mensaje += `*Hora:* ${time}%0A`;
      mensaje += `*Personas:* ${guests}%0A`;
      mensaje += `*Teléfono:* ${phone}%0A`;
      mensaje += `*Email:* ${email}%0A`;

      if (notes) {
        mensaje += `*Notas:* ${notes}%0A`;
      }

      window.open(`https://wa.me/${whatsappNumber}?text=${mensaje}`, '_blank');

      // Limpiar formulario
      document.getElementById('reservationForm').reset();

      alert('¡Solicitud de reserva enviada! Nos pondremos en contacto contigo para confirmar.');
    }