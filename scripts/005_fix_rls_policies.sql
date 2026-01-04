-- Drop existing admin policies that cause permission errors
DROP POLICY IF EXISTS "Allow admin insert on home" ON home;
DROP POLICY IF EXISTS "Allow admin update on home" ON home;
DROP POLICY IF EXISTS "Allow admin delete on home" ON home;

DROP POLICY IF EXISTS "Allow admin insert on skills" ON skills;
DROP POLICY IF EXISTS "Allow admin update on skills" ON skills;
DROP POLICY IF EXISTS "Allow admin delete on skills" ON skills;

DROP POLICY IF EXISTS "Allow admin insert on projects" ON projects;
DROP POLICY IF EXISTS "Allow admin update on projects" ON projects;
DROP POLICY IF EXISTS "Allow admin delete on projects" ON projects;

DROP POLICY IF EXISTS "Allow admin insert on experience" ON experience;
DROP POLICY IF EXISTS "Allow admin update on experience" ON experience;
DROP POLICY IF EXISTS "Allow admin delete on experience" ON experience;

DROP POLICY IF EXISTS "Allow admin insert on blog" ON blog;
DROP POLICY IF EXISTS "Allow admin update on blog" ON blog;
DROP POLICY IF EXISTS "Allow admin delete on blog" ON blog;

DROP POLICY IF EXISTS "Allow admin insert on contact" ON contact;
DROP POLICY IF EXISTS "Allow admin update on contact" ON contact;
DROP POLICY IF EXISTS "Allow admin delete on contact" ON contact;

-- Create new policies using auth.jwt() instead of querying auth.users
-- This avoids "permission denied for table users" errors

-- Home table policies
CREATE POLICY "Allow admin insert on home" ON home FOR INSERT 
WITH CHECK (
  (auth.jwt() ->> 'email')::text = 'budicahyono.dev@gmail.com'
  OR (auth.jwt() -> 'user_metadata' ->> 'is_admin')::text = 'true'
);

CREATE POLICY "Allow admin update on home" ON home FOR UPDATE 
USING (
  (auth.jwt() ->> 'email')::text = 'budicahyono.dev@gmail.com'
  OR (auth.jwt() -> 'user_metadata' ->> 'is_admin')::text = 'true'
);

CREATE POLICY "Allow admin delete on home" ON home FOR DELETE 
USING (
  (auth.jwt() ->> 'email')::text = 'budicahyono.dev@gmail.com'
  OR (auth.jwt() -> 'user_metadata' ->> 'is_admin')::text = 'true'
);

-- Skills table policies
CREATE POLICY "Allow admin insert on skills" ON skills FOR INSERT 
WITH CHECK (
  (auth.jwt() ->> 'email')::text = 'budicahyono.dev@gmail.com'
  OR (auth.jwt() -> 'user_metadata' ->> 'is_admin')::text = 'true'
);

CREATE POLICY "Allow admin update on skills" ON skills FOR UPDATE 
USING (
  (auth.jwt() ->> 'email')::text = 'budicahyono.dev@gmail.com'
  OR (auth.jwt() -> 'user_metadata' ->> 'is_admin')::text = 'true'
);

CREATE POLICY "Allow admin delete on skills" ON skills FOR DELETE 
USING (
  (auth.jwt() ->> 'email')::text = 'budicahyono.dev@gmail.com'
  OR (auth.jwt() -> 'user_metadata' ->> 'is_admin')::text = 'true'
);

-- Projects table policies
CREATE POLICY "Allow admin insert on projects" ON projects FOR INSERT 
WITH CHECK (
  (auth.jwt() ->> 'email')::text = 'budicahyono.dev@gmail.com'
  OR (auth.jwt() -> 'user_metadata' ->> 'is_admin')::text = 'true'
);

CREATE POLICY "Allow admin update on projects" ON projects FOR UPDATE 
USING (
  (auth.jwt() ->> 'email')::text = 'budicahyono.dev@gmail.com'
  OR (auth.jwt() -> 'user_metadata' ->> 'is_admin')::text = 'true'
);

CREATE POLICY "Allow admin delete on projects" ON projects FOR DELETE 
USING (
  (auth.jwt() ->> 'email')::text = 'budicahyono.dev@gmail.com'
  OR (auth.jwt() -> 'user_metadata' ->> 'is_admin')::text = 'true'
);

-- Experience table policies
CREATE POLICY "Allow admin insert on experience" ON experience FOR INSERT 
WITH CHECK (
  (auth.jwt() ->> 'email')::text = 'budicahyono.dev@gmail.com'
  OR (auth.jwt() -> 'user_metadata' ->> 'is_admin')::text = 'true'
);

CREATE POLICY "Allow admin update on experience" ON experience FOR UPDATE 
USING (
  (auth.jwt() ->> 'email')::text = 'budicahyono.dev@gmail.com'
  OR (auth.jwt() -> 'user_metadata' ->> 'is_admin')::text = 'true'
);

CREATE POLICY "Allow admin delete on experience" ON experience FOR DELETE 
USING (
  (auth.jwt() ->> 'email')::text = 'budicahyono.dev@gmail.com'
  OR (auth.jwt() -> 'user_metadata' ->> 'is_admin')::text = 'true'
);

-- Blog table policies
CREATE POLICY "Allow admin insert on blog" ON blog FOR INSERT 
WITH CHECK (
  (auth.jwt() ->> 'email')::text = 'budicahyono.dev@gmail.com'
  OR (auth.jwt() -> 'user_metadata' ->> 'is_admin')::text = 'true'
);

CREATE POLICY "Allow admin update on blog" ON blog FOR UPDATE 
USING (
  (auth.jwt() ->> 'email')::text = 'budicahyono.dev@gmail.com'
  OR (auth.jwt() -> 'user_metadata' ->> 'is_admin')::text = 'true'
);

CREATE POLICY "Allow admin delete on blog" ON blog FOR DELETE 
USING (
  (auth.jwt() ->> 'email')::text = 'budicahyono.dev@gmail.com'
  OR (auth.jwt() -> 'user_metadata' ->> 'is_admin')::text = 'true'
);

-- Contact table policies
CREATE POLICY "Allow admin insert on contact" ON contact FOR INSERT 
WITH CHECK (
  (auth.jwt() ->> 'email')::text = 'budicahyono.dev@gmail.com'
  OR (auth.jwt() -> 'user_metadata' ->> 'is_admin')::text = 'true'
);

CREATE POLICY "Allow admin update on contact" ON contact FOR UPDATE 
USING (
  (auth.jwt() ->> 'email')::text = 'budicahyono.dev@gmail.com'
  OR (auth.jwt() -> 'user_metadata' ->> 'is_admin')::text = 'true'
);

CREATE POLICY "Allow admin delete on contact" ON contact FOR DELETE 
USING (
  (auth.jwt() ->> 'email')::text = 'budicahyono.dev@gmail.com'
  OR (auth.jwt() -> 'user_metadata' ->> 'is_admin')::text = 'true'
);
