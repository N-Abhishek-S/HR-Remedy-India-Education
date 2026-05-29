insert into public.roles (name, description) values
  ('admin', 'Full administrative access'),
  ('counsellor', 'Counselling and booking workflows'),
  ('sales', 'Lead follow-up workflows'),
  ('content_manager', 'CMS publishing workflows')
on conflict (name) do nothing;

insert into public.course_categories (name, slug, description, sort_order) values
  ('HR Careers', 'hr-careers', 'Career transformation programs for HR roles', 1),
  ('Recruitment', 'recruitment', 'Recruitment and talent acquisition programs', 2)
on conflict (slug) do nothing;
