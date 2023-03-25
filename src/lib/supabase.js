import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
	'https://iamjlxxsmpaklxuawvab.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhbWpseHhzbXBha2x4dWF3dmFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg4NzYxNzAsImV4cCI6MTk5NDQ1MjE3MH0.OJILqsiz7Qs5hreP1WKsOBSDNErEKivACYTDYy7oUpk'
);
