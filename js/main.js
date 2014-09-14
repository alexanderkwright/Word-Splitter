// Set variables for main input box and strip button
var input = document.getElementById('word_input'),
    strip = document.getElementById('word_strip'),
    reset = document.getElementById('word_reset');

// Strip out word junk when strip button clicked
strip.addEventListener('click', function() {
    if (checkInput(input.value)) {
        parseHTML(input.value);
        this.parentNode.classList.add('reset-available');
    }
});

// Empty the textarea and remove reset button
reset.addEventListener('click', function() {
    input.value = '';
    this.parentNode.classList.remove('reset-available');
    this.removeEventListener('click');
});

// Make sure there is input in the textarea
function checkInput(str) {
    return (str !== undefined && str !== '');
}

// Strip out all tags other than table, tr, td, a
// Remove all style and class attributes
function parseHTML(str) {
    str = strip_tags(str, '<table><tr><td><a>');
    var wrapper = document.createElement('div');
    wrapper.innerHTML = str;
    walk_the_DOM(wrapper, function(el) {
        if(el.removeAttribute) {
            el.removeAttribute('style');
            el.removeAttribute('class');
        }
    });

    input.value = wrapper.innerHTML;
}
