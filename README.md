# CircularSlide

A jQuery plugin for circular sliding.

Open sample.html in your browser.

## API

To attach sliding effect to DOM, use `circularslide` like this

    $(...).circularslide(options)

where `options` is an object that has any of the following properties

    tick: time interval (in ms) between animation frames     (default 20)
    step: radius increment (in px) between animation frames  (default 12)
    width : width of the container `div` element             (default 800)
    height: height of the container `div` element            (default 600)
    borderSize:  add a border when sliding                   (default 0, means no border)
    borderColor: change the color of the border when sliding (default transparent, means no border)
    index: indicate which child to show after initialization (default 0)

The element selected by jQuery should contains at least 2 children (otherwise no way to slide between them).
Each of its children will be fit to another parent container (whose height and width is specified as above), and the animation is generally showing or hiding those parents.
So please note after using `circularslide` the DOM structure would be changed.

To slide between different elements, use `slideTo` from DOM element (not jQuery select result) like this

    $(...)[0].slideTo(index, callback, x, y);

where

    index    : an proper integer indicating which element to slide to
    (x, y)   : the center point of the sliding animation
    callback : a callback function that takes one boolean argument indicating whether the animation is executed

There are several reasons could get the animation not fired and callback is called with `false`

* The index of the current element equals to the `index` you give
* Animation for the element specified by the index is not finished yet
