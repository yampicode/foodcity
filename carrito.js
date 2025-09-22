        // Variables globales
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const whatsappNumber = "584120348988";
        const cartContent = document.getElementById('cart-content');
        
        // Renderizar carrito
        renderCart();
        
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
        
        function renderCart() {
            if (carrito.length === 0) {
                cartContent.innerHTML = `
                    <div class="cart-empty">
                        <i class="fas fa-shopping-cart"></i>
                        <h2>Tu carrito está vacío</h2>
                        <p>Agrega algunos productos deliciosos para comenzar</p>
                        <a href="menu.html" class="btn">Ver Menú</a>
                    </div>
                `;
                return;
            }
            
            // Calcular totales
            const subtotal = carrito.reduce((total, item) => total + (item.price * item.quantity), 0);
            const iva = subtotal * 0.16; // 16% de IVA
            const total = subtotal + iva;
            
            cartContent.innerHTML = `
                <div class="cart-content">
                    <div class="cart-items">
                        ${carrito.map((item, index) => `
                            <div class="cart-item">
                                <div class="cart-item-icon">
                                    ${item.icon}
                                </div>
                                <div class="cart-item-details">
                                    <div class="cart-item-name">${item.name}</div>
                                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                                    <div class="cart-item-quantity">
                                        <button class="quantity-btn" onclick="updateQuantity(${index}, ${item.quantity - 1})">-</button>
                                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, parseInt(this.value))">
                                        <button class="quantity-btn" onclick="updateQuantity(${index}, ${item.quantity + 1})">+</button>
                                    </div>
                                </div>
                                <button class="cart-item-remove" onclick="removeFromCart(${index})">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="cart-summary">
                        <h3>Resumen de pedido</h3>
                        <div class="summary-row">
                            <span>Subtotal:</span>
                            <span>$${subtotal.toFixed(2)}</span>
                        </div>
                        <div class="summary-row">
                            <span>IVA (16%):</span>
                            <span>$${iva.toFixed(2)}</span>
                        </div>
                        <div class="summary-row summary-total">
                            <span>Total:</span>
                            <span>$${total.toFixed(2)}</span>
                        </div>
                        
                        <div class="cart-actions">
                            <button class="btn" onclick="clearCart()">Vaciar carrito</button>
                            <button class="btn btn-secondary" onclick="realizarPedido()">Realizar Pedido</button>
                        </div>
                    </div>
                </div>
            `;
        }
        
        function updateQuantity(index, newQuantity) {
            if (newQuantity < 1) newQuantity = 1;
            
            carrito[index].quantity = newQuantity;
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderCart();
        }
        
        function removeFromCart(index) {
            carrito.splice(index, 1);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderCart();
        }
        
        function clearCart() {
            if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
                carrito = [];
                localStorage.setItem('carrito', JSON.stringify(carrito));
                renderCart();
            }
        }
        
        function realizarPedido() {
            if (carrito.length === 0) {
                alert('Tu carrito está vacío. Agrega productos antes de realizar el pedido.');
                return;
            }
            
            // Solicitar información del cliente
            const clienteNombre = prompt('Por favor, ingresa tu nombre:');
            if (!clienteNombre) return;
            
            const clienteTelefono = prompt('Por favor, ingresa tu teléfono:');
            if (!clienteTelefono) return;
            
            const clienteDireccion = prompt('Por favor, ingresa tu dirección de entrega:');
            if (!clienteDireccion) return;
            
            let mensaje = `¡Hola! Me gustaría hacer el siguiente pedido:%0A%0A`;
            mensaje += `*Nombre:* ${clienteNombre}%0A`;
            mensaje += `*Teléfono:* ${clienteTelefono}%0A`;
            mensaje += `*Dirección:* ${clienteDireccion}%0A%0A`;
            mensaje += `*Pedido:*%0A`;
            
            let subtotal = 0;
            
            carrito.forEach(item => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;
                mensaje += `- ${item.quantity}x ${item.name}: $${itemTotal.toFixed(2)}%0A`;
            });
            
            const iva = subtotal * 0.16;
            const total = subtotal + iva;
            
            mensaje += `%0A*Subtotal:* $${subtotal.toFixed(2)}%0A`;
            mensaje += `*IVA (16%):* $${iva.toFixed(2)}%0A`;
            mensaje += `*Total:* $${total.toFixed(2)}%0A%0A`;
            mensaje += "Por favor, confirmar disponibilidad y tiempo de entrega.";
            
            window.open(`https://wa.me/${whatsappNumber}?text=${mensaje}`, '_blank');
            
            // Limpiar carrito después de realizar pedido
            carrito = [];
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderCart();
            
            alert('¡Pedido enviado! Nos pondremos en contacto contigo para confirmar.');
        }