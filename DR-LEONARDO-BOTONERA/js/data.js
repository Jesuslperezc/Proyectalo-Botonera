const profileData = {
    profile: {
        name: "Dr. Leonardo Pérez",
        role: "Obstetra - Ginecólogo",
        bio: "Tu salud y la de tu bebé en las mejores manos.",
        avatar: "./assets/logo.png", 
        isVerified: false,

    },
    links: [
        {
            title: "Agendar Cita",
            url: "https://wa.me/584127636377?text=Hola%20Dr.%20Pérez,%20quisiera%20agendar%20una%20cita.",
            icon: "mdi:calendar-check",
            colorClass: "icon-whatsapp", 
            featured: false
        },
        {
            title: "Cómo Llegar (Google Maps)",
            url: "https://maps.app.goo.gl/TU_LINK_AQUI", // <-- Pon el link de Maps aquí
            icon: "mdi:map-marker",
            colorClass: "icon-location", 
            featured: false
        },
        {
            title: "Especialidades",
            action: "open-modal",
            icon: "mdi:medical-bag",
            colorClass: "icon-service", 
            featured: false
        }
    ],
    socials: []
};