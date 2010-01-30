ScalingSlider = new JS.Class('ScalingSlider', {
    initialize: function(area, options) {
        this._area    = Ojay(area);
        this._options = options || {};
    },
    
    setup: function() {
        this._handle  = Ojay(Ojay.HTML.div({className: 'slider-handle'}));
        this._backing = Ojay(Ojay.HTML.div({className: 'slider-backing'}))
            .insert(this._handle);
        
        this._slider = new YAHOO.util.DD(this._handle.node);
        this._slider.setYConstraint(0, 0);
        
        this._area.insert(this._backing, this._options.position || 'top');
        
        Ojay(window).on('resize', function(win, evnt) {
            this.rescale();
        }, this);
        
        this.rescale();
    },
    
    rescale: function() {
        var portWidth   = Ojay.getViewportSize().width,
            areaWidth   = this._area.getWidth(),
            ratio       = portWidth / areaWidth,
            handleWidth = ratio * portWidth;
        
        // Bugs here!
        // Left constraint shouldn't be zero
        // Right constraint needs recalculating to take account of current position!
        this._slider.setXConstraint(0, portWidth - handleWidth);
        
        this._handle.setStyle({
            width: handleWidth + 'px';
        });
    }
});
