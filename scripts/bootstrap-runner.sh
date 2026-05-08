#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -lt 3 ]; then
  echo "Usage: $0 <github_owner> <repo_slug> <github_pat>"
  exit 1
fi

OWNER="$1"
REPO="$2"
PAT="$3"

RUNNER_DIR="${HOME}/actions-runner-hieuvo"
RUNNER_VERSION="2.330.0"
RUNNER_ARCHIVE="actions-runner-linux-x64-${RUNNER_VERSION}.tar.gz"
RUNNER_URL="https://github.com/actions/runner/releases/download/v${RUNNER_VERSION}/${RUNNER_ARCHIVE}"

sudo apt-get update -y
sudo apt-get install -y curl tar jq ca-certificates

mkdir -p "${RUNNER_DIR}"
cd "${RUNNER_DIR}"

if [ ! -f "${RUNNER_ARCHIVE}" ]; then
  curl -fsSL -o "${RUNNER_ARCHIVE}" "${RUNNER_URL}"
fi

if [ ! -f ".runner" ]; then
  tar xzf "${RUNNER_ARCHIVE}"

  REG_TOKEN="$(curl -fsSL -X POST \
    -H "Authorization: token ${PAT}" \
    -H "Accept: application/vnd.github+json" \
    "https://api.github.com/repos/${OWNER}/${REPO}/actions/runners/registration-token" | jq -r .token)"

  ./config.sh \
    --url "https://github.com/${OWNER}/${REPO}" \
    --token "${REG_TOKEN}" \
    --name "hieuvo-host-runner" \
    --labels "hieuvo-host" \
    --unattended
fi

sudo ./svc.sh install
sudo ./svc.sh start
sudo ./svc.sh status
