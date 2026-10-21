const products = [
    {
        id: 'chair-1',
        title: 'Sakarias Armchair',
        category: 'chair',
        categoryName: 'Chair',
        price: 392,
        image: 'assets/images/chairs/chair-1.png',
        rating: 2
    },
    {
        id: 'chair-2',
        title: 'Baltsar Chair',
        category: 'chair',
        categoryName: 'Chair',
        price: 299,
        image: 'assets/images/chairs/chair-2.png',
        rating: 5
    },
    {
        id: 'chair-3',
        title: 'Anjay Chair',
        category: 'chair',
        categoryName: 'Chair',
        price: 519,
        image: 'assets/images/chairs/chair-3.png',
        rating: 5
    },
    {
        id: 'chair-4',
        title: 'Nyantuy Chair',
        category: 'chair',
        categoryName: 'Chair',
        price: 921,
        image: 'assets/images/chairs/chair-4.png',
        rating: 5
    },
    {
        id: 'chair-5',
        title: 'Sakarias Armchair',
        category: 'chair',
        categoryName: 'Chair',
        price: 392,
        image: 'assets/images/chairs/chair-1.png',
        rating: 2
    },
    {
        id: 'chair-6',
        title: 'Baltsar Chair',
        category: 'chair',
        categoryName: 'Chair',
        price: 299,
        image: 'assets/images/chairs/chair-2.png',
        rating: 5
    },
    {
        id: 'chair-7',
        title: 'Anjay Chair',
        category: 'chair',
        categoryName: 'Chair',
        price: 519,
        image: 'assets/images/chairs/chair-3.png',
        rating: 5
    },
    {
        id: 'chair-8',
        title: 'Nyantuy Chair',
        category: 'chair',
        categoryName: 'Chair',
        price: 921,
        image: 'assets/images/chairs/chair-4.png',
        rating: 5
    },
    {
        id: 'bed-1',
        title: 'Sakarias Bed',
        category: 'beds',
        categoryName: 'Beds',
        price: 392,
        image: 'assets/images/chairs/chair-1.png',
        rating: 2
    },
    {
        id: 'bed-2',
        title: 'Baltsar Bed',
        category: 'beds',
        categoryName: 'Chair',
        price: 299,
        image: 'assets/images/chairs/chair-2.png',
        rating: 5
    },
    {
        id: 'bed-3',
        title: 'Anjay Bed',
        category: 'beds',
        categoryName: 'Bed',
        price: 519,
        image: 'assets/images/chairs/chair-3.png',
        rating: 5
    },
    {
        id: 'bed-4',
        title: 'Nyantuy Bed',
        category: 'beds',
        categoryName: 'Bed',
        price: 921,
        image: 'assets/images/chairs/chair-4.png',
        rating: 5
    },
    {
        id: 'bed-5',
        title: 'Sakarias Bed',
        category: 'beds',
        categoryName: 'Bed',
        price: 392,
        image: 'assets/images/chairs/chair-1.png',
        rating: 2
    },
    {
        id: 'bed-6',
        title: 'Baltsar Bed',
        category: 'beds',
        categoryName: 'Bed',
        price: 299,
        image: 'assets/images/chairs/chair-2.png',
        rating: 5
    },
    {
        id: 'sofa-1',
        title: 'Sakarias Sofa',
        category: 'sofa',
        categoryName: 'Sofa',
        price: 392,
        image: 'assets/images/chairs/chair-1.png',
        rating: 2
    },
    {
        id: 'sofa-2',
        title: 'Baltsar Sofa',
        category: 'sofa',
        categoryName: 'Sofa',
        price: 299,
        image: 'assets/images/chairs/chair-2.png',
        rating: 5
    },
    {
        id: 'sofa-3',
        title: 'Anjay Sofa',
        category: 'sofa',
        categoryName: 'Sofa',
        price: 519,
        image: 'assets/images/chairs/chair-3.png',
        rating: 5
    },
    {
        id: 'sofa-4',
        title: 'Nyantuy Sofa',
        category: 'sofa',
        categoryName: 'Sofa',
        price: 921,
        image: 'assets/images/chairs/chair-4.png',
        rating: 5
    },
    {
        id: 'sofa-5',
        title: 'Sakarias Sofa',
        category: 'sofa',
        categoryName: 'Sofa',
        price: 392,
        image: 'assets/images/chairs/chair-1.png',
        rating: 2
    },
    {
        id: 'sofa-6',
        title: 'Baltsar Sofa',
        category: 'sofa',
        categoryName: 'Sofa',
        price: 299,
        image: 'assets/images/chairs/chair-2.png',
        rating: 5
    },
    {
        id: 'sofa-7',
        title: 'Anjay Sofa',
        category: 'sofa',
        categoryName: 'Sofa',
        price: 519,
        image: 'assets/images/chairs/chair-3.png',
        rating: 5
    },
    {
        id: 'sofa-8',
        title: 'Nyantuy Sofa',
        category: 'sofa',
        categoryName: 'Sofa',
        price: 921,
        image: 'assets/images/chairs/chair-4.png',
        rating: 5
    },
    {
        id: 'lamp-1',
        title: 'Sakarias Lamp',
        category: 'lamp',
        categoryName: 'Lamp',
        price: 392,
        image: 'assets/images/chairs/chair-1.png',
        rating: 2
    },
    {
        id: 'lamp-2',
        title: 'Baltsar Lamp',
        category: 'lamp',
        categoryName: 'Lamp',
        price: 299,
        image: 'assets/images/chairs/chair-2.png',
        rating: 5
    },
    {
        id: 'lamp-3',
        title: 'Anjay Lamp',
        category: 'lamp',
        categoryName: 'Lamp',
        price: 519,
        image: 'assets/images/chairs/chair-3.png',
        rating: 5
    },
    {
        id: 'lamp-4',
        title: 'Nyantuy Lamp',
        category: 'lamp',
        categoryName: 'Lamp',
        price: 921,
        image: 'assets/images/chairs/chair-4.png',
        rating: 5
    },
    {
        id: 'lamp-5',
        title: 'Sakarias Lamp',
        category: 'lamp',
        categoryName: 'Lamp',
        price: 392,
        image: 'assets/images/chairs/chair-1.png',
        rating: 2
    },
    {
        id: 'lamp-6',
        title: 'Baltsar Lamp',
        category: 'lamp',
        categoryName: 'Lamp',
        price: 299,
        image: 'assets/images/chairs/chair-2.png',
        rating: 5
    },
]
export default products