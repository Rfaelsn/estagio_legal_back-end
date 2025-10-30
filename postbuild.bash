#!/bin/bash

echo 'Preparing to run automation on production mode.'

puppeteer_cache_dir=".cache/puppeteer/chrome/"
puppeteer_dep_dir="node_modules/puppeteer/"

if [[ ! -d "$puppeteer_cache_dir" ]]; then
    echo "$puppeteer_cache_dir directory does not exist. Trying to re-install Puppeteer."
    npm install puppeteer
fi

echo "Puppeteer postbuild finalizado."
