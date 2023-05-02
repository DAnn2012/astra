#!/bin/bash

echo "Our docker file"
echo "Setup Astra"
wp theme activate astra

echo "Rewrite permalinks..."
wp rewrite structure /%postname%/

echo "Installing basic-auth to interact with the API..."
wp plugin install https://github.com/WP-API/basic-auth/archive/master.zip --activate
wp plugin activate basic-auth

# echo "Activate <your-extension>"
# wp plugin activate your-extension

echo "Success! Your E2E Test Environment is now ready."