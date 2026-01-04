// Page routing configuration
const pageRoutes = {
  // Public pages
  'Home': '/app',
  'Products': '/app/products',
  'ProductDetail': '/app/product',
  'Categories': '/app/categories',
  'Catalog': '/app/catalog',
  'Profile': '/app/profile',
  
  // Admin pages
  'AdminDashboard': '/app/admin/dashboard',
  'AdminProducts': '/app/admin/products',
  'AdminCategories': '/app/admin/categories',
  'AdminStock': '/app/admin/stock',
  'AdminUsers': '/app/admin/users',
};

/**
 * Create a URL for a specific page
 * @param {string} pageName - The page name (e.g., 'Home', 'Products', 'AdminDashboard')
 * @returns {string} The full URL path with query parameters if included
 */
export const createPageUrl = (pageName) => {
  // Handle query parameters (e.g., "ProductDetail?id=123")
  const [page, queryString] = pageName.split('?');
  const basePath = pageRoutes[page] || '/app';
  
  if (queryString) {
    return `${basePath}?${queryString}`;
  }
  
  return basePath;
};

/**
 * Get the current page name from the URL
 * @returns {string|null} The page name or null
 */
export const getCurrentPageName = () => {
  const path = window.location.pathname;
  
  // Find matching page by path
  for (const [page, route] of Object.entries(pageRoutes)) {
    if (path === route || path.startsWith(route)) {
      return page;
    }
  }
  
  return null;
};

/**
 * Check if current page is an admin page
 * @returns {boolean}
 */
export const isAdminPage = () => {
  const currentPage = getCurrentPageName();
  return currentPage ? currentPage.startsWith('Admin') : false;
};

/**
 * Parse query parameters from URL
 * @returns {object} Query parameters as key-value pairs
 */
export const getQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  const obj = {};
  
  for (const [key, value] of params.entries()) {
    obj[key] = value;
  }
  
  return obj;
};

export default {
  createPageUrl,
  getCurrentPageName,
  isAdminPage,
  getQueryParams,
};
