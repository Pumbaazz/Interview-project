var burgerMenu = document.querySelector('.burger-menu');
var menu = document.querySelector('.menu');

// Toggle the menu visibility when burger menu is clicked
burgerMenu.addEventListener('click', function() {
  menu.classList.toggle('open');
});
