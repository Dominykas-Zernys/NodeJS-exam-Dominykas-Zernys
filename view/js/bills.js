const groupIdQuery = window.location.search;
const groupId = groupIdQuery.split('=')[1];
const billsTable = document.querySelector('.bills-table');
const billForm = document.getElementById('bill-form');
const amountInput = document.getElementById('amount-input');
const descriptionInput = document.getElementById('description-input');
const errorText = document.getElementById('error-text');
const successText = document.getElementById('success-text');

// creating bills table

async function getBills() {
  const res = await fetch('http://localhost:3000/bills/' + groupId);
  const resInJson = await res.json();
  return resInJson;
}

async function createTableData() {
  const bills = await getBills();
  if (!bills.success) {
    return;
  }
  bills.data.forEach((bill) => {
    const createTableRow = document.createElement('tr');
    createTableRow.innerHTML = `
        <td>${bill.id}</td>
        <td>${bill.description}</td>
        <td>$${bill.amount}</td>`;
    billsTable.append(createTableRow);
  });
}

createTableData();

// new bill form

billForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const postResult = await createNewBill(
    amountInput.value,
    descriptionInput.value
  );
  if (!postResult.success) {
    errorText.innerHTML = `couldn't create new bill`;
    return;
  }
  errorText.innerHTML = ``;
  successText.innerHTML = 'new bill added!';
  setTimeout(() => {
    location.reload();
  }, 1500);
});

async function createNewBill(amount, description) {
  if (!amount || !description) {
    return false;
  }
  const res = await fetch('http://localhost:3000/bills/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ groupId: groupId, amount, description }),
  });
  const resInJson = await res.json();
  return resInJson;
}
