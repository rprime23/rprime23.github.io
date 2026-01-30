fetch("assets/page_elements/navbar.html", { cache: "force-cache" })
  .then((r) => r.text())
  .then((html) => {
    const mount = document.getElementById("navbar-placeholder");
    if (mount) mount.innerHTML = html;
  })
  .catch(console.error);
