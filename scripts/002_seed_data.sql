-- Seed Home data
INSERT INTO home (name, role, value_proposition, photo_url, email)
VALUES (
  'Budi Cahyono',
  'AI Engineer',
  'Predicting the future is not magic, it is artificial intelligence',
  '/placeholder.svg?height=400&width=400',
  'budi@example.com'
);

-- Seed Skills - AI/Data
INSERT INTO skills (name, category, logo_url, sort_order) VALUES
('Python', 'AI/Data', '/placeholder.svg?height=48&width=48', 1),
('PyTorch', 'AI/Data', '/placeholder.svg?height=48&width=48', 2),
('TensorFlow', 'AI/Data', '/placeholder.svg?height=48&width=48', 3),
('Pandas', 'AI/Data', '/placeholder.svg?height=48&width=48', 4),
('NumPy', 'AI/Data', '/placeholder.svg?height=48&width=48', 5);

-- Seed Skills - Backend
INSERT INTO skills (name, category, logo_url, sort_order) VALUES
('Node.js', 'Backend', '/placeholder.svg?height=48&width=48', 6),
('FastAPI', 'Backend', '/placeholder.svg?height=48&width=48', 7),
('PostgreSQL', 'Backend', '/placeholder.svg?height=48&width=48', 8),
('REST API', 'Backend', '/placeholder.svg?height=48&width=48', 9);

-- Seed Skills - Frontend
INSERT INTO skills (name, category, logo_url, sort_order) VALUES
('React', 'Frontend', '/placeholder.svg?height=48&width=48', 10),
('Next.js', 'Frontend', '/placeholder.svg?height=48&width=48', 11),
('TypeScript', 'Frontend', '/placeholder.svg?height=48&width=48', 12),
('Tailwind CSS', 'Frontend', '/placeholder.svg?height=48&width=48', 13);

-- Seed Skills - Tools
INSERT INTO skills (name, category, logo_url, sort_order) VALUES
('VS Code', 'Tools', '/placeholder.svg?height=48&width=48', 14),
('Docker', 'Tools', '/placeholder.svg?height=48&width=48', 15),
('Git', 'Tools', '/placeholder.svg?height=48&width=48', 16),
('Jupyter', 'Tools', '/placeholder.svg?height=48&width=48', 17);

-- Seed Projects - AI
INSERT INTO projects (title, description, category, thumbnail_url, demo_url, view_url, technologies, sort_order) VALUES
('AI Chatbot Assistant', 'Intelligent conversational AI powered by GPT-4 with context awareness and multi-turn dialogue capabilities', 'AI', '/placeholder.svg?height=300&width=400', 'https://demo.example.com/chatbot', 'https://github.com/example/chatbot', ARRAY['Python', 'OpenAI', 'LangChain'], 1),
('Computer Vision Detection', 'Real-time object detection system using YOLO v8 for automated surveillance and monitoring', 'AI', '/placeholder.svg?height=300&width=400', 'https://demo.example.com/vision', 'https://github.com/example/vision', ARRAY['Python', 'PyTorch', 'OpenCV'], 2),
('NLP Sentiment Analysis', 'Advanced sentiment analysis tool for social media monitoring and brand reputation management', 'AI', '/placeholder.svg?height=300&width=400', 'https://demo.example.com/sentiment', 'https://github.com/example/sentiment', ARRAY['Python', 'Transformers', 'BERT'], 3);

-- Seed Projects - Data
INSERT INTO projects (title, description, category, thumbnail_url, demo_url, view_url, technologies, sort_order) VALUES
('Sales Analytics Dashboard', 'Interactive dashboard for real-time sales data visualization and business intelligence insights', 'Data', '/placeholder.svg?height=300&width=400', 'https://demo.example.com/sales', 'https://github.com/example/sales', ARRAY['Python', 'Pandas', 'Plotly'], 4),
('Customer Churn Prediction', 'Machine learning model predicting customer churn with 94% accuracy for retention strategies', 'Data', '/placeholder.svg?height=300&width=400', 'https://demo.example.com/churn', 'https://github.com/example/churn', ARRAY['Python', 'Scikit-learn', 'XGBoost'], 5),
('ETL Data Pipeline', 'Automated data pipeline processing 1M+ records daily with data quality validation', 'Data', '/placeholder.svg?height=300&width=400', 'https://demo.example.com/pipeline', 'https://github.com/example/pipeline', ARRAY['Python', 'Apache Airflow', 'PostgreSQL'], 6);

-- Seed Projects - Model
INSERT INTO projects (title, description, category, thumbnail_url, demo_url, view_url, technologies, sort_order) VALUES
('Image Classification Model', 'Deep learning model achieving 98% accuracy on custom dataset with transfer learning', 'Model', '/placeholder.svg?height=300&width=400', 'https://demo.example.com/classifier', 'https://github.com/example/classifier', ARRAY['Python', 'TensorFlow', 'ResNet'], 7),
('Time Series Forecasting', 'LSTM-based model for accurate stock price prediction and trend analysis', 'Model', '/placeholder.svg?height=300&width=400', 'https://demo.example.com/forecast', 'https://github.com/example/forecast', ARRAY['Python', 'PyTorch', 'LSTM'], 8),
('Recommendation Engine', 'Collaborative filtering system providing personalized recommendations for e-commerce', 'Model', '/placeholder.svg?height=300&width=400', 'https://demo.example.com/recommender', 'https://github.com/example/recommender', ARRAY['Python', 'TensorFlow', 'Matrix Factorization'], 9);

-- Seed Experience - Personal Project
INSERT INTO experience (title, description, category, thumbnail_url, demo_url, view_url, technologies, date_start, date_end, sort_order) VALUES
('AI Portfolio Website', 'Built full-stack portfolio with admin dashboard using Next.js and Supabase', 'Personal Project', '/placeholder.svg?height=300&width=400', 'https://portfolio.example.com', 'https://github.com/example/portfolio', ARRAY['Next.js', 'Supabase', 'TypeScript'], '2024-01-01', '2024-03-01', 1),
('ML Model Deployment Platform', 'Created platform for deploying and monitoring machine learning models in production', 'Personal Project', '/placeholder.svg?height=300&width=400', 'https://mlops.example.com', 'https://github.com/example/mlops', ARRAY['Python', 'FastAPI', 'Docker'], '2023-09-01', '2023-12-01', 2),
('Data Visualization Library', 'Developed open-source Python library for creating interactive data visualizations', 'Personal Project', '/placeholder.svg?height=300&width=400', 'https://dataviz.example.com', 'https://github.com/example/dataviz', ARRAY['Python', 'D3.js', 'WebGL'], '2023-06-01', '2023-08-01', 3);

-- Seed Experience - Freelance
INSERT INTO experience (title, description, category, thumbnail_url, demo_url, view_url, technologies, date_start, date_end, sort_order) VALUES
('E-commerce Recommendation System', 'Implemented personalized product recommendation engine increasing sales by 35%', 'Freelance', '/placeholder.svg?height=300&width=400', NULL, NULL, ARRAY['Python', 'TensorFlow', 'AWS'], '2024-04-01', '2024-06-01', 4),
('Healthcare Data Analytics', 'Analyzed patient data to identify treatment patterns and improve healthcare outcomes', 'Freelance', '/placeholder.svg?height=300&width=400', NULL, NULL, ARRAY['Python', 'Pandas', 'Tableau'], '2024-02-01', '2024-03-01', 5),
('Financial Fraud Detection', 'Built machine learning system detecting fraudulent transactions with 99.2% accuracy', 'Freelance', '/placeholder.svg?height=300&width=400', NULL, NULL, ARRAY['Python', 'Scikit-learn', 'PostgreSQL'], '2023-10-01', '2023-12-01', 6);

-- Seed Experience - Collaboration
INSERT INTO experience (title, description, category, thumbnail_url, demo_url, view_url, technologies, date_start, date_end, sort_order) VALUES
('Open Source AI Framework', 'Core contributor to popular AI framework with 10K+ GitHub stars', 'Collaboration', '/placeholder.svg?height=300&width=400', 'https://framework.example.com', 'https://github.com/example/framework', ARRAY['Python', 'PyTorch', 'CUDA'], '2023-01-01', NULL, 7),
('Research Paper Implementation', 'Collaborated with researchers to implement and optimize novel deep learning architecture', 'Collaboration', '/placeholder.svg?height=300&width=400', 'https://research.example.com', 'https://github.com/example/research', ARRAY['Python', 'TensorFlow', 'JAX'], '2023-07-01', '2023-09-01', 8),
('AI Community Platform', 'Co-developed platform connecting AI practitioners and sharing knowledge resources', 'Collaboration', '/placeholder.svg?height=300&width=400', 'https://community.example.com', 'https://github.com/example/community', ARRAY['Next.js', 'Node.js', 'MongoDB'], '2024-01-01', NULL, 9);

-- Seed Blog - What You Learned
INSERT INTO blog (title, description, category, thumbnail_url, content, view_url, read_time, sort_order) VALUES
('Understanding Transformer Architecture', 'Deep dive into the mechanics of attention mechanisms and how they revolutionized NLP', 'What You Learned', '/placeholder.svg?height=300&width=400', 'Full blog content here...', '/blog/transformer-architecture', 8, 1),
('The Mathematics Behind Neural Networks', 'Breaking down backpropagation, gradient descent, and optimization algorithms', 'What You Learned', '/placeholder.svg?height=300&width=400', 'Full blog content here...', '/blog/neural-network-math', 12, 2),
('Production ML: From Jupyter to Deployment', 'Lessons learned transitioning from notebook experiments to production systems', 'What You Learned', '/placeholder.svg?height=300&width=400', 'Full blog content here...', '/blog/ml-production', 10, 3);

-- Seed Blog - How You Built Something
INSERT INTO blog (title, description, category, thumbnail_url, content, view_url, read_time, sort_order) VALUES
('Building a Real-Time Object Detection API', 'Step-by-step guide to deploying YOLO model as scalable REST API', 'How You Built Something', '/placeholder.svg?height=300&width=400', 'Full blog content here...', '/blog/object-detection-api', 15, 4),
('Creating Custom PyTorch Dataset Loaders', 'Optimizing data loading pipeline for faster model training', 'How You Built Something', '/placeholder.svg?height=300&width=400', 'Full blog content here...', '/blog/pytorch-dataset', 9, 5),
('Implementing RAG with LangChain', 'Building retrieval-augmented generation chatbot with vector database', 'How You Built Something', '/placeholder.svg?height=300&width=400', 'Full blog content here...', '/blog/rag-langchain', 13, 6);

-- Seed Blog - Lessons From Failure
INSERT INTO blog (title, description, category, thumbnail_url, content, view_url, read_time, sort_order) VALUES
('When My Model Failed in Production', 'How data drift silently degraded model performance and what I learned', 'Lessons From Failure', '/placeholder.svg?height=300&width=400', 'Full blog content here...', '/blog/model-failure', 7, 7),
('The Cost of Ignoring Data Quality', 'How bad training data led to biased predictions and how to prevent it', 'Lessons From Failure', '/placeholder.svg?height=300&width=400', 'Full blog content here...', '/blog/data-quality', 8, 8),
('Overengineering My First ML Pipeline', 'Why simpler solutions often outperform complex architectures', 'Lessons From Failure', '/placeholder.svg?height=300&width=400', 'Full blog content here...', '/blog/overengineering', 6, 9);

-- Seed Contact
INSERT INTO contact (platform, url, icon, sort_order) VALUES
('Email', 'mailto:budi.cahyono@example.com', 'mail', 1),
('LinkedIn', 'https://linkedin.com/in/budicahyono', 'linkedin', 2),
('GitHub', 'https://github.com/budicahyono', 'github', 3),
('Calendly', 'https://calendly.com/budicahyono', 'calendar', 4);
