// Inisialisasi website dengan animasi dan fitur dinamis
window.onload = function() {
    // Animasi scroll reveal
    revealOnScroll();
    
    // Tampilkan tanggal promosi
    tampilkanTanggalPromosi();
    
    // Navbar scrolling effect
    initNavbarEffect();
    
    // Welcome message dengan typing effect
    setTimeout(() => {
        typeWelcomeMessage();
    }, 1500);
};

// Animasi scroll reveal untuk elemen-elemen
function revealOnScroll() {
    // Tambahkan class 'reveal' ke semua heading, multimedia, dan form
    const elementsToReveal = document.querySelectorAll('h2, .multimedia, form, table, .cta-container');
    elementsToReveal.forEach(element => {
        element.classList.add('reveal');
    });
    
    // Check scroll position
    const revealElements = () => {
        let windowHeight = window.innerHeight;
        let revealPoint = 150;
        
        elementsToReveal.forEach(element => {
            let elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealElements);
    // Panggil juga saat halaman pertama kali di-load
    revealElements();
}

// Navbar effect saat scroll
function initNavbarEffect() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.padding = "10px 0";
            navbar.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
        } else {
            navbar.style.padding = "16px 0";
            navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
        }
    });
}

// Typing effect untuk welcome message
function typeWelcomeMessage() {
    const welcomeText = "Selamat datang di website kami!";
    let i = 0;
    
    // Buat elemen untuk menampilkan welcome message
    const welcomeDiv = document.createElement('div');
    welcomeDiv.classList.add('welcome-message');
    welcomeDiv.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #6C5CE7, #a29bfe);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        font-weight: 500;
        box-shadow: 0 5px 20px rgba(0,0,0,0.15);
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    document.body.appendChild(welcomeDiv);
    
    // Animasikan kemunculan elemen
    setTimeout(() => {
        welcomeDiv.style.opacity = "1";
        welcomeDiv.style.transform = "translateY(0)";
    }, 100);
    
    // Typing effect
    const typeChar = () => {
        if (i < welcomeText.length) {
            welcomeDiv.textContent += welcomeText.charAt(i);
            i++;
            setTimeout(typeChar, 100);
        } else {
            // Setelah menampilkan pesan, hapus pesan setelah beberapa detik
            setTimeout(() => {
                welcomeDiv.style.opacity = "0";
                welcomeDiv.style.transform = "translateY(20px)";
                setTimeout(() => {
                    document.body.removeChild(welcomeDiv);
                }, 300);
            }, 4000);
        }
    };
    
    welcomeDiv.textContent = "";
    typeChar();
}

// Validasi form
function validasiForm() {
    const nama = document.getElementById("nama").value;
    const email = document.getElementById("email").value;
    const pesan = document.getElementById("pesan").value;
    
    if (nama === "" || email === "" || pesan === "") {
        showNotification("Mohon lengkapi semua field!", "error");
        return false;
    }
    
    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification("Format email tidak valid!", "error");
        return false;
    }
    
    showNotification("Terima kasih! Pesan Anda telah terkirim.", "success");
    
    // Reset form
    document.getElementById("demoForm").reset();
    return true;
}

// Tanggal promosi
function tampilkanTanggalPromosi() {
    const sekarang = new Date();
    const tanggalBerakhir = new Date(sekarang);
    tanggalBerakhir.setDate(sekarang.getDate() + 7); // Promosi berlaku 7 hari
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formatted = tanggalBerakhir.toLocaleDateString('id-ID', options);
    
    // Tambahkan info promosi dengan animasi
    const container = document.querySelector('.container');
    const promoInfo = document.createElement('div');
    promoInfo.classList.add('promo-banner');
    promoInfo.innerHTML = `
        <div class="promo-content">
            <i class="fas fa-gift"></i>
            <p>Promosi spesial berlaku hingga <strong>${formatted}</strong>!</p>
            <button class="promo-close"><i class="fas fa-times"></i></button>
        </div>
    `;
    
    promoInfo.style.cssText = `
        background: linear-gradient(to right, #FF9800, #F57C00);
        margin: 20px 0 30px;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 5px 15px rgba(255, 152, 0, 0.3);
        transform: translateY(-20px);
        opacity: 0;
        animation: fadeInDown 0.5s forwards 0.5s;
    `;
    
    const promoContent = promoInfo.querySelector('.promo-content');
    promoContent.style.cssText = `
        display: flex;
        align-items: center;
        padding: 15px 20px;
        color: white;
        position: relative;
    `;
    
    const promoIcon = promoInfo.querySelector('.fa-gift');
    promoIcon.style.cssText = `
        font-size: 24px;
        margin-right: 15px;
    `;
    
    const closeButton = promoInfo.querySelector('.promo-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        padding: 5px;
        transition: all 0.3s;
    `;
    
    closeButton.addEventListener('click', function() {
        promoInfo.style.height = '0';
        promoInfo.style.padding = '0';
        promoInfo.style.margin = '0';
        promoInfo.style.opacity = '0';
        setTimeout(() => {
            promoInfo.remove();
        }, 300);
    });
    
    // Sisipkan sebelum elemen pertama dalam container
    container.insertBefore(promoInfo, container.firstChild);
    
    // Tambahkan keyframes untuk animasi
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">
                ${type === 'success' ? '<i class="fas fa-check-circle"></i>' : ''}
                ${type === 'error' ? '<i class="fas fa-exclamation-circle"></i>' : ''}
                ${type === 'info' ? '<i class="fas fa-info-circle"></i>' : ''}
            </span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Style notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        max-width: 350px;
        background-color: white;
        color: #333;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        overflow: hidden;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Style notification content
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        padding: 15px 20px;
    `;
    
    // Style icon based on notification type
    const icon = notification.querySelector('.notification-icon');
    icon.style.cssText = `
        font-size: 24px;
        margin-right: 15px;
    `;
    
    if (type === 'success') {
        icon.style.color = '#4CAF50';
    } else if (type === 'error') {
        icon.style.color = '#F44336';
    } else {
        icon.style.color = '#2196F3';
    }
    
    // Add notification to DOM
    document.body.appendChild(notification);
    
    // Show notification with animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove notification after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}
