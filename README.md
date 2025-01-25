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

## License

[MIT License](LICENSE)

---

## Support

For questions or support, please contact [Brandon Kitt](mailto:brandon.kitt@hotmail.com).
