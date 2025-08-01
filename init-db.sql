-- Database initialization script for Request Hub
-- This script runs when the PostgreSQL container starts for the first time

-- Create extensions if they don't exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Set default timezone
SET timezone = 'UTC';

-- Grant necessary permissions
GRANT ALL PRIVILEGES ON DATABASE request_hub_db TO postgres;

-- Create a dedicated schema for the application (optional)
-- CREATE SCHEMA IF NOT EXISTS request_hub_app;
-- GRANT ALL ON SCHEMA request_hub_app TO postgres;

-- Log successful initialization
INSERT INTO information_schema.sql_features (feature_id, feature_name, sub_feature_id, sub_feature_name, is_supported, comments)
VALUES ('REQUEST_HUB001', 'Request Hub Database', '001', 'Initialized', 'YES', 'Database initialized successfully')
ON CONFLICT DO NOTHING;
