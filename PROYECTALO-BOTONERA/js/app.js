document.addEventListener("DOMContentLoaded", () => {
    const html = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
        themeIcon.setAttribute('icon', 'mdi:weather-sunny');
    } else {
        html.classList.remove('dark');
        themeIcon.setAttribute('icon', 'mdi:weather-night');
    }

    themeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        if (html.classList.contains('dark')) {
            localStorage.theme = 'dark'; themeIcon.setAttribute('icon', 'mdi:weather-sunny');
        } else {
            localStorage.theme = 'light'; themeIcon.setAttribute('icon', 'mdi:weather-night');
        }
    });

    document.getElementById('current-year').textContent = new Date().getFullYear();
    const { profile, links, socials } = profileData;
    const headerContainer = document.getElementById("profile-header");
    
    let verifiedBadge = profile.isVerified ? `<iconify-icon icon="mdi:check-decagram" class="w-5 h-5 text-cyan-600 dark:text-cyan-400 ml-2" style="vertical-align: middle;"></iconify-icon>` : '';
    let statusPill = profile.status ? `<div class="status-pill"><span style="color: #00ff00;">●</span> ${profile.status}</div>` : '';
    
    headerContainer.innerHTML = `
        <div class="avatar-ring-wrapper">
            <img src="${profile.avatar}" alt="Foto de perfil de ${profile.name}" class="profile-avatar">
        </div>
        <div class="flex items-center justify-center">
            <h1 class="brand-name">${profile.name}</h1>
            ${verifiedBadge}
        </div>
        <p class="bio-text">${profile.bio}</p>
        ${statusPill}
    `;

    const linksContainer = document.getElementById("links-container");
    
    links.forEach((link, index) => {
        const featuredClass = link.featured ? 'link-btn-featured' : '';
        const delay = (index * 0.15) + 0.2; 
        const iconColorClass = link.colorClass ? link.colorClass : 'text-gray-800 dark:text-white';
        
        const tagType = link.action === 'open-modal' ? 'button' : 'a';
        const tagAttr = link.action === 'open-modal' ? `data-modal="services-modal"` : `href="${link.url}" target="_blank" rel="noopener noreferrer"`;

        const buttonHTML = `
            <${tagType} ${tagAttr} 
               class="link-btn ${featuredClass} fade-in-up w-full flex items-center gap-4 p-4 rounded-full text-left"
               style="animation-delay: ${delay}s;">
                <span class="icon-box">
                    <iconify-icon icon="${link.icon}" class="btn-icon ${iconColorClass}"></iconify-icon>
                </span>
                <span class="flex-1 link-btn-text">${link.title}</span>
                <iconify-icon icon="mdi:chevron-right" class="link-arrow"></iconify-icon>
            </${tagType}>
        `;
        linksContainer.innerHTML += buttonHTML;
    });

    const socialsContainer = document.getElementById("socials-container");
    
    // Si hay redes sociales, las renderiza. Si no, oculta el footer.
    if (socials.length > 0) {
        socials.forEach(social => {
            const iconColorClass = social.colorClass ? social.colorClass : 'text-gray-800 dark:text-white';
            const socialHTML = `
                <a href="${social.url}" target="_blank" rel="noopener noreferrer" 
                   class="text-gray-500 hover:text-gray-800 dark:text-white/60 dark:hover:text-white transition-all hover:scale-125 active:scale-95">
                    <iconify-icon icon="${social.icon}" class="w-8 h-8 ${iconColorClass}"></iconify-icon>
                </a>
            `;
            socialsContainer.innerHTML += socialHTML;
        });
    } else {
        socialsContainer.style.display = 'none';
    }
    // ================= LÓGICA DEL MODAL =================
    const servicesModalHTML = `
        <div id="services-modal" class="modal-backdrop">
            <div class="modal-surface">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="modal-title">Nuestros Servicios</h2>
                    <button id="close-modal-btn" class="modal-close-btn">
                        <iconify-icon icon="mdi:close" class="modal-close-icon"></iconify-icon>
                    </button>
                </div>
                
                <div class="space-y-4">
                    <div class="service-item flex gap-4">
                        <div class="icon-box mt-1"><iconify-icon icon="mdi:chart-line-variant" class="w-6 h-6 modal-icon-cyan"></iconify-icon></div>
                        <div>
                            <h3 class="modal-subtitle">Estrategia y Gestión de Redes Sociales</h3>
                            <p class="modal-text">Nos encargamos de la gestión integral de tus redes sociales. No solo creamos contenido visualmente atractivo, sino que monitoreamos métricas, gestionamos la comunidad y ajustamos la estrategia para asegurar que cada publicación tenga un propósito claro.</p>
                        </div>
                    </div>

                    <div class="service-item flex gap-4">
                        <div class="icon-box mt-1"><iconify-icon icon="mdi:palette-outline" class="w-6 h-6 modal-icon-fuchsia"></iconify-icon></div>
                        <div>
                            <h3 class="modal-subtitle">Diseño de Identidad Visual</h3>
                            <p class="modal-text">Construimos la personalidad visual de tu empresa desde cero o rediseñamos tu imagen actual para hacerla memorable, coherente y alineada con los valores de tu negocio.</p>
                        </div>
                    </div>

                    <div class="service-item flex gap-4">
                        <div class="icon-box mt-1"><iconify-icon icon="mdi:book-open-page-variant-outline" class="w-6 h-6 modal-icon-cyan"></iconify-icon></div>
                        <div>
                            <h3 class="modal-subtitle">Diseño de Catálogos Digitales Interactivos</h3>
                            <p class="modal-text">Diseñamos catálogos digitales optimizados para móviles y computadoras que permiten a tus clientes explorar tus productos, hacer clic en enlaces directos a WhatsApp o cotizar en tiempo real.</p>
                        </div>
                    </div>

                    <div class="service-item flex gap-4">
                        <div class="icon-box mt-1"><iconify-icon icon="mdi:monitor-cellphone-star" class="w-6 h-6 modal-icon-fuchsia"></iconify-icon></div>
                        <div>
                            <h3 class="modal-subtitle">Diseño de Sitio Web Corporativo</h3>
                            <p class="modal-text">Desarrollamos sitios web corporativos rápidos, seguros e intuitivos, diseñados estratégicamente para convertir visitantes en contactos calificados y dar el respaldo que tu empresa necesita.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', servicesModalHTML);

    const modal = document.getElementById('services-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    document.querySelector('[data-modal="services-modal"]').addEventListener('click', () => {
        modal.classList.add('active');
    });

    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});