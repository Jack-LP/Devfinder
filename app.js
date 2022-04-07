async function getUserData(username) {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const userData = await response.json();

  console.log(userData);

  document.getElementById('user-name').textContent = userData.name;
  document.getElementById('user-handle').textContent = `@${userData.login}`;
}

getUserData(`jack-lp`);
