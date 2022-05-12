# Contributing Guide

This repository contains the source for the official Brigade website at
[brigade.sh](https://brigade.sh) and as such follows all of the policies laid
out in the main
[Brigade Contributor Guide](https://docs.brigade.sh/topics/contributor-guide/).
Anyone interested in contributing to this blog should familiarize themselves
with that guide _first_.

The remainder of _this_ document only supplements the above with things specific
to this project.

## Site Development

This is a simple one-page site; using [parcel](https://parceljs.org) to build
assets. 

```shell
# 1 install packages
$ yarn

# 2 compile the site
$ yarn parcel index.html
```

The site runs at [localhost:1234](http://localhost:1234/)

## Deploying

The site is deployed via the CNCF Projects
[Netlify](https://app.netlify.com/sites/brigade-sh/deploys) account. Changes to
the `main` branch are auto-deployed to the live environment.
