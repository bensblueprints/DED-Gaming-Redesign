export interface Product {
  id: string
  name: string
  price: number
  category: string
  image: string
}

export const products: Product[] = [
  { id: '1', name: 'Coca-Cola', price: 1.49, category: 'Drinks', image: '/images/food-spread.jpg' },
  { id: '2', name: 'Diet Coke', price: 1.49, category: 'Drinks', image: '/images/food-spread.jpg' },
  { id: '3', name: 'Sprite', price: 1.49, category: 'Drinks', image: '/images/food-spread.jpg' },
  { id: '4', name: 'Monster Energy', price: 3.49, category: 'Energy', image: '/images/food-spread.jpg' },
  { id: '5', name: 'Red Bull', price: 3.99, category: 'Energy', image: '/images/food-spread.jpg' },
  { id: '6', name: 'Chicken Tenders (4pc)', price: 8.99, category: 'Meals', image: '/images/food-spread.jpg' },
  { id: '7', name: 'Pizza Slice', price: 4.99, category: 'Meals', image: '/images/food-spread.jpg' },
  { id: '8', name: 'Buffalo Wings (6pc)', price: 9.99, category: 'Meals', image: '/images/food-spread.jpg' },
  { id: '9', name: 'Nachos', price: 6.99, category: 'Snacks', image: '/images/food-spread.jpg' },
  { id: '10', name: 'Popcorn', price: 3.49, category: 'Snacks', image: '/images/food-spread.jpg' },
  { id: '11', name: 'Candy Selection', price: 2.49, category: 'Snacks', image: '/images/food-spread.jpg' },
  { id: '12', name: 'Chips', price: 1.99, category: 'Snacks', image: '/images/food-spread.jpg' },
]

export const productCategories = ['All Items', 'Snacks', 'Meals', 'Drinks', 'Energy']
