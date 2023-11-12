
interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
  }
  
  export const fetchSearchResults = (searchTerm: string,column: string, sortOrder: string, token: string): Promise<Product[]> => {
    if (searchTerm) {
      return fetch(`http://127.0.0.1:8000/products/search?search=${encodeURIComponent(searchTerm)}&sort_by=${encodeURIComponent(column)}&sort_order=${encodeURIComponent(sortOrder)}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .catch((error) => {
          console.error('Error fetching data:', error);
          return [];
        });
    } else {
      return Promise.resolve([]);
    }
  };
  