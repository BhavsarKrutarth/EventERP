/****************************************
 *  jQuery 
 *
 *  @copyright jhoneleeo@gmail.com
 *  @version 1.0.0
 *  Date: 2017-3-5
 ****************************************/
(function ($) {
    /**
     * @function contextMenu
     * @param {Object} data 
     * @param {Object} options 
     */
    $.fn.contextMenu = function (data, options) {

        var $body = $("body"),
            defaults = {
                name: "", 
                offsetX: 15, 
                offsetY: 5, 
                beforeShow: $.noop, 
                afterShow: $.noop 
            };

        var params = $.extend(defaults, options || {}), keyMap = {},
            idKey = "site_cm_", classKey = "site-cm-",
            name = name || ("JCM_" + +new Date() + (Math.floor(Math.random() * 1000) + 1)),
            count = 0;

        /**
         * @param {*} mdata
         */
        var buildMenuHtml = function (mdata) {
                var menuData = mdata || data,
                    idName = idKey + (mdata ? count++ : name),
                    className = classKey + "box";

                var $mbox = $('<div id="' + idName + '" class="' + className + '" style="position:absolute; display: none;">');

                $.each(menuData, function (index, group) {
                    if (!$.isArray(group)) {
                        throw TypeError();
                    }
                    index && $mbox.append('<div class="' + classKey + 'separ">');
                    if (!group.length) {
                        return;
                    }
                    var $ul = $('<ul class="' + classKey + 'group">');
                    $.each(group, function (innerIndex, item) {
                        var key, $li = $("<li>" + item.text + ($.isArray(item.items) && item.items.length ? buildMenuHtml(item.items) : "") + "</li>");
                        $.isFunction(item.action) && (key = (name + "_" + count + "_" + index + "_" + innerIndex), keyMap[key] = item.action, $li.attr("data-key", key));
                        $ul.append($li).appendTo($mbox);
                    });
                });
                var html = $mbox.get(0).outerHTML;
                $mbox = null;
                return html;
            },
          
            createContextMenu = function () {
                var $menu = $("#" + idKey + name);
                if (!$menu.length) {
                    var html = buildMenuHtml();
                    $menu = $(html).appendTo($body);
                    $("li", $menu).on("mouseover", function () {
                        $(this).addClass("hover").children("." + classKey + "box").show();
                    }).on("mouseout", function () {
                        $(this).removeClass("hover").children("." + classKey + "box").hide();
                    }).on("click", function () {
                        var key = $(this).data("key");
                        key && (keyMap[key].call(this) !== false) && $menu.hide(); 
                    });
                    $menu.on("contextmenu", function () {
                        return false;
                    });
                }
                return $menu;
            };

        $body.on("mousedown", function (e) {
            var jid = ("#" + idKey + name);
            !$(e.target).closest(jid).length && $(jid).hide();
        });

        return this.each(function () {

            $(this).on("contextmenu", function (e) {

                if ($.isFunction(params.beforeShow) && params.beforeShow.call(this, e) === false) {
                    return;
                }

                e.cancelBubble = true;
                e.preventDefault();

                var $menu = createContextMenu();
                $menu.show().offset({left: e.clientX + params.offsetX, top: e.clientY + params.offsetY});

                $.isFunction(params.afterShow) && params.afterShow.call(this, e)
            });

        });
    };
})(jQuery);
