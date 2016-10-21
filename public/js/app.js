$('document').ready(function() {
    var comicCollector = new ComicCollector();
});

$('main').on('click','.button-need', function() {
    console.log('need clicked');
    console.log($(this).data('id'));

    var id = $(this).data('id');

    // fire function to call api_route which posts new item in user doc/needed issues
    // passing issue ID
    comicCollector.updatedNeed(id);
});

$('main').on('click','.button-own', function() {
    console.log('own clicked');
    console.log($(this).data('id'));

    var id = $(this).data('id');

    // fire function to call api_route which posts new item in user doc/owned issues
    // passing issue ID
    comicCollector.updateOwn(id);
});

var ComicCollector = function() {
    this.inputSearch = $('#input-search');
    this.searchButton = $('#button-search');
    this.inputSearch.keydown(this.onInputSearchKeydown.bind(this));
    this.searchButton.on('click', this.onSearchButtonClicked.bind(this));
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

ComicCollector.prototype.updatedNeed = function(seriesid) {
    // call /api/
};

ComicCollector.prototype.updateOwn = function(seriesid) {
    // call /api/
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

ComicCollector.prototype.searchMarvel = function(searchTerms) {
    // search Marvel's API
    console.log(searchTerms);

    // don't want this in the client side files --- this needs to be moved
    var pub = '';
    var priv = '';

    var ts = new Date().getTime();

    var hash = crypto.MD5(ts + priv + pub).toString();

    var url = 'http://gateway.marvel.com:80/v1/public/series/';
    var seriesId = req.params.id;

    var params = {  "apikey": pub,
                    "ts": ts,
                    "hash": hash
                };

    $.getJSON(url, params)
        .done(function(data) {
            console.log(data);
        });
};
