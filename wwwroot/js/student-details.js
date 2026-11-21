// student-details.js : print button and copy-email button
(function () {
    var printBtn = document.getElementById('print-btn');
    var copyBtn = document.getElementById('copy-email');
    var email = document.getElementById('student-email');

    if (printBtn) {
        printBtn.addEventListener('click', function () { window.print(); });
    }

    if (copyBtn && email) {
        copyBtn.addEventListener('click', function () {
            var text = email.textContent.trim();
            var done = function () {
                copyBtn.textContent = 'Copied';
                setTimeout(function () { copyBtn.textContent = 'Copy email'; }, 1500);
            };

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(done);
            } else {
                var temp = document.createElement('textarea');
                temp.value = text;
                document.body.appendChild(temp);
                temp.select();
                document.execCommand('copy');
                document.body.removeChild(temp);
                done();
            }
        });
    }
})();
