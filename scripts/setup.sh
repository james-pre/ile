#!/usr/bin/bash

echo -n "Checking for dependencies... "
if [ -n "$(command -v dnf)" ]; then
	echo "using dnf."
	sudo dnf install -y nodejs postgresql-server
elif [ -n "$(command -v apt)" ]; then
	echo "using apt."
	sudo apt install -y nodejs postgresql-server
else
	echo "No package manager found. Please install nodejs and postgresql-server manually."
	read -p "(Press enter to continue)"
fi

echo "Please make sure these lines are added to pg_hba.conf (usually in /var/lib/pgsql/data) before the lines containing 'all all':"
echo -e "local axium axium md5\nhost  axium axium 127.0.0.1/32 md5\nhost  axium axium ::1/128 md5"
read -p "(Press enter to continue)"

npm install
npx axium db init -s
sudo npx axium ports enable -N $(which node)
node scripts/db-init.js