const {createClient}=require('@supabase/supabase-js')

const supabaseUrl = 'https://ygpwadbhvaqzulwjnbrz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlncHdhZGJodmFxenVsd2puYnJ6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTY2MjE2OCwiZXhwIjoyMDY1MjM4MTY4fQ.qfYf0sdEHtlmgXj1qy1T-cLpWYRuEm3-qdw5mfYCr_c';
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports=supabase;