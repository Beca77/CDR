<!-- faleconosco.php -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Fale Conosco - CDR Sul do Tocantins</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #111; /* fundo preto */
      margin: 0;
      padding: 0;
      color: #00ff6a; /* verde neon */
    }

    /* ====== HEADER ====== */
    header {
      display: flex;
      align-items: center;
      padding: 15px 20px;
      background: #111;
      border-bottom: 1px solid #00ff6a;
    }

    header .menu {
      font-size: 28px;
      margin-right: 15px;
      cursor: pointer;
      color: #00ff6a;
    }

    header .logo {
      display: flex;
      align-items: center;
    }

    header .logo svg {
      width: 40px;
      height: 40px;
      margin-right: 10px;
      fill: #00ff6a;
    }

    header h1 {
      font-size: 22px;
      margin: 0;
      color: #00ff6a;
    }

    header p {
      margin: 0;
      font-size: 14px;
      color: #00ff6a;
    }

    /* ====== SIDEBAR ====== */
    .sidebar {
      position: fixed;
      top: 0;
      left: -250px;
      width: 250px;
      height: 100%;
      background: #1a1a1a;
      box-shadow: 2px 0 5px rgba(0, 255, 100, 0.2);
      transition: left 0.3s ease;
      padding: 20px;
      z-index: 1000;
    }

    .sidebar.active {
      left: 0;
    }

    .sidebar h2 {
      color: #00ff6a;
      margin-top: 0;
    }

    .sidebar a {
      display: block;
      color: #00ff6a;
      text-decoration: none;
      padding: 10px 0;
      border-bottom: 1px solid #333;
      transition: 0.2s;
    }

    .sidebar a:hover {
      color: #00cc55;
    }

    .close-btn {
      font-size: 25px;
      color: #00ff6a;
      cursor: pointer;
      text-align: right;
    }

    /* ====== CONTEÚDO ====== */
    .container {
      display: flex;
      justify-content: space-between;
      padding: 40px;
      max-width: 1000px;
      margin: auto;
    }

    .card {
      background: #1a1a1a;
      padding: 25px;
      border-radius: 10px;
      flex: 1;
      margin: 10px;
      box-shadow: 0 0 10px rgba(0,255,100,0.2);
    }

    .card h2 {
      margin-top: 0;
      color: #00ff6a;
    }

    .card p, .card a {
      font-size: 15px;
      line-height: 1.6;
      color: #00ff6a;
      text-decoration: none;
    }

    form input, form textarea {
      width: 100%;
      padding: 10px;
      margin-bottom: 15px;
      background: transparent;
      border: 1px solid #00ff6a;
      border-radius: 5px;
      color: #00ff6a;
      font-size: 14px;
    }

    form textarea {
      resize: none;
      height: 100px;
    }

    form button {
      width: 100%;
      padding: 12px;
      background: #00ff6a;
      color: #111;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: 0.3s;
    }

    form button:hover {
      background: #00cc55;
    }
  </style>
</head>
<body>
  <!-- ====== MENU LATERAL ====== -->
  <div class="sidebar" id="sidebar">
    <div class="close-btn" onclick="toggleMenu()">×</div>
    <h2>Menu</h2>
    <a href="#">Início</a>
    <a href="#">Sobre</a>
    <a href="#">Projetos</a>
    <a href="#">Contato</a>
  </div>

  <!-- ====== CABEÇALHO ====== -->
  <header>
    <div class="menu" onclick="toggleMenu()">☰</div>
    <div class="logo">
      <!-- Ícone SVG -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 
                 12c-2.48 0-4.5-2.02-4.5-4.5S9.52 7.5 12 7.5s4.5 2.02 4.5 4.5-2.02 4.5-4.5 4.5zm0-7.2c-1.49 
                 0-2.7 1.21-2.7 2.7s1.21 2.7 2.7 2.7 2.7-1.21 2.7-2.7-1.21-2.7-2.7-2.7z"/>
      </svg>
      <div>
        <h1>Fale Conosco</h1>
        <p>CDR Sul do Tocantins</p>
      </div>
    </div>
  </header>

  <!-- ====== CONTEÚDO PRINCIPAL ====== -->
  <div class="container">
    <!-- Informações de contato -->
    <div class="card">
      <h2>Informações de Contato</h2>
      <p><strong>Endereço:</strong><br>
      Alameda Madrid, 545 - Jardim Sevilha, Gurupi - TO</p>
      <p><strong>CEP:</strong> 773410-470</p>
      <p><strong>E-mail:</strong> edrsultocantins@uning.edu.or</p>
      <p>Preencha o formulário ao lado e entraremos em contato em breve.</p>
    </div>

    <!-- Formulário -->
    <div class="card">
      <h2>Envie sua mensagem</h2>
      <form action="enviar.php" method="post">
        <input type="text" name="nome" placeholder="Nome" required>
        <input type="email" name="email" placeholder="E-mail" required>
        <input type="text" name="telefone" placeholder="Telefone">
        <textarea name="mensagem" placeholder="Digite sua mensagem..." required></textarea>
        <button type="submit">Enviar</button>
      </form>
    </div>
  </div>

  <script>
    function toggleMenu() {
      document.getElementById("sidebar").classList.toggle("active");
    }
  </script>
</body>
</html>













