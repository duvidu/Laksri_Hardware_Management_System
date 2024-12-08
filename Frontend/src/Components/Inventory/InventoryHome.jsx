import React, { useState, useEffect } from 'react';
import ProductDetails from './Inventory-ProductDetails';
import Status from './Inventory-Status';
import { TextField, Select, MenuItem, Button, FormControl, InputLabel } from '@mui/material';
import './InventoryStyles.css';

const InventoryHome = () => {
    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [refreshPage, setRefreshPage] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState(''); // New state for selected brand
    const [searchQuery, setSearchQuery] = useState('');
    const [curPage, setCurPage] = useState(1);
    const recordsPerPage = 7;

    //title of the document
    useEffect(() => {
        document.title = "Inventory";
    }, []);

    const handleCategory = (e) => {
        setSelectedCategory(e.target.value);
        setCurPage(1); //reset page number when category change
    };

    const handleBrand = (e) => { //function to handle brand selection
        setSelectedBrand(e.target.value);
        setCurPage(1); //reset page number when brand change
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurPage(1); //reset page number when search query change
    };

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:8000/inventory');
            const json = await response.json();

            if (response.ok) {
                setProducts(json);
            }
        };

        fetchProducts();
    }, [refreshPage]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:8000/categories');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error.message);
            }
        };

        fetchCategories();
    }, [refreshPage]);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await fetch('http://localhost:8000/brands');
                if (!response.ok) {
                    throw new Error('Failed to fetch brands');
                }
                const data = await response.json();
                setBrands(data);
            } catch (error) {
                console.error('Error fetching brands:', error.message);
            }
        };

        fetchBrands();
    }, [refreshPage]);

    // Function to count product categories
    const calculateCategories = () => {
        let totalCategories = categories.length;
        return totalCategories;
    };

    // Function to calculate total value
    const calculateTotalValue = () => {
        if (!products) {
            return 0;
        }
        let totalValue = 0;
        products.forEach(product => {
            if ((!selectedCategory || product.category === selectedCategory) &&
                (!selectedBrand || product.brand === selectedBrand)) {
                totalValue += product.price * product.quantity;
            }
        });
        return totalValue;
    };

    // Function to calculate total products
    const calculateTotalProducts = () => {
        if (!products) {
            return 0;
        }
        let totalProducts = 0;
        products.forEach(product => {
            if ((!selectedCategory || product.category === selectedCategory) &&
                (!selectedBrand || product.brand === selectedBrand)) {
                totalProducts += 1;
            }
        });
        return totalProducts;
    };

    // Function to check and find out of stock
    const calculateOutOfStock = () => {
        if (!products) {
            return 0;
        }
        let outOfStock = 0;
        let lowStockProducts = []; // Array to store low stock product data

        products.forEach(product => {
            if ((!selectedCategory || product.category === selectedCategory) && (!selectedBrand || product.brand === selectedBrand)) {
                if (product.quantity === 0) {
                    outOfStock += 1;
                } else if (product.quantity < product.quantityLimit) {
                    lowStockProducts.push({ product: product._id, name: product.name, category: product.category, quantity: product.quantity });
                }
            }
        });

        //send low stock products to the backend
        sendLowStocktoBackend(lowStockProducts);

        return outOfStock;
    };

    //function to send low stock data to backend
    const sendLowStocktoBackend = async (lowStockProducts) => {
        try {
            if (lowStockProducts.length > 0) {
                console.log("low stock items", lowStockProducts)
                const response = await fetch('http://localhost:8000/supply-management/notifications', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(lowStockProducts), //pass low stock product data to backend
                });
                if (!response.ok) {
                    if (response.status === 400) {
                        console.log('data already exist');
                    } else {
                        throw new Error('failed to send data');
                    }
                } else {
                    console.log('data send successfully');
                }
            }
        } catch (error) {
            console.error('error sending data', error);
        }
    };

    // Pagination variables
    const lastIndex = curPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const filteredProducts = products ? products.filter(product =>
        (!selectedCategory || product.category === selectedCategory) &&
        (!selectedBrand || product.brand === selectedBrand) &&
        (!searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    ) : [];
    const records = filteredProducts.slice(firstIndex, lastIndex);
    const noOfPage = Math.ceil(filteredProducts.length / recordsPerPage);
    const numbers = [...Array(noOfPage + 1).keys()].slice(1);

    //pagination functions
    function previousPage() {
        if (curPage !== 1) {
            setCurPage(curPage - 1)
        }
    }

    function changeCurPage(id) {
        setCurPage(id)
    }

    function nextPage() {
        if (curPage !== noOfPage) {
            setCurPage(curPage + 1)
        }
    }

    return (
        <div className="invhome">
            <div className='invMain'>
                <Status totalCategories={calculateCategories()} totalvalue={calculateTotalValue()} totalProducts={calculateTotalProducts()} outOfStock={calculateOutOfStock()} />
                <div className="functionBar">
                    <div className='searchbar'>
                        <TextField label="Search by Name" value={searchQuery} onChange={handleSearch} fullWidth />
                    </div>
                    <div className="categoryBox">
                        <FormControl fullWidth>
                            <InputLabel id="category-select-label">Select Category</InputLabel>
                            <Select labelId="category-select-label" value={selectedCategory} onChange={handleCategory} fullWidth>
                                <MenuItem value="">All Categories</MenuItem>
                                {categories.map(category => (
                                    <MenuItem key={category._id} value={category.name}>{category.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="brandBox">
                        <FormControl fullWidth>
                            <InputLabel id="brand-select-label">Select Brand</InputLabel>
                            <Select labelId="brand-select-label" value={selectedBrand} onChange={handleBrand} fullWidth>
                                <MenuItem value="">All Brands</MenuItem>
                                {brands.map(brand => (
                                    <MenuItem key={brand._id} value={brand.name}>{brand.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <table className="topicline">
                    <tbody>
                        <tr>
                            <th className='topic-photo'></th>
                            <th className='topic-name'>Name</th>
                            <th className='topic-price'>Price (Rs)</th>
                            <th className='topic-disPrice'>Discount Price</th>
                            <th className='tpoic-quantity'>Quantity</th>
                        </tr>
                    </tbody>
                </table>
                {records.map((Inventory) => (
                    <ProductDetails key={Inventory._id} Inventory={Inventory} />
                ))}

                {/* Pagination */}
                <div className='pagination'>
                    <li className='page-item'>
                        <Button className='page-link' onClick={previousPage}>Prev</Button>
                    </li>
                    {
                        numbers.map((n, i) => (
                            <li className={`page-item ${curPage === n ? 'active' : ''}`} key={i}>
                                <Button className='page-link' onClick={() => changeCurPage(n)}>{n}</Button>
                            </li>
                        ))
                    }
                    <li className='page-item'>
                        <Button className='page-link' onClick={nextPage}>Next</Button>
                    </li>
                </div>
            </div>
        </div>
    );
}

export default InventoryHome;
