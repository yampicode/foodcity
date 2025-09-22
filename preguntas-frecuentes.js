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
        
        // Función para las preguntas frecuentes
        function toggleFaq(index) {
            const answers = document.querySelectorAll('.faq-answer');
            const icons = document.querySelectorAll('.faq-icon');
            
            if (answers[index].classList.contains('active')) {
                answers[index].classList.remove('active');
                icons[index].classList.remove('active');
            } else {
                answers[index].classList.add('active');
                icons[index].classList.add('active');
            }
        }
        
        // Funcionalidad de búsqueda
        document.getElementById('faq-search').addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            const questions = document.querySelectorAll('.faq-question');
            
            questions.forEach((question, index) => {
                const questionText = question.textContent.toLowerCase();
                const faqItem = question.parentElement;
                
                if (questionText.includes(searchTerm)) {
                    faqItem.style.display = 'block';
                    // Abrir la pregunta si coincide con la búsqueda
                    if (searchTerm.length > 2) {
                        faqItem.querySelector('.faq-answer').classList.add('active');
                        faqItem.querySelector('.faq-icon').classList.add('active');
                    }
                } else {
                    faqItem.style.display = 'none';
                }
            });
        });
        
        // Abrir primera pregunta al cargar
        window.onload = function() {
            toggleFaq(0);
        };