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

# 4. Configure Environment Variables
echo "Docker installed!"
echo ""
echo "Setting up environment variables..."

# Copy templates if they don't exist yet
if [ ! -f "be/.env" ]; then
    cp be/.env.example be/.env
fi

if [ ! -f "fe/.env" ]; then
    cp fe/.env.example fe/.env
fi

echo "Please fill in your BACKEND environment variables. Save and exit (Ctrl+O, Enter, Ctrl+X) when done."
read -p "Press Enter to open the backend .env in nano..."
nano be/.env

echo "Please fill in your FRONTEND environment variables. Save and exit (Ctrl+O, Enter, Ctrl+X) when done."
read -p "Press Enter to open the frontend .env in nano..."
nano fe/.env

echo ""
echo "Your .env files are ready, starting Docker..."
sudo docker compose up -d --build
echo ""
echo "Deployment initiated!"
