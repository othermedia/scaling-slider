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
            handleWidth = Math.ceil(ratio * portWidth),
            offsetLeft  = Math.round((handleWidth / this._handle.getWidth()) * this._handle.node.offsetLeft),
            offsetRight = portWidth - handleWidth - offsetLeft;
        
        this._slider.setXConstraint(offsetLeft, offsetRight);
        
        this._handle.setStyle({
            width: handleWidth + 'px',
            left:  offsetLeft + 'px'
        });
    }
});
