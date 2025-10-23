#!/bin/bash

# GitHub Pages 배포 스크립트

set -e

echo "🚀 Building site for production..."
hugo --environment production --minify --gc

echo "📦 Deploying to gh-pages branch..."
cd public

# gh-pages 브랜치로 배포
if [ -z "$(git status --porcelain)" ]; then
    echo "✅ No changes to deploy"
else
    git init
    git add -A
    git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')"
    git branch -M gh-pages
    git remote add origin https://github.com/apptestai/docs-new.git 2>/dev/null || git remote set-url origin https://github.com/apptestai/docs-new.git
    git push -f origin gh-pages
    echo "✅ Deployed successfully to https://apptestai.github.io/docs-new/"
fi

cd ..

