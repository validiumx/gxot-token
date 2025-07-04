# 🐐 GXOT GitHub Commands Cheat Sheet

## 🚀 Quick Setup Commands

\`\`\`bash
# Navigate to project directory
cd D:\GXOT_Alls\my-app

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "🎉 Initial commit: GXOT Token deployed to World Chain Mainnet

✅ Smart contracts deployed and verified
✅ DAO governance activated  
✅ 3B GXOT tokens ready for community
✅ Deployment cost: $0.11 USD

Contract Addresses:
- GXOT Token: 0x1a4E4eCdD7027f38c6a84cB590a3bB38028ea0cb
- DAO: 0x8CDa18d8A834D6A42951375C75789d3380CB10f8
- Liquidity Manager: 0xCD00672437454253861330bE1ED8FF4C630fbe2c

🐐 The GOAT of meme tokens is ready! 🚀"

# Add GitHub remote (replace with your URL)
git remote add origin https://github.com/YOUR_USERNAME/gxot-token.git

# Set main branch
git branch -M main

# Push to GitHub
git push -u origin main
\`\`\`

## 📝 Daily Git Commands

\`\`\`bash
# Check status
git status

# Add specific files
git add filename.js
git add contracts/
git add .

# Commit with message
git commit -m "📝 Update documentation"
git commit -m "🐛 Fix deployment script"
git commit -m "✨ Add new feature"

# Push changes
git push

# Pull latest changes
git pull
\`\`\`

## 🔄 Branch Management

\`\`\`bash
# Create new branch
git checkout -b feature/new-feature

# Switch branches
git checkout main
git checkout feature/new-feature

# Merge branch
git checkout main
git merge feature/new-feature

# Delete branch
git branch -d feature/new-feature
\`\`\`

## 🔍 Viewing Information

\`\`\`bash
# View commit history
git log
git log --oneline
git log --graph

# View differences
git diff
git diff filename.js

# View remote repositories
git remote -v

# View branches
git branch
git branch -a
\`\`\`

## 🚨 Emergency Commands

\`\`\`bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Discard local changes
git checkout -- filename.js
git checkout -- .

# Force push (use carefully!)
git push --force
\`\`\`

## 🎯 Commit Message Conventions

Use these emojis for better commit messages:

- 🎉 `:tada:` - Initial commit
- ✨ `:sparkles:` - New feature
- 🐛 `:bug:` - Bug fix
- 📝 `:memo:` - Documentation
- 🔧 `:wrench:` - Configuration
- 🚀 `:rocket:` - Deployment
- 🔒 `:lock:` - Security
- 💄 `:lipstick:` - UI/styling
- ⚡ `:zap:` - Performance
- 🔥 `:fire:` - Remove code/files

## 📋 Pre-Push Checklist

Before pushing to GitHub:

- [ ] ✅ Check `.env` is in `.gitignore`
- [ ] ✅ No private keys in code
- [ ] ✅ Run `git status` to review changes
- [ ] ✅ Test code still works
- [ ] ✅ Write meaningful commit message
- [ ] ✅ Check file sizes (no huge files)

## 🔗 GitHub Repository URL

After creating your GitHub repository, your URL will be:
\`\`\`
https://github.com/YOUR_USERNAME/gxot-token
\`\`\`

Replace `YOUR_USERNAME` with your actual GitHub username.

## 🎊 Success Commands

After successful push:

\`\`\`bash
# Verify remote connection
git remote -v

# Check last commit
git log -1

# View repository status
git status
\`\`\`

**🐐 Ready to share GXOT with the world! 🚀**
