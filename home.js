// Alterna entre modo claro e escuro
document.getElementById('theme-toggle').addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  const icon = document.getElementById('theme-icon');
  if (document.body.classList.contains('dark-mode')) {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  } else {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }
});

// Mostra ou esconde a sidebar
document.getElementById('menu-icon').addEventListener('click', function() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('active');
});
