import { createServerSupabaseClient } from '@/lib/supabase-server';
import AdminIntelligenceClient from '@/components/AdminIntelligenceClient';

export const dynamic = 'force-dynamic';

export default async function AdminIntelligencePage() {
  const supabase = await createServerSupabaseClient();
  
  // Fetch Visitors
  const { data: visitors } = await supabase
    .from('intelligence_visitors')
    .select('*')
    .order('first_visit_date', { ascending: false, nullsFirst: false })
    .limit(50); // Get latest 50 for performance

  // Fetch Aggregated Sessions
  const { data: sessions } = await supabase
    .from('intelligence_sessions')
    .select('*')
    .order('start_time', { ascending: false })
    .limit(100);

  // Note: For a true analytics dashboard, we would do aggregate grouping in SQL, 
  // but for this MVP we pull recent records and reduce them in the client.

  return (
    <AdminIntelligenceClient 
      initialVisitors={visitors || []} 
      initialSessions={sessions || []} 
    />
  );
}
