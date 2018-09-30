
const data = [{
    id : 1,
    logo : 'logo.png',
    commercialName : "Rest 1",
    legalName : "Rest Legal 1",
    rating : 3, //(float max 5 min 1),
    reviews : [
        {
            name : "Rev 1",
            review : "Rev text 1",
            rating : 3,
        }
    ],
    meals : [
        {
            name : 'Parrillada',
            description : 'Parrillada completa',
            price : 300,
        },
        {
            name : 'Papas Cheddar',
            description : 'Papas Cheddar',
            price : 300,
        }
    ],
    commercialEmail : 'rest@rest.com',
    adminNumber : '34343444444',
    address : 'address ',
    location : {lat: -31.743085, lang: -60.530475},
    },
    {
        id : 3,
        logo : 'logo.png',
        commercialName : "Rest 3",
        legalName : "Rest Legal 3",
        rating : 5, //(float max 5 min 1),
        reviews : [
        {
        name : "Rev 3",
        review : "Rev text 3",
        rating : 4,
        }
        ],
        meals : [
            {
                name : 'Parrillada',
                description : 'Parrillada completa',
                price : 300,
            },
            {
                name : 'Papas Cheddar',
                description : 'Papas Cheddar',
                price : 300,
            }
        ],
        commercialEmail : 'rest3@rest.com',
        adminNumber : '34343444445',
        address : 'address 3',
        location : {lat: -31.743085, lang: -60.530475},
        },
        {
            id : 2,
            logo : 'logo.png',
            commercialName : "Rest 2",
            legalName : "Rest Legal 2",
            rating : 3, //(float max 5 min 1),
            reviews : [
                {
                    name : "Rev 2",
                    review : "Rev text 2",
                    rating : 5,
                }
            ],
            meals : [
                {
                    name : 'Parrillada',
                    description : 'Parrillada completa',
                    price : 300,
                },
                {
                    name : 'Papas Cheddar',
                    description : 'Papas Cheddar',
                    price : 300,
                }
            ],
            commercialEmail : 'rest2@rest.com',
            adminNumber : '343434774444',
            address : 'address 2',
            location : {lat: -31.743085, lang: -60.530475},
            }
]

export default data