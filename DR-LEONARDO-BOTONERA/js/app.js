document.addEventListener("DOMContentLoaded", () => {
        // Bloquear clic derecho en los elementos de fondo
    document.addEventListener('contextmenu', function(e) {
        if (e.target.tagName === 'VIDEO' || e.target.classList.contains('smoke-video')) {
            e.preventDefault();
        }
    });
    // LÓGICA DE TEMA (CLARO/OSCURO)
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

    // RENDERIZADO DE DATOS
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
        <p class="role-text">${profile.role}</p>
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
               class="link-btn ${featuredClass} fade-in-up w-full flex items-center gap-3 p-3 text-left"
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
    if (socials.length > 0) {
        socials.forEach(social => {
            const iconColorClass = social.colorClass ? social.colorClass : 'text-gray-800 dark:text-white';
            const socialHTML = `<a href="${social.url}" target="_blank" rel="noopener noreferrer" class="text-gray-500 hover:text-gray-800 dark:text-white/60 dark:hover:text-white transition-all hover:scale-125 active:scale-95"><iconify-icon icon="${social.icon}" class="w-6 h-6 ${iconColorClass}"></iconify-icon></a>`;
            socialsContainer.innerHTML += socialHTML;
        });
    } else {
        socialsContainer.style.display = 'none';
    }

    // LÓGICA DEL MODAL MÉDICO
    const servicesModalHTML = `
        <div id="services-modal" class="modal-backdrop">
            <div class="modal-surface">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="modal-title">Especialidades</h2>
                    <button id="close-modal-btn" class="modal-close-btn">
                        <iconify-icon icon="mdi:close" class="modal-close-icon"></iconify-icon>
                    </button>
                </div>
                <div class="space-y-4">
                    <div class="service-item flex gap-4">
                        <div class="icon-box mt-1"><iconify-icon icon="mdi:baby-carriage" class="w-6 h-6 modal-icon-cyan"></iconify-icon></div>
                        <div>
                            <h3 class="modal-subtitle">Control Prenatal</h3>
                            <p class="modal-text">Seguimiento integral durante tu embarazo para garantizar tu bienestar y el de tu bebé.</p>
                        </div>
                    </div>
                    <div class="service-item flex gap-4">
                        <div class="icon-box mt-1"><iconify-icon icon="mdi:ultrasound" class="w-6 h-6 modal-icon-cyan"></iconify-icon></div>
                        <div>
                            <h3 class="modal-subtitle">Ecografías 4D</h3>
                            <p class="modal-text">Tecnología de última generación para ver a tu bebé en alta definición antes de nacer.</p>
                        </div>
                    </div>
                    <div class="service-item flex gap-4">
                        <div class="icon-box mt-1"><iconify-icon icon="mdi:heart-pulse" class="w-6 h-6 modal-icon-cyan"></iconify-icon></div>
                        <div>
                            <h3 class="modal-subtitle">Ginecología General</h3>
                            <p class="modal-text">Consultas, prevención y tratamiento de enfermedades de la mujer.</p>
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