import React from 'react';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import Checkbox from '../Checkbox/Checkbox';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
}

interface ProductListProps {
    products: Product[];
    token: string
    onSort: (column: string) => void; // Callback function for sorting
}

const ProductList: React.FC<ProductListProps> = ({ products, token, onSort }) => {
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([])

    const spanStyle = {
        cursor: 'pointer',
    };
    useEffect(() => {
        const getSelectedIdsFromLocalStorage = (): string[] => {
            const storedIdsString = localStorage.getItem(token);
            return storedIdsString ? JSON.parse(storedIdsString) : [];
        };

        const fetchSelectedProducts = async () => {
            const ids = getSelectedIdsFromLocalStorage();
            if (ids.length > 0) {
                try {

                    const response = await fetch(
                        `http://127.0.0.1:8000/products/selected_product?ids=${ids.join(',')}`,
                        {
                            method: 'GET',
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    const data = await response.json();
                    setSelectedProducts(data);

                    // Handle the response data, e.g., update state or dispatch an action

                } catch (error) {
                    console.error('Error fetching selected products:', error);
                }
            }
        };

        fetchSelectedProducts();
    }, [token]);

    console.log("osama imran", selectedProducts)
    return (
        <div className='container mt-5'>
            {selectedProducts.length ? (
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th></th>
                            <th onClick={() => onSort('name')}>
                                <span style={spanStyle}><FontAwesomeIcon icon={faSort} /></span>  Name
                            </th>
                            <th onClick={() => onSort('description')}>
                                <span style={spanStyle}><FontAwesomeIcon icon={faSort} /> </span> Description
                            </th>
                            <th onClick={() => onSort('price')}>
                                <span style={spanStyle}><FontAwesomeIcon icon={faSort} /> </span>Price
                            </th>
                            <th onClick={() => onSort('stock')}>
                                <span style={spanStyle}><FontAwesomeIcon icon={faSort} /> </span>Stock
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedProducts.map((selectedproduct) => (
                            <tr key={selectedproduct.id}>
                                <td> <Checkbox pid={selectedproduct.id} token={token} /></td>
                                <td>{selectedproduct.name}</td>
                                <td>{selectedproduct.description}</td>
                                <td>{selectedproduct.price}</td>
                                <td>{selectedproduct.stock}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th></th>
                            <th onClick={() => onSort('name')}>
                                <span style={spanStyle}><FontAwesomeIcon icon={faSort} /></span>  Name
                            </th>
                            <th onClick={() => onSort('description')}>
                                <span style={spanStyle}><FontAwesomeIcon icon={faSort} /> </span> Description
                            </th>
                            <th onClick={() => onSort('price')}>
                                <span style={spanStyle}><FontAwesomeIcon icon={faSort} /> </span>Price
                            </th>
                            <th onClick={() => onSort('stock')}>
                                <span style={spanStyle}><FontAwesomeIcon icon={faSort} /> </span>Stock
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td> <Checkbox pid={product.id} token={token} /></td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>{product.stock}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ProductList;
