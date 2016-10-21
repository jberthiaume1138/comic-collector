$('document').ready(function() {
    var comicCollector = new ComicCollector();
});

var ComicCollector = function() {
    var self = this;
    this.inputSearch = $('#input-search');
    this.searchButton = $('#button-search');
    this.inputSearch.keydown(this.onInputSearchKeydown.bind(this));
    this.searchButton.on('click', this.onSearchButtonClicked.bind(this));
    self.main = $('main');
    self.main.on('click','.button-need', function() {
        self.updateNeed($(this).data('id'));
    });
    self.main = $('main');
    self.main.on('click','.button-own', function() {
        self.updateOwn($(this).data('id'));
    });
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

    //redirect? need to go to /search/searchTerms
    // getJSON('/api/search')
    //     pass the string
    //     gets the json

    console.log(searchTerms);
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
