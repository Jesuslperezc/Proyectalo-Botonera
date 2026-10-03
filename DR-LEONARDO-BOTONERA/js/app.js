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
                <div class="modal-header">
                    <h2 class="modal-title">Servicios</h2>
                    <button id="close-modal-btn" class="modal-close-btn">
                        <iconify-icon icon="mdi:close" class="modal-close-icon"></iconify-icon>
                    </button>
                </div>
                
                <div class="space-y-8">
                    <!-- Ginecología -->
                    <div>
                        <h3 class="modal-category"><iconify-icon icon="mdi:human-female" class="modal-icon-cyan"></iconify-icon> Ginecología</h3>
                        <ul class="modal-list">
                            <li>Consulta ginecológica</li>
                            <li>Colposcopia</li>
                            <li>Papanicolaou / Citología cérvico vaginal</li>
                            <li>Ecografía ginecológica (Abdominal y Transvaginal)</li>
                            <li>Despistaje de cáncer de cuello uterino</li>
                            <li>Toma de biopsia (Cuello uterino y endometrio)</li>
                            <li>Planificación familiar</li>
                            <li>Colocación de implante subdérmico y DIU</li>
                            <li>Enfermedades de niñas y adolescentes</li>
                            <li>Cauterización de cuello uterino y de lesiones</li>
                            <li>Cirugías ginecológicas</li>
                        </ul>
                    </div>

                    <!-- Obstetricia -->
                    <div>
                        <h3 class="modal-category"><iconify-icon icon="mdi:baby-carriage" class="modal-icon-cyan"></iconify-icon> Obstetricia</h3>
                        <ul class="modal-list">
                            <li>Control prenatal</li>
                            <li>Ecografía obstétrica (Abdominal y Transvaginal)</li>
                            <li>Atención de embarazo de alto riesgo</li>
                            <li>Cirugías obstétricas</li>
                        </ul>
                    </div>

                    <!-- Ginecología Regenerativa, Funcional y Estética -->
                    <div>
                        <h3 class="modal-category"><iconify-icon icon="mdi:sparkles" class="modal-icon-cyan"></iconify-icon> Ginecología regenerativa, funcional y estética</h3>
                        <ul class="modal-list">
                            <li>Labioplastia</li>
                            <li>Rejuvenecimiento vaginal y vulvar</li>
                            <li>Blanqueamiento vulvar</li>
                            <li>Tensado vaginal</li>
                            <li>Terapia regenerativa con plasma rico en plaquetas (PRP)</li>
                            <li>Láser CO2</li>
                        </ul>
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