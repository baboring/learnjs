"use strict";

var learnjs = {};

learnjs.problems = [
    {
        description: "What is truth?",
        code: "function problem() { return __; }"
    },
    {
        description: "Simple Math",
        code: "function problem() { return 42 === 6 * __; }"
    }
];

learnjs.applyObject = function(obj, elm) {
    for(var key in obj)
        elm.find('[data-name="' + key + '"]').text(obj[key]);
}

learnjs.template = function(name) {
    return $('.templates .' + name).clone();
}

learnjs.flashElement = function(elm, content) {
    elm.fadeOut('fast',function() {
        elm.html(content);
        elm.fadeIn();
    });
}

learnjs.problemView = function(data) {
    var problemNumber = parseInt(data, 10);
    var view = learnjs.template('problem-view');
    var problemData = learnjs.problems[problemNumber - 1];
    var resultFlash = view.find('.result');

    function checkAnswer() {
        var answer = view.find('.answer').val();
        var test = problemData.code.replace('__',answer) + '; problem();';
        return eval(test);
    }

    function checkAnswerClick() {
        if(checkAnswer()) {
            var correctFlash = learnjs.template('correct-flash');
            correctFlash.find('a').attr('href','#problem/'+ (problemNumber + 1));
            learnjs.flashElement(resultFlash,correctFlash);
        }
        else {
            learnjs.flashElement(resultFlash,'Incorrect!');
        }
        return false;
    }
    view.find('.check-btn').click(checkAnswerClick);
    view.find('.title').text('Problem #' + problemNumber);
    learnjs.applyObject(problemData, view);
    return view;
}

learnjs.showView = function(hash) {
    var routes = {
        '#problem' : learnjs.problemView
    };

    var hashParts = hash.split('/');

    var viewFn = routes[hashParts[0]];
    if(viewFn) {
        $('.view-container').empty().append(viewFn(hashParts[1]));
    }
}

learnjs.appOnReady = function() {
    window.onhashchange = function() {
        learnjs.showView(window.location.hash);
    };
    learnjs.showView(window.location.hash);
}