$(
    () => {
        // Get data from live site
        const endPoint = 'https://api.coinmarketcap.com/v1/ticker/?limit=10';
        const localSource = 'data/sample.json'
        const numberWithCommas = (x) => {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }


        $.get(endPoint, (data) => {
            data.forEach((item) => {
                let price = item.price_usd;
                let change = item.percent_change_24h;
                let change_percent = Math.sign(change);

                console.log(change_percent);

                if (price < 100) {
                    price = parseFloat(Math.round(price * 100) / 100).toFixed(2);
                } else {
                    price = Math.round(price)
                    price = numberWithCommas(price)
                }

                var changeClass;
                var fontAwesome;

                if(change_percent === 1) {
                    changeClass = 'green'
                    fontAwesome = 'fas fa-arrow-up'
                } else {
                    changeClass = 'red'
                }




                $("ul").append(`<li class="item">
                    <span class="currency">${item.rank}. ${item.name}</span>
                    <span class="price">$${price}</span>
                    <span class="change ${changeClass}">
                    ${change}%</span></li>`)



                // if (change_percent === (-1)) {
                //     $('.change').addClass('red')
                // }

                console.log(item.name + ": " + item.price_usd);

            })
        })

    }





)





// $(() => {
//
//         getMessages()
//
//         $('.send').click(() => {
//
//
//
//
//             // let name = $('.name_field').val()
//             // let message = $('.message_field').val()
//             //
//             // getMessages();
//             //
//             // if((name && message) !== '') {
//             //     addMessages(`{name: ${name}, message: ${message}}`)
//             //
//             //     console.log('Clicked');
//             //     console.log(name + " " + message);
//             // }
//
//
//
//         })
//     })
//
//     // const addMessages = () => {
//     //     $('.name').append(message.name)
//     //     $('.message').append(message.message)
//     // }
//     //
//     // const getMessages = () => {
//     //     $.get('/messages', (data) => {
//     //         addMessages(`{name: ${data.name}, message: ${data.message}}`)
//     //         console.log(data);
//     //     })
//     // }
//
//
//     const getMessages = () => {
//         $.get('/messages', (data) => {
//             data.forEach((item) => {
//                 console.log(item.name + " " + item.message);
//
//                 $('.single_message').append(`<h4>${item.name}</h4><p>${item.message}</p>`)
//                 // $('.message').append(item.message)
//             })
//             // console.log({name: data.name, message: data.message});
//         })
//     }
