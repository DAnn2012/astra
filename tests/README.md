# Astra End To End Playwright Testing WorkFlow

Automated end-to-end tests for Astra.

## Pre-requisites

### Install Docker

Install Docker Desktop if you don't have it installed:

-   [Docker Desktop for Mac](https://docs.docker.com/docker-for-mac/install/)
-   [Docker Desktop for Windows](https://docs.docker.com/docker-for-windows/install/)

### Install npm ( Node version v14.19.3 & npm v6.14.17 )

## Running tests

### Prep work for running tests

Run the following in a terminal/command line

-   `cd` to the Astra theme folder

-   `git checkout <branch-name>`

-   `nvm use` (optional - use node 14.x.x)

-   `npm install`
-   `npm run play:up` (this will build the test site using Docker)
-   There are some bash scripts when you run the command, it will set the environment of E2E
    Check the folder of tests/docker

-   Use `docker ps` to confirm that the Docker containers are running. You should see a log indicating that everything had been built as expected

After running the command of npm run play:up, you can see the message of

## Success! Your E2E Test Environment is now ready.

For Astra all the environment build-in port number 8889. See `.wp-env.json` file for configurations.

## Usage

## Playwright framework

### Follow below steps

```
# install Playwright
npm run play:install

# Run test case in headless mode
npm run play:run hello.spec.js

# Run test case in interactive mode
npm run play:run:interactive hello.spec.js
```

### Restarting wp-env will restart the underlying Docker containers which can fix many issues.

### To restart wp-env

```
wp-env stop
wp-env start
```

### To Reset the steps: Resetting the database of the local environment

```
wp-env clean all
wp-env start
```

### Destroy everything & start again

```
wp-env destroy
wp-env start
```

### Please check this video on how to run a test case by Playwright framework

-   [Runtestcase](https://share.getcloudapp.com/xQuOXRyj)

### References

-   [Wordpress Environment Setup](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/#5-reset-the-database)
-   [Playwright Framework ](https://playwright.dev/)
