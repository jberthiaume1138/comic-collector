(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['searchResults'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "    <div class=\"series\">\r\n        <h2>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h2>\r\n        <a href=\"/series/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\r\n            <img src=\""
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.thumbnail : depth0)) != null ? stack1.path : stack1), depth0))
    + ".jpg\" alt=\""
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "-image\" height=\"150\"/>\r\n        </a>\r\n        <div class=\"series-detail\">\r\n            <p>Started in "
    + alias4(((helper = (helper = helpers.startYear || (depth0 != null ? depth0.startYear : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"startYear","hash":{},"data":data}) : helper)))
    + "</p>\r\n            <p>Available issues: "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.comics : depth0)) != null ? stack1.available : stack1), depth0))
    + "</p>\r\n            <p>Type: "
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + " </p>\r\n        </div>\r\n        <div class=\"subscription\">\r\n            <button class=\"btnSubscribe\" type=\"button\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-title=\""
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\">Subscribe</button>\r\n        </div>\r\n    </div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<h3>Search Results</h3>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.results : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
})();