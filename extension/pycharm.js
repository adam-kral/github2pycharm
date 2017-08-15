(function(){
    function findAncestorWithClass (el, cls) {
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
    }

    function getFilePath(class_file_element) {
        var filePath = class_file_element.children[0].getAttribute('data-path');  // /pull/<number>/files
        if (!filePath) {  // /pull/<number> diff comment
            filePath = class_file_element.children[0].children[0].getAttribute('title');
        }

        return filePath;
    }

    function onClickLine(event) {
        if (!(event.ctrlKey || event.metaKey)) return;

        var lineNumber = this.previousElementSibling.getAttribute('data-line-number');

        if (lineNumber === null || lineNumber === '') {
            lineNumber = this.previousElementSibling.previousElementSibling.getAttribute('data-line-number');  // a deletion line, get original line number
        }

        var req = new XMLHttpRequest();
        req.open("POST", "http://127.0.0.1:50007/");
        req.setRequestHeader("Content-Type", "application/json");

        req.send(JSON.stringify({
            repositoryName: repositoryName,
            filePath: getFilePath(findAncestorWithClass(this, 'file')),
            lineNumber: lineNumber
        }));
    }

    function onClickExpandableRegion() {                 // addEventListeners on expanded lines
        var fileDiff = findAncestorWithClass(this, 'file');
        var range = this.children[0].getAttribute('data-left-range').split('-');

        setTimeout(function(){  // wait till github loads new lines
            Array.from(fileDiff.getElementsByClassName('blob-expanded')).forEach(function(line){
                var leftLineNumber = parseInt(line.children[0].getAttribute('data-line-number'));
                if (range[0] <= leftLineNumber && leftLineNumber <= range[1]) {  // is newly added line
                    line.getElementsByClassName('blob-code')[0].addEventListener('click', onClickLine);
                }
            });
        }, 1000);

    }

    var repositoryName = document.getElementsByClassName('repohead')[0].querySelector('[itemprop=name]').textContent;
    var fileDiffs = document.getElementsByClassName('file');

    Array.from(fileDiffs).forEach(function(fileDiff){
        Array.from(fileDiff.getElementsByClassName('blob-code')).forEach(function(line){
            line.addEventListener('click', onClickLine);
        });

        Array.from(fileDiff.getElementsByClassName('blob-num-expandable')).forEach(function(expandableLine){
            expandableLine.addEventListener('click', onClickExpandableRegion);
        });
    });
})();