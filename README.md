# vite-react-ts-eslint-prettier

Project template with Vite, React JS, TypeScript, Eslint, Prettier

## Method

Below are the steps of setting up the project manually. These steps are documented to faciliate updating the template in the future.

### Create Vite React Application

```bash
yarn create vite
```

Follow the prompts

```bash
npx: installed 1 in 1.384s
√ Project name: ... vite-react-ts-eslint-prettier
√ Select a framework: » React
√ Select a variant: » TypeScript + SWC
```

### Update Vite to use ESLint

Follow the instructions in [this blog](https://www.robinwieruch.de/vite-eslint/)

```bash
yarn add vite-plugin-eslint --dev
```

Next we need to integrate the plugin in the project's configuration. Essentially Vite's configuration file, called vite.config.js, allows us to customize the development and build process of a Vite-based project. It gives us options such as setting the public path, configure plugins, and modify the build output. Additionally, the configuration file can be used to specify environment variables, set alias paths, and configure linting tools like ESLint. We will do the latter next by using the previously installed plugin:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
});
```

### Add ESLint to project

Details available in this [blog post](https://dev.to/knowankit/setup-eslint-and-prettier-in-react-app-357b)

```bash
yarn add eslint --dev
yarn run eslint --init
```

Configure settings using the prompts.

```bash
yarn run eslint --init
yarn run v1.22.19
$ /home/andrew/dev/vite-react-ts-eslint-prettier/node_modules/.bin/eslint --init
You can also run this command directly using 'npm init @eslint/config'.
✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · standard-with-typescript
✔ What format do you want your config file to be in? · JavaScript
Checking peerDependencies of eslint-config-standard-with-typescript@latest
The config that youve selected requires the following dependencies:

eslint-plugin-react@latest eslint-config-standard-with-typescript@latest @typescript-eslint/eslint-plugin@^5.0.0 eslint@^8.0.1 eslint-plugin-import@^2.25.2 eslint-plugin-n@^15.0.0 eslint-plugin-promise@^6.0.0 typescript@*
✔ Would you like to install them now? · No / Yes
✔ Which package manager do you want to use? · yarn
```

### Add typescript-eslint

Following the [documentation](https://typescript-eslint.io/getting-started)

```bash
yarn add --dev @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint typescript
```

Update the `.eslintrc.cjs` file with the following

```js
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
};
```

But now when running `npx eslint .` we get the following error

```
 Error while loading rule '@typescript-eslint/dot-notation': You have used a rule which requires parserServices to be generated. You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser.
```

To resolve, we need to tell ESLint where our typescript settings are.
Add the following parserOptions in `.eslintrc.cjs`

```js
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
```

and include an `.eslintignore` file to prevent the `.eslintrc.cjs` file from showing errors.

```js
.eslintrc.cjs
```

Now ESLint with TypeScript should be working and we should get errors in console

```bash
 > npx eslint .
Warning: React version not specified in eslint-plugin-react settings. See https://github.com/jsx-eslint/eslint-plugin-react#configuration .

/home/andrew/100days/MeterReadr/web/src/App.tsx
   5:1   error  Missing return type on function                                                                                                                                                        @typescript-eslint/explicit-function-return-type
   5:13  error  Missing space before function parentheses                                                                                                                                              @typescript-eslint/space-before-function-paren
   8:9   error  'title' is assigned a value but never used                                                                                                                                             @typescript-eslint/no-unused-vars
   8:24  error  Extra semicolon                                                                                                                                                                        @typescript-eslint/semi
  11:5   error  'React' must be in scope when using JSX                                                                                                                                                react/react-in-jsx-scope
  12:7   error  'React' must be in scope when using JSX                                                                                                                                                react/react-in-jsx-scope
```

We can fix these later or by adjusting our rules in our ESLint config. The important thing is they're working.


### Adding Prettier

```bash
yarn add eslint-config-prettier eslint-plugin-prettier prettier --dev
```

After installing above, make changes to .eslintrc file.

```js
 extends: ["eslint:recommended", "plugin:react/recommended", "plugin:prettier/recommended"]

```