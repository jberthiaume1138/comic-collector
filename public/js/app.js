$('document').ready(function() {
    var comicCollector = new ComicCollector();
});

var ComicCollector = function() {
    var self = this;
    this.inputSearch = $('#input-search');
    this.searchButton = $('#button-search');
    this.inputSearch.keydown(this.onInputSearchKeydown.bind(this));
    this.searchButton.on('click', this.onSearchButtonClicked.bind(this));
    // this.template = Handlebars.compile($('#search-results-template').html());
    this.$searchTemplate = $('#search-results-template').html();
    this.$searchResultsDiv = $('#results');
    self.main = $('main');
    self.main.on('click','.button-need', function() {
        self.updateNeed($(this).data('id'));
    });
    self.main = $('main');
    self.main.on('click','.button-own', function() {
        self.updateOwn($(this).data('id'));
    });
};

ComicCollector.prototype.renderData = function(data, template, target) {
    console.log(data);
    console.log(template);
    console.log(target);

    var compiledTemplate = Handlebars.compile(template);
    var html = compiledTemplate(data);

    target.html(html);
};

ComicCollector.prototype.onInputSearchKeydown = function(event) {
    if (event.keyCode == 13 ) {
        this.searchMarvel(this.inputSearch.val().trim());
    }
};

ComicCollector.prototype.onSearchButtonClicked = function() {
    var searchTerms = this.inputSearch.val().trim();
    this.searchMarvel(searchTerms);
};

ComicCollector.prototype.searchMarvel = function(searchTerms) {
    // search Marvel's API
    var self = this;
    $.getJSON('/api/search/' + searchTerms)
        .fail(function() {
            console.log('ERROR searching');
            // show some kind of user message that search failed
        })
        .done(function(data) {
            self.renderData(data, self.$searchTemplate, self.$searchResultsDiv);
        });
};

ComicCollector.prototype.updateNeed = function(seriesid) {
    // call /api/
    console.log(seriesid);
};

ComicCollector.prototype.updateOwn = function(seriesid) {
    // call /api/
    console.log(seriesid);
};

ComicCollector.prototype.getSeries = function(seriesid) {
    // $.getJSON('/api/series/20617')
    //     .fail(function() {
    //         console.log('ERROR reading data!');
    //     })
    //     .done(function(data) {
    //         console.log(data);
    //     });
};
