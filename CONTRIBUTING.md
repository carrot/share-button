# Contributing to Share Button
Hello there! First of all, thanks for being interested in share-button and helping out. We all think you are awesome, and by contributing to open source projects, you are making the world a better place. That being said, there are a few ways to make the process of contributing code to share-button smoother, detailed below:

## Filing Issues
If you are filing an issue, it is **required** that you include a jsfiddle that reproduces the issue you are having. The share button is a very simple and straightforward script, and often times if you are encountering a bug it is the result of some other code on your page. This is not something you should file an issue about, as we don't have time to debug your code. By taking a look at the issue with the button in isolation, it is easier to determine whether you have found a bug with share-button or whether the issue was introduced by your code.

There is a [template jsfiddle here](http://jsfiddle.net/28fn23bj/) for you to experiment with if you'd like.

If you are opening an issue to suggest a feature, that's totally fine, although we might not add the feature for you immediately. If you are after a new feature, the best course of action is to open an issue describing the feature you want in detail. If we approve of the feature, try submitting a pull request to add it yourself! As mentioned above, this project is fairly straightforward, and there are explicit instructions below for getting set up -- a contribution is a good way to get your feet wet with open source.

## Getting Set Up
- Clone the project down
- Install [nodejs](http://nodejs.org) (version 4.0.0 or higher)
- _Windows users only:_ Install [Python](https://wiki.python.org/moin/BeginnersGuide/Download) (version 2.x.x) and set up [environment path](http://stackoverflow.com/a/6318188/1308734).
- Run `npm install`
- Make changes to the files in the `src` folder
- Run `gulp build` to build the js files into `dist`
- Open `index.html` locally to see your changes.

## Testing
This project is constantly evolving, and to ensure that things are secure and working for everyone, we need to have tests. If you are adding a new feature, please make sure to add a test for it. We are using [pioneer](pioneerjs.com) for testing with [phantom.js](http://phantomjs.org/). For getting setup with those please checkout their setup instructions on their sites. All said and done, tests for this library are tough - at very least make sure to visually confirm that it's working using index.html in the root of the project. If it's a visual please make sure that everything looks okay in [examples/animation.html].

To run the test suite, make sure you have installed [PhantomJS](//phantomjs.org/download.html), then you can use the `npm test` command to run them.

## Commit Cleanliness
It's ok if you start out with a bunch of experimentation and your commit log isn't totally clean, but before any pull requests are accepted, we like to have a nice clean commit log. That means [well-written and clear commit messages](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html) and commits that each do something significant, rather than being typo or bug fixes.

If you submit a pull request that doesn't have a clean commit log, we will ask you to clean it up before we accept. This means being familiar with rebasing - if you are not, [this guide](https://help.github.com/articles/interactive-rebase) by github should help you to get started, and feel free to ask us anything, we are happy to help.

## Deployment
When deploying new changes you'll run create a new git tag, push to github, run `gulp build`, publish to npm. Then you'll want to package all the files in the `dist` folder up into (a zip & tarball), and these will be added to your release on github. 

Happy Developing!

![cute dog](http://hellogiggles.hellogiggles.netdna-cdn.com/wp-content/uploads/2015/03/17/53451-Cute-Dog.jpg)

