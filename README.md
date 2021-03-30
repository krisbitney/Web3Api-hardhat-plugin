# Web3API Hardhat Plugin

_A Hardhat plugin to manage and run your Web3API test environment_

## Vision

The Web3API Hardhat plugin facilitates simultaneous api and smart contract development using Hardhat (formerly Buidler, a popular smart contract development environment). The plugin automatically starts and stops the Web3API test environment in the background, and extends the Hardhat Runtime Environment to provide an instance of the Web3API client. It also streamlines development iterations by adding a web3api build and deploy step to Hardhat's smart contract compilation procedure--your newest api version will always be available while testing.

(note that the plugin doesn't work yet)

## Why

- A good way to market web3api to web3 developer community
  - Plugins are central to Hardhat
  - Hardhat developers are likely to browse available plugins because some plugins are extremely useful
  - There aren't many plugins listed on the Hardhat website, so quite a few developers would see the Web3API plugin even if it were listed last
- Lets developers manage web3api test env and client in a familiar environment
- Facilitates simultaneous contract and api development, encouraging developers to think about their api early on
- Hardhat Tasks expose useful hooks:
    - could automatically register/manage ENS for contracts when devs run "hardhat test"
    - could integrate stack traces for debugging api alongside contracts
    - could auto-generate a starter graphql schema and api interface based on contract abi and type artifacts produced by hardhat compiler
    - ???
    - profit

# End of Readme
#
#
## Installation

<_A step-by-step guide on how to install the plugin_>

```bash
npm install <your npm package name> [list of peer dependencies]
```

Import the plugin in your `hardhat.config.js`:

```js
require("<your plugin npm package name>");
```

Or if you are using TypeScript, in your `hardhat.config.ts`:

```ts
import "<your plugin npm package name>";
```


## Required plugins

<_The list of all the required Hardhat plugins if there are any_>

- [@nomiclabs/hardhat-web3](https://github.com/nomiclabs/hardhat/tree/master/packages/hardhat-web3)

## Tasks

<_A description of each task added by this plugin. If it just overrides internal 
tasks, this may not be needed_>

This plugin creates no additional tasks.

<_or_>

This plugin adds the _example_ task to Hardhat:
```
output of `npx hardhat help example`
```

## Environment extensions

<_A description of each extension to the Hardhat Runtime Environment_>

This plugin extends the Hardhat Runtime Environment by adding an `example` field
whose type is `ExampleHardhatRuntimeEnvironmentField`.

## Configuration

<_A description of each extension to the HardhatConfig or to its fields_>

This plugin extends the `HardhatUserConfig`'s `ProjectPathsUserConfig` object with an optional
`newPath` field.

This is an example of how to set it:

```js
module.exports = {
  paths: {
    newPath: "new-path"
  }
};
```

## Usage

<_A description of how to use this plugin. How to use the tasks if there are any, etc._>

There are no additional steps you need to take for this plugin to work.

Install it and access ethers through the Hardhat Runtime Environment anywhere
you need it (tasks, scripts, tests, etc).
