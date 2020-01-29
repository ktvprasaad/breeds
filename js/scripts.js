// IIFE - Immeditaly Invoked Function Expression --> (function () {})();
var dogHouse = (function () {
    var dogRepository = [],
        apiUrl = 'https://dog.ceo/api/breeds/list/all';

    /* Add the loaded new dog breed to our house */
    function add(newBreed) {
        dogRepository = newBreed;
    }
    /* Load dog from the api thru http's fetch method and Promise class */
    function loadList() {
        return $.ajax(apiUrl, {
            method: 'GET',
            dataType: 'json'
        }).then(function (allBreeds) {
			const breed = Object.keys(allBreeds.message);
			add(breed);
        }).catch(function (e) {
            console.error(e);
        });
    }

    /* get all the dogs from our repository */
    function getAll() {
        return dogRepository;
    }

    /* show details of the specific dog that is clicked by the user */
    function showDetails(event, dog) {
        var url = 'https://dog.ceo/api/breed/'+ dog + '/images/random';
        $.ajax(url, {
            method: 'GET',
            dataType: 'json'
        }).then(function (message) {
			let dogImage = Object.values(message);
			
			let strIndex = dogImage[0].indexOf('-');
			if (strIndex > -1 ) {
				let startStr = dogImage[0].slice(strIndex )  ;
				let endIndex = startStr.indexOf('/');
				let subBreed = dogImage[0].slice(strIndex + 1, strIndex + endIndex ); 
                dog = subBreed.charAt(0).toUpperCase() + subBreed.slice(1) + ' ' + dog;
			}

			$('.modal-title').text(dog.charAt(0).toUpperCase() + dog.slice(1));
			var modalDiv = $('<div></div>'),
                modalElementImg = $('<img src="' + dogImage[0] + '" alt="' + dog + 'breeds\'s Image" class="img-responsive">');			

            var modalDiv = $('<div></div>'),
                modalElementImg = $('<img src="' + dogImage[0] + '" alt="' + dog + 'breeds\'s Image">');

            modalDiv.append(modalElementImg);

            $('.modal-body').html(modalDiv);

        }).catch(function (e) {
            console.error(e);
        });
    }

    /* DOM - Document Object Model - Add all the dogs name alone from the
    repository to the html list */
    function addListItem(dog) {
        var divItemElement = $('<div class="dog-div--item"></div>'),
            divElement = $('<div class="col-1 col-lg-4 col-md-3"></div>'),
        /* To create 'button' element */
        // var buttonElement = $(`<button type="button" class="btn-dog btn btn-primary" data-toggle="modal" data-target="#dog-modal">${dog}</button>`);
            buttonElement = $('<button type="button" class="btn-dog btn btn-primary" data-toggle="modal" data-target="#dog-modal">' + dog + '</button>');
        divElement.append(buttonElement);
        divItemElement.append(divElement);
        $('.dog-div').append(divItemElement);
        buttonElement.on('click', function (event) {showDetails(event, dog); });
    }

    return {
        loadList: loadList,
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails
    };
}());

dogHouse.loadList().then(function () {
    'use strict';
    $.each(dogHouse.getAll(),function (_,dogBreed) {
			dogHouse.addListItem(dogBreed)
		});
      //  dogHouse.addListItem(dogHouse.getAll());
    });

    //$(document).ready(function () {
    $('.doggy').on('input', function () {
        var searchKey = $('.doggy').val().trim().toLowerCase();
        $('.dog-div--item').filter(function () {
            // returns only which is true and the toggle hides or makes it visible if the user keyed in exists in the dog-div--item
            $(this).toggle($(this).text().toLowerCase().indexOf(searchKey) > -1);
        });
    });

    //});
//});