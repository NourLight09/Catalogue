// Configuration du routage des pages
const pageRoutes = {
  // Pages publiques
  'Home': '/app',
  'Products': '/app/products',
  'ProductDetail': '/app/product',
  'Categories': '/app/categories',
  'Catalog': '/app/catalog',
  'Profile': '/app/profile',
  
  // Pages d'administration
  'AdminDashboard': '/app/admin/dashboard',
  'AdminProducts': '/app/admin/products',
  'AdminCategories': '/app/admin/categories',
  'AdminStock': '/app/admin/stock',
  'AdminUsers': '/app/admin/users',
};

/**
 * Créer une URL pour une page spécifique
 * @param {string} pageName - Le nom de la page (ex: 'Home', 'Products', 'AdminDashboard')
 * @returns {string} Le chemin URL complet avec les paramètres de requête si inclus
 */
export const createPageUrl = (pageName) => {
  // Gérer les paramètres de requête (ex: "ProductDetail?id=123")
  const [page, queryString] = pageName.split('?');
  const basePath = pageRoutes[page] || '/app';
  
  if (queryString) {
    return `${basePath}?${queryString}`;
  }
  
  return basePath;
};

/**
 * Obtenir le nom de la page actuelle à partir de l'URL
 * @returns {string|null} Le nom de la page ou null
 */
export const getCurrentPageName = () => {
  const path = window.location.pathname;
  
  // Trouver la page correspondante par chemin
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
