const GITHUB_TOKEN = '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';

let currentPage = 1;
const repositoriesPerPage = 10;

async function getGitHubProfile() {
    const username = document.getElementById('username').value;

    if (!username) {
        alert('Please enter a GitHub username');
        return;
    }

    const userUrl = `https://api.github.com/users/${username}`;
    const repoUrl = `https://api.github.com/users/${username}/repos?per_page=${repositoriesPerPage}&page=${currentPage}`;
    const headers = {
        Authorization: `Bearer ${GITHUB_TOKEN}`
    };

    const startIndex = (currentPage - 1) * repositoriesPerPage;

    //loading

    const loadingSpinner = document.getElementById('loading-spinner');
    loadingSpinner.style.display = 'block';

    try {
        const userResponse = await fetch(userUrl, { headers });
        const userProfile = await userResponse.json();

        const repoResponse = await fetch(repoUrl, { headers });
        const repositories = await repoResponse.json();

        displayProfile(userProfile);
        displayRepositories(repositories);
        showPagination();
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        alert('Error fetching GitHub data. Please try again.');
    } finally {
        loadingSpinner.style.display = 'none';
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

    //pagination

    const currentPageElement = document.getElementById('currentPage');
    currentPageElement.innerText = `Page ${currentPage}`;
}

function olderPage() {
    if (currentPage > 1){
        currentPage--;
        getGitHubProfile();
    }
}

function newerPage() {
    currentPage++;
    getGitHubProfile();
}

function showPagination() {
    const paginationElement = document.getElementById('pagination');
    paginationElement.style.display = 'block';
}

