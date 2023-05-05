export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          id: string
          name: string | null
          stripe_customer_id: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id: string
          name?: string | null
          stripe_customer_id?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string | null
          stripe_customer_id?: string | null
          updated_at?: string | null
        }
      }
      sellers: {
        Row: {
          created_at: string | null
          estimate_sales: number | null
          id: number
          latitude: number | null
          longitude: number | null
          name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          estimate_sales?: number | null
          id?: number
          latitude?: number | null
          longitude?: number | null
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          estimate_sales?: number | null
          id?: number
          latitude?: number | null
          longitude?: number | null
          name?: string | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

