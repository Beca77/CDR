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