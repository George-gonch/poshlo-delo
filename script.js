const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelectorAll('.nav a');
const year = document.querySelector('#year');
const toTopButton = document.querySelector('.to-top');
const checklist = document.querySelector('.checklist');
const checklistResult = document.querySelector('.checklist-result');

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuButton && header) {
  menuButton.addEventListener('click', () => {
    header.classList.toggle('menu-active');
    document.body.classList.toggle('menu-open');
    menuButton.textContent = header.classList.contains('menu-active') ? '×' : '☰';
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (!header || !menuButton) return;
    header.classList.remove('menu-active');
    document.body.classList.remove('menu-open');
    menuButton.textContent = '☰';
  });
});

if (toTopButton) {
  toTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function updateChecklistProgress() {
  if (!checklist || !checklistResult) return;

  const inputs = [...checklist.querySelectorAll('input[type="checkbox"]')];
  const checkedCount = inputs.filter((input) => input.checked).length;
  const total = inputs.length;

  if (checkedCount === 0) {
    checklistResult.textContent = 'Отметьте пункты, чтобы понять готовность к регистрации.';
    return;
  }

  if (checkedCount < total) {
    checklistResult.textContent = `Готово ${checkedCount} из ${total}. Еще немного — и можно спокойнее переходить к регистрации.`;
    return;
  }

  checklistResult.textContent = 'Отлично: базовые вопросы закрыты. Теперь можно изучить условия регистрации и выбрать удобный способ открытия ИП.';
}

if (checklist) {
  checklist.addEventListener('change', updateChecklistProgress);
}
