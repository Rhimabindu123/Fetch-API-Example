const userContainer = document.getElementById('user-container');
const reloadBtn = document.getElementById('reload-btn');

async function fetchUsers() {
  userContainer.innerHTML = 'Loading users...';
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    
    // Handle HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const users = await response.json();
    displayUsers(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    userContainer.innerHTML = `
      <p style="color:red;">Failed to fetch user data. Please check your connection.</p>
    `;
  }
}

function displayUsers(users) {
  userContainer.innerHTML = ''; // Clear old content
  users.forEach(user => {
    const userCard = document.createElement('div');
    userCard.classList.add('user-card');
    userCard.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
    `;
    userContainer.appendChild(userCard);
  });
}

// Event listener for reload button
reloadBtn.addEventListener('click', fetchUsers);

// Initial fetch
fetchUsers();
