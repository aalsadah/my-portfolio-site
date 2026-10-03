(function() {
  'use strict';

  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageTextarea = document.getElementById('message');
  const nameOutput = document.getElementById('name-output');
  const emailOutput = document.getElementById('email-output');
  const messageOutput = document.getElementById('message-output');

  const fields = [
    { input: nameInput, output: nameOutput },
    { input: emailInput, output: emailOutput },
    { input: messageTextarea, output: messageOutput }
  ];

  function getErrorMessage(input) {
    const v = input.validity;
    const label = input.name || 'field';
    if (v.valueMissing) return `Please enter your ${label}.`;
    if (v.typeMismatch || v.patternMismatch) return `Invalid ${label} format.`;
    if (v.tooShort) return `Too short (min ${input.minLength} characters).`;
    if (v.tooLong) return `Too long (max ${input.maxLength} characters).`;
    if (!v.valid) return `Invalid ${label}.`;
    return '';
  }

  function updateOutputs(fieldObj) {
    const { input, output } = fieldObj;
    output.textContent = '';
    if (input.validity.valid) return;
    output.textContent = getErrorMessage(input);
  }

  function validateAll() {
    fields.forEach(f => updateOutputs(f));
  }

  function focusError() {
    for (const f of fields) {
      if (!f.input.validity.valid) {
        f.input.focus();
        return;
      }
    }
  }

  form.addEventListener('submit', function(e) {
    validateAll();
    const hasErrors = fields.some(f => !f.input.validity.valid);
    if (hasErrors) {
      e.preventDefault();
      focusError();
    }
  });

  fields.forEach(f => {
    f.input.addEventListener('input', () => updateOutputs(f));
    f.input.addEventListener('blur', () => updateOutputs(f));
  });
})();