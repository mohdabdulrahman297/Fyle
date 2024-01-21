const GITHUB_TOKEN = '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';

async function getGitHubProfile() {
    const username = document.getElementById('username').value;

    if (!username) {
        alert('Please enter a GitHub username');
        return;
    }

    const userUrl = `https://api.github.com/users/${username}`;
    const repoUrl = `https://api.github.com/users/${username}/repos?per_page=10&page=1`;
    const headers = {
        Authorization: `Bearer ${GITHUB_TOKEN}`
    };

    try {
        const userResponse = await fetch(userUrl, { headers });
        const userProfile = await userResponse.json();

        const repoResponse = await fetch(repoUrl, { headers });
        const repositories = await repoResponse.json();

        displayProfile(userProfile);
        displayRepositories(repositories);
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        alert('Error fetching GitHub data. Please try again.');
    }
}

function displayProfile(userProfile) {
    const profileContainer = document.getElementById('profile-container');
    profileContainer.innerHTML = '';

    // Create image element for avatar
    const avatarImg = document.createElement('img');
    avatarImg.src = userProfile.avatar_url;
    avatarImg.alt = 'Avatar';
    avatarImg.classList.add('avatar');
    profileContainer.appendChild(avatarImg);

    // Create div for user information
    const userInfoDiv = document.createElement('div');
    userInfoDiv.classList.add('user-info');

    // Create anchor element for GitHub profile link
    const profileLink = document.createElement('a');
    profileLink.href = userProfile.html_url;
    profileLink.target = '_blank';
    profileLink.innerText = `${userProfile.url}`;
    userInfoDiv.appendChild(profileLink);

    // Display user details
    const nameParagraph = document.createElement('p');
    nameParagraph.innerText = `Name: ${userProfile.name || 'Not available'}`;
    userInfoDiv.appendChild(nameParagraph);

    const bioParagraph = document.createElement('p');
    bioParagraph.innerText = `Bio: ${userProfile.bio || 'Not available'}`;
    userInfoDiv.appendChild(bioParagraph);

    const locationParagraph = document.createElement('p');
    locationParagraph.innerText = `Location: ${userProfile.location || 'Not available'}`;
    userInfoDiv.appendChild(locationParagraph);

    // Add other links from the profile as needed

    profileContainer.appendChild(userInfoDiv);
}

function displayRepositories(repositories) {
    const repositoriesList = document.getElementById('repositories-list');
    repositoriesList.innerHTML = '';

    repositories.forEach(repository => {
        const repoDiv = document.createElement('div');
        repoDiv.classList.add('repository');
        repoDiv.innerHTML = `<strong>${repository.name}</strong><br><${repository.description || 'No description available'}<br><span>${repository.language}</span>`;
        repositoriesList.appendChild(repoDiv);
    });
}
