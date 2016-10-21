$('document').ready(function() {
    var comicCollector = new ComicCollector();
});

var ComicCollector = function() {
    this.inputSearch = $('#input-search');
    this.searchButton = $('#button-search');
    this.inputSearch.keydown(this.onInputSearchKeydown.bind(this));
    this.searchButton.on('click', this.onSearchButtonClicked.bind(this));
    this.main = $('main');
    this.main.on('click','.button-need', this.onButtonNeedClicked.bind(this));
    this.main = $('main');
    this.main.on('click','.button-own', this.onButtonOwnClicked.bind(this));
};

ComicCollector.prototype.onButtonNeedClicked = function() {
    console.log('Need clicked');

    console.log($(this).parent().find('.series-issue').data('id'));

    // console.log(this);
    // var id = $(this).data('id');

    // fire function to call api_route which posts new item in user doc/needed issues
    // passing issue ID
    // this.updatedNeed(seriesid);
};

ComicCollector.prototype.onButtonOwnClicked = function() {
    console.log('Own clicked');

    // this.updateOwn(seriesid);
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
};

ComicCollector.prototype.updatedNeed = function(seriesid) {
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
