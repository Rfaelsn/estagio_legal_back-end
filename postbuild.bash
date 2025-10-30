#!/bin/bash

echo 'Preparing to run automation on production mode.'

puppeteer_cache_dir=".cache/puppeteer/chrome/"

puppeteer_dep_dir="node_modules/puppeteer/"

if [[ -d "$puppeteer_cache_dir" ]];
then
    echo "$puppeteer_cache_dir directory exists."
else
	echo "$puppeteer_cache_dir directory does not exist. Trying to re-install Puppeteer."
    cd "$puppeteer_dep_dir"
    npm install
fi

echo "Going back to original directory and running script now..."
cd
npm run my_puppeteer_routine_here
