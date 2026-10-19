const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-links');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    navigation.classList.toggle('open', !isOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => {
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    const linkPage = new URL(link.href).pathname.split('/').pop();
    if (linkPage === currentPage) link.setAttribute('aria-current', 'page');

    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      navigation.classList.remove('open');
    });
  });
}

document.body.id ||= 'top';
document.querySelectorAll('#year, [data-year]').forEach((year) => {
  year.textContent = new Date().getFullYear();
});

const themeToggle = document.querySelector('#theme-toggle');
let savedTheme;
try {
  savedTheme = localStorage.getItem('edubridge-theme');
} catch {
  savedTheme = null;
}
const initialTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.documentElement.dataset.theme = initialTheme;

if (themeToggle) {
  const updateThemeButton = (theme) => {
    themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
    themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    themeToggle.querySelector('.theme-icon').textContent = theme === 'dark' ? '☀' : '◐';
    themeToggle.querySelector('span:last-child').textContent = `${theme === 'dark' ? 'Light' : 'Dark'} theme`;
  };

  updateThemeButton(initialTheme);
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    try {
      localStorage.setItem('edubridge-theme', nextTheme);
    } catch {
      // Keep the current page usable when browser storage is unavailable.
    }
    updateThemeButton(nextTheme);
  });
}

const enquiryForm = document.querySelector('#enquiry-form');
if (enquiryForm) {
  const universitySelect = enquiryForm.querySelector('#university');
  const otherUniversityField = enquiryForm.querySelector('#other-university-field');
  const otherUniversityInput = enquiryForm.querySelector('#other-university');
  const status = enquiryForm.querySelector('#form-status');

  const updateOtherUniversity = () => {
    const showOther = universitySelect.value === 'Another university';
    otherUniversityField.classList.toggle('visible', showOther);
    otherUniversityInput.required = showOther;
  };
  universitySelect.addEventListener('change', updateOtherUniversity);
  updateOtherUniversity();

  const requestedService = new URLSearchParams(location.search).get('service');
  if (requestedService) {
    const normalizedRequest = requestedService.toLowerCase();
    enquiryForm.querySelectorAll('[name="service"]').forEach((checkbox) => {
      if (checkbox.value.toLowerCase() === normalizedRequest) checkbox.checked = true;
    });
    const studyLevel = enquiryForm.querySelector('[name="studyLevel"]');
    const matchingLevel = [...studyLevel.options].find((option) => option.value.toLowerCase() === normalizedRequest);
    if (matchingLevel) studyLevel.value = matchingLevel.value;
  }

  enquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    status.classList.remove('form-status-error', 'form-status-success');

    if (!enquiryForm.reportValidity()) return;
    const selectedServices = [...enquiryForm.querySelectorAll('[name="service"]:checked')];
    if (selectedServices.length === 0) {
      status.textContent = 'Please choose at least one service so we know how to help.';
      status.classList.add('form-status-error');
      enquiryForm.querySelector('[name="service"]').focus();
      return;
    }

    const recipient = (document.body.dataset.contactEmail || '').trim();
    if (!recipient || recipient.includes('[Your Contact Email]')) {
      status.textContent = 'Your message is ready, but EduBridge’s contact email has not been added yet, so it was not sent.';
      status.classList.add('form-status-error');
      return;
    }

    const values = new FormData(enquiryForm);
    const university = values.get('university') === 'Another university'
      ? values.get('otherUniversity')
      : values.get('university');
    const body = [
      `Name: ${values.get('name')}`,
      `Email: ${values.get('email')}`,
      `Phone / WhatsApp: ${values.get('phone') || 'Not provided'}`,
      `Current country: ${values.get('country') || 'Not provided'}`,
      `Study level: ${values.get('studyLevel') || 'Not selected'}`,
      `Services requested: ${selectedServices.map((checkbox) => checkbox.value).join(', ')}`,
      `University: ${university}`,
      '',
      'Message:',
      values.get('message'),
    ].join('\n');
    const subject = encodeURIComponent('EduBridge Africa study enquiry');
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${encodeURIComponent(body)}`;
    status.textContent = 'Your email app should open with your enquiry ready to send.';
    status.classList.add('form-status-success');
  });
}
