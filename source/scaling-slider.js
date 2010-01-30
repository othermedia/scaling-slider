ScalingSlider = new JS.Class('ScalingSlider', {
    initialize: function(area, options) {
        this._area    = Ojay(area);
        this._options = options || {};
    },
    
    setup: function() {
        this._container = Ojay(Ojay.HTML.div({className: 'slider-container'}));
        this._handle    = Ojay(Ojay.HTML.div({className: 'slider-handle'}));
        this._backing   = Ojay(Ojay.HTML.div({className: 'slider-backing'})).insert(this._handle);
        this._slider    = new YAHOO.util.DD(this._handle.node);
        
        this._slider.setYConstraint(0, 0);
        
        Ojay(window).on('resize', function(win, evnt) {
            this.rescale();
        }, this);
        
        this._slider.onDrag = function(evnt) {
            var offset = Math.floor(this._handle.node.offsetLeft / this._ratio);
            this._area.animate({left: {to: -offset}}, 0.1);
        }.bind(this);
        
        this._area.insert(this._container, 'before')
        ._(this._container)
            .insert(this._area)
            .insert(this._backing, this._options.position || 'top');
        
        this.rescale();
    },
    
    rescale: function() {
        var portWidth   = Ojay.getViewportSize().width,
            areaWidth   = this._area.getWidth(),
            handleWidth, offsetLeft, offsetRight;
        
        this._ratio = portWidth / areaWidth;
        
        handleWidth = Math.ceil(this._ratio * portWidth);
        offsetLeft  = Math.round((handleWidth / this._handle.getWidth()) * this._handle.node.offsetLeft);
        offsetRight = portWidth - handleWidth - offsetLeft;
        
        this._slider.setXConstraint(offsetLeft, offsetRight);
        
        this._handle.setStyle({
            width: handleWidth + 'px',
            left:  offsetLeft + 'px'
        });
    }
});
