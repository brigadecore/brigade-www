
![https://user-images.githubusercontent.com/686194/31805979-d3e7a2ee-b519-11e7-990b-acec271233bd.png](https://user-images.githubusercontent.com/686194/31805979-d3e7a2ee-b519-11e7-990b-acec271233bd.png)

[Brigade.sh](//brigade.sh) is the website for [the Brigade Project](https://github.com/brigadecore/brigade).

[![Netlify Status](https://api.netlify.com/api/v1/badges/4053560a-ff76-48ce-9841-5b145db53fb5/deploy-status)](https://app.netlify.com/sites/brigade-sh/deploys)

--

## Site Development

This is a simple site site, build with Jekyll. The assets (css/fonts/images) are compiled and compressed via Gulp.

Install dependencies:

```
gem install
npm install
```

To run the site locally, you'll need to run these in seperate shells:

```
bundle exec jekyll build
gulp && gulp watch
```

The site runs on port 4000, ie [localhost:4000](http://localhost:4000/)

## Deploying

The jekyll site is hosted on the Deislabs Netlify account. Changes to master are auto-deployed.

# Contributing

This Brigade project accepts contributions via GitHub pull requests. This document outlines the process to help get your contribution accepted.

## Signed commits

A DCO sign-off is required for contributions to repos in the brigadecore org.  See the documentation in
[Brigade's Contributing guide](https://github.com/brigadecore/brigade/blob/master/CONTRIBUTING.md#signed-commits)
for how this is done.

[![Netlify Status](https://api.netlify.com/api/v1/badges/4053560a-ff76-48ce-9841-5b145db53fb5/deploy-status)](https://app.netlify.com/sites/brigade-sh/deploys)
