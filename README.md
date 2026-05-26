# Divergency Reviewer Site

Public reviewer site for Divergency Kickstarter campaign materials.

Live site after GitHub Pages deploys:

https://kslhuy.github.io/divergency-reviewer-site/

## Editing Flow

1. Create a branch from `main`.
2. Edit the Markdown files in GitHub or locally.
3. Open a pull request into `main`.
4. Wait for the build check to pass.
5. After review, merge the pull request. GitHub Pages will rebuild and publish the site.

## What To Edit

- `Divergency_Kickstarter_Page_Rewrite.md`
- `Divergency_Story_Short_Summary.md`
- `Divergency_Complete_Story_VI.md`
- `Divergency_Gameplay_Level_Design.md`
- `Rewards_Fulfillment_Checklist.md`
- Web-ready images under `imgs/`

Do not add Unity project files, source code, private planning files, or editable source art files to this repository.

## Local Preview

Run:

```bash
node build-reviewer-html.mjs
```

Then open `Divergency_Reviewer_Tabs.html` in a browser.
