# Quality Infrastructure - Frontend Demo Code

## Embedding QI Metrics on Your Site

A site can display metrics information (charts and summaries) from the Quality Infrastructure by including Javascript from the QI site and calling functions to create the desired panels.

Various single-file versions of the Javascript necessary to embed metrics information from the QI are hosted and available at these URLs:

- `https://qi.gpii.net/js/qi-frontend-full.js` - all depedencies
- `https://qi.gpii.net/js/qi-frontend-full.min.js` - the above, minified
- `https://qi.gpii.net/js/qi-frontend-noJquery.js` - all dependencies except jQuery
- `https://qi.gpii.net/js/qi-frontend-noJquery.min.js` - the above, minified

### Public Functions

Two public functions are currently provided to simplify panel creation:

#### gpii.qualityInfrastructure.frontEnd.createCommitsPanel(repo, container)
* **repo**: a string identifying the GitHub organization and repo to retrieve commit metrics for (ex: *"gpii/universal"*)
* **container**: a DOM selector string in the jQuery style identifying a container to inject the metrics panels into; this must be a unique page element (ex: *"#commits"*)


#### gpii.qualityInfrastructure.frontEnd.createContributorsPanel(repo, container)
* **repo**: a string identifying the GitHub organization and repo to retrieve contributors metrics for (ex: *"gpii/universal"*)
* **container**: a DOM selector string in the jQuery style identifying a container to inject the metrics panels into; this must be a unique page element (ex: *"#contributors"#*)

### Styling

A basic stylesheet can also optionally be included or studied to assist in applying your own styles:

- `https://qi.gpii.net/css/qi-frontend.css`

### GitHub Organization Restrictions

At this time the QI back end restricts queries to the following GitHub organizations:
- https://github.com/gpii
- https://github.com/fluid-project

### Implementation Example

The most basic means of embedding metrics display is to do the following:

In the document `HEAD`:

```
<!-- include the single-file version of the dependencies -->
<script src="https://qi.gpii.net/js/qi-frontend-full.min.js"></script>

<!-- optionally include the stylesheet -->
<link rel="stylesheet" type="text/css" href="https://qi.gpii.net/css/qi-frontend.css" />
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

All demos will need to be served from a webserver due to the use of AJAX. They can be accessed in the `/demos` directory or at https://qi.gpii.net/demos/

#### Basic Examples

These examples require no particular knowledge of the underlying code implemented using the [Infusion](https://github.com/fluid-project/infusion) Javascript library, and use basic inline Javascript to render the panels.

### Advanced Examples

These examples include navigation controls and functions that make use of Infusion component features to change and navigate the views presented by the graphs.

---

## Developing

- `npm install --ignore-scripts`
- `npm install -g grunt-cli`
- `grunt copy:frontEndDependencies`

This copies necessary front-end dependencies from `node_modules` to `src/lib`

## Building a Redistributable Single File Version

- `npm install --ignore-scripts`
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
