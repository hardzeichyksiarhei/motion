(function ($) {

    function CssPallete(cssExtension, nameCssFile) {
        var
            ms = document.getElementById("skins");

        if (nameCssFile === undefined) {
            ms.href += 'default.min.css';
            document.cookie = 'colorPallete=default';
        }
        else {
            var
                hf = ms.href,
                hf_array = hf.split('/');
            hf_array[hf_array.length - 1] = nameCssFile + cssExtension;
            ms.href = hf_array.join('/');
            document.cookie = 'colorPallete=' + nameCssFile;
        }
    }

    function getCookie(name) {
        var matches = document["cookie"]["match"](new RegExp("(?:^|; )" + name["replace"](/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined
    }

    $.fn.colorPallete = function (options) {

        // Создаём настройки по-умолчанию, расширяя их с помощью параметров, которые были переданы
        var settings = $.extend({
            cssExtension: '.min.css',
            pathSkins: 'css/',
            width: 200,
            height: 'auto',
            cogAnimate: 'false',
            nameColorCss: 'none',
            itemsColorPallete: 'none'
        }, options);

        return this.each(function () {

            var
                ms = document["createElement"]("link");
            ms["rel"] = "stylesheet";
            ms["href"] = settings.pathSkins;
            ms["id"] = "skins";
            document["getElementsByTagName"]("head")[0]["appendChild"](ms);

            CssPallete(settings.cssExtension, getCookie('colorPallete'));

            var
                colorPallete = $(this),
                colorContainer = colorPallete.find('.color-container');

            colorPallete.css({
                'margin-left': '-' + settings.width + 'px'
            });

            colorContainer.css({
                'width': settings.width + 'px',
                'height': settings.height + 'px'
            });

            if (settings.cogAnimate === 'true') {
                $(this).find('i').addClass('fa-spin');
            }


            var active_color_pallete = false;
            $(this).find('span.cog').on('click', function () {
                if (!active_color_pallete) {
                    $(this).parent().animate({marginLeft: '0'});
                    active_color_pallete = true;
                }
                else {
                    $(this).parent().animate({marginLeft: '-=' + settings.width + 'px'});
                    active_color_pallete = false;
                }

            });

            var itemClrPal = settings.itemsColorPallete;
            var str = '';

            colorContainer.append('<div class="items-color-pallete"></div>');
            $(itemClrPal).each(function (i, item) {
                str = '';
                str += '<span style="display: inline-block; font-size: 18px; vertical-align: middle; width: 60px; text-align: right;">' + settings.nameColorCss[i] + ':&nbsp;</span>';
                $(item).each(function (j, color) {
                    str += '<span style="display: inline-block; vertical-align: middle; padding: 12px; background-color: ' + color + ';"></span>';
                });
                str = '<p style="cursor: pointer;" id="' + "pallete_" + i + '">' + str + '</p>';
                colorContainer.append(str);
                $('#pallete_' + i).bind('click', function () {
                    CssPallete(settings.cssExtension, settings.nameColorCss[i]);
                });
            });

        });
    };
})(jQuery);
