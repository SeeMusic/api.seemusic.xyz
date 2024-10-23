import { Hono } from 'hono';
import { cors } from 'hono/cors';

const GITLAB_API_PREFIX = 'https://gitlab.kanjian.com/api/v4';

type Bindings = {
  GITLAB_GROUP_TOKEN: string,
  kmfe: KVNamespace
}

const app = new Hono<{ Bindings: Bindings }>();

app.use('*', cors());

interface Project {
  id: number,
  name: string,
  description: string,
  url: string,
}

interface ProjectsData {
  total: number,
  data: Project[]
}

app.get('/project-overview', async(c) => {
  const projectsData: ProjectsData | null = await c.env.kmfe.get('gitlab-projects', 'json');

  if (!projectsData) {
    return c.json({
      total: 0,
      data: [],
    });
  }

  const body = projectsData.data;

  const groupedData = Object.values(body.reduce((acc: any, item: Project) => {
    const { id, name, description, url } = item;

    const groupName = name.split('-')[0];

    if (!acc[groupName]) {
      acc[groupName] = { group: groupName, projects: [] };
    }
    acc[groupName].projects.push({
      id,
      name,
      description: description || '',
      url,
    });

    return acc;
  }, {}));

  return c.json({
    total: projectsData.total,
    data: groupedData,
  });
});

export default app;
