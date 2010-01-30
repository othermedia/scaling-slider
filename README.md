ScalingSlider
=============

A slider control based on YUI's [Drag & Drop Utility][dd] that will scale with
the browser window.


Usage
-----

    <div id="scalable-area"></div>
    
    <script type="text/javascript">
        require('ScalingSlider', function() {
            var slider = new ScalingSlider('#scalable-area', {
                direction: 'horizontal'
            });
        });
    </script>


Requirements & dependencies
---------------------------

To generate build files for production use and testing, you'll need two Ruby
libraries, [Jake][jake] and [Helium][he].

    gem install jake helium

`ScalingSlider` depends on JS.Class, Ojay, and the YUI Drag & Drop Utility.
Running the `jake` command in the library's main directory will build a
packages file to allow `ScalingSlider` to be used with the `JS.Packages`
on-demand loading system. This also allows the library to be served via the
Helium deployment system.

Alternatively, if you want to use a different loading system, the following
dependencies will need to be loaded before including the library in the page.

  * `JS.Class`
  * `Ojay`
  * `Ojay.HTML`
  * `YAHOO.util.DD`

To run the test suite, simply amend the `index.html` file in the `test`
directory to point to your Helium server, and open it in a browser.


  [dd]:   http://developer.yahoo.com/yui/dragdrop/
  [jake]: http://github.com/jcoglan/jake
  [he]:   http://github.com/othermedia/helium
