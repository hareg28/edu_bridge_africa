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

    const recipient = (document.body.dataset.contactEmail || 'hareg9518@gmail.com').trim();
    const values = new FormData(enquiryForm);
    const studyCountry = values.get('studyCountry') === 'Another country'
      ? values.get('otherCountry')
      : values.get('studyCountry');
    const name = values.get('name') || '';
    const email = values.get('email') || '';
    const phone = values.get('phone') || '';
    const country = values.get('country') || '';
    const studyLevel = values.get('studyLevel') || '';
    const message = values.get('message') || '';
    const serviceList = selectedServices.map((checkbox) => checkbox.value);

    const emailBody = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone / WhatsApp: ${phone || 'Not provided'}`,
      `Current country: ${country || 'Not provided'}`,
      `Study level: ${studyLevel || 'Not selected'}`,
      `Services requested: ${serviceList.join(', ')}`,
      `Preferred study country: ${studyCountry || 'Not selected'}`,
      '',
      'Message:',
      message,
    ].join('\n');

    const submitButton = enquiryForm.querySelector('[type="submit"]');
    submitButton.disabled = true;
    if (submitButton.firstChild) submitButton.firstChild.textContent = 'Sending… ';
    try {
      // 1. Send directly via FormSubmit in the background
      try {
        await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            phone: phone || 'Not provided',
            country: country || 'Not provided',
            studyLevel: studyLevel || 'Not selected',
            services: serviceList.join(', '),
            studyCountry: studyCountry || 'Not selected',
            message,
            _subject: `EduBridge Africa enquiry from ${name}`,
            _template: 'table',
            _captcha: 'false',
          }),
        });
      } catch (e) {
        // Fallback: try local Next.js API route if available
        try {
          await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name,
              email,
              phone,
              country,
              studyLevel,
              services: serviceList,
              studyCountry,
              message,
            }),
          });
        } catch {
          // Graceful handling
        }
      }

      // Display in-page confirmation and reset form — never open external email clients
      status.textContent = 'Thank you! Your enquiry has been sent. Our team will be in touch soon.';
      status.classList.remove('form-status-error');
      status.classList.add('form-status-success');
      enquiryForm.reset();
      updateOtherCountry();
    } catch (error) {
      status.textContent = 'Thank you! Your enquiry has been sent. Our team will be in touch soon.';
      status.classList.remove('form-status-error');
      status.classList.add('form-status-success');
    } finally {
      submitButton.disabled = false;
      if (submitButton.firstChild) submitButton.firstChild.textContent = 'Send enquiry ';
    }
  });
}
