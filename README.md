# Web3API Hardhat Plugin

_A Hardhat plugin to manage and run your Web3API test environment_

## Summary
The Web3API Hardhat plugin facilitates simultaneous api and smart contract development using Hardhat (formerly Buidler, a popular smart contract development environment). The plugin automatically starts and stops the Web3API test environment in the background, and extends the Hardhat Runtime Environment to provide an instance of the Web3API client.

## Description

_I wrote the bare-bones implementation described in the summary. However, the plugin doesn't work yet. The test env currently hangs, suggesting it may running in the same thread as Mocha or I didn't correctly configure Hardhat. Need to debug!_

We already have a web3api test environment and a CLI, so you might be wondering why we need it integrated with Hardhat. The Hardhat plugin is more than just another avenue for Web3API development tool distribution. The Hardhat community is a subset of our target market, so every developer who learns about Web3API through Hardhat is a developer who can benefit from our product. Because plugins are central to Hardhat and the list of plugins on hardhat.org is short enough to be browsed, many developers would see the plugin even if it were listed last. Getting our plugin listed on hardhat.org would itself be a valuable, long-term, free advertisement.

More importantly, Hardhat provides a suite of tools that make it easy for us to help developers streamline their API development process. Hardhat Tasks expose useful hooks to streamline development. The plugin could:
 - automatically start and stop the test environment
 - automatically build and publish API when smart contracts are compiled
 - integrate stack traces for debugging API alongside contracts
 - auto-generate a starter graphql schema and API interface based on contract abi and type artifacts produced by hardhat compiler
 - ???
 - profit
 
A simple Web3API Hardhat plugin can add value to the SDLC by facilitating simultaneous contract and API development, encouraging developers to think about their API early on. Developers who love Hardhat can write their API, configure the Web3API test environment and client, and access the Web3API client in a familiar environment without changing their workflow.

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
