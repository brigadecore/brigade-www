# brigade.sh

[![Netlify Status](https://api.netlify.com/api/v1/badges/4053560a-ff76-48ce-9841-5b145db53fb5/deploy-status)](https://app.netlify.com/sites/brigade-sh/deploys)

<img width="100" align="left" src="assets/images/favicon.png">

[brigade.sh](https://brigade.sh) is the main website for [the Brigade Project](https://github.com/brigadecore/brigade).

<br clear="left"/>

## Site Development

This is a simple one-page site; using [parcel](https://parceljs.org) to build assets. 

```shell
# 1 install packages
$ yarn

# 2 compile the site
$ yarn parcel index.html
```

The site runs at [localhost:1234](http://localhost:1234/)

## Deploying

The site is deployed via the CNCF Projects [Netlify](https://app.netlify.com/sites/brigade-sh/deploys) account. Changes to the `main` branch are auto-deployed to the live environment.

## Contributing

The Brigade project accepts contributions via GitHub pull requests. The
[Contributing](CONTRIBUTING.md) document outlines the process to help get your
contribution accepted.

## Support & Feedback

We have a Slack channel!
[Kubernetes/#brigade](https://slack.brigade.sh) Feel free to join for any
support questions or feedback, we are happy to help. To report an issue or to
request a feature open an issue
[here](https://github.com/brigadecore/brigade-www/issues).

## Code of Conduct

Participation in the Brigade project is governed by the
[CNCF Code of Conduct](https://github.com/cncf/foundation/blob/master/code-of-conduct.md).
