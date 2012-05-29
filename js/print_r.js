// https://github.com/vearutop/javascript-print_r-tree

var phpPrintRBeautifier = {
    prepareString: function(s) {
        return s.replace(/(Array|Object)\n(\s*)\(/g,
            '<span class="debug-controls"><a href="#" onclick="phpPrintRBeautifier.toggleDisplay(this.parentNode.nextSibling);return false;">$1</a> ' +
                '<a href="#" onclick="phpPrintRBeautifier.toggleChildren(this.parentNode.nextSibling, false);return false" title="toggle children">\\</a> ' +
                '<a href="#" onclick="phpPrintRBeautifier.toggleChildren(this.parentNode.nextSibling, true);return false;" title="toggle recursive">*</a> ' +
                '</span><span class="debug-data" style="display:none"> ' +
                '\n$2(')
            .replace(/\n(\s*?)\)\n/g, '\n$1)\n</span>');
    },

    autoShow: function(e, level) {
        var show;
        if (!level) {
            return e.style.display == 'none';
        }
        else {
            for (var i = 0; i < e.childNodes.length; ++i) {
                if ('debug-data' == e.childNodes[i].className) {
                    show = this.autoShow(e.childNodes[i], level - 1);
                    if (-1 != show) {
                        return show;
                    }
                }
            }
        }
        return -1;
    },


    toggleDisplay: function(e, show) {
        if ('undefined' == typeof show) {
            show = this.autoShow(e, 0);
        }

        e.style.display = show ? '' : 'none';
        return show;
    },

    toggleChildren:function (e, recursive, show) {
        if ('undefined' == typeof show) {
            show = this.autoShow(e, recursive ? 2 : 1);
            if (-1 == show) {
                if (recursive) {
                    return this.toggleChildren(e, false);
                }
                else {
                    return this.toggleDisplay(e);
                }
            }
        }
        for (var i = 0; i < e.childNodes.length; ++i) {
            if ('debug-data' == e.childNodes[i].className) {
                this.toggleDisplay(e.childNodes[i], show);
                if (recursive) {
                    this.toggleChildren(e.childNodes[i], true, show);
                }
            }
        }
        if (show) {
            this.toggleDisplay(e, show);
        }
    },

    prepare: function(e) {
        e.innerHTML = this.prepareString(e.innerHTML);
    }
};
