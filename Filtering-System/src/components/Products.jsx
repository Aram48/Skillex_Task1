import { useEffect, useState } from 'react';
import axios from 'axios';
import style from '../styles/product.module.css';
import { Filter } from './Filter';
import { PropagateLoader } from 'react-spinners';

export const Products = () => {

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({
        category: '',
        brand: '',
        priceRange: [0, 5000],
        rating: 0,
    });
    const [sortType, setSortType] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            axios
                .get('http://localhost:3004/products')
                .then((res) => {
                    setProducts(res.data);
                    setFilteredProducts(res.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching products:", error);
                    setLoading(false);
                });
        }, 1000);
    }, []);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        applyFilters(newFilters, sortType);
    };

    const handleSortChange = (newSortType) => {
        setSortType(newSortType);
        applyFilters(filters, newSortType);
    };

    const applyFilters = (filters, sortType) => {
        setLoading(true);
        setTimeout(() => {
            const filtered = products.filter((product) => {
                const matchesCategory = !filters.category || product.category === filters.category;
                const matchesBrand = !filters.brand || product.brand === filters.brand;
                const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
                const matchesRating = product.rating >= filters.rating;
                return matchesCategory && matchesBrand && matchesPrice && matchesRating;
            });

            const sortedFiltered = [...filtered];

            if (sortType) {
                sortedFiltered.sort((a, b) => {
                    switch (sortType) {
                        case 'price-low-high':
                            return a.price - b.price;
                        case 'price-high-low':
                            return b.price - a.price;
                        case 'rating-high-low':
                            return b.rating - a.rating;
                        case 'popularity':
                            return a.rating - a.rating;
                        default:
                            return 0;
                    }
                });
            }

            setFilteredProducts(sortedFiltered);
            setLoading(false);
        }, 500);
    };

    const categories = [...new Set(products.map((product) => product.category))];
    const brands = [...new Set(products.map((product) => product.brand))];

    return (
        <>
            <h1 className={style.product_h1}>Products</h1>
            <div className={style.page_container}>
                <Filter
                    categories={categories}
                    brands={brands}
                    onFilterChange={handleFilterChange}
                    onSortChange={handleSortChange}
                    sortType={sortType}
                />

                {loading ? (
                    <div className={style.spinner_container}>
                        <PropagateLoader color="#123abc" loading={loading} size={15} />
                    </div>
                ) : (
                    <div className={style.products_container}>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <div className={style.product_card} key={product.id}>
                                    <img src={product.imageUrl} alt={product.name} />
                                    <h3>
                                        {product.name} <small>{product.price} $</small>
                                    </h3>
                                    <p>
                                        {product.category} <small>{product.brand}</small>
                                    </p>
                                    <p className={style.rating}>
                                        {product.rating}
                                        <img src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/star-512.png" alt="Star Icon" />
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className={style.no_products}>No products found</p>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};