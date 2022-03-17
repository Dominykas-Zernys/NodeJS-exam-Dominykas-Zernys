const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const errorText = document.getElementById('error-text');
const successText = document.getElementById('success-text');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  errorText.textContent = '';
  const userObj = { email: emailInput.value, password: passwordInput.value };
  if (!emailInput.value || !passwordInput.value) {
    errorText.textContent = 'Some of the fields are empty!';
    return;
  }
  loginUserInfo(userObj);
});

async function loginUserInfo(userObj) {
  const res = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userObj),
  });
  const resInJson = await res.json();
  if (resInJson.success) {
    localStorage.setItem('token', resInJson.data);
    errorText.textContent = '';
    successText.textContent = 'User logged in successfully!';
    setTimeout(() => {
      location.replace('/view/groups.html');
    }, 1500);
  }
  if (!resInJson.success) {
    resInJson.data.forEach(
      (errorMessage) => (errorText.textContent += errorMessage)
    );
  }
}
