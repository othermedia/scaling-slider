ScalingSlider = new JS.Class('ScalingSlider', {
    initialize: function(area, options) {
        this._area     = Ojay(area);
        this._options  = options || {};
        
        this._animTime = this._options.animTime || this.klass.ANIM_TIME;
    },
    
    setup: function() {
        this._container = Ojay(Ojay.HTML.div({className: 'slider-container'}));
        this._handle    = Ojay(Ojay.HTML.div({className: 'slider-handle'}));
        this._backing   = Ojay(Ojay.HTML.div({className: 'slider-backing'})).insert(this._handle);
        this._slider    = new YAHOO.util.DD(this._handle.node);
        
        this._slider.setYConstraint(0, 0);
        this._slider.onDrag = this.drag.bind(this);
        
        Ojay(window).on('resize', function(win, evnt) {
            this.rescale();
        }, this);
        
        this._area.insert(this._container, 'before')
        ._(this._container)
            .insert(this._area)
            .insert(this._backing, this._options.sliderPosition || 'top');
        
        this.rescale();
    },
    
    rescale: function() {
        this.reset();
        
        var offsetLeft  = this.getLeftOffset()  * this.ratio(),
            offsetRight = this.getRightOffset() * this.ratio();
        
        this._slider.setXConstraint(offsetLeft, offsetRight);
        
        this._handle.setStyle({
            width: this.handleWidth() + 'px',
            left:  offsetLeft + 'px'
        });
    },
    
    reposition: function(relativeCentre) {
        this._area.animate({
            left: {
                to: -relativeCentre
            }
        }, this._animTime);
    },
    
    drag: function(evnt) {
        var offsetLeft  = this._handle.node.offsetLeft,
            handleWidth = this.handleWidth(),
            centre      = offsetLeft + (handleWidth / 2);
        
        this.reposition((offsetLeft / this.ratio()).round());
    },
    
    handleWidth: function() {
        return (this.ratio() * this._containerWidth).ceil();
    },
    
    getLeftOffset: function() {
        return this._leftOffset.abs();
    },
    
    getRightOffset: function() {
        return this._areaWidth - (this.getLeftOffset() + this._containerWidth);
    },
    
    ratio: function() {
        return this._containerWidth / this._areaWidth;
    },
    
    reset: function() {
        this._containerWidth = this._container.getWidth();
        this._areaWidth      = this._area.getWidth();
        this._leftOffset     = parseInt(this._area.getStyle("left") || 0);
    },
    
    extend: {
        ANIM_TIME: 0.1
    }
});
