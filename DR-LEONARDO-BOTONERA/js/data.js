const profileData = {
    profile: {
        name: "Dr. Leonardo Pérez",
        role: "Obstetra - Ginecólogo",
        bio: "Medicina especializada en la salud, funcionalidad y regeneración íntima de la mujer. Más de 25 años cuidando de ti y de tu bebé.",
        avatar: "./assets/logo.png", 
        isVerified: false,

    },
    links: [
        {
            title: "Agendar Cita",
            url: "https://wa.me/584149682471?text=Hola%20Dr.%20Pérez,%20quisiera%20agendar%20una%20cita.",
            icon: "mdi:calendar-check",
            colorClass: "icon-whatsapp", 
            featured: false
        },
        {
            title: "Ubicación",
            url: "https://maps.app.goo.gl/F8eAWhRxyn21BMzX7", // <-- Pon el link de Maps aquí
            icon: "mdi:map-marker",
            colorClass: "icon-location", 
            featured: false
        },
        {
            title: "Ver servicios",
            action: "open-modal",
            icon: "mdi:medical-bag",
            colorClass: "icon-service", 
            featured: false
        }
    ],
    socials: []
};