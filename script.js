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
  const studyCountrySelect = enquiryForm.querySelector('#study-country');
  const otherCountryField = enquiryForm.querySelector('#other-country-field');
  const otherCountryInput = enquiryForm.querySelector('#other-country');
  const status = enquiryForm.querySelector('#form-status');

  const updateOtherCountry = () => {
    const showOther = studyCountrySelect.value === 'Another country';
    otherCountryField.classList.toggle('visible', showOther);
    otherCountryInput.required = showOther;
  };
  studyCountrySelect.addEventListener('change', updateOtherCountry);
  updateOtherCountry();

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

  enquiryForm.addEventListener('submit', async (event) => {
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

    const submitButton = enquiryForm.querySelector('[type="submit"]');
    submitButton.disabled = true;
    if (submitButton.firstChild) submitButton.firstChild.textContent = 'Sending… ';
    status.textContent = 'Sending your enquiry…';

    const values = new FormData(enquiryForm);
    const studyCountry = values.get('studyCountry') === 'Another country'
      ? values.get('otherCountry')
      : values.get('studyCountry');

    const payload = {
      access_key: 'f90140af-459c-4748-9ce8-495b734ea831',
      subject: 'EduBridge Africa — New Student Enquiry',
      name: values.get('name'),
      email: values.get('email'),
      phone: values.get('phone') || 'Not provided',
      current_country: values.get('country') || 'Not provided',
      study_level: values.get('studyLevel') || 'Not specified',
      services_interested: selectedServices.map((cb) => cb.value).join(', '),
      study_country: studyCountry,
      message: values.get('message'),
    };

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        status.textContent = '✅ Thank you! Your enquiry has been sent. Our team will be in touch soon.';
        status.classList.add('form-status-success');
        enquiryForm.reset();
        updateOtherCountry();
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch {
      status.textContent = 'Something went wrong — please email us directly at hareg9518@gmail.com';
      status.classList.add('form-status-error');
    } finally {
      submitButton.disabled = false;
      if (submitButton.firstChild) submitButton.firstChild.textContent = 'Send enquiry ';
    }
  });
}
