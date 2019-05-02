$(document).ready(onReady);

function onReady() {
    getRestaurants();
    $('.js-btn-addRestaurant').on('click', addRestaurant);
    $('.container').on('click', '.js-btn-remove', deleteRestaurant);
    $('.container').on('click', '.restaurant', updateRestaurant);
}

function addRestaurant() {
    const name = $('#name').val();
    const address = $('#address').val();
    const bestfood = $('#bestfood').val();

    const restaurantObject = {
        name,
        address,
        bestfood
    }

    postRestaurant(restaurantObject);
}

function postRestaurant(restaurantObject) {
    $.ajax({
        type: 'POST',
        url: '/restaurants',
        data: restaurantObject
    }).then(function(response) {
        getRestaurants();
    })
}

function getRestaurants() {
    $.ajax({
        type: 'GET',
        url: '/restaurants'
    }).then(function(arrayFromDatabase) {
        render(arrayFromDatabase);
    });
}

function updateRestaurant() {
    const restaurantId = $(this).data('id');

    $.ajax({
        type: 'PUT',
        url: '/restaurants/visited/'+ restaurantId
    }).then(function(response) {
        getRestaurants();
    });
}

function deleteRestaurant() {
    const restaurantId = $(this).parent().data('id');
    console.log(restaurantId);

    $.ajax({
        type: 'DELETE',
        url: '/restaurants/delete/' + restaurantId
    }).then(function(response) {
        getRestaurants();
    });
}

function render(arrayFromDatabase) {
    $('.container').empty();

    for (let restaurant of arrayFromDatabase) {
        let visitedString = 'Have not checked out yet!';

        if(restaurant.visited == true) {
            visitedString = 'Checked out!';
        }

        $('.container').append(`
            <div data-id="${restaurant.id}" class="restaurant">
                <h2>${restaurant.name} - ${visitedString}</h2>
                <h6>${restaurant.address}</h6>
                <p>${restaurant.bestfood}</p>
                <button class="js-btn-remove">REMOVE</button>
            </div>
        `);

        if(restaurant.visited == true) {
            const element = $('.container').children().last();
            element.addClass('visited');
        }
    }
}