// search
const searchSection = document.getElementById('search-section');
const userInput = document.getElementById('username-input');
const searchBtn = document.getElementById('search-btn');

// user display
const userCard = document.getElementById('card');
const userAvatar = document.getElementById('user-avatar');
const userName = document.getElementById('user-name');
const userHandle = document.getElementById('user-handle');
const userDate = document.getElementById('user-date');
const userBio = document.getElementById('user-bio');

// user stats
const userRepos = document.getElementById('user-repos');
const userFollowers = document.getElementById('user-followers');
const userFollowing = document.getElementById('user-following');

// user links
const userLinks = document.querySelectorAll('.user-link');
const userLocation = document.getElementById('user-location');
const userWebsite = document.getElementById('user-website');
const userTwitter = document.getElementById('user-twitter');
const userCompany = document.getElementById('user-company');

let username = '';

userInput.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    searchBtn.click();
  }
});

searchBtn.addEventListener('click', () => {
  username = userInput.value;
  getUserData(username);
});

async function getUserData(username) {
  const response = await fetch(`https://api.github.com/users/${username}`);
  if (response.status != 200) {
    invalidInput();
  } else {
    const userData = await response.json();
    fillCard(userData);
  }
}

function fillCard(userData) {
  userCard.classList.add('show');
  searchSection.classList.remove('invalid');
  let joinDate = userData.created_at.substr(0, 9);
  userAvatar.src = userData.avatar_url;

  if (!userData.name) {
    userName.textContent = userData.login;
  } else {
    userName.textContent = userData.name;
  }

  userHandle.textContent = `@${userData.login}`;
  userHandle.href = userData.html_url;
  userDate.textContent = `Joined ${joinDate}`;

  userBio.textContent = userData.bio;

  userRepos.textContent = userData.public_repos;
  userFollowers.textContent = userData.followers;
  userFollowing.textContent = userData.following;

  userLinks.forEach((link) => {
    let linkData = link.dataset.id;
    if (userData[linkData] != null && userData[linkData] != '') {
      link.classList.remove('not-availible');
      link.textContent = userData[linkData];
    } else {
      link.textContent = 'Not Availible';
      link.classList.add('not-availible');
    }
  });
}

function invalidInput() {
  searchSection.classList.add('invalid');
}
