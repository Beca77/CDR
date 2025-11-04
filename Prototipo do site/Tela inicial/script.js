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
  if (closeMenuButton) closeMenuButton.addEventListener('click', toggleMenu);

  document.addEventListener('click', (event) => {
    if (!menuIcon.contains(event.target) && !sideMenu.contains(event.target)) {
      sideMenu.classList.remove('active');
      body.classList.remove('menu-open');
    }
  });

  // Se NÃO estivermos na página Projeto, redireciona todos os cliques do menu para ela
  const isProjectPage = window.location.pathname.toLowerCase().includes('/projeto/') ||
                        window.location.pathname.toLowerCase().endsWith('projeto.html');

  document.querySelectorAll('.menu-button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // sempre fecha o menu visualmente
      if (sideMenu) sideMenu.classList.remove('active');

      if (!isProjectPage) {
        e.preventDefault();
        // ajusta caminho relativo a partir da Tela inicial
        window.location.href = '../Projeto/Projeto.html';
        return;
      }

      // se estivermos na página Projeto (não se aplica aqui, mas mantém lógica)
      const href = btn.getAttribute('href');
      if (!href || href === '#') {
        e.preventDefault();
        // apenas fecha/abre o menu
        body.classList.toggle('menu-open');
      }
      // caso contrário permite navegação normal
    });
  });
});