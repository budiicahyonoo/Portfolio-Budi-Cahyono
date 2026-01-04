-- Update Skills with real logo URLs from cdnjs/jsdelivr
-- AI/Data logos
UPDATE skills SET logo_url = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' WHERE name = 'Python';
UPDATE skills SET logo_url = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' WHERE name = 'PyTorch';
UPDATE skills SET logo_url = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' WHERE name = 'TensorFlow';
UPDATE skills SET logo_url = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' WHERE name = 'Pandas';
UPDATE skills SET logo_url = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' WHERE name = 'NumPy';

-- Backend logos
UPDATE skills SET logo_url = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' WHERE name = 'Node.js';
UPDATE skills SET logo_url = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' WHERE name = 'FastAPI';
UPDATE skills SET logo_url = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' WHERE name = 'PostgreSQL';
UPDATE skills SET logo_url = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/openapi/openapi-original.svg' WHERE name = 'REST API';

-- Frontend logos
UPDATE skills SET logo_url = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' WHERE name = 'React';
UPDATE skills SET logo_url = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' WHERE name = 'Next.js';
UPDATE skills SET logo_url = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' WHERE name = 'TypeScript';
UPDATE skills SET logo_url = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' WHERE name = 'Tailwind CSS';

-- Tools logos
UPDATE skills SET logo_url = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' WHERE name = 'VS Code';
UPDATE skills SET logo_url = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' WHERE name = 'Docker';
UPDATE skills SET logo_url = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' WHERE name = 'Git';
UPDATE skills SET logo_url = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg' WHERE name = 'Jupyter';
