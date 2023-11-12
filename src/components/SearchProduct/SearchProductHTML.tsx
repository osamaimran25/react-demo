import React, { useState, useEffect } from 'react';
import { fetchSearchResults } from './SearchProduct'; // Assuming you have a function for fetching sorted results
import ProductList from '../ProductList/ProductList';
import TopBar from '../TopBar/TopBar';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
}
const SearchProductView: React.FC = () => {
    const token = localStorage.getItem('accessToken') || '';
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [sortedColumn, setSortedColumn] = useState<string | null>(null);

    useEffect(() => {
        fetchSearchResults(searchTerm, "", "", token)
            .then((data) => setSearchResults(data));
    }, [searchTerm, token]);

    const handleSort = (column: string) => {
        // If the column is the same as the currently sorted column, reverse the order
        const isSameColumn = sortedColumn === column;
        const sortOrder = isSameColumn ? 'desc' : 'asc';

        // Make an API request to fetch sorted data
        fetchSearchResults(searchTerm, column, sortOrder, token)
            .then((sortedData) => {
                setSearchResults(sortedData);
                setSortedColumn(column);
            })
            .catch((error) => {
                console.error('Error fetching sorted data:', error);
            });
    };

    return (
        <div>
            <TopBar/>

        <div className='container mt-5 mb-5'>
            <input
                type="text"
                style={{ width: '80%' }}
                className="form-control form-control-sm"
                placeholder="Search Products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            {/* Use the ProductList component to render the search results */}
            <ProductList products={searchResults} token={token} onSort={handleSort} />
        </div>
                </div>
    );
};

export default SearchProductView;
