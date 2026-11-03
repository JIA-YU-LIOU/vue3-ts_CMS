// Local：使用 localStorage
// Session：使用 sessionStorage
enum CacheType {
  Local,
  Session,
}

class Cache {
  // 存放 localStorage 或 sessionStorage 物件
  storage: Storage

  /**
   * 建立 Cache 實例
   * @param type 指定要使用的快取類型
   */
  constructor(type: CacheType) {
    this.storage = type === CacheType.Local ? localStorage : sessionStorage
  }

  /**
   * 儲存資料
   * @param key 快取資料的名稱
   * @param value 要儲存的資料
   */
  setCache(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value))
  }

  /**
   * 讀取指定 key 的快取資料
   * @param key 要儲存的資料名稱
   * @returns 將 JSON 字串還原成 JavaScript 資料；若沒有資料，則回傳 undefined
   */
  getCache(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  /**
   * 移除指定 key 的快取資料
   * @param key 要移除的資料名稱
   */
  removeCache(key: string) {
    this.storage.removeItem(key)
  }

  /**
   * 清除目前儲存空間內的所有資料
   */
  clear() {
    this.storage.clear()
  }
}

export const localCache = new Cache(CacheType.Local)
export const sessionCache = new Cache(CacheType.Session)
