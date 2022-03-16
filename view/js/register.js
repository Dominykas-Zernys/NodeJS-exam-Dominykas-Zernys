const registerForm = document.getElementById('register-form');
const fullName = document.getElementById('full-name-input');
const email = document.getElementById('email-input');
const password = document.getElementById('password-input');
const passwordRepeat = document.getElementById('password-repeat-input');
const errorText = document.getElementById('error-text');
const successText = document.getElementById('success-text');

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  errorText.textContent = '';
  const allFieldsFilledIn = checkForEmptyFields([
    fullName.value,
    email.value,
    password.value,
    passwordRepeat.value,
  ]);
  const passwordsMatch = checkPasswordMatch(password, passwordRepeat);
  console.log(allFieldsFilledIn);
  console.log(passwordsMatch);
  if (!allFieldsFilledIn || !passwordsMatch) {
    console.log('dabar veikia');
    return;
  }
  const newUserObj = {
    fullName: fullName.value,
    email: email.value,
    password: password.value,
  };
  registerUser(newUserObj);
});

function checkForEmptyFields(fieldArray) {
  let fieldsFilled = true;
  fieldArray.map((field) => {
    if (!field.length) {
      errorText.textContent = 'All fields must be filled in! ';
      fieldsFilled = false;
    }
  });
  return fieldsFilled;
}

function checkPasswordMatch(pass, repeatedPass) {
  let passwordsMatch = true;
  if (pass.value !== repeatedPass.value) {
    errorText.textContent += 'Passwords do not match!';
    passwordsMatch = false;
  }
  return passwordsMatch;
}

async function registerUser(userToRegister) {
  const res = await fetch('http://localhost:3000/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userToRegister),
  });
  const resInJson = await res.json();
  if (resInJson.success) {
    errorText.textContent = '';
    successText.textContent = 'User registered successfully!';
    setTimeout(() => {
      location.replace('/view/login.html');
    }, 1500);
  }
  if (!resInJson.success) {
    resInJson.data.forEach(
      (errorMessage) => (errorText.textContent += ' ' + errorMessage + '!')
    );
  }
}
