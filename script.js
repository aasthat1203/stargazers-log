const repositoryList = document.querySelector("#repository-list");
const repositoryCount = document.querySelector("#repository-count");

const formatStars = (count) => `${count.toLocaleString()} stars`;

const formatDate = (date) => new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric"
}).format(new Date(date));

const createRepositoryItem = (repository) => {
  const item = document.createElement("li");
  item.className = "repository";
  item.innerHTML = `
    <h3 class="repository-title">
      <a href="${repository.html_url}" target="_blank" rel="noreferrer">${repository.full_name}</a>
    </h3>
    <p class="repository-description">${repository.description}</p>
    <p class="repository-meta">
      <span>${repository.language}</span>
      <span>${formatStars(repository.stargazers_count)}</span>
      <span>Updated ${formatDate(repository.updated_at)}</span>
    </p>
  `;
  return item;
};

const renderRepositories = (repositories) => {
  repositoryList.replaceChildren(...repositories.map(createRepositoryItem));
  repositoryCount.textContent = `${repositories.length} repositories`;
};

const showError = () => {
  repositoryList.replaceChildren();
  const message = document.createElement("li");
  message.className = "status-message";
  message.textContent = "The repository list could not be loaded right now.";
  repositoryList.append(message);
};

fetch("events.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    return response.json();
  })
  .then(renderRepositories)
  .catch(showError);