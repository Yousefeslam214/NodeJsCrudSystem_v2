    <h1>My Full Stack Project</h1>
    <p>This project is a full-stack application built with the following technologies:</p>
    <ul>
        <li>Backend: Node.js, Express, MongoDB</li>
        <li>Frontend: React, React Router, MUI (Material-UI)</li>
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
cd backend
npm install

# Install frontend dependencies

cd ../frontend
npm install</code></pre>

</li>
<li>Set up environment variables:
<p>Create a <code>.env</code> file in the <code>backend</code> directory with the following content:</p>
<pre><code>PORT=5002
URL=your_mongodb_connection_string</code></pre>
</li>
</ol>

    <h2 id="usage">Usage</h2>
    <ol>
        <li>Start the backend server:
            <pre><code>cd backend

npm start</code></pre>

</li>
<li>Start the frontend development server:
<pre><code>cd ../frontend
npm start</code></pre>
</li>
<li>Open your browser and navigate to <code>http://localhost:3000</code>.</li>
</ol>

    <h2 id="project-structure">Project Structure</h2>
    <pre><code>my-fullstack-project/

├── backend/
│ ├── routes/
│ │ ├── product.route.js
│ │ └── user.route.js
│ ├── .env
│ ├── server.js
│ └── package.json
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ │ ├── about/
│ │ │ ├── enterProducts/
│ │ │ ├── getProducts/
│ │ │ ├── help/
│ │ │ ├── navbar/
│ │ │ └── updateProduct/
│ │ ├── App.css
│ │ ├── App.js
│ │ └── index.js
│ └── package.json
└── README.md</code></pre>

</pre>

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
    </ul>

    <h2 id="features">Features</h2>
    <ul>
        <li>Full CRUD operations for products</li>
        <li>User management</li>
        <li>Responsive design with MUI</li>
        <li>Centralized state management (if applicable)</li>
    </ul>

    <h2 id="technologies-used">Technologies Used</h2>
    <ul>
        <li><strong>Backend:</strong> Node.js, Express, MongoDB, Mongoose</li>
        <li><strong>Frontend:</strong> React, React Router, MUI (Material-UI)</li>
    </ul>

    <h2 id="contributing">Contributing</h2>
    <p>Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.</p>

    <h2 id="license">License</h2>
    <p>This project is licensed under the MIT License.</p>
