# Contributing to Share Button

Hello there! First of all, thanks for being interested in share-button and helping out. We all think you are awesome, and by contributing to open source projects, you are making the world a better place. That being said, there are a few ways to make the process of contributing code to share-button smoother, detailed below:

### Filing Issues

If you are opening an issue about a bug, make sure that you include clear steps for how we can reproduce the problem. If we can't reproduce it, we can't fix it. If you are suggesting a feature, make sure your explanation is clear and detailed.

### Getting Set Up

- Clone the project down
- Make sure [nodejs](http://nodejs.org) has been installed and is above version `0.10.x`
- Run `npm install`
- Make changes to the files in the `src` folder
- Run `cake build` to build the js files into `dist` one time
- Run `cake watch` to watch the src folder and rebuild on change

### Testing

This project is constantly evolving, and to ensure that things are secure and working for everyone, we need to have tests. If you are adding a new feature, please make sure to add a test for it. That being said, tests for this library are tough - at very least make sure to visually confirm that it's working using index.html in the root.

To run the test suite, make sure you have installed [mocha](http://visionmedia.github.io/mocha/) (`npm install mocha -g`), then you can use the `npm test` command to run them.

### Commit Cleanliness

It's ok if you start out with a bunch of experimentation and your commit log isn't totally clean, but before any pull requests are accepted, we like to have a nice clean commit log. That means [well-written and clear commit messages](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html) and commits that each do something significant, rather than being typo or bug fixes.

If you submit a pull request that doesn't have a clean commit log, we will ask you to clean it up before we accept. This means being familiar with rebasing - if you are not, [this guide](https://help.github.com/articles/interactive-rebase) by github should help you to get started, and feel free to ask us anything, we are happy to help.
