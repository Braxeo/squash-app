# Squash App

Squash App is a modern application built using Expo, designed to enhance your squash game experience. This project follows best practices, including automated testing, linting, and enforced Conventional Commits to ensure a consistent development workflow.

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:
- Node.js (recommended version: 18.x)
- Yarn (package manager)
- Expo CLI

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/Braxeo/squash-app.git
   cd squash-app
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Set up Husky hooks:
   Husky is automatically installed via the prepare script in `package.json`. If it's not, run:
   ```bash
   npx husky install
   ```

4. Start the app:
   - Android:
     ```bash
     yarn android
     ```
   - iOS (macOS only):
     ```bash
     yarn ios
     ```
   - Web:
     ```bash
     yarn web
     ```

---

## Development

### Scripts

Here are the primary scripts defined in `package.json`:

- Reset Project:
  ```bash
  yarn reset-project
  ```
  Runs a custom script to reset the project state.

- Run Tests:
  ```bash
  yarn test
  ```
  Runs all Jest tests once (not in watch mode).

- Run Linting:
  ```bash
  yarn lint
  ```
  Checks the project codebase for linting issues.

- Run in Watch Mode:
  ```bash
  yarn test --watch
  ```
  Runs Jest in interactive watch mode.

---

### Commit Guidelines

We follow the **Conventional Commits** standard. All commits must adhere to the following format:

```
<type>(scope?): <short description>
```

- **Type**: The kind of change (e.g., `feat`, `fix`, `docs`, `chore`).
- **Scope** (optional): The part of the app affected (e.g., `ui`, `api`).
- **Description**: A concise summary of the change.

Examples:
- `feat(ui): add login button`
- `fix(api): resolve timeout issue`

**Tip**: Use `yarn commit` (if Commitizen is installed) to generate commit messages interactively.

---

### Automated Tools

1. **Husky**:
   - Enforces pre-commit and commit-msg hooks.
   - Automatically runs linting and tests before commits.

2. **Commitlint**:
   - Validates commit messages to ensure they follow Conventional Commits.

3. **Jest**:
   - For unit testing and snapshot testing.

4. **ESLint**:
   - Enforces consistent code style.

---

## Project Structure

Here’s an overview of the key project directories:

```
squash-app/
├── components/         # React components
├── screens/            # App screens
├── assets/             # Images, fonts, etc.
├── __tests__/          # Test files
├── .husky/             # Husky Git hooks
├── package.json        # Project dependencies and scripts
├── yarn.lock           # Yarn lockfile for dependency management
└── README.md           # Project documentation
```

---

## Contribution Guidelines

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feat/new-feature
   ```
3. Commit changes (ensure tests and linting pass):
   ```bash
   yarn commit
   ```
4. Push to the branch:
   ```bash
   git push origin feat/new-feature
   ```
5. Open a Pull Request.

---

## Branching Strategy and CI/CD Workflow

### Branching Strategy

All branches must follow the naming convention:
<type>/<short-description>

- **Type**: Indicates the purpose of the branch. Common types include:
  - feat: For new features
  - fix: For bug fixes
  - chore: For maintenance tasks
  - refactor: For code refactoring
  - docs: For documentation updates
  - test: For adding or updating tests

**Examples**:
- feat/add-login-page
- fix/header-layout-issue
- docs/update-readme

---

### Automatic Pull Request Creation

- **How It Works**:
  - When you push a new branch matching the naming convention (e.g., feat/add-login-page), an auto PR workflow automatically creates a pull request targeting the main branch.
  - The pull request includes:
    - The branch name in the title (e.g., Auto-created PR for branch feat/add-login-page).
    - A default body describing the branch and linking back to the branch name.

- **PR Workflow**:
  1. Create and push a branch:
     ```
     git checkout -b feat/new-feature
     git push origin feat/new-feature
     ```
  2. A pull request will be created automatically.
  3. The console logs the link to the PR for easy access.

---

### Build-Test-Lint Pipeline

- **Automated Testing and Linting**:
  - A GitHub Actions workflow runs automatically on every pull request.
  - The pipeline performs the following checks:
    1. Build: Ensures the code compiles without errors.
    2. Test: Runs all unit and integration tests.
    3. Lint: Checks code quality and adherence to style guides.

- **How It Works**:
  - The workflow is triggered when:
    - A new branch is pushed (for auto PR creation).
    - A pull request is opened or updated.
  - The workflow validates the code changes before the PR can be merged.

- **Failing Pipeline**:
  - If any step (build, test, lint) fails, the workflow prevents the PR from being merged.
  - Contributors must fix the issues and push updates to the branch.

- **Branch Protection**:
  - The main branch is protected, requiring all PRs to:
    - Pass the CI pipeline.
    - Be reviewed and approved before merging.

---

### Example Workflow

1. Create a Branch:
   git checkout -b feat/add-user-authentication

2. Push the Branch:
   git push origin feat/add-user-authentication

3. Open the Automatically Created Pull Request:
   The workflow will log the PR URL in the console for quick access.

4. Ensure All Checks Pass:
   Wait for the CI pipeline to validate the changes (build, test, and lint).

5. Merge the PR:
   Once all checks pass and the PR is approved, merge it into the main branch.
   
---

## License

[MIT License](LICENSE)

---

## Support

For questions or support, please contact [Brandon Kitt](mailto:brandon.kitt@hotmail.com).
