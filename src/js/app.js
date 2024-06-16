document.addEventListener('DOMContentLoaded', function() {
    navegacionFija();
    galeria();
    resaltarEnlace();
    scrollNav();
});

function navegacionFija() {
    const header = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');

    window.addEventListener('scroll', () => {
        if ( sobreFestival.getBoundingClientRect().bottom < 1 ) {
            header.classList.add('fixed');
        } else {
            header.classList.remove('fixed');
        }
    });
}

function galeria() {
    const CANTIDAD_IMAGENES = 16;
    const galeria = document.querySelector('.galeria-imagenes');
    
    for(let i = 1; i <= CANTIDAD_IMAGENES; i++) {
        const imagen = document.createElement('img');
        imagen.src = `src/img/gallery/full/${i}.jpg`;
        imagen.alt = 'Imagen galería';

        imagen.onclick = function() {
            mostrarImagen(i);
        };

        galeria.appendChild(imagen);

    }
}

function mostrarImagen(i) {
    const imagen = document.createElement('img');
    imagen.src = `src/img/gallery/full/${i}.jpg`;
    imagen.alt = 'Imagen galería';

    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.onclick = cerrarModal;
   

    // Boton cerrar modal
    const cerrarModalBtn = document.createElement('button');
    cerrarModalBtn.textContent  = 'X';
    cerrarModalBtn.classList.add('btn-cerrar');
    cerrarModalBtn.onclick = cerrarModal;

    modal.appendChild(imagen);
    modal.appendChild(cerrarModalBtn);

    const body = document.querySelector('body');
    body.classList.add('overflow-hidden');
    body.appendChild(modal);
}

function cerrarModal() {
    const modal = document.querySelector('.modal');
    modal.classList.add('fade-out');
    setTimeout(() => {
        modal?.remove();

        const body = document.querySelector('body');
        body.classList.remove('overflow-hidden');
    }, 500);
}

function resaltarEnlace() {
    document.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navegacion-principal a');
        let actual = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= (sectionTop - sectionHeight / 3) ) {
                actual = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${actual}`) {
                link.classList.add('active');
            }
        });
    });
}

function scrollNav() {
    const navLinks = document.querySelectorAll('.navegacion-principal a');
    navLinks.forEach(link => {
        link.addEventListener('click', (evt) => {
            evt.preventDefault();
            const sectionSroll = evt.target.getAttribute('href');
            const section = document.querySelector(sectionSroll);

            section.srollIntoView({behavior: 'smooth'});
            
        });
    });
}