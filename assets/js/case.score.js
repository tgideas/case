(function($,Case){

    var draw = function(opts){
        var me = this;
        this.opts = $.extend({
            targetSelector:'body',
            redrawOnResize:true,
            resizeSenser:200
        },opts||{});

        this.$target = $(this.opts.targetSelector);
        this.resizeTimer = null;
        if(this.opts.redrawOnResize){
            $(window).on('resize.Case',function(e){
                clearTimeout(me.resizeTimer);
                me.resizeTimer = setTimeout(function(){
                    me.$target.empty();
                    me.init();
                },me.opts.resizeSenser);
            });
        };

        this.init();

    };
    draw.prototype.init = function(){
        var me = this;
        this.width = this.$target.width();
        this.height = this.width;
        this.radius = Math.min(this.width, this.height) / 2;
        this.innerRadius = 0.3 * this.radius;

        this.pie = d3.layout.pie()
            .sort(null)
            .value(function(d) { return d.width; });

        this.tip = d3.tip()
          .attr('class', 'd3-tip')
          .offset([0, 0])
          .html(function(d) {
            return d.data.label + ": <span style='color:orangered'>" + d.data.score + "</span>";
          });

        this.arc = d3.svg.arc()
          .innerRadius(this.innerRadius)
          .outerRadius(function (d) { 
            return (me.radius - me.innerRadius) * (d.data.score / 100.0) + me.innerRadius; 
          });

        this.outlineArc = d3.svg.arc()
                .innerRadius(me.innerRadius)
                .outerRadius(me.radius);

        this.svg = d3.select(this.opts.targetSelector).append("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .append("g")
            .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");

        this.svg.call(this.tip);

        this.data = this.opts.data || [];

        this.data.forEach(function(d) {
            d.id     =  d.id;
            d.order  = +d.order;
            d.color  =  d.color;
            d.weight = +d.weight;
            d.score  = +d.score;
            d.width  = +d.weight;
            d.label  =  d.label;
        });
      
        this.path = this.svg.selectAll(".solidArc")
            .data(this.pie(this.data))
            .enter().append("path")
            .attr("fill", function(d) { return d.data.color; })
            .attr("class", "solidArc")
            .attr("stroke", "gray")
            .attr("d", this.arc)
            .on('mouseover', this.tip.show)
            .on('mouseout', this.tip.hide);

        this.outerPath = this.svg.selectAll(".outlineArc")
            .data(this.pie(this.data))
            .enter().append("path")
            .attr("fill", "none")
            .attr("stroke", "gray")
            .attr("class", "outlineArc")
            .attr("d", this.outlineArc);  


        // calculate the weighted mean score
        this.score = 
            this.data.reduce(function(a, b) {
                //console.log('a:' + a + ', b.score: ' + b.score + ', b.weight: ' + b.weight);
                return a + (b.score * b.weight); 
            }, 0) / 
            this.data.reduce(function(a, b) { 
                return a + b.weight; 
            }, 0);

        this.svg.append("svg:text")
            .attr("class", "aster-score")
            .attr("dy", ".35em")
            .attr("text-anchor", "middle") // text-align: right
            .text(Math.round(this.score));

    };

    Case.Score = draw;

})(jQuery,window["Case"]||(window["Case"]={}));
