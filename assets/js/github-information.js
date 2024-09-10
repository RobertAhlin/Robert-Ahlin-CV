function userInformationHTML(user) {
    return `
        <h2>${user.name}
            <span class="small-name">
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
            </span>
        </h2>
        <div class="gh-content">
            <div class="gh-avatar">
                <a href="${user.html_url}" target="_blank">
                    <img src="${user.avatar_url}" width="40" height="40" alt="${user.login}" />
                </a>Repos: ${user.public_repos} | Followers: ${user.followers} - Following ${user.following}
            </div>
        </div>`;
}

function repoInformationHTML(repos) {
    if (repos.length === 0) {
        return `<div class="clearfix repo-list">No repos!</div>`;
    }

    // Generate the grid structure for repos
    var repoGridHtml = repos.map(function (repo) {
        return `<div class="repo-grid-item">
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </div>`;
    });

    return repoGridHtml.join("");  // Join the array into a string of HTML
}

function fetchGitHubInformation() {
    const username = document.getElementById("gh-username").value; // Get the GitHub username
    const userUrl = `https://api.github.com/users/${username}`; // GitHub user API endpoint
    const repoUrl = `https://api.github.com/users/${username}/repos`; // GitHub repos API endpoint

    // Fetch user information from GitHub API
    fetch(userUrl)
        .then(response => response.json())
        .then(data => {
            // Render user information
            const userDataHtml = `
                <h2>${data.name} (@<a href="${data.html_url}" target="_blank">${data.login}</a>)</h2>
                <p>Repos: ${data.public_repos} | Followers: ${data.followers} | Following: ${data.following}</p>
            `;
            document.getElementById("gh-user-data").innerHTML = userDataHtml;
        });

    // Fetch repository information from GitHub API
    fetch(repoUrl)
        .then(response => response.json())
        .then(data => {
            // Use repoInformationHTML to generate grid layout
            const repoHtml = repoInformationHTML(data);
            document.getElementById("gh-repo-data").innerHTML = repoHtml;
        })
        .catch(error => {
            console.error('Error fetching repositories:', error);
            document.getElementById("gh-repo-data").innerHTML = "<p>Failed to load repositories. Please try again later.</p>";
        });
}

$(document).ready(fetchGitHubInformation);
