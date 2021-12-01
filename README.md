This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

We use Prettier as an opinionated formatter accross the project.
This helps minimize diffs that might result from using different formatters.
If you use VSCode, you can just add this extension [here](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Environments

When building for a particular environment, we copy the corresponding environment file to .env.local, which has precedence over all other env files.
See [here](https://create-react-app.dev/docs/adding-custom-environment-variables/#what-other-env-files-can-be-used) for more info.
Make sure not to add any secrets to the environment files, as they are accessible from the browser.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run cypress open`

Launches the Cypress test runner, which we use for our E2E tests.
Set the CYPRESS_BASE_URL env var to run the tests against a different url.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

## Styling

We use css modules and tailwind css throughout the project.
For complex styling, please prefer the former.

Global classes that can be composed should go in `styles/globalClasses.module.css`.
Other styling rules that are globally applicable should go in the root level
`index.css`, or a css file that is imported into it.
