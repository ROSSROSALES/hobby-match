# Link

[Hobby-Match](https://anime-match-a5f94.web.app/)

# Update (newest first)

- Added Profile Pic to Chat

![Hobby-Match Chat Profile Pic update](https://github.com/ROSSROSALES/hobby-match/assets/52366381/f103dd32-b1d4-4a7c-815a-ccc316b8dd52)

# Demo

October 21, 2023  
Added Dockerfile  
How To:
1. First build out docker image using the Dockerfile from main project dir
2. `docker build -t [name image here]`
3. Once the docker image id is built we can run it
4. Since the Dockerfile created an image with EXPOSE to port 8080, but by default it is not accessible
5. We use port forwarding Local:Container == 3000:8000 as seen below
6. `docker run -p 3000:8080 [image id]`
7. Open Localhost:3000


- Home

![Home](https://user-images.githubusercontent.com/52366381/200031625-2391bb24-c52a-4436-9a49-a4feeee6023e.png)

- Home Swipe

![Home swipe](https://user-images.githubusercontent.com/52366381/200031611-ed9200cc-1ccc-4916-b505-88d084f476e3.png)

- Profile History

![History](https://user-images.githubusercontent.com/52366381/200031657-4bfe39ff-45e2-4f31-ba27-918179a41388.png)

- Profile History Delete

![History delete](https://user-images.githubusercontent.com/52366381/200031666-85b0af6e-932b-4baf-b2d5-6e44a760f06c.png)

- Navigation Bar Dropdown

![Nav Dropdown](https://user-images.githubusercontent.com/52366381/200031673-22afe188-5909-4bf3-90a0-25d3e9b232cd.png)

- Chat

![Chat](https://user-images.githubusercontent.com/52366381/200031687-2337b5e7-8c76-49af-8ca8-4f25ea2b03b9.png)

- Chat Submit

![Chat Submit](https://user-images.githubusercontent.com/52366381/200031694-ac4a3abe-82b9-4807-b67b-3539f4d8a999.png)


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
