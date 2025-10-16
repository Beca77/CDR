// Código do menu (EXATAMENTE igual ao da tela inicial)
document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.getElementById('menu-icon');
    const sideMenu = document.querySelector('.side-menu');
    const closeMenuButton = document.getElementById('close-menu');
    const body = document.body;

    const toggleMenu = () => {
        sideMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
    };

    menuIcon.addEventListener('click', toggleMenu);
    closeMenuButton.addEventListener('click', toggleMenu);

    document.addEventListener('click', (event) => {
        if (!menuIcon.contains(event.target) && !sideMenu.contains(event.target)) {
            sideMenu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
});

// Código específico do blog (adicionado depois)
document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidade para filtro de categorias
    const categoryButtons = document.querySelectorAll('.category-btn');
    const postCards = document.querySelectorAll('.post-card');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            postCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Funcionalidade para paginação
    const pageButtons = document.querySelectorAll('.page-btn');
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            pageButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
});