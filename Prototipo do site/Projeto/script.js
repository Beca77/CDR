// Menu lateral
const menuToggle = document.getElementById('menuToggle');
const sideMenu = document.getElementById('sideMenu');
const closeMenu = document.getElementById('closeMenu');

menuToggle.addEventListener('click', () => {
    sideMenu.classList.add('active');
});

closeMenu.addEventListener('click', () => {
    sideMenu.classList.remove('active');
});

// Gerenciamento de projetos
let projects = JSON.parse(localStorage.getItem('cdrProjects')) || [];
let nextProjectId = parseInt(localStorage.getItem('nextProjectId')) || 1;

// Projetos iniciais (exemplos)
const initialProjects = [
    {
        id: 1,
        title: "Agricultura de Precisão 4.0",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        description: "Implementação de tecnologias digitais para otimização do uso de insumos agrícolas, aumentando a produtividade e reduzindo impactos ambientais.",
        status: "ongoing",
        location: "Região Sul",
        duration: "24 meses",
        partners: "EMBRAPA, Universidades Federais, Cooperativas Agrícolas",
        categories: ["agricultura", "tecnologia", "sustentabilidade"]
    },
    {
        id: 2,
        title: "Laboratórios de Inovação Digital",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        description: "Criação de espaços tecnológicos em escolas públicas para capacitação em programação, robótica e desenvolvimento de soluções digitais.",
        status: "completed",
        location: "Santa Catarina",
        duration: "18 meses",
        partners: "Secretaria de Educação, Empresas de Tecnologia",
        categories: ["tecnologia", "educacao"]
    },
    {
        id: 3,
        title: "Microgeração de Energia Renovável",
        image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        description: "Instalação de sistemas de microgeração de energia solar em comunidades rurais, promovendo autonomia energética e sustentabilidade.",
        status: "ongoing",
        location: "Rio Grande do Sul",
        duration: "36 meses",
        partners: "ANEEL, Cooperativas de Energia",
        categories: ["sustentabilidade", "infraestrutura"]
    }
];

// Inicializar projetos se estiver vazio
if (projects.length === 0) {
    projects = initialProjects;
    nextProjectId = 4;
    saveProjects();
}

// Função para salvar projetos no localStorage
function saveProjects() {
    localStorage.setItem('cdrProjects', JSON.stringify(projects));
    localStorage.setItem('nextProjectId', nextProjectId.toString());
}

// Formulário de cadastro
const addProjectBtn = document.getElementById('addProjectBtn');
const projectForm = document.getElementById('projectForm');
const cancelForm = document.getElementById('cancelForm');
const newProjectForm = document.getElementById('newProjectForm');
const formTitle = document.getElementById('formTitle');
const submitBtn = document.getElementById('submitBtn');
const projectIdInput = document.getElementById('projectId');

addProjectBtn.addEventListener('click', () => {
    resetForm();
    projectForm.classList.add('active');
    addProjectBtn.style.display = 'none';
    formTitle.textContent = 'Cadastrar Novo Projeto';
    submitBtn.textContent = 'Cadastrar Projeto';
});

cancelForm.addEventListener('click', () => {
    projectForm.classList.remove('active');
    addProjectBtn.style.display = 'inline-flex';
    resetForm();
});

function resetForm() {
    newProjectForm.reset();
    projectIdInput.value = '';
    // Desmarcar todas as checkboxes
    document.querySelectorAll('.checkbox-group input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
}

newProjectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Coletar dados do formulário
    const id = projectIdInput.value ? parseInt(projectIdInput.value) : nextProjectId++;
    const name = document.getElementById('projectName').value;
    const location = document.getElementById('projectLocation').value;
    const status = document.getElementById('projectStatus').value;
    const duration = document.getElementById('projectDuration').value;
    const description = document.getElementById('projectDescription').value;
    const image = document.getElementById('projectImage').value || 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80';
    const partners = document.getElementById('projectPartners').value;
    
    // Coletar categorias selecionadas
    const categories = [];
    const categoryCheckboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked');
    categoryCheckboxes.forEach(checkbox => {
        categories.push(checkbox.value);
    });
    
    // Validar se pelo menos uma categoria foi selecionada
    if (categories.length === 0) {
        alert('Selecione pelo menos uma categoria para o projeto.');
        return;
    }
    
    // Criar/atualizar projeto
    const projectData = {
        id: id,
        title: name,
        image: image,
        description: description,
        status: status,
        location: location,
        duration: duration,
        partners: partners,
        categories: categories
    };
    
    if (projectIdInput.value) {
        // Atualizar projeto existente
        const index = projects.findIndex(p => p.id === id);
        if (index !== -1) {
            projects[index] = projectData;
        }
    } else {
        // Adicionar novo projeto
        projects.push(projectData);
    }
    
    saveProjects();
    
    // Recarregar a lista de projetos
    renderProjects();
    
    // Fechar formulário e resetar
    projectForm.classList.remove('active');
    addProjectBtn.style.display = 'inline-flex';
    resetForm();
    
    alert(projectIdInput.value ? 'Projeto atualizado com sucesso!' : 'Projeto cadastrado com sucesso!');
});

// Filtros de projetos
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove a classe active de todos os botões
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Adiciona a classe active ao botão clicado
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        filterProjects(filterValue);
    });
});

function filterProjects(filterValue) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        if (filterValue === 'all') {
            card.style.display = 'flex';
        } else {
            const categories = card.getAttribute('data-category').split(' ');
            if (categories.includes(filterValue)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        }
    });
}

// Renderizar projetos
function renderProjects() {
    const projectsContainer = document.getElementById('projectsContainer');
    projectsContainer.innerHTML = '';
    
    projects.forEach(project => {
        const statusText = {
            'ongoing': 'Em Andamento',
            'completed': 'Concluído',
            'planned': 'Planejado'
        };
        
        const statusClass = {
            'ongoing': 'status-ongoing',
            'completed': 'status-completed',
            'planned': 'status-planned'
        };
        
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-category', project.categories.join(' '));
        
        projectCard.innerHTML = `
            <div class="project-img">
                <img src="${project.image}" alt="${project.title}">
                <div class="project-status ${statusClass[project.status]}">${statusText[project.status]}</div>
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <div class="project-location">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    ${project.location}
                </div>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.categories.map(cat => `<span class="tag">${cat.charAt(0).toUpperCase() + cat.slice(1)}</span>`).join('')}
                </div>
                <div class="project-actions">
                    <button class="project-link" data-project="${project.id}">Ver Detalhes</button>
                    <button class="edit-btn" data-project="${project.id}">Editar</button>
                    <button class="delete-btn" data-project="${project.id}">Excluir</button>
                </div>
            </div>
        `;
        
        projectsContainer.appendChild(projectCard);
    });
    
    // Adicionar eventos aos botões de detalhes, edição e exclusão
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = parseInt(link.getAttribute('data-project'));
            showProjectDetails(projectId);
        });
    });
    
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const projectId = parseInt(button.getAttribute('data-project'));
            editProject(projectId);
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const projectId = parseInt(button.getAttribute('data-project'));
            if (confirm('Tem certeza que deseja excluir este projeto?')) {
                deleteProject(projectId);
            }
        });
    });
}

// Modal de detalhes do projeto
const projectModal = document.getElementById('projectModal');
const closeModal = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalDescription = document.getElementById('modalDescription');
const modalStatus = document.getElementById('modalStatus');
const modalLocation = document.getElementById('modalLocation');
const modalDuration = document.getElementById('modalDuration');
const modalPartners = document.getElementById('modalPartners');
const modalTags = document.getElementById('modalTags');

function showProjectDetails(projectId) {
    const project = projects.find(p => p.id === projectId);
    
    if (project) {
        const statusText = {
            'ongoing': 'Em Andamento',
            'completed': 'Concluído',
            'planned': 'Planejado'
        };
        
        modalTitle.textContent = project.title;
        modalImage.src = project.image;
        modalImage.alt = project.title;
        modalDescription.textContent = project.description;
        modalStatus.textContent = statusText[project.status];
        modalLocation.textContent = project.location;
        modalDuration.textContent = project.duration || 'Não informado';
        modalPartners.textContent = project.partners || 'Não informado';
        
        // Limpa as tags anteriores
        modalTags.innerHTML = '';
        
        // Adiciona as novas tags
        project.categories.forEach(cat => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
            modalTags.appendChild(tagElement);
        });
        
        // Abre o modal
        projectModal.style.display = 'block';
    }
}

closeModal.addEventListener('click', () => {
    projectModal.style.display = 'none';
});

// Fecha o modal ao clicar fora dele
window.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        projectModal.style.display = 'none';
    }
});

// Editar projeto
function editProject(projectId) {
    const project = projects.find(p => p.id === projectId);
    
    if (project) {
        // Preencher o formulário com os dados do projeto
        document.getElementById('projectId').value = project.id;
        document.getElementById('projectName').value = project.title;
        document.getElementById('projectLocation').value = project.location;
        document.getElementById('projectStatus').value = project.status;
        document.getElementById('projectDuration').value = project.duration || '';
        document.getElementById('projectDescription').value = project.description;
        document.getElementById('projectImage').value = project.image;
        document.getElementById('projectPartners').value = project.partners || '';
        
        // Marcar as categorias
        document.querySelectorAll('.checkbox-group input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = project.categories.includes(checkbox.value);
        });
        
        // Alterar o título e texto do botão do formulário
        formTitle.textContent = 'Editar Projeto';
        submitBtn.textContent = 'Atualizar Projeto';
        
        // Exibir o formulário
        projectForm.classList.add('active');
        addProjectBtn.style.display = 'none';
        
        // Rolar até o formulário
        projectForm.scrollIntoView({ behavior: 'smooth' });
    }
}

// Excluir projeto
function deleteProject(projectId) {
    projects = projects.filter(p => p.id !== projectId);
    saveProjects();
    renderProjects();
}

// Inicializar a página
renderProjects();