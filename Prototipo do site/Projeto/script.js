// ===== MENU LATERAL =====
const menuIcon = document.getElementById("menu-icon");
const closeMenu = document.getElementById("close-menu");
const sideMenu = document.querySelector(".side-menu");

if (menuIcon && sideMenu && closeMenu) {
    menuIcon.addEventListener("click", () => sideMenu.classList.add("active"));
    closeMenu.addEventListener("click", () => sideMenu.classList.remove("active"));
}

// ===== FORMULÁRIO =====
const addProjectBtn = document.getElementById("addProjectBtn");
const projectForm = document.getElementById("projectForm");
const cancelFormBtn = document.getElementById("cancelForm");

if (addProjectBtn && projectForm) {
    addProjectBtn.addEventListener("click", () => projectForm.classList.add("active"));
}
if (cancelFormBtn && projectForm) {
    cancelFormBtn.addEventListener("click", () => projectForm.classList.remove("active"));
}

// ===== DADOS DOS PROJETOS =====
const projects = [
    {
        id: 1,
        nome: "Agricultura Inteligente",
        descricao: "Monitoramento agrícola com IoT para melhorar a produtividade.",
        imagem: "https://source.unsplash.com/600x400/?agriculture,farm",
        status: "ongoing",
        duracao: "12 meses",
        localizacao: "Gurupi - TO",
        parceiros: "IFTO, UFT",
        categorias: ["agricultura", "tecnologia"]
    },
    {
        id: 2,
        nome: "ReciclaMais",
        descricao: "Iniciativa sustentável para coleta e reaproveitamento de resíduos sólidos.",
        imagem: "https://source.unsplash.com/600x400/?recycling,environment",
        status: "completed",
        duracao: "18 meses",
        localizacao: "Palmas - TO",
        parceiros: "Prefeitura de Palmas, SEBRAE",
        categorias: ["sustentabilidade"]
    }
];

// ===== FUNÇÃO PARA RENDERIZAR PROJETOS =====
const container = document.getElementById("projectsContainer");

function renderProjects(list) {
    if (!container) return;
    container.innerHTML = "";

    list.forEach(p => {
        const card = document.createElement("div");
        card.className = "project-card";
        card.innerHTML = `
            <div class="project-img">
                <img src="${p.imagem}" alt="${p.nome}">
                <span class="project-status status-${p.status}">
                    ${p.status === "ongoing" ? "Em Andamento" :
                      p.status === "completed" ? "Concluído" : "Planejado"}
                </span>
            </div>
            <div class="project-info">
                <h3>${p.nome}</h3>
                <div class="project-location">📍 ${p.localizacao}</div>
                <p class="project-description">${p.descricao}</p>
                <div class="project-tags">
                    ${p.categorias.map(cat => `<span class="tag">${cat}</span>`).join("")}
                </div>
                <button class="project-link" data-id="${p.id}">Ver Detalhes</button>
            </div>
        `;
        container.appendChild(card);
    });

    setupModal();
}

// ===== FILTRO =====
document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const filtro = btn.dataset.filter;
        renderProjects(
            filtro === "all" ? projects : projects.filter(p => p.categorias.includes(filtro))
        );
    });
});

// ===== MODAL =====
const modal = document.getElementById("projectModal");
const closeModal = document.getElementById("closeModal");

function setupModal() {
    document.querySelectorAll(".project-link").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            const p = projects.find(pr => pr.id == id);
            abrirModal(p);
        });
    });
}

function abrirModal(p) {
    modal.style.display = "block";
    document.getElementById("modalTitle").textContent = p.nome;
    document.getElementById("modalImage").src = p.imagem;
    document.getElementById("modalDescription").textContent = p.descricao;
    document.getElementById("modalStatus").textContent =
        p.status === "ongoing" ? "Em Andamento" :
        p.status === "completed" ? "Concluído" : "Planejado";
    document.getElementById("modalLocation").textContent = p.localizacao;
    document.getElementById("modalDuration").textContent = p.duracao;
    document.getElementById("modalPartners").textContent = p.parceiros;
    document.getElementById("modalTags").innerHTML =
        p.categorias.map(cat => `<span class="tag">${cat}</span>`).join("");
}

if (closeModal) {
    closeModal.addEventListener("click", () => modal.style.display = "none");
}
window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
});

// ===== INÍCIO =====
document.addEventListener("DOMContentLoaded", () => renderProjects(projects));
