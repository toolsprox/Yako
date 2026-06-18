-- 1. Add Latitude and Longitude columns to your visitors table
ALTER TABLE public.intelligence_visitors
ADD COLUMN IF NOT EXISTS geo_lat TEXT,
ADD COLUMN IF NOT EXISTS geo_lng TEXT;

-- 2. Update the track_event function to accept the new coordinates
CREATE OR REPLACE FUNCTION track_event(
    p_visitor_id UUID,
    p_session_id UUID,
    p_event_type TEXT,
    p_event_data JSONB,
    p_device_type TEXT,
    p_browser TEXT,
    p_os TEXT,
    p_source TEXT,
    p_referrer TEXT,
    p_landing_page TEXT,
    p_city TEXT,
    p_country TEXT,
    p_dummy_name TEXT,
    p_fingerprint TEXT,
    p_lat TEXT DEFAULT NULL, -- NEW PARAMETER
    p_lng TEXT DEFAULT NULL  -- NEW PARAMETER
)
RETURNS VOID AS $$
BEGIN
    -- 1. Upsert Visitor
    INSERT INTO public.intelligence_visitors 
        (id, device_type, browser, os, geo_city, geo_country, geo_lat, geo_lng, dummy_name, fingerprint)
    VALUES 
        (p_visitor_id, p_device_type, p_browser, p_os, p_city, p_country, p_lat, p_lng, p_dummy_name, p_fingerprint)
    ON CONFLICT (id) DO UPDATE SET
        geo_city = COALESCE(NULLIF(p_city, ''), public.intelligence_visitors.geo_city),
        geo_country = COALESCE(NULLIF(p_country, ''), public.intelligence_visitors.geo_country),
        geo_lat = COALESCE(NULLIF(p_lat, ''), public.intelligence_visitors.geo_lat),
        geo_lng = COALESCE(NULLIF(p_lng, ''), public.intelligence_visitors.geo_lng),
        total_visits = public.intelligence_visitors.total_visits + 1,
        last_visit_at = NOW();

    -- 2. Upsert Session
    INSERT INTO public.intelligence_sessions (id, visitor_id, landing_page, traffic_source, referrer)
    VALUES (p_session_id, p_visitor_id, p_landing_page, p_source, p_referrer)
    ON CONFLICT (id) DO UPDATE SET
        duration_seconds = EXTRACT(EPOCH FROM (NOW() - public.intelligence_sessions.created_at));

    -- 3. Insert Event
    INSERT INTO public.intelligence_events (visitor_id, session_id, event_type, event_data)
    VALUES (p_visitor_id, p_session_id, p_event_type, p_event_data);
    
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
