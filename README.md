# Quality Infrastructure - Frontend Demo Code

## Embedding QI Metrics on Your Site

A site can display metrics information (charts and summaries) from the Quality Infrastructure by including Javascript from the QI site and calling various functions to create the desired panels.

Various single-file versions of the Javascript necessary to embed metrics information from the QI are available:

- `http://qi.gpii.net/qi-frontend-full.js` - all depedencies
- `http://qi.gpii.net/qi-frontend-full.min.js` - the above, minified
- `http://qi.gpii.net/qi-frontend-noJquery.js` - all dependencies except jQuery
- `http://qi.gpii.net/qi-frontend-noJquery.min.js` - the above, minified

A basic stylesheet can also optionally be included or studied to apply your own styles:

- `https://qi.gpii.net/qi-frontend.css`

### Implementation Example

The most basic means of embedding metrics display is to do the following:

In the document `HEAD`:

```
<!-- include the single-file version of the dependencies -->
<script src="http://qi.gpii.net/qi-frontend-full.min.js"></script>

<!-- optionally include the stylesheet -->
<link rel="stylesheet" type="text/css" href="https://qi.gpii.net/qi-frontend.css" />
```

In the document `BODY`:

```
<!-- container for commit metrics panels -->
<div id="commits" class="gpii-panel"></div>

<!-- container for contributor metrics panels -->
<div id="contributors" class="gpii-panel"></div>

<script>
    // The GitHub user/organization + repo to request metrics for
    var repo = "gpii/universal"

    // Update the heading to the repo
    $("#repo-name").text(repo);

    // Call the createCommitsPanel function with arguments for the
    // repo + selector for the container to inject results into
    var commitsPanel = gpii.qualityInfrastructure.frontEnd.createCommitsPanel(repo, "#commits");

    // Call the createContributorsPanel function with arguments for the
    // repo + selector for the container to inject results into
    var contributorsPanel = gpii.qualityInfrastructure.frontEnd.createContributorsPanel(repo, "#contributors");
</script>
```

### Demo Examples

All demos will need to be served from a webserver due to the use of AJAX.

The most basic examples of using the demo code are:
- `demos/index-singleFile-basic.html` (single Javascript file including jQuery + single CSS file)
- `demos/index-noJquery-basic.html` (separate jQuery include)

These examples require no particular knowledge of the underlying code implemented using the [Infusion](https://github.com/fluid-project/infusion) Javascript library, and use basic inline Javascript to render the panels.

More elaborate examples are:
- `demos/index.html?repo=gpii/universal`
- `demos/index-singleFile.html?repo=gpii/universal`
- `demos/index-noJquery.html?repo=gpii/universal`

These demos include navigation controls and functions that make use of Infusion component features to change the views presented by the graphs.

---

## Developing

- `npm install`
- `npm install -g grunt-cli`
- `grunt copy:frontEndDependencies`

This copies necessary front-end dependencies from `node_modules` to `src/lib`

## Building a Redistributable Single File Version

- `npm install`
- `npm install -g grunt-cli`
- `grunt copy:frontEndDependencies`
- `grunt dist`

This produces four single-file versions of the dependencies in the `/dist` directory:
- non-minified with all dependencies
- minified with all dependencies
- non-minified without jQuery
- minified with jQuery

## Libraries Used
- jQuery and jQuery UI
- Infusion
- D3
- Floe Chart Authoring Tool

## The Demos

The demos `index-singleFile.html` and `index-noJquery.html` in `/demos` assumes a single-file distribution has been built and use it in their markup; these demos are intended to guide those implementing the QI panels into their own site.

## Using a Container

A container running a web server can be used to host the redistributable source code mentioned above.

To build a container the following command should be used:

```
sudo docker build \
--no-cache \
-t gpii/qi-dashboard-frontend-demo .
```

Then to start a container this command can be used:

```
sudo docker run \
--name qi-dashboard-frontend-demo \
-d \
-p 80:80 \
gpii/qi-dashboard-frontend-demo
```

The server will be reachable at ``http://<your container's IP address>:8888/`` and will serve the contents of the generated ``dist`` directory.
