# yarn-bughunt-workspace

Yarn v4 workspace sample project for JFrog CLI bug hunt testing (`RTECO-1035-yarnv4`).

## Structure

```
packages/
  yarn-bughunt-lib/   — shared utility library (lodash dependency)
  yarn-bughunt-app/   — app that consumes lib via workspace:* protocol (axios dependency)
```

## Setup

This repo is intended to be used with the `setup-yarn-bughunt` skill, which:
- Configures `.yarnrc.yml` to point to your Artifactory instance
- Replaces `<repository>` in `publishConfig` with your Artifactory local repo URL
- Sets `packageManager` to match your installed yarn v4 version

## Usage (after setup-yarn-bughunt runs)

```bash
# Install deps and collect build-info
jf yarn install --build-name my-build --build-number 1

# Publish all workspace packages to Artifactory
jf yarn workspaces foreach --all npm publish --no-git-checks --build-name my-build --build-number 1

# Push build-info
jf rt bp my-build 1
```

## Manual setup (without the skill)

```bash
# Install yarn v4
corepack enable && corepack prepare yarn@stable --activate

# Configure .yarnrc.yml (replace placeholders with your Artifactory URLs)
cat > .yarnrc.yml <<EOF
npmRegistryUrl: "https://<instance>/artifactory/api/npm/<virtual-repo>/"
npmRegistries:
  "//<instance>/artifactory/api/npm/<virtual-repo>/":
    npmAuthIdent: "$(printf 'admin:password' | base64)"
    npmAlwaysAuth: true
  "//<instance>/artifactory/api/npm/<local-repo>/":
    npmAuthIdent: "$(printf 'admin:password' | base64)"
    npmAlwaysAuth: true
EOF

yarn install
```
