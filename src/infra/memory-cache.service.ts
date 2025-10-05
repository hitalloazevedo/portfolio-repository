type CacheRecord<T> = {
  value: T;
  expiresAt?: number;
  timeout?: ReturnType<typeof setTimeout>;
};

export class MemoryCache<V = unknown> {
 
    private static instance: MemoryCache;
    private readonly store: Map<string, CacheRecord<V>>;

    private constructor(){
       this.store = new Map<string, CacheRecord<V>>();
    }

    public static getInstance(){
        if (!MemoryCache.instance){
            MemoryCache.instance = new MemoryCache();
        }
        return MemoryCache.instance;
    }


  async set(key: string, value: V, ttl?: number): Promise<void> {
    const existing = this.store.get(key);
    if (existing?.timeout) clearTimeout(existing.timeout);

    const record: CacheRecord<V> = { value };

    if (ttl !== undefined) {
      const expiresAt = Date.now() + ttl;
      record.expiresAt = expiresAt;
      record.timeout = setTimeout(() => {
        this.delete(key);
      }, ttl);
    }

    this.store.set(key, record);
  }

  async get(key: string): Promise<V | null> {
    const record = this.store.get(key);
    if (!record) return null;

    if (this.isExpired(record)) {
      await this.delete(key);
      return null;
    }

    return record.value;
  }

  async has(key: string): Promise<boolean> {
    return (await this.get(key)) !== null;
  }

  async delete(key: string): Promise<void> {
    const record = this.store.get(key);
    if (record?.timeout) clearTimeout(record.timeout);
    this.store.delete(key);
  }

  clear(): void {
    for (const record of this.store.values()) {
      if (record.timeout) clearTimeout(record.timeout);
    }
    this.store.clear();
  }

  private isExpired(record: CacheRecord<V>): boolean {
    return !!record.expiresAt && Date.now() > record.expiresAt;
  }
}
