/**
 * Sistema centralizado de gerenciamento do localStorage
 * Mantém uma estrutura padronizada para todos os dados salvos localmente
 */

// Definição da estrutura de dados do localStorage
const STORAGE_KEYS = {
  FAVORITES: '4generate-sidebar-favorites',
  THEME: '4generate-theme',
  USER_PREFERENCES: '4generate-user-preferences',
  // Adicione mais chaves aqui conforme necessário
}

// Estrutura padrão dos dados
const DEFAULT_DATA = {
  [STORAGE_KEYS.FAVORITES]: [],
  [STORAGE_KEYS.THEME]: 'dark',
  [STORAGE_KEYS.USER_PREFERENCES]: {
    language: 'pt',
    sidebarCollapsed: false,
  },
}

/**
 * Classe principal para gerenciar o localStorage
 */
class LocalStorageManager {
  constructor() {
    this.keys = STORAGE_KEYS
  }

  /**
   * Obtém um item do localStorage
   * @param {string} key - Chave do item
   * @param {*} defaultValue - Valor padrão caso não exista
   * @returns {*} Valor do item ou valor padrão
   */
  getItem(key, defaultValue = null) {
    // Verifica se está no lado do cliente
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return defaultValue !== null ? defaultValue : DEFAULT_DATA[key] || null
    }
    
    try {
      const item = localStorage.getItem(key)
      if (item === null) {
        return defaultValue !== null ? defaultValue : DEFAULT_DATA[key] || null
      }
      return JSON.parse(item)
    } catch (error) {
      console.error(`Erro ao obter item "${key}" do localStorage:`, error)
      return defaultValue !== null ? defaultValue : DEFAULT_DATA[key] || null
    }
  }

  /**
   * Salva um item no localStorage
   * @param {string} key - Chave do item
   * @param {*} value - Valor a ser salvo
   * @returns {boolean} true se salvou com sucesso
   */
  setItem(key, value) {
    // Verifica se está no lado do cliente
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return false
    }
    
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error(`Erro ao salvar item "${key}" no localStorage:`, error)
      return false
    }
  }

  /**
   * Remove um item do localStorage
   * @param {string} key - Chave do item
   * @returns {boolean} true se removeu com sucesso
   */
  removeItem(key) {
    // Verifica se está no lado do cliente
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return false
    }
    
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error(`Erro ao remover item "${key}" do localStorage:`, error)
      return false
    }
  }

  /**
   * Limpa todos os itens do localStorage
   * @returns {boolean} true se limpou com sucesso
   */
  clear() {
    // Verifica se está no lado do cliente
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return false
    }
    
    try {
      localStorage.clear()
      return true
    } catch (error) {
      console.error('Erro ao limpar localStorage:', error)
      return false
    }
  }

  /**
   * Adiciona um item a um array no localStorage
   * @param {string} key - Chave do array
   * @param {*} item - Item a ser adicionado
   * @returns {boolean} true se adicionou com sucesso
   */
  addToArray(key, item) {
    try {
      const array = this.getItem(key, [])
      if (!Array.isArray(array)) {
        console.error(`Item "${key}" não é um array`)
        return false
      }
      
      // Evita duplicatas se o item tiver um identificador
      const itemExists = array.some(arrayItem => {
        if (typeof item === 'object' && item.id) {
          return arrayItem.id === item.id
        }
        return JSON.stringify(arrayItem) === JSON.stringify(item)
      })

      if (!itemExists) {
        array.push(item)
        return this.setItem(key, array)
      }
      return true
    } catch (error) {
      console.error(`Erro ao adicionar item ao array "${key}":`, error)
      return false
    }
  }

  /**
   * Remove um item de um array no localStorage
   * @param {string} key - Chave do array
   * @param {*} itemOrPredicate - Item a ser removido ou função de predicado
   * @returns {boolean} true se removeu com sucesso
   */
  removeFromArray(key, itemOrPredicate) {
    try {
      const array = this.getItem(key, [])
      if (!Array.isArray(array)) {
        console.error(`Item "${key}" não é um array`)
        return false
      }

      let newArray
      if (typeof itemOrPredicate === 'function') {
        newArray = array.filter(item => !itemOrPredicate(item))
      } else {
        newArray = array.filter(arrayItem => {
          if (typeof itemOrPredicate === 'object' && itemOrPredicate.id) {
            return arrayItem.id !== itemOrPredicate.id
          }
          return JSON.stringify(arrayItem) !== JSON.stringify(itemOrPredicate)
        })
      }

      return this.setItem(key, newArray)
    } catch (error) {
      console.error(`Erro ao remover item do array "${key}":`, error)
      return false
    }
  }

  /**
   * Atualiza uma propriedade de um objeto no localStorage
   * @param {string} key - Chave do objeto
   * @param {string} property - Propriedade a ser atualizada
   * @param {*} value - Novo valor
   * @returns {boolean} true se atualizou com sucesso
   */
  updateObjectProperty(key, property, value) {
    try {
      const obj = this.getItem(key, {})
      if (typeof obj !== 'object' || Array.isArray(obj)) {
        console.error(`Item "${key}" não é um objeto`)
        return false
      }

      obj[property] = value
      return this.setItem(key, obj)
    } catch (error) {
      console.error(`Erro ao atualizar propriedade "${property}" em "${key}":`, error)
      return false
    }
  }

  /**
   * Atualiza múltiplas propriedades de um objeto no localStorage
   * @param {string} key - Chave do objeto
   * @param {Object} updates - Objeto com as atualizações
   * @returns {boolean} true se atualizou com sucesso
   */
  updateObject(key, updates) {
    try {
      const obj = this.getItem(key, {})
      if (typeof obj !== 'object' || Array.isArray(obj)) {
        console.error(`Item "${key}" não é um objeto`)
        return false
      }

      const updatedObj = { ...obj, ...updates }
      return this.setItem(key, updatedObj)
    } catch (error) {
      console.error(`Erro ao atualizar objeto "${key}":`, error)
      return false
    }
  }

  /**
   * Verifica se um item existe no localStorage
   * @param {string} key - Chave do item
   * @returns {boolean} true se existe
   */
  hasItem(key) {
    // Verifica se está no lado do cliente
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return false
    }
    
    return localStorage.getItem(key) !== null
  }

  /**
   * Obtém todos os itens do localStorage que correspondem a um padrão
   * @param {string} pattern - Padrão de busca (RegExp string)
   * @returns {Object} Objeto com todas as chaves e valores encontrados
   */
  getAllByPattern(pattern) {
    // Verifica se está no lado do cliente
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return {}
    }
    
    try {
      const regex = new RegExp(pattern)
      const items = {}
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (regex.test(key)) {
          items[key] = this.getItem(key)
        }
      }
      
      return items
    } catch (error) {
      console.error('Erro ao buscar itens por padrão:', error)
      return {}
    }
  }

  /**
   * Obtém o tamanho aproximado do localStorage em bytes
   * @returns {number} Tamanho em bytes
   */
  getSize() {
    // Verifica se está no lado do cliente
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return 0
    }
    
    let size = 0
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        size += localStorage[key].length + key.length
      }
    }
    return size
  }

  /**
   * Exporta todos os dados do localStorage como JSON
   * @returns {string} JSON string com todos os dados
   */
  exportData() {
    // Verifica se está no lado do cliente
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return '{}'
    }
    
    try {
      const data = {}
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        data[key] = this.getItem(key)
      }
      return JSON.stringify(data, null, 2)
    } catch (error) {
      console.error('Erro ao exportar dados:', error)
      return '{}'
    }
  }

  /**
   * Importa dados para o localStorage a partir de JSON
   * @param {string} jsonData - JSON string com os dados
   * @param {boolean} merge - Se true, faz merge com dados existentes
   * @returns {boolean} true se importou com sucesso
   */
  importData(jsonData, merge = false) {
    try {
      const data = JSON.parse(jsonData)
      
      if (!merge) {
        this.clear()
      }

      for (let key in data) {
        this.setItem(key, data[key])
      }
      
      return true
    } catch (error) {
      console.error('Erro ao importar dados:', error)
      return false
    }
  }
}

// Instância singleton
const storage = new LocalStorageManager()

// Exporta a instância e as chaves
export default storage
export { STORAGE_KEYS }

// Funções auxiliares específicas para casos de uso comuns

/**
 * Gerenciamento de favoritos
 */
export const favorites = {
  get: () => storage.getItem(STORAGE_KEYS.FAVORITES, []),
  add: (pageKey) => storage.addToArray(STORAGE_KEYS.FAVORITES, pageKey),
  remove: (pageKey) => storage.removeFromArray(STORAGE_KEYS.FAVORITES, pageKey),
  has: (pageKey) => {
    const favs = storage.getItem(STORAGE_KEYS.FAVORITES, [])
    return favs.includes(pageKey)
  },
  toggle: (pageKey) => {
    if (favorites.has(pageKey)) {
      return favorites.remove(pageKey)
    } else {
      return favorites.add(pageKey)
    }
  },
  clear: () => storage.setItem(STORAGE_KEYS.FAVORITES, [])
}

/**
 * Gerenciamento de preferências de usuário
 */
export const userPreferences = {
  get: () => storage.getItem(STORAGE_KEYS.USER_PREFERENCES, DEFAULT_DATA[STORAGE_KEYS.USER_PREFERENCES]),
  set: (preferences) => storage.updateObject(STORAGE_KEYS.USER_PREFERENCES, preferences),
  getProperty: (property) => {
    const prefs = userPreferences.get()
    return prefs[property]
  },
  setProperty: (property, value) => storage.updateObjectProperty(STORAGE_KEYS.USER_PREFERENCES, property, value)
}

/**
 * Gerenciamento de tema
 */
export const theme = {
  get: () => storage.getItem(STORAGE_KEYS.THEME, 'dark'),
  set: (themeValue) => storage.setItem(STORAGE_KEYS.THEME, themeValue),
  toggle: () => {
    const currentTheme = theme.get()
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    theme.set(newTheme)
    return newTheme
  }
}

