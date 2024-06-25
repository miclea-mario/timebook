const axios = require('axios');
const { parseISO, subWeeks, isAfter } = require('date-fns');
const { runScript } = require('express-goodies/functions');

const recentPrs = async () => {
  const orgName = process.env.GITHUB_ORG_NAME;
  const token = process.env.GITHUB_TOKEN;

  try {
    const groupedPRs = new Map();
    const twoWeeksAgo = subWeeks(new Date(), 2);

    // Get organization's repositories
    const url = `https://api.github.com/orgs/${orgName}/repos?per_page=100&sort=updated`;
    const reposResponse = await axios.get(url, {
      headers: { Authorization: `token ${token}` },
    });
    console.log(`Found ${reposResponse.data.length} repositories`);
    // List all repositories
    reposResponse.data.forEach((repo) => console.log(`  ${repo.name}`));

    for (const repo of reposResponse.data) {
      // For each repository, get the pull requests
      const url = `https://api.github.com/repos/${orgName}/${repo.name}/pulls?state=all&sort=created&direction=desc`;
      const pullsResponse = await axios.get(url, {
        headers: { Authorization: `token ${token}` },
      });

      for (const pull of pullsResponse.data) {
        const createdAt = parseISO(pull.created_at);

        if (isAfter(createdAt, twoWeeksAgo)) {
          const developer = pull.user.login;
          if (!groupedPRs.has(developer)) {
            groupedPRs.set(developer, []);
          }
          groupedPRs.get(developer).push({
            repo: repo.name,
            title: pull.title,
            url: pull.html_url,
          });
        }
      }
    }

    // Display pull requests grouped by developer
    groupedPRs.forEach((prs, developer) => {
      console.log(`\nDeveloper: ${developer}`);
      prs.forEach((pr) => {
        console.log(`  Repo: ${pr.repo}, PR: ${pr.title}, URL: ${pr.url}`);
      });
    });
  } catch (error) {
    console.error('Error fetching pull requests:', error.message);
  }
};

/**
 * Run script using the command
 * node ./scripts/filename.js
 */
runScript(recentPrs);
