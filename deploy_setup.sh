#!/bin/bash
# deploy_setup.sh - Script to install Docker and run the app on Ubuntu EC2

# 1. Update system and install dependencies
sudo apt-get update -y
sudo apt-get install -y ca-certificates curl gnupg git

# 2. Install Docker
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update -y
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 3. Add current user to docker group
sudo usermod -aG docker $USER
echo "Docker installed! You will need to log out and log back in for docker permissions to apply."
echo "After logging back in, navigate to the repo and run: docker compose up -d"
