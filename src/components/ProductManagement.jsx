import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiEdit2, FiCheck, FiX, FiClock, FiFilter, FiPlus } from 'react-icons/fi';
import DataTable from './DataTable';

const ProductManagement = ({ products: initialProducts }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState(initialProducts.map(p => ({
    ...p,
    // Ensure price is a number
    price: typeof p.price === 'string' ? parseFloat(p.price.replace(/[^0-9.]/g, '')) || 0 : p.price || 0,
    // Ensure stock is a number
    stock: typeof p.stock === 'string' ? parseInt(p.stock, 10) || 0 : p.stock || 0,
    // Add default status if missing
    status: p.status || 'pending'
  })));
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    stockStatus: 'all',
    sortBy: 'newest'
  });

  const columns = [
    { header: 'Product', accessor: 'product', className: 'min-w-[200px]' },
    { header: 'Creator', accessor: 'creator', className: 'min-w-[150px]' },
    { header: 'Price', accessor: 'price', className: 'text-right' },
    { header: 'Stock', accessor: 'stock', className: 'text-right' },
    { header: 'Status', accessor: 'status', className: 'text-center' },
    { header: 'Actions', accessor: 'actions', className: 'text-right' }
  ];

  const updateProductStatus = (id, newStatus) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, status: newStatus } : product
    ));
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.creator.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPrice = 
      product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1];
    
    const matchesStock = 
      filters.stockStatus === 'all' ||
      (filters.stockStatus === 'inStock' && product.stock > 0) ||
      (filters.stockStatus === 'outOfStock' && product.stock === 0);
    
    const matchesStatus = 
      activeTab === 'all' || 
      product.status === activeTab;
    
    return matchesSearch && matchesPrice && matchesStock && matchesStatus;
  }).sort((a, b) => {
    if (filters.sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
    if (filters.sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
    if (filters.sortBy === 'priceHigh') return b.price - a.price;
    if (filters.sortBy === 'priceLow') return a.price - b.price;
    return 0;
  });

  const statusCounts = products.reduce((acc, product) => {
    acc[product.status] = (acc[product.status] || 0) + 1;
    acc.total = (acc.total || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6 px-4 sm:px-6">
      {/* ... (rest of the JSX remains the same until the DataTable) ... */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <DataTable 
          columns={columns} 
          data={filteredProducts.map(product => ({
            product: (
              <div className="flex items-center space-x-3">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-10 h-10 rounded-md object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/40';
                  }}
                />
                <div>
                  <p className="font-medium text-white">{product.name}</p>
                  <p className="text-xs text-gray-400">SKU: {product.sku || 'N/A'}</p>
                </div>
              </div>
            ),
            creator: (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                  {product.creatorAvatar ? (
                    <img src={product.creatorAvatar} alt={product.creator} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs">{product.creator?.charAt(0)?.toUpperCase() || '?'}</span>
                  )}
                </div>
                <span>{product.creator || 'Unknown'}</span>
              </div>
            ),
            price: (
              <div className="text-right">
                <p className="font-medium">${typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'}</p>
                {product.originalPrice && (
                  <p className="text-xs text-gray-400 line-through">
                    ${typeof product.originalPrice === 'number' ? product.originalPrice.toFixed(2) : '0.00'}
                  </p>
                )}
              </div>
            ),
            stock: (
              <div className="text-right">
                <p className={product.stock > 0 ? 'text-green-400' : 'text-red-400'}>
                  {product.stock > 0 ? product.stock : 'Out of stock'}
                </p>
                {product.stock > 0 && product.stock < 10 && (
                  <p className="text-xs text-amber-400">Low stock</p>
                )}
              </div>
            ),
            status: (
              <div className="flex justify-center">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  product.status === 'approved' ? 'bg-green-900/50 text-green-400' :
                  product.status === 'pending' ? 'bg-amber-900/50 text-amber-400' :
                  'bg-red-900/50 text-red-400'
                }`}>
                  {product.status === 'pending' && <FiClock className="mr-1" />}
                  {product.status?.charAt(0)?.toUpperCase() + product.status?.slice(1) || 'Unknown'}
                </span>
              </div>
            ),
            actions: (
              <div className="flex justify-end space-x-2">
                <button 
                  onClick={() => console.log('Edit', product.id)}
                  className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-md transition-colors"
                  title="Edit"
                >
                  <FiEdit2 className="w-4 h-4" />
                </button>
                
                {product.status === 'pending' && (
                  <>
                    <button 
                      onClick={() => updateProductStatus(product.id, 'approved')}
                      className="p-1.5 text-gray-400 hover:text-green-400 hover:bg-green-500/10 rounded-md transition-colors"
                      title="Approve"
                    >
                      <FiCheck className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => updateProductStatus(product.id, 'rejected')}
                      className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
                      title="Reject"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            )
          }))} 
        />
      </motion.div>
    </div>
  );
};

export default ProductManagement;