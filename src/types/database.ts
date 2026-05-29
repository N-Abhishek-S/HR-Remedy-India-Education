export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string;
          source: string;
          status: "new" | "contacted" | "qualified" | "converted" | "closed";
          course_slug: string | null;
          message: string | null;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          phone: string;
          source: string;
          status?: "new" | "contacted" | "qualified" | "converted" | "closed";
          course_slug?: string | null;
          message?: string | null;
          metadata?: Json;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
        Relationships: [];
      };
      enquiries: {
        Row: {
          id: string;
          lead_id: string | null;
          course_slug: string;
          preferred_mode: "online" | "classroom" | "hybrid" | null;
          message: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          lead_id?: string | null;
          course_slug: string;
          preferred_mode?: "online" | "classroom" | "hybrid" | null;
          message?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["enquiries"]["Insert"]>;
        Relationships: [];
      };
      counselling_bookings: {
        Row: {
          id: string;
          lead_id: string | null;
          career_stage: string;
          current_role: string | null;
          goals: string;
          preferred_date: string;
          preferred_time: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          lead_id?: string | null;
          career_stage: string;
          current_role?: string | null;
          goals: string;
          preferred_date: string;
          preferred_time: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["counselling_bookings"]["Insert"]>;
        Relationships: [];
      };
      demo_bookings: {
        Row: {
          id: string;
          lead_id: string | null;
          course_slug: string;
          preferred_date: string;
          preferred_time: string;
          learning_mode: "online" | "classroom" | "hybrid";
          created_at: string;
        };
        Insert: {
          id?: string;
          lead_id?: string | null;
          course_slug: string;
          preferred_date: string;
          preferred_time: string;
          learning_mode: "online" | "classroom" | "hybrid";
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["demo_bookings"]["Insert"]>;
        Relationships: [];
      };
      audit_logs: {
        Row: {
          id: string;
          actor_id: string | null;
          action: string;
          entity_type: string;
          entity_id: string | null;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          actor_id?: string | null;
          action: string;
          entity_type: string;
          entity_id?: string | null;
          metadata?: Json;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["audit_logs"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      app_role: "admin" | "counsellor" | "sales" | "content_manager";
      lead_status: "new" | "contacted" | "qualified" | "converted" | "closed";
      learning_mode: "online" | "classroom" | "hybrid";
    };
    CompositeTypes: Record<string, never>;
  };
};
