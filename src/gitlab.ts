import { Hono } from 'hono';
import { cors } from 'hono/cors';

const GITLAB_API_PREFIX = 'https://gitlab.kanjian.com/api/v4';

type Bindings = {
  GITLAB_GROUP_TOKEN: string
}

const app = new Hono<{ Bindings: Bindings }>();

app.use('*', cors());

app.get('/project-overview', async(c) => {
  const query = new URLSearchParams({
    private_token: c.env.GITLAB_GROUP_TOKEN,
    simple: 'true',
    per_page: '100',
    archived: 'false'
  });

  const res = await fetch(
    `${GITLAB_API_PREFIX}/groups/47/projects?${query}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const body: [] = await res.json();

  const groupedData = Object.values(body.reduce((acc: any, item: any) => {
    const { id, name, description, web_url } = item;

    const groupName = name.split('-')[0];

    if (!acc[groupName]) {
      acc[groupName] = { group: groupName, projects: [] };
    }
    acc[groupName].projects.push({
      id,
      name,
      description: description || '',
      url: web_url,
    });
    return acc;
  }, {}));

  return c.json(groupedData);
});

export default app;
