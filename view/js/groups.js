const groupsWrapper = document.querySelector('.groups-wrapper');
const groupForm = document.getElementById('group-form');
const idInput = document.getElementById('group-id-input');
const errorText = document.getElementById('error-text');
const successText = document.getElementById('success-text');

// Group cards functions

async function getGroupsFromDb() {
  const res = await fetch('http://localhost:3000/accounts/', {
    headers: { authorization: 'Bearer ' + localStorage.getItem('token') },
  });
  const resInJson = await res.json();
  if (!resInJson.success) {
    groupsWrapper.innerHTML = '<h1 class="red-text">Something went wrong</h1>';
    return;
  }
  return resInJson.data;
}

async function createGroupCards() {
  const groups = await getGroupsFromDb();
  groups.forEach((group) => {
    const groupCard = document.createElement('a');
    groupCard.href = '#';
    groupCard.classList.add('group-card');
    groupCard.innerHTML = `<h2 class='group-id'>ID: ${group.id}</h2>
    <p class='group-description'>${group.name}</p>`;
    groupsWrapper.append(groupCard);
  });
}

createGroupCards();

// Form functions

groupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorText.textContent = '';
  const addGroupResult = await addGroup(idInput.value);
  if (addGroupResult.success) {
    successText.textContent = 'New group added!';
    setTimeout(() => {
      location.reload();
    }, 1500);
  }
  if (!addGroupResult.success) {
    errorText.textContent = "Couldn't add new group";
  }
});

async function addGroup(groupId) {
  const res = await fetch('http://localhost:3000/accounts/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: JSON.stringify({ groupId }),
  });
  const resInJson = await res.json();
  return resInJson;
}
