$(document).ready(function() {

  var key = 'UpiMHAYksgBgbzIs6JAfkehdMNg1vtdu';
  var limit = 10;
  var presets = ['kaleidoscope', 'kite', 'blue', 'random'];

  function setPresets() {
    for (i = 0; i < presets.length; i++) {
      var li = $('<li>');
      var btn = $('<button/>');
      btn.addClass('preset');
      btn.text(presets[i]).data('name', presets[i]);
      li.append(btn);
      $('#presetBtns').append(li);
    }
  }

  $(document).on('click', '.preset', function() {
    event.preventDefault();
    var name = $(this).data('name');
    console.log('name of clicked button: ', name);
    removeWhite(name);
  });

  function removeWhite(name) {
    name = name.split(' ').join('');
    getGif(name);
  }

  function getGif(name) {
    let url = 'http://api.giphy.com/v1/gifs/search?q=' + name + '&api_key=' + key + '&limit=' + limit;
    $.ajax({
      url: url,
      method: "GET"
    }).then(function(response) {
      console.log('url: ', url);
      console.log('this is the response Obj: ', response);
      displayIt(response.data);
      // animate(response);
    })
  }

  function displayIt(gifs) {
    // NOTE why does spot & gifImg not need a var to define it?
    for (i = 0; i < limit; i++) {
      var stillUrl = gifs[i].images.original_still.url;
      var animatedUrl = gifs[i].images.original.url;
      spot = $('<div>');
      gifImg = $('<img>').addClass('gif');
      gifImg.attr({
        src: stillUrl,
        'data-state': 'still',
        'data-still': stillUrl,
        'data-animate': animatedUrl,
      });
      spot.append(gifImg);
      $('#gifs').prepend(spot);
    }
  }

  setPresets();

  $('#findIt').click(function() {
    var searchTerm = $('input').val();
    presets.push(searchTerm);
    $('input').val('');
    $('#presetBtns').empty();
    setPresets();
    getGif(searchTerm);
  })

  $('input').keyup(function(event) {
    if (event.keyCode === 13) {
        $('#findIt').click();
    }
  });

  $(document).on('click', '.gif', animate);

  function animate() {

    console.log('this', this);
    var state = $(this).attr('data-state');

    if (state === 'still') {
      //console.log('what is the clicked element??? ', src);
      var animatedUrl = $(this).attr('data-animate');
      $(this).attr({
        src: animatedUrl,
        'data-state': 'animated'
      });
      // event.target.src = 'Obj.data[i].images.original.url';
    } else {
      var stillUrl = $(this).attr('data-still');
      $(this).attr({
        src: stillUrl,
        'data-state': 'still'
      });
      // response.src = 'Obj.data[i].images.original_still.url';
    }
  }

});
