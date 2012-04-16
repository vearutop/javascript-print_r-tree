var phpPrintRBeautifier = {
    prepareString: function(s) {
        s = s.replace(/(Array|Object)\n(\s*)\(/g,
            '<a href="#" onclick="phpPrintRBeautifier.toggleDisplay(this.nextSibling);return false;">$1</a><span class="debug-data" style="display:none"> <a href="#" onclick="phpPrintRBeautifier.toggleChildren(this.parentNode);return false">+</a> <a href="#" onclick="phpPrintRBeautifier.toggleRecursive(this.parentNode);return false;">*</a>\n$2(');
        s = s.replace(/\n(\s*?)\)\n/g, '\n$1)\n</span>');
        return s;
    },

    toggleDisplay: function(e, show) {
        if ('undefined' != typeof show) {
            e.style.display = show ? '' : 'none';
        }
        else {
            e.style.display = e.style.display == 'none' ? '' : 'none';
        }
    },

    toggleChildren:function (e, show) {
        for (var i = 0; i < e.childNodes.length; ++i) {
            if ('debug-data' == e.childNodes[i].className) {
                phpPrintRBeautifier.toggleDisplay(e.childNodes[i], show);
            }
        }
    },

    toggleRecursive:function (e, show) {
        for (var i = 0; i < e.childNodes.length; ++i) {
            if ('debug-data' == e.childNodes[i].className) {
                phpPrintRBeautifier.toggleChildren(e.childNodes[i], show);
            }
        }
    },

    prepare: function(e) {
        e.innerHTML = phpPrintRBeautifier.prepareString(e.innerHTML);
    }
};
