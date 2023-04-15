#!/bin/bash

echo "Our docker file"
echo "Setup Astra"
wp theme activate astra

# echo "Activate <your-extension>"
# wp plugin activate your-extension

echo "Rewrite permalinks..."
wp rewrite structure /%postname%/ --hard --quiet

echo "Triggering wp-admin..."
wp e2e login --username=admin --password=password

echo "Success! Your E2E Test Environment is now ready."
