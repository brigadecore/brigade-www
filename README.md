![https://user-images.githubusercontent.com/686194/31805979-d3e7a2ee-b519-11e7-990b-acec271233bd.png](https://user-images.githubusercontent.com/686194/31805979-d3e7a2ee-b519-11e7-990b-acec271233bd.png)

[Brigade.sh](//brigade.sh) is the website for [the Brigade Project](https://github.com/azure/brigade).

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

The jekyll site is rendered, minified and deployed by running:

```
gulp deploy
```

This pushes the build to the `gh-pages` branch, which is deployed in the azure app service.