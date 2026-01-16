const STORAGE_KEY = 'scan_rappel_favorites_v1';

const loadFavorites = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveFavorites = (favorites) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
};

const createId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `fav_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
};

const favoriteApi = {
  list: async () => {
    return loadFavorites();
  },
  create: async (data) => {
    const favorites = loadFavorites();
    const next = {
      id: createId(),
      product_name: data.product_name || '',
      brand: data.brand || '',
      barcode: data.barcode || ''
    };
    favorites.push(next);
    saveFavorites(favorites);
    return next;
  },
  update: async (id, data) => {
    const favorites = loadFavorites();
    const index = favorites.findIndex((fav) => fav.id === id);
    if (index === -1) {
      return null;
    }
    favorites[index] = {
      ...favorites[index],
      ...data
    };
    saveFavorites(favorites);
    return favorites[index];
  },
  delete: async (id) => {
    const favorites = loadFavorites();
    const next = favorites.filter((fav) => fav.id !== id);
    saveFavorites(next);
    return { id };
  }
};

export const base44 = {
  __isDemoMode: true,
  auth: {
    me: async () => {
      const error = new Error('Demo mode: authentication disabled');
      error.status = 401;
      throw error;
    },
    logout: () => {},
    redirectToLogin: () => {}
  },
  appLogs: {
    logUserInApp: async () => {}
  },
  entities: {
    Favorite: favoriteApi
  }
};

export const isDemoMode = true;
