// student-list.js : search, semester filter and column sorting for the student table
(function () {
    var table = document.getElementById('student-table');
    if (!table) { return; }

    var body = table.tBodies[0];
    var searchBox = document.getElementById('search-box');
    var filter = document.getElementById('semester-filter');
    var countLabel = document.getElementById('result-count');
    var noMatch = document.getElementById('no-match');

    function dataRows() {
        var all = body.rows;
        var list = [];
        for (var i = 0; i < all.length; i++) {
            if (all[i] !== noMatch) { list.push(all[i]); }
        }
        return list;
    }

    // ----- search + filter -----
    function applyFilters() {
        var term = searchBox.value.trim().toLowerCase();
        var semester = filter.value;
        var rows = dataRows();
        var shown = 0;

        for (var i = 0; i < rows.length; i++) {
            var textOk = rows[i].textContent.toLowerCase().indexOf(term) !== -1;
            var semOk = semester === '' || rows[i].getAttribute('data-semester') === semester;
            var visible = textOk && semOk;

            rows[i].hidden = !visible;
            if (visible) { shown++; }
        }

        noMatch.hidden = shown !== 0;
        countLabel.textContent = 'Showing ' + shown + ' of ' + rows.length;
    }

    searchBox.addEventListener('input', applyFilters);
    filter.addEventListener('change', applyFilters);

    // ----- sorting -----
    var buttons = table.querySelectorAll('.sort');
    var current = null;
    var direction = 1;

    function cellValue(row, key, type) {
        var text = row.cells[key].textContent.trim();
        if (type === 'number') {
            var n = parseInt(text.replace(/[^0-9]/g, ''), 10);
            return isNaN(n) ? 0 : n;
        }
        return text.toLowerCase();
    }

    function sortBy(button) {
        var key = parseInt(button.getAttribute('data-key'), 10);
        var type = button.getAttribute('data-type');

        direction = current === button ? -direction : 1;
        current = button;

        for (var i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('asc', 'desc');
        }
        button.classList.add(direction === 1 ? 'asc' : 'desc');

        var rows = dataRows();
        rows.sort(function (a, b) {
            var x = cellValue(a, key, type);
            var y = cellValue(b, key, type);
            if (x < y) { return -direction; }
            if (x > y) { return direction; }
            return 0;
        });

        for (var j = 0; j < rows.length; j++) {
            body.insertBefore(rows[j], noMatch);
        }
    }

    for (var b = 0; b < buttons.length; b++) {
        buttons[b].addEventListener('click', function () { sortBy(this); });
    }

    applyFilters();
})();
