// site.js : runs on every page (theme, menu highlight, message box)
(function () {
    var root = document.documentElement;
    var toggle = document.getElementById('theme-toggle');

    // ----- theme (light / dark) -----
    function applyTheme(name) {
        root.setAttribute('data-theme', name);
        if (toggle) {
            toggle.textContent = name === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
        }
    }

    var saved = null;
    try { saved = localStorage.getItem('theme'); } catch (e) { }

    if (!saved) {
        saved = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    applyTheme(saved);

    if (toggle) {
        toggle.addEventListener('click', function () {
            var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(next);
            try { localStorage.setItem('theme', next); } catch (e) { }
        });
    }

    // ----- highlight the current menu link -----
    var path = window.location.pathname.replace(/\/$/, '') || '/';
    var links = document.querySelectorAll('#menu a');
    var best = null;
    var bestLength = -1;

    // the link with the longest matching path wins (/Student/Create beats /Student)
    for (var i = 0; i < links.length; i++) {
        var p = links[i].getAttribute('data-path');
        var match = p === '/' ? path === '/' : (path === p || path.indexOf(p + '/') === 0);
        if (match && p.length > bestLength) {
            best = links[i];
            bestLength = p.length;
        }
    }
    if (best) { best.classList.add('active'); }

    // ----- success message: close button and auto hide -----
    var toast = document.getElementById('toast');
    var closeBtn = document.getElementById('toast-close');

    function hideToast() {
        if (!toast) { return; }
        toast.classList.add('hide');
        setTimeout(function () { toast.style.display = 'none'; }, 300);
    }

    if (toast) {
        if (closeBtn) { closeBtn.addEventListener('click', hideToast); }
        setTimeout(hideToast, 5000);
    }
})();
