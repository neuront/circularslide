-function($){
    $.fn.circularslide = function(opt) {
        opt = opt || {};
        var tick = opt.tick || 20;
        var width = opt.width || 800;
        var height = opt.height || 600;
        var borderSize = opt.borderSize || 0;
        var borderColor = opt.borderColor || 'transparent';
        return this.each(function() {
            var me = $(this);
            if (me.children().length < 2) {
                return;
            }
            var slider = $('<div>');
            slider.css({
                width: width + borderSize * 2,
                height: height + borderSize * 2,
                overflow: 'hidden'
            });
            var frames = [];
            me.children().each(function() {
                var child = $(this);
                child.detach();
                var frame = $('<div>').css({
                    height: 0,
                    width: 0
                });
                frames.push(frame);
                slider.append(frame.append($('<div>').append(child).css({
                    height: 0,
                    width: 0,
                    'border-size': borderSize,
                    'border-color': borderColor,
                    'border-style': 'solid',
                    overflow: 'hidden',
                    position: 'relative'
                })));
                child.css({
                    width: width,
                    height: height,
                    position: 'relative'
                });
            });
            me.append(slider);
            frames[0].children().css({
                height: height,
                width: width
            });
            this.slideTo = function(elementIndex, cb, cx, cy) {
                var fr = frames[elementIndex];
                cb = cb || function() {};
                if (fr.lock) {
                    return cb(false);
                }
                fr.lock = true;
                cx = cx || Math.random() * width;
                cy = cy || Math.random() * height;
                var cr = fr.children();
                var el = cr.children();
                fr.detach();
                slider.append(fr);
                var radius = 0, maxRadius = 2 * Math.max(width, height);
                var dx = cx - radius, dy = cy - radius;
                cr.css({'border-radius': '50%'});
                function nextFrame() {
                    if (radius < maxRadius) {
                        radius += 12;
                        dx = cx - radius;
                        dy = cy - radius;
                        cr.css({
                            height: radius * 2,
                            width: radius * 2,
                            left: dx,
                            top: dy,
                        });
                        el.css({
                            left: -dx,
                            top: -dy
                        })
                        return setTimeout(nextFrame, tick);
                    }
                    cr.css({
                        height: height,
                        width: width,
                        left: 0,
                        top: 0,
                        'border-radius': 0
                    });
                    el.css({
                        left: 0,
                        top: 0
                    });
                    fr.lock = false;
                    return cb(true);
                }
                nextFrame();
            };
        });
    };
}(jQuery);
