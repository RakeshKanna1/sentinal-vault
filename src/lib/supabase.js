import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cwvfgxdhearouclomjeq.supabase.co';
const supabaseAnonKey = 'sb_publishable_xkeb5PPKakTH5qQvPQllBA_eZDAHqKK';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
