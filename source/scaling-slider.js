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
        Ojay(window).on('resize', this.rescale, this);
        this._backing.on('click', this.click, this);
        
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
            position: 'relative',
            width:    this.handleWidth() + 'px',
            left:     offsetLeft + 'px'
        });
    },
    
    reposition: function(x) {
        var offset = (x / this.ratio()).ceil();
        
        this._area.animate({
            left: {
                to: -offset
            }
        }, this._animTime);
    },
    
    click: function(target, evnt) {
        if (evnt.getTarget().node !== this._backing.node) return;
        
        var centre = evnt.clientX,
            offset = centre - (this.handleWidth() / 2).floor();
        
        if (offset + this.handleWidth() > this._containerWidth) {
            offset = this._containerWidth - this.handleWidth();
        } else if (offset < 0) {
            offset = 0;
        }
        
        this._handle.setStyle({left: offset + 'px'});
        this.reposition(offset);
    },
    
    drag: function(evnt) {
        this.reposition(this._handle.node.offsetLeft);
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
