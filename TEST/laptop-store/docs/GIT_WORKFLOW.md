# Git Workflow & Collaboration Guide

Hướng dẫn sử dụng Git cho team development.

## Setup Ban Đầu

### 1. Initialize Repository
```bash
cd e:\TEST\laptop-store
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### 2. Tạo Remote Repository

**Trên GitHub:**
1. Vào https://github.com/new
2. Repository name: `laptop-store`
3. Description: "Laptop Store - Full-stack Web Application"
4. Public/Private: Public (để học tập)
5. Add .gitignore: Node
6. Add license: MIT

**Connect Local Repository:**
```bash
git remote add origin https://github.com/YOUR_USERNAME/laptop-store.git
git branch -M main
git push -u origin main
```

## Branching Strategy

### Git Flow Model

```
main (production)
  ↑
  ├─ release/* (releases)
  └─ develop
      ↑
      ├─ feature/* (new features)
      ├─ bugfix/* (bug fixes)
      ├─ hotfix/* (urgent fixes)
      └─ docs/* (documentation)
```

### Branch Naming Conventions

| Type | Format | Example |
|------|--------|---------|
| Feature | `feature/description` | `feature/payment-integration` |
| Bug Fix | `bugfix/description` | `bugfix/cart-calculation` |
| Hotfix | `hotfix/description` | `hotfix/critical-security` |
| Documentation | `docs/description` | `docs/api-guide` |
| Release | `release/version` | `release/v1.0.0` |

## Daily Workflow

### 1. Tạo Feature Branch

```bash
# Update develop branch
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/admin-dashboard
```

### 2. Làm việc trên Feature

```bash
# Make changes
# ... edit files ...

# Check status
git status

# Stage changes
git add src/pages/AdminDashboard.js

# Or stage all changes
git add .

# Commit
git commit -m "feat: add admin dashboard with stats"

# Push to remote
git push origin feature/admin-dashboard
```

### 3. Commit Message Format

**Format:**
```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat`: Thêm feature mới
- `fix`: Sửa bug
- `docs`: Documentation
- `style`: Code style (không logic)
- `refactor`: Refactor code
- `perf`: Performance improvement
- `test`: Thêm test
- `chore`: Build, dependencies

**Examples:**
```bash
# Feature
git commit -m "feat: add product reviews

- Implement review model with ratings
- Create review API endpoints
- Add review UI component"

# Bug fix
git commit -m "fix: correct cart total calculation

Fixes #123"

# Documentation
git commit -m "docs: update API guide

Add new payment endpoints documentation"
```

### 4. Create Pull Request

**Trên GitHub:**
1. Vào repository
2. Click "Pull requests"
3. Click "New pull request"
4. Base: `develop`, Compare: `feature/admin-dashboard`
5. Fill description
6. Request reviewers
7. Click "Create pull request"

**PR Template:**
```markdown
## Description
Brief description of changes

## Type of change
- [ ] New feature
- [ ] Bug fix
- [ ] Breaking change
- [ ] Documentation

## How has this been tested?
- [ ] Frontend test
- [ ] API test
- [ ] Manual testing

## Screenshots (if applicable)
[Add screenshots]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex areas
- [ ] Documentation updated
- [ ] No new warnings generated
```

### 5. Code Review Process

**Reviewer checks:**
- [ ] Code quality
- [ ] Test coverage
- [ ] Documentation
- [ ] Performance impact
- [ ] Security issues

**Comment styles:**
```
✅ Good - Positive feedback
❌ Issue - Must fix
⚠️ Warning - Should consider
💡 Suggestion - Optional improvement
❓ Question - Need clarification
```

### 6. Merge to Develop

```bash
# Pull request approved, merge via GitHub
# Or merge locally:

git checkout develop
git pull origin develop
git merge feature/admin-dashboard
git push origin develop

# Delete feature branch
git branch -d feature/admin-dashboard
git push origin --delete feature/admin-dashboard
```

## Conflict Resolution

### Nếu xảy ra conflict

```bash
# Pull latest changes
git pull origin develop

# Resolve conflicts in editor
# Markers:
# <<<<<<< HEAD (your changes)
# =======
# >>>>>>> branch-name (their changes)

# After resolving
git add .
git commit -m "merge: resolve conflicts from develop"
git push origin feature/admin-dashboard
```

## Releases

### Versioning: Semantic Versioning

Format: `MAJOR.MINOR.PATCH`
- `MAJOR`: Breaking changes
- `MINOR`: New features (backward compatible)
- `PATCH`: Bug fixes

### Release Process

```bash
# 1. Create release branch
git checkout -b release/v1.0.0
git checkout develop

# 2. Bump version numbers
# Update package.json version
# Update docs/VERSION.md

# 3. Commit
git commit -m "chore: bump version to 1.0.0"

# 4. Merge to main
git checkout main
git merge release/v1.0.0
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin main --tags

# 5. Merge back to develop
git checkout develop
git merge release/v1.0.0
git push origin develop

# 6. Delete release branch
git branch -d release/v1.0.0
git push origin --delete release/v1.0.0
```

## Useful Commands

### View History

```bash
# See commit history
git log --oneline

# See commits by author
git log --author="Your Name"

# See commits for specific file
git log -- src/components/Header.js

# Graph view
git log --graph --oneline --all
```

### Stashing Work

```bash
# Save uncommitted changes
git stash

# List stashes
git stash list

# Apply stash
git stash apply stash@{0}

# Delete stash
git stash drop stash@{0}
```

### Undoing Changes

```bash
# Undo last commit (keep changes)
git reset HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Revert commit (create new commit)
git revert COMMIT_HASH

# Discard local changes
git checkout -- filename
```

### Synchronizing

```bash
# Fetch updates
git fetch origin

# Pull updates
git pull origin main

# Push changes
git push origin feature-branch

# Sync fork with upstream
git remote add upstream ORIGINAL_REPO_URL
git fetch upstream
git rebase upstream/main
git push -f origin main
```

## Team Collaboration Rules

### 1. Code Standards

```javascript
// ✅ Good
const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

// ❌ Bad
function calc(i) {
  let t = 0;
  for (let x = 0; x < i.length; x++) {
    t += i[x].price;
  }
  return t;
}
```

### 2. Before Pushing

```bash
# 1. Update from remote
git pull origin develop

# 2. Format code
npx prettier --write .

# 3. Lint code
npm run lint

# 4. Run tests
npm test

# 5. Check build
npm run build

# 6. Push only after all pass
git push origin feature-branch
```

### 3. Commit Frequency

- Commit thường xuyên (mỗi feature nhỏ)
- Không để quá lâu mới push
- Mỗi commit là một logical unit

### 4. Push Discipline

```bash
# Before pushing, verify:
# - Code compiles/builds
# - Tests pass
# - Linter passes
# - No console errors

# Never force push to main or develop
# ❌ git push -f origin develop
# ✅ git push origin feature-branch
```

## GitHub Actions (CI/CD)

### Setup Automatic Testing

**File: `.github/workflows/test.yml`**
```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Run lint
        run: npm run lint
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
```

## Issue Tracking

### Creating Issues

**Issue Template:**
```markdown
## Description
Clear description of issue

## Steps to Reproduce
1. Click...
2. Verify...

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
[If applicable]

## Environment
- OS: Windows 10
- Browser: Chrome
- Node: v18.0.0
```

### Linking PRs to Issues

```bash
# In PR description
Fixes #123
Closes #124
```

## Merging Strategies

### 1. Squash & Merge (Recommended for Features)

```bash
git merge --squash feature/admin-dashboard
git commit -m "feat: add admin dashboard"
```

### 2. Regular Merge (Keep history)

```bash
git merge feature/admin-dashboard
```

### 3. Rebase & Merge (Linear history)

```bash
git rebase develop
git push origin develop
```

## Backup & Recovery

### Backup Repository

```bash
# Create mirror backup
git clone --mirror https://github.com/USER/laptop-store.git

# Update mirror
cd laptop-store.git
git fetch --mirror
```

### Recover Deleted Branch

```bash
# Find dangling commits
git reflog

# Checkout branch from reflog
git checkout -b recovered-branch COMMIT_HASH
```

## Troubleshooting

### Lost commits?
```bash
git reflog
git checkout -b recovery COMMIT_HASH
```

### Huge repository?
```bash
# Shallow clone
git clone --depth 1 https://github.com/USER/laptop-store.git
```

### Slow operations?
```bash
# Garbage collection
git gc --aggressive
```

## Best Practices Summary

✅ **Do:**
- Write clear commit messages
- Commit frequently
- Push daily
- Review before merging
- Keep branches updated
- Document changes

❌ **Don't:**
- Force push to shared branches
- Commit sensitive data
- Large binary files
- Debug code in main
- Rewrite public history

## Resources

- [GitHub Guides](https://guides.github.com/)
- [Git Documentation](https://git-scm.com/doc)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)

## Team Setup Commands

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/laptop-store.git
cd laptop-store

# Configure git
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Create develop branch
git checkout -b develop
git push -u origin develop

# Verify setup
git branch -a
git remote -v
```

Ready to start collaborating! 🚀
