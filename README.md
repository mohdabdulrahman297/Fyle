# GitHub repo listing page

GitHub Repo Finder is a web application that allows users to search for a GitHub user by entering their username. It retrieves information about the user and displays their profile details along with a list of repositories. The user can navigate through the repositories with pagination.

## Getting Started

To get started, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/mohdabdulrahman297/Fyle.git

2. Open the index.html file in your preferred web browser.

➡️ Enter a GitHub username in the input field and click the "Get Repo and Profile" button.

➡️ View the user's profile details, repositories, and use the pagination buttons to navigate through the repositories.

3. Features
GitHub User Profile:

Avatar, name, bio, and location (if available).
Link to the user's GitHub profile.
Repositories:

List of repositories with their names, descriptions, and languages.

## Pagination:

Navigate through the repositories with older and newer page buttons.
Technologies Used
HTML
CSS
JavaScript

## API Usage
The application uses the GitHub API to fetch user and repository data. An access token is required for authentication.

## How to Add Your GitHub Token

Get a GitHub Personal Access Token

Copy the token.

Open the index.js file.

Replace the value of GITHUB_TOKEN with your token.

const GITHUB_TOKEN = 'your-github-token';

## Styling
The application uses a simple and clean design with basic styling. You can customize the styles by modifying the index.css file.
