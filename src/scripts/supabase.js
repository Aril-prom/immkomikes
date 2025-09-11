import { createClient } from "https://esm.sh/@supabase/supabase-js";

export const supabase = createClient(
  "https://sxeveitjubrsntjhgakf.supabase.co", // ganti dengan project URL kamu
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4ZXZlaXRqdWJyc250amhnYWtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwNTE2MjUsImV4cCI6MjA3MjYyNzYyNX0.lValEMgTOSSJ2JJ5jg3hRYIgwb1EVLRR_Idz0waZ0es" // ganti dengan anon key
);
