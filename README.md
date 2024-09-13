<body>
    <h1>My Full Stack Project</h1>
    <p>This project is a full-stack application built with the following technologies:</p>
    <ul>
        <li><strong>Backend:</strong> Node.js, Express, MongoDB</li>
        <li><strong>Frontend:</strong> React, React Router, MUI (Material-UI)</li>
    </ul>
    <h2>Table of Contents</h2>
    <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#usage">Usage</a></li>
        <li><a href="#project-structure">Project Structure</a></li>
        <li><a href="#available-routes">Available Routes</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#technologies-used">Technologies Used</a></li>
        <li><a href="#contributing">Contributing</a></li>
        <li><a href="#license">License</a></li>
    </ul>
    <h2 id="installation">Installation</h2>
    <ol>
        <li>Clone the repository:
            <pre><code>git clone https://github.com/Yousefeslam214/my-fullstack-project.git
cd my-fullstack-project</code></pre>
        </li>
        <li>Install the dependencies for both backend and frontend:
            <pre><code># Install backend dependencies
cd server
npm install

\# Install frontend dependencies
cd ../client
npm install</code></pre>
</li>
<li>Set up environment variables:
<p>Create a <code>.env</code> file in the <code>server</code> directory with the following content:</p>
<pre><code>PORT=5002
URL=your_mongodb_connection_string</code></pre>
</li>
</ol>
<h2 id="usage">Usage</h2>
<ol>
<li>Start the backend server:
<pre><code>cd server
npm i && npm run dev</code></pre>
</li>
<li>Start the frontend development server:
<pre><code>cd ../client
npm i && npm run dev</code></pre>
</li>
<li>Open your browser and navigate to <code>http://localhost:5002</code>.</li>
</ol>
<h2 id="project-structure">Project Structure</h2>
<pre><code>my-fullstack-project/
├── server/
│ ├── controllers/
│ │ ├── product.controller.js
│ │ └── user.controller.js
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ │ ├── product.route.js
│ │ └── user.route.js
│ ├── utils/
│ │ ├── appError.js
│ │ ├── corsConfig.js
│ │ ├── httpStatusText.js
│ │ ├── jwt.js
│ │ └── uploadToFirebase.js
│ ├── firebase.js
│ ├── index.js
│ ├── package.json
│ └── vercel.json
├── client/
│ ├── dist/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ │ ├── about/
│ │ │ ├── enterProducts/
│ │ │ ├── form/
│ │ │ ├── getProducts/
│ │ │ ├── global/
│ │ │ ├── help/
│ │ │ ├── navbar/
│ │ │ ├── updateProduct/
│ │ │ └── user/
│ │ ├── App.css
│ │ ├── App.jsx
│ │ ├── index.css
│ │ ├── main.jsx
│ │ ├── redux/
│ │ └── theme.js
│ ├── package.json
│ └── vite.config.js
└── README.html</code></pre>
<h2 id="available-routes">Available Routes</h2>
<h3>Backend Routes</h3>
<ul>
<li><strong>Product Routes</strong>
<ul>
<li><code>GET /api/products</code>: Get all products</li>
<li><code>POST /api/products</code>: Add a new product</li>
<li><code>PUT /api/products/:id</code>: Update a product by ID</li>
<li><code>DELETE /api/products/:id</code>: Delete a product by ID</li>
</ul>
</li>
<li><strong>User Routes</strong>
<ul>
<li><code>GET /api/users</code>: Get all users</li>
<li><code>POST /api/users</code>: Add a new user</li>
<li><code>PUT /api/users/:id</code>: Update a user by ID</li>
<li><code>DELETE /api/users/:id</code>: Delete a user by ID</li>
</ul>
</li>
</ul>
<h3>Frontend Routes</h3>
<ul>
<li><code>/</code>: Home page (About)</li>
<li><code>/products</code>: Display all products</li>
<li><code>/enter-products</code>: Enter new products</li>
<li><code>/update/:id</code>: Update a product by ID</li>
<li><code>/help</code>: Help page</li>
<li><code>/login</code>: User login</li>
<li><code>/register</code>: User registration</li>
</ul>
<h2 id="features">Features</h2>
<ul>
<li>Full CRUD operations for products</li>
<li>User management with login and sign-up</li>
<li>Cookie-based authentication</li>
<li>Role-based access control (admin and manager privileges)</li>
<li>Responsive design with MUI</li>
</ul>
<h2 id="technologies-used">Technologies Used</h2>
<ul>
<li><strong>Backend:</strong> Node.js, Express, MongoDB, Mongoose</li>
<li><strong>Frontend:</strong> React, React Router, MUI (Material-UI), Vite</li>
</ul>
<h2 id="contributing">Contributing</h2>
<p>Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.</p>
<h2 id="license">License</h2>
<p>This project is licensed under the MIT License.</p>

</body>
</html>
