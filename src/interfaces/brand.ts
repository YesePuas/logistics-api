export interface BrandEntry {
  id: number;
  denomination: string;
  created_at: string;
  update_ad: string;
}

export type newBrandEntry = Omit<BrandEntry, "id">;
