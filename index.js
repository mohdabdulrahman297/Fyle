const GITHUB_TOKEN = '';

async function getGitHubProfile() {
    const username = document.getElementById('username').value;

    if(!username){
        alert('Please enter a valid github username');
        return;
    }

    const userUrl = `https://api.github.com/users/${username}`;
    const repoUrl =  `https://api.github.com/users/${username}/repos?per_page=10&page=1`;

    const headers = {
        Authorization: `Bearer ${GITHUB_TOKEN}`
    };

    try {
        const userResponse = await fetch(userUrl, {headers});
        const userProfile = await userResponse.json();

        const repoResponse = await fetch(repoUrl, {headers});
        const repositories = await repoResponse.json();
    } catch (error) {
        
    }
}