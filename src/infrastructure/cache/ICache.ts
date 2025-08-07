export interface ICache<V = any> {
  set(key: string, value: V, ttl?: number): Promise<void>;
  get(key: string): Promise<V | null>;
  delete(key: string): Promise<void>;
  has(key: string): Promise<boolean>;
  clear(): void;
}
