import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://shrkfxbebtjftpacmfyo.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNocmtmeGJlYnRqZnRwYWNtZnlvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyOTQwMDAwOCwiZXhwIjoyMDQ0OTc2MDA4fQ.3anbTFQRiAiF7cvUvf0217ABIjClPwE8ugjgGpGpGTc');

export default supabase;