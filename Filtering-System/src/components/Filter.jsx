import { useEffect, useState } from 'react';
import style from '../styles/filter.module.css';

export const Filter = ({ categories, brands, onFilterChange, onSortChange, sortType }) => {

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [priceRange, setPriceRange] = useState([0, 5000]);
    const [selectedRating, setSelectedRating] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const ratingOptions = [1, 2, 3, 4, 5];

    const handleCategoryChange = (e) => {
        const newCategory = e.target.value;
        setSelectedCategory(newCategory);
        onFilterChange({ category: newCategory, brand: selectedBrand, priceRange, rating: selectedRating });
    };

    const handleBrandChange = (e) => {
        const newBrand = e.target.value;
        setSelectedBrand(newBrand);
        onFilterChange({ category: selectedCategory, brand: newBrand, priceRange, rating: selectedRating });
    };

    const handlePriceChange = (e) => {
        const newMaxPrice = Number(e.target.value);
        setPriceRange([priceRange[0], newMaxPrice]);
        onFilterChange({ category: selectedCategory, brand: selectedBrand, priceRange: [priceRange[0], newMaxPrice], rating: selectedRating });
    };

    const handleMinPriceChange = (e) => {
        const newMinPrice = Number(e.target.value);
        setPriceRange([newMinPrice, priceRange[1]]);
        onFilterChange({ category: selectedCategory, brand: selectedBrand, priceRange: [newMinPrice, priceRange[1]], rating: selectedRating });
    };

    const handleRatingChange = (e) => {
        const newRating = Number(e.target.value);
        setSelectedRating(newRating);
        onFilterChange({ category: selectedCategory, brand: selectedBrand, priceRange, rating: newRating });
    };

    const handleSortChange = (e) => {
        const newSortType = e.target.value;
        onSortChange(newSortType);
    };

    const toggleFilterPanel = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button className={style.hamburger} onClick={toggleFilterPanel}>
                {
                    isOpen
                        ? <span
                            className={style.closeFilter}
                        >
                            &#120;
                        </span>
                        : <span>&#9776;</span>
                }
            </button>
            <div className={`${style.filter_panel} ${isOpen ? style.open : ''}`}>
                <h2>Filters</h2>

                <div className={style.filter_group}>
                    <label>Category</label>
                    <select value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="">All</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                <div className={style.filter_group}>
                    <label>Brand</label>
                    <select value={selectedBrand} onChange={handleBrandChange}>
                        <option value="">All</option>
                        {brands.map((brand) => (
                            <option key={brand} value={brand}>{brand}</option>
                        ))}
                    </select>
                </div>

                <div className={style.filter_group}>
                    <label>Price:</label>
                    <div className={style.priceRangeContainer}>
                        <input
                            type="number"
                            min="0"
                            max="5000"
                            value={priceRange[0]}
                            onChange={handleMinPriceChange}
                            className={style.priceInput}
                        />
                        <span> to </span>
                        <input
                            type="number"
                            min="0"
                            max="5000"
                            value={priceRange[1]}
                            onChange={handlePriceChange}
                            className={style.priceInput}
                        />
                    </div>
                    <div className={style.rangeSliderContainer}>
                        <input
                            type="range"
                            min="0"
                            max="5000"
                            value={priceRange[1]}
                            onChange={handlePriceChange}
                            className={style.rangeSlider}
                        />
                    </div>
                </div>

                <div className={style.filter_group}>
                    <label>Rating</label>
                    <select value={selectedRating} onChange={handleRatingChange}>
                        <option value="0">All Ratings</option>
                        {ratingOptions.map((rating) => (
                            <option key={rating} value={rating}>{rating} Stars & Up</option>
                        ))}
                    </select>
                </div>

                <div className={style.filter_group}>
                    <label>Sort By:</label>
                    <select value={sortType} onChange={handleSortChange}>
                        <option value="">Default</option>
                        <option value="price-low-high">Price: Low to High</option>
                        <option value="price-high-low">Price: High to Low</option>
                        <option value="rating-high-low">Rating: High to Low</option>
                        <option value="popularity">Popularity</option>
                    </select>
                </div>
            </div>
        </div>
    );
};