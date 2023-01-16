<script>
  export let title, env;
</script>

<head>
  <meta charset='utf-8'>
  <meta name='viewport' content='width=device-width,initial-scale=1'>

  <title>{ title }</title>
  <base href="{env.baseurl}">

  <script type="module" src="spa/core/main.js"></script>

  <link rel="icon" type="image/svg+xml" href="logo.svg">
  <link rel='stylesheet' href='spa/bundle.css'>
</head>
