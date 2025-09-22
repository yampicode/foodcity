        // Variables globales
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const whatsappNumber = "584120348988";
        
        // Inicializar contador del carrito
        actualizarContadorCarrito();
        
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
        
        // Funciones para el carrito de compras
        function addToCart(productName, productPrice, productIcon) {
            // Verificar si el producto ya está en el carrito
            const existingProductIndex = carrito.findIndex(item => item.name === productName);
            
            if (existingProductIndex !== -1) {
                // Si ya existe, incrementar la cantidad
                carrito[existingProductIndex].quantity += 1;
            } else {
                // Si no existe, agregar nuevo producto
                carrito.push({ 
                    name: productName, 
                    price: productPrice, 
                    icon: productIcon,
                    quantity: 1
                });
            }
            
            // Guardar en localStorage
            localStorage.setItem('carrito', JSON.stringify(carrito));
            
            actualizarContadorCarrito();
            
            // Mostrar notificación
            alert(`¡${productName} añadido al carrito!`);
        }
        
        function actualizarContadorCarrito() {
            const totalItems = carrito.reduce((total, item) => total + item.quantity, 0);
            document.getElementById('cartCount').textContent = totalItems;
            document.getElementById('header-cart-count').textContent = totalItems;
        }
        
        function redirectToCart() {
            window.location.href = 'carrito.html';
        }