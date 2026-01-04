-- Script to set a user as admin
-- Replace 'your-email@example.com' with your actual email

-- Update user metadata to set is_admin flag
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || '{"is_admin": true}'::jsonb
WHERE email = 'budicahyono.dev@gmail.com';

-- Verify the admin was set correctly
SELECT 
  id,
  email,
  raw_user_meta_data->>'is_admin' as is_admin,
  created_at
FROM auth.users
WHERE email = 'budicahyono.dev@gmail.com';
