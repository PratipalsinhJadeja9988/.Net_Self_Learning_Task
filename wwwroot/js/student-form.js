// student-form.js : live validation for the registration form.
// The rules are read from the data-val-* attributes that ASP.NET Core writes
// from the Data Annotations on the Student model, so the browser and the
// server always use the same rules.
(function () {
    var form = document.getElementById('student-form');
    if (!form) { return; }

    var inputs = form.querySelectorAll('input[data-val="true"]');
    var button = document.getElementById('submit-btn');
    var nameInput = document.getElementById('Name');
    var counter = document.getElementById('name-counter');

    function errorBox(input) {
        return form.querySelector('[data-valmsg-for="' + input.name + '"]');
    }

    // returns an error message, or "" when the value is fine
    function getError(input) {
        var d = input.dataset;
        var value = input.value.trim();

        if (value === '') {
            return d.valRequired !== undefined ? d.valRequired : '';
        }

        if (d.valLength !== undefined) {
            var min = parseInt(d.valLengthMin || '0', 10);
            var max = parseInt(d.valLengthMax || '100000', 10);
            if (value.length < min || value.length > max) { return d.valLength; }
        }

        if (d.valEmail !== undefined) {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) { return d.valEmail; }
        }

        if (d.valRange !== undefined || d.valNumber !== undefined) {
            var n = Number(value);
            if (isNaN(n) || value.indexOf('.') !== -1) {
                return d.valNumber || d.valRange;
            }
            if (d.valRange !== undefined) {
                var lo = Number(d.valRangeMin);
                var hi = Number(d.valRangeMax);
                if (n < lo || n > hi) { return d.valRange; }
            }
        }

        return '';
    }

    function check(input) {
        var message = getError(input);
        var box = errorBox(input);

        if (box) { box.textContent = message; }

        input.classList.remove('input-validation-error');
        input.classList.toggle('invalid', message !== '');
        input.classList.toggle('valid-field', message === '' && input.value.trim() !== '');
        input.setAttribute('aria-invalid', message !== '' ? 'true' : 'false');

        return message === '';
    }

    // check a field when the user leaves it, and again on every key once it has been touched
    for (var i = 0; i < inputs.length; i++) {
        (function (input) {
            input.addEventListener('blur', function () {
                input.dataset.touched = 'yes';
                check(input);
            });
            input.addEventListener('input', function () {
                if (input.dataset.touched === 'yes') { check(input); }
            });
        })(inputs[i]);
    }

    // character counter for the name
    function updateCounter() {
        if (!nameInput || !counter) { return; }
        var max = parseInt(nameInput.getAttribute('maxlength') || '60', 10);
        var length = nameInput.value.length;
        counter.textContent = length + ' / ' + max;
        counter.classList.toggle('warn', length >= max - 5);
    }
    if (nameInput) {
        nameInput.addEventListener('input', updateCounter);
        updateCounter();
    }

    // on submit: stop if any field is wrong, otherwise lock the button once
    form.addEventListener('submit', function (event) {
        var firstBad = null;

        for (var j = 0; j < inputs.length; j++) {
            inputs[j].dataset.touched = 'yes';
            if (!check(inputs[j]) && !firstBad) { firstBad = inputs[j]; }
        }

        if (firstBad) {
            event.preventDefault();
            firstBad.focus();
            return;
        }

        button.disabled = true;
        button.textContent = 'Saving...';
    });
})();
