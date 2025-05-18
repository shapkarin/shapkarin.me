---
title: "Software Design Principles: A Practical Guide to Better Code"
description: "Learn essential software design principles for building maintainable code. Discover practical approaches to software architecture, from small projects to enterprise systems, based on real-world experience."
order: 8
---

## Table of Contents
- [Start Simple Before Getting Fancy](#start-simple-before-getting-fancy)
- [Use SOLID as a Helpful Map, Not a Strict Rulebook](#use-solid-as-a-helpful-map-not-a-strict-rulebook)
- [Keep Things Modular](#keep-things-modular)
- [Know a Few Patterns, But Don't Force Them](#know-a-few-patterns-but-dont-force-them)
- [Make It Easy to Change, Not Just Fast](#make-it-easy-to-change-not-just-fast)
- [Balance "You Aren't Gonna Need It" and Future Planning](#balance-you-arent-gonna-need-it-and-future-planning)
- [Applying These Principles in JavaScript](#applying-these-principles-in-javascript)
- [Real-World Examples: Design Principles in React](#real-world-examples-design-principles-in-react)
- [Testing and Tooling Are Part of Design](#testing-and-tooling-are-part-of-design)
- [Document the Why](#document-the-why)

Software design might sound like a lofty concept, but at its heart, it's about making your code easier to work with over the long haul. Whether you're building a tiny side project or architecting a sprawling enterprise system, good design choices help you avoid headaches later on. After more than a decade of writing and maintaining software, I've learned that it's not about memorizing fancy patterns—it's about understanding a handful of guiding principles and being willing to adapt as you go.

### Start Simple Before Getting Fancy
It's tempting to build a massive, "future-proof" architecture right out of the gate. Resist the urge. You'll rarely guess your future needs correctly, and over-engineering up front often leads to brittle, complicated code. A better strategy is to start with the simplest solution that works. Let the complexities come to you naturally as the product grows and evolves. When patterns or abstractions are really needed, they'll make themselves clear.

### Use SOLID as a Helpful Map, Not a Strict Rulebook
You might've heard of the SOLID principles. They're common-sense guidelines for writing code that's maintainable and flexible over time:

- **Single Responsibility:** Each piece of code should have one clear job.
- **Open-Closed:** Make it easy to extend functionality without rewriting what's already working.
- **Liskov Substitution:** If you're using inheritance, your subclasses shouldn't break the way their parents behave.
- **Interface Segregation:** Keep your interfaces ("contracts" for using your code) small and focused.
- **Dependency Inversion:** Rely on general abstractions, not specific implementations, so it's easy to swap parts out later.

Don't treat these like laws carved in stone. They're reminders to keep your code organized and adaptable. When something feels messy, these principles often help you figure out why.

### Keep Things Modular
As your codebase grows, complexity is going to show up. The key is to keep that complexity contained in neat, self-contained modules. Each module should have a clear purpose and hide its internal details so that changes inside don't ripple outward.

For example, let's say you've got a "User Management" module that handles user data. The rest of your code shouldn't care how that module stores or retrieves data—just that it can provide a user when asked. When each piece knows only what it needs to, you can update or refactor one part without rewriting everything else.

### Know a Few Patterns, But Don't Force Them
Design patterns like "Factory," "Strategy," or "Observer" are like tools in a toolbox. They're proven solutions for recurring problems. But the key word here is "recurring." Don't try to jam a pattern into your code just because it's trendy or you remember it from a class. If you don't have the problem that the pattern solves, you don't need the pattern.

If a certain pattern naturally fits your scenario—great, use it. If not, keep things simple. You'll thank yourself when you need to explain your code to a coworker or fix a bug six months down the road.

### Make It Easy to Change, Not Just Fast
People often think about performance when they think "good design," but maintainability is just as important—often more so. Your app will evolve as requirements shift, so design for that evolution. Consider adding a layer of abstraction if you know you'll likely swap out a dependency later. Use configuration files or environment variables instead of hardcoding values. And always write tests, so you can refactor with confidence.

### Balance "You Aren't Gonna Need It" and Future Planning
The YAGNI principle says, "Don't build features until you actually need them." It's a great way to avoid clutter. But going too far can lead to spaghetti code that's hard to enhance without rewriting everything.

The trick is finding a middle ground. Start minimal, and when you see a clear need for something more robust—say, a custom caching layer or a more complex data structure—add it then. That way, you're always investing your time in features and design decisions you know will pay off.

### Applying These Principles in JavaScript
JavaScript, with its dynamic nature and versatile paradigms, offers unique ways to apply these design principles. Here's how they translate:

- **Modularity with ES Modules:** Modern JavaScript's ES Modules (using `import` and `export`) are a direct enabler of the "Keep Things Modular" principle. They allow you to create well-encapsulated pieces of code with clear interfaces, making it easier to manage dependencies and reason about your application's structure. Avoid overly large modules; aim for focused units of functionality.

- **SOLID in a Dynamic World:**
    - *Single Responsibility* is crucial. JavaScript functions and classes should do one thing well. Arrow functions and concise syntax can help, but clarity is paramount.
    - *Open/Closed* can be achieved through various means, such as higher-order functions, plugins, or composition over inheritance. Frameworks often provide extension points.
    - *Liskov Substitution* is more nuanced due to JavaScript's prototypal inheritance and duck typing. Focus on consistent behavior and interfaces rather than strict class hierarchies.
    - *Interface Segregation* means keeping your object shapes and function signatures lean. Don't force consumers of your modules to depend on methods or properties they don't use. TypeScript can be a great help here.
    - *Dependency Inversion* is powerful. Instead of directly instantiating services or fetching data within a component, inject these dependencies. This makes testing easier and components more reusable.

- **Asynchronous Flow and Simplicity:** JavaScript is inherently asynchronous. Design with Promises and `async/await` in mind to keep code readable and avoid "callback hell." Simplicity here means making asynchronous operations easy to follow and manage, often by isolating them in dedicated services or utility functions.

- **Functional Programming Influences:** Many design principles align well with functional programming concepts. Immutability, pure functions (functions that don't have side effects), and composing small functions together can lead to more predictable and testable code. While you don't have to go full-functional, adopting some of these ideas can significantly improve your design.

- **Frameworks as Enablers (and Constraints):** Modern JavaScript frameworks (like React, Angular, Vue) often guide you towards certain design patterns (e.g., component-based architecture). Understand the design philosophy of your chosen framework and leverage its strengths, but also be aware of when you might need to step outside its conventions for a specific problem, always weighing the trade-offs.

Remember, the goal is not to dogmatically apply every pattern but to use these ideas to build JavaScript applications that are easier to understand, test, and maintain as they grow.

### Real-World Examples: Design Principles in React

The React ecosystem provides a rich landscape for applying software design principles in real-world applications. Let's examine some concrete examples of how these principles manifest in React code.

#### Single Responsibility Principle in Action

React components should ideally do one thing well. Consider this refactoring:

```jsx
// Before: Component doing too much
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading user!</div>;
  
  return (
    <div>
      <h2>{user.name}</h2>
      <div className="user-details">
        <img src={user.avatar} alt={user.name} />
        <div>Email: {user.email}</div>
        <div>Role: {user.role}</div>
        <div>Joined: {new Date(user.joinDate).toLocaleDateString()}</div>
      </div>
    </div>
  );
}
```

```jsx
// After: Separated concerns
function useUser(userId) {
  const [state, setState] = useState({
    user: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(user => setState({ user, loading: false, error: null }))
      .catch(error => setState({ user: null, loading: false, error }));
  }, [userId]);

  return state;
}

function UserProfile({ userId }) {
  const { user, loading, error } = useUser(userId);
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return <UserProfileView user={user} />;
}

function UserProfileView({ user }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <div className="user-details">
        <img src={user.avatar} alt={user.name} />
        <div>Email: {user.email}</div>
        <div>Role: {user.role}</div>
        <div>Joined: {new Date(user.joinDate).toLocaleDateString()}</div>
      </div>
    </div>
  );
}
```

This refactoring extracts data-fetching logic into a custom hook and separates the presentational component, making each piece focused on a single responsibility.

#### Open-Closed Principle with Component Composition

The Open-Closed Principle suggests that software entities should be open for extension but closed for modification. React's component composition model facilitates this beautifully:

```jsx
// A button component that's closed for modification but open for extension
function Button({ children, variant = 'primary', ...props }) {
  const baseStyles = 'px-4 py-2 rounded font-medium';
  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600'
  };
  
  return (
    <button 
      className={`${baseStyles} ${variantStyles[variant]}`} 
      {...props}
    >
      {children}
    </button>
  );
}

// Extended without modifying the original component
function IconButton({ icon, children, ...props }) {
  return (
    <Button {...props}>
      {icon} <span className="ml-2">{children}</span>
    </Button>
  );
}

// Further extended
function LoadingButton({ isLoading, children, ...props }) {
  return (
    <Button disabled={isLoading} {...props}>
      {isLoading ? <Spinner size="small" /> : children}
    </Button>
  );
}
```

#### Dependency Inversion with Context API

React's Context API provides an elegant way to implement Dependency Inversion, allowing components to depend on abstractions rather than concrete implementations:

```jsx
// Create the abstraction (context)
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {}
});

// Provider implements the details
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = useCallback(() => {
    setTheme(current => current === 'light' ? 'dark' : 'light');
  }, []);
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Components depend on the abstraction (context), not implementation details
function ThemedButton({ children, ...props }) {
  const { theme } = useContext(ThemeContext);
  
  return (
    <button 
      className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
      {...props}
    >
      {children}
    </button>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'dark' : 'light'} mode
    </button>
  );
}
```

### SOLID Principles in React: Deeper Applications

Let's explore each SOLID principle more thoroughly with practical React examples.

#### Single Responsibility Principle: Specialized Hooks and Components

The SRP becomes particularly powerful when building custom hooks that handle specific concerns:

```jsx
// Data fetching hook - responsible for API interaction only
function useProductData(productId) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    let isMounted = true;
    
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();
        
        if (isMounted) {
          setState({ data, loading: false, error: null });
        }
      } catch (error) {
        if (isMounted) {
          setState({ data: null, loading: false, error });
        }
      }
    }
    
    fetchProduct();
    
    return () => {
      isMounted = false;
    };
  }, [productId]);

  return state;
}

// Component responsible for rendering only
function ProductCard({ productId }) {
  const { data, loading, error } = useProductData(productId);
  
  if (loading) return <ProductCardSkeleton />;
  if (error) return <ErrorDisplay message={error.message} />;
  if (!data) return null;
  
  return (
    <div className="product-card">
      <img src={data.image} alt={data.name} />
      <h3>{data.name}</h3>
      <p>{data.description}</p>
      <PriceDisplay price={data.price} discounts={data.discounts} />
      <AddToCartButton productId={data.id} />
    </div>
  );
}

// Even more specialized components
function PriceDisplay({ price, discounts }) {
  const finalPrice = calculateFinalPrice(price, discounts);
  
  return (
    <div className="price-section">
      {discounts.length > 0 && (
        <span className="original-price">${price.toFixed(2)}</span>
      )}
      <span className="final-price">${finalPrice.toFixed(2)}</span>
    </div>
  );
}
```

This approach separates data fetching, component rendering, and price calculation into distinct responsibilities.

#### Open-Closed Principle: Component Composition and Higher-Order Components

React's component model naturally supports the Open-Closed Principle through composition patterns:

```jsx
// Base form component
function Form({ children, onSubmit, className, ...props }) {
  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
      className={`form ${className || ''}`}
      {...props}
    >
      {children}
    </form>
  );
}

// Enhanced with validation without modifying the base component
function FormWithValidation({ validationSchema, onSubmit, children, ...props }) {
  const [errors, setErrors] = useState({});
  
  const handleSubmit = (e) => {
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    try {
      validationSchema.validateSync(data, { abortEarly: false });
      setErrors({});
      onSubmit(data);
    } catch (validationError) {
      const newErrors = {};
      validationError.inner.forEach(err => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };
  
  // Clone children and inject error props
  const childrenWithErrors = React.Children.map(children, child => {
    if (React.isValidElement(child) && child.props.name) {
      return React.cloneElement(child, {
        error: errors[child.props.name],
      });
    }
    return child;
  });
  
  return (
    <Form onSubmit={handleSubmit} {...props}>
      {childrenWithErrors}
    </Form>
  );
}

// Higher-Order Component for authentication (another OCP application)
function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { user, loading } = useAuth();
    
    if (loading) return <LoadingSpinner />;
    if (!user) return <Navigate to="/login" />;
    
    return <Component user={user} {...props} />;
  };
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);
```

#### Liskov Substitution Principle: Interchangeable Components

The Liskov Substitution Principle ensures that components can be substituted for their base types without altering the system's correctness:

```jsx
// Base Button component with defined interface
function Button({ children, onClick, disabled, ...props }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="btn"
      {...props}
    >
      {children}
    </button>
  );
}

// PrimaryButton adheres to the Button interface and can be used wherever Button is used
function PrimaryButton(props) {
  return <Button className="btn-primary" {...props} />;
}

// DangerButton preserves the same behavior
function DangerButton(props) {
  return <Button className="btn-danger" {...props} />;
}

// SubmitButton adds functionality while preserving the base behavior
function SubmitButton({ isSubmitting, ...props }) {
  return (
    <Button
      type="submit"
      disabled={isSubmitting || props.disabled}
      {...props}
    >
      {isSubmitting ? <Spinner size="small" /> : props.children}
    </Button>
  );
}

// All these buttons can be used interchangeably
function FormActions({ isSubmitting, onCancel }) {
  return (
    <div className="form-actions">
      <DangerButton onClick={onCancel}>Cancel</DangerButton>
      <SubmitButton isSubmitting={isSubmitting}>Save</SubmitButton>
    </div>
  );
}
```

#### Interface Segregation Principle: Targeted Props and Custom Hooks

ISP in React is about ensuring components only receive the props they need:

```jsx
// Before: Component with too many props
function UserProfile({
  user,
  onUpdate,
  onDelete,
  onPasswordChange,
  onProfilePictureChange,
  onLogout,
  isAdmin,
  // ...many more props
}) {
  // Complex component with many responsibilities
}

// After: Breaking down into focused components with specific props
function UserBasicInfo({ user, onUpdate }) {
  return (
    <div className="user-info">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <button onClick={() => onUpdate(user.id)}>Edit Profile</button>
    </div>
  );
}

function UserSecuritySettings({ onPasswordChange, onLogout }) {
  return (
    <div className="security-settings">
      <h3>Security</h3>
      <button onClick={onPasswordChange}>Change Password</button>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

function AdminControls({ userId, onDelete }) {
  return (
    <div className="admin-controls">
      <h3>Admin Actions</h3>
      <button onClick={() => onDelete(userId)} className="danger">
        Delete User
      </button>
    </div>
  );
}

// Composed together as needed
function UserProfile({ user, isAdmin, ...actions }) {
  return (
    <div className="user-profile">
      <UserBasicInfo user={user} onUpdate={actions.onUpdate} />
      <UserSecuritySettings 
        onPasswordChange={actions.onPasswordChange}
        onLogout={actions.onLogout}
      />
      {isAdmin && (
        <AdminControls userId={user.id} onDelete={actions.onDelete} />
      )}
    </div>
  );
}
```

This approach also applies to custom hooks, which should serve a single, well-defined purpose:

```jsx
// General-purpose hooks for common functionality
function useToggle(initialState = false) {
  const [state, setState] = useState(initialState);
  const toggle = useCallback(() => setState(prev => !prev), []);
  return [state, toggle];
}

function useLocalStorage(key, initialValue) {
  // Implementation...
}

// Domain-specific hooks composed from simpler ones
function useModal() {
  const [isOpen, toggleModal] = useToggle(false);
  const open = useCallback(() => isOpen || toggleModal(), [isOpen, toggleModal]);
  const close = useCallback(() => isOpen && toggleModal(), [isOpen, toggleModal]);
  
  return { isOpen, open, close };
}
```

#### Dependency Inversion Principle: Service Abstraction and Injection

Beyond Context API, DIP can be implemented through explicit service abstraction:

```jsx
// Service interface - abstracting the data source
class ProductService {
  async getProducts() { 
    throw new Error("Not implemented");
  }
  
  async getProduct(id) {
    throw new Error("Not implemented");
  }
  
  async createProduct(product) {
    throw new Error("Not implemented");
  }
}

// Implementation - REST API
class RestProductService extends ProductService {
  async getProducts() {
    const response = await fetch('/api/products');
    return response.json();
  }
  
  async getProduct(id) {
    const response = await fetch(`/api/products/${id}`);
    return response.json();
  }
  
  async createProduct(product) {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    return response.json();
  }
}

// Implementation - Mock for testing
class MockProductService extends ProductService {
  constructor(mockData = []) {
    super();
    this._products = mockData;
  }
  
  async getProducts() {
    return Promise.resolve([...this._products]);
  }
  
  async getProduct(id) {
    const product = this._products.find(p => p.id === id);
    return Promise.resolve(product || null);
  }
  
  async createProduct(product) {
    const newProduct = { ...product, id: Date.now() };
    this._products.push(newProduct);
    return Promise.resolve(newProduct);
  }
}

// Service provider using React context
const ProductServiceContext = createContext(null);

function ProductServiceProvider({ children, service }) {
  return (
    <ProductServiceContext.Provider value={service}>
      {children}
    </ProductServiceContext.Provider>
  );
}

// Hook for consuming the service
function useProductService() {
  const service = useContext(ProductServiceContext);
  if (!service) {
    throw new Error("useProductService must be used within a ProductServiceProvider");
  }
  return service;
}

// Usage in components
function ProductList() {
  const productService = useProductService();
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    productService.getProducts().then(setProducts);
  }, [productService]);
  
  return (
    <div className="product-list">
      {products.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}

// Setup for application
function App() {
  // In production
  const productService = new RestProductService();
  
  // For testing or development
  // const productService = new MockProductService([...mockProducts]);
  
  return (
    <ProductServiceProvider service={productService}>
      <Router>
        {/* App routes */}
      </Router>
    </ProductServiceProvider>
  );
}
```

### Practical Tips for Applying SOLID in React Projects

When implementing SOLID principles in React applications, consider these practical recommendations:

1. **Start with clear component boundaries** - Before writing code, identify natural division points in your UI and data flow
   
2. **Use TypeScript to enforce interfaces** - TypeScript helps maintain the Interface Segregation and Liskov Substitution principles by clearly defining component props and service contracts

3. **Create targeted custom hooks** - Extract complex logic into custom hooks that follow the Single Responsibility Principle

4. **Prefer composition over inheritance** - React's component model works best with composition patterns that support the Open-Closed Principle

5. **Use dependency injection patterns** - Whether via props, context, or a DI container library, implement the Dependency Inversion Principle to make your components more testable and flexible

6. **Don't overengineer** - Apply SOLID principles pragmatically, not dogmatically. For small components or simple features, extensive abstraction may be counterproductive

7. **Evolve your architecture** - Start with simpler implementations and refactor toward SOLID principles as complexity emerges, rather than building complex abstractions prematurely

### Common Anti-Patterns and Better Solutions

When implementing SOLID principles in React, it's helpful to recognize common anti-patterns. Here are key anti-patterns to avoid and their improved solutions:

#### Anti-Pattern 1: Components with Multiple Responsibilities

```jsx
// ❌ Anti-pattern: Component doing too many things
function UserDashboard() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetching user data
  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);
  
  // Fetching posts
  useEffect(() => {
    if (user) {
      fetch(`/api/posts?userId=${user.id}`)
        .then(res => res.json())
        .then(data => setPosts(data))
        .catch(err => setError(err));
    }
  }, [user]);
  
  // Rendering UI with multiple responsibilities
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <>
          <div className="user-profile">
            <h2>{user.name}</h2>
            <img src={user.avatar} alt={user.name} />
            <div>Email: {user.email}</div>
          </div>
          
          <div className="user-posts">
            <h3>Recent Posts</h3>
            {posts.map(post => (
              <div key={post.id} className="post">
                <h4>{post.title}</h4>
                <p>{post.content}</p>
                <button onClick={() => handleLike(post.id)}>Like</button>
                <button onClick={() => handleShare(post.id)}>Share</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
```

```jsx
// ✅ Better solution: Split into specialized components and hooks

// Custom hook for user data
function useUserData() {
  const [state, setState] = useState({
    user: null,
    loading: true,
    error: null
  });
  
  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(user => setState({ user, loading: false, error: null }))
      .catch(error => setState({ user: null, loading: false, error }));
  }, []);
  
  return state;
}

// Custom hook for user posts
function useUserPosts(userId) {
  const [state, setState] = useState({
    posts: [],
    loading: false,
    error: null
  });
  
  useEffect(() => {
    if (!userId) return;
    
    setState(prev => ({ ...prev, loading: true }));
    fetch(`/api/posts?userId=${userId}`)
      .then(res => res.json())
      .then(posts => setState({ posts, loading: false, error: null }))
      .catch(error => setState({ posts: [], loading: false, error }));
  }, [userId]);
  
  return state;
}

// User profile component
function UserProfile({ user }) {
  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <img src={user.avatar} alt={user.name} />
      <div>Email: {user.email}</div>
    </div>
  );
}

// Post component
function Post({ post, onLike, onShare }) {
  return (
    <div className="post">
      <h4>{post.title}</h4>
      <p>{post.content}</p>
      <button onClick={() => onLike(post.id)}>Like</button>
      <button onClick={() => onShare(post.id)}>Share</button>
    </div>
  );
}

// Posts list component
function PostsList({ posts, onLike, onShare }) {
  return (
    <div className="user-posts">
      <h3>Recent Posts</h3>
      {posts.map(post => (
        <Post 
          key={post.id} 
          post={post} 
          onLike={onLike} 
          onShare={onShare} 
        />
      ))}
    </div>
  );
}

// Main dashboard component - now just composes other components
function UserDashboard() {
  const { user, loading: userLoading, error: userError } = useUserData();
  const { posts, loading: postsLoading, error: postsError } = 
    useUserPosts(user?.id);
  
  const handleLike = useCallback((postId) => {
    // Handle like logic
  }, []);
  
  const handleShare = useCallback((postId) => {
    // Handle share logic
  }, []);
  
  if (userLoading) return <div>Loading user data...</div>;
  if (userError) return <div>Error loading user: {userError.message}</div>;
  if (!user) return null;
  
  return (
    <div>
      <UserProfile user={user} />
      
      {postsLoading ? (
        <div>Loading posts...</div>
      ) : postsError ? (
        <div>Error loading posts: {postsError.message}</div>
      ) : (
        <PostsList 
          posts={posts} 
          onLike={handleLike} 
          onShare={handleShare} 
        />
      )}
    </div>
  );
}
```

#### Anti-Pattern 2: Props Drilling

```jsx
// ❌ Anti-pattern: Passing props through multiple layers
function App() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <div className={`app ${theme}`}>
      <Header 
        theme={theme} 
        toggleTheme={toggleTheme} 
        user={user} 
      />
      <Main 
        theme={theme} 
        user={user} 
      />
      <Footer 
        theme={theme} 
      />
    </div>
  );
}

function Header({ theme, toggleTheme, user }) {
  return (
    <header>
      <Logo theme={theme} />
      <Nav theme={theme} user={user} />
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
    </header>
  );
}

function Nav({ theme, user }) {
  return (
    <nav>
      <NavItems theme={theme} />
      <UserMenu theme={theme} user={user} />
    </nav>
  );
}

// ... and so on with props being passed down multiple levels
```

```jsx
// ✅ Better solution: Use context for widely needed props

// Create contexts
const ThemeContext = createContext();
const UserContext = createContext();

// Provider components
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);
  
  const value = useMemo(() => ({ 
    theme, 
    toggleTheme 
  }), [theme, toggleTheme]);
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  
  // Fetch user or handle login/logout
  useEffect(() => {
    // Fetch user logic here
  }, []);
  
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hooks to consume contexts
function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

// Components now consume what they need directly
function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const { theme } = useTheme();
  
  return (
    <div className={`app ${theme}`}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header>
      <Logo />
      <Nav />
      <ThemeToggle />
    </header>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'dark' : 'light'} mode
    </button>
  );
}

function UserMenu() {
  const user = useUser();
  
  if (!user) return <button>Log in</button>;
  
  return (
    <div className="user-menu">
      <img src={user.avatar} alt={user.name} />
      <span>{user.name}</span>
    </div>
  );
}
```

#### Anti-Pattern 3: Components That Don't Follow Open-Closed Principle

```jsx
// ❌ Anti-pattern: Non-extensible component with hardcoded behaviors
function Button({ label, onClick, type }) {
  let buttonClass = 'button';
  let icon = null;
  
  // Hard-coded variants that require modifying the component to add more
  if (type === 'primary') {
    buttonClass += ' button-primary';
    icon = <PrimaryIcon />;
  } else if (type === 'secondary') {
    buttonClass += ' button-secondary';
    icon = <SecondaryIcon />;
  } else if (type === 'danger') {
    buttonClass += ' button-danger';
    icon = <DangerIcon />;
  }
  
  // Hard-coded sizes
  if (size === 'small') {
    buttonClass += ' button-small';
  } else if (size === 'large') {
    buttonClass += ' button-large';
  }
  
  return (
    <button className={buttonClass} onClick={onClick}>
      {icon}
      <span>{label}</span>
    </button>
  );
}
```

```jsx
// ✅ Better solution: Extensible component using composition
function Button({ 
  children, 
  onClick,
  variant = 'default',
  size = 'medium',
  icon,
  className = '',
  ...props
}) {
  const buttonClass = `button button-${variant} button-${size} ${className}`;
  
  return (
    <button 
      className={buttonClass}
      onClick={onClick}
      {...props}
    >
      {icon && <span className="button-icon">{icon}</span>}
      <span className="button-content">{children}</span>
    </button>
  );
}

// Can now be extended without modifying the component:
function SubmitButton({ isSubmitting, ...props }) {
  return (
    <Button
      variant="primary"
      icon={isSubmitting ? <Spinner /> : <CheckIcon />}
      disabled={isSubmitting}
      {...props}
    />
  );
}

function IconButton({ icon, children, ...props }) {
  return (
    <Button
      icon={icon}
      className="icon-button"
      {...props}
    >
      {children}
    </Button>
  );
}

// Usage:
<Button variant="primary" size="large">Click me</Button>
<SubmitButton isSubmitting={isLoading}>Submit</SubmitButton>
<IconButton icon={<StarIcon />} variant="secondary">Favorite</IconButton>
```

#### Anti-Pattern 4: Declaring Functions Inside Effects

```jsx
// ❌ Anti-pattern: Functions inside useEffect
function ProductPage({ productId }) {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  useEffect(() => {
    // Defining functions inside the effect
    async function fetchProduct() {
      const response = await fetch(`/api/products/${productId}`);
      const data = await response.json();
      setProduct(data);
    }
    
    async function fetchRelatedProducts() {
      const response = await fetch(`/api/products/${productId}/related`);
      const data = await response.json();
      setRelatedProducts(data);
    }
    
    fetchProduct();
    fetchRelatedProducts();
  }, [productId]);
  
  // Component render code...
}
```

```jsx
// ✅ Better solution: Extract reusable service functions
// productService.js
export async function fetchProduct(productId) {
  const response = await fetch(`/api/products/${productId}`);
  return response.json();
}

export async function fetchRelatedProducts(productId) {
  const response = await fetch(`/api/products/${productId}/related`);
  return response.json();
}

// ProductPage.jsx
import { fetchProduct, fetchRelatedProducts } from './productService';

function ProductPage({ productId }) {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  useEffect(() => {
    async function loadProductData() {
      try {
        const productData = await fetchProduct(productId);
        setProduct(productData);
        
        const relatedData = await fetchRelatedProducts(productId);
        setRelatedProducts(relatedData);
      } catch (error) {
        // Handle error
      }
    }
    
    loadProductData();
  }, [productId]);
  
  // Component render code...
}
```

#### Anti-Pattern 5: Nested Components

```jsx
// ❌ Anti-pattern: Nested component declarations
function ParentComponent({ items }) {
  // This component is redeclared on every render
  function ChildComponent({ item }) {
    return (
      <div className="item">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    );
  }
  
  return (
    <div className="parent">
      {items.map(item => (
        <ChildComponent key={item.id} item={item} />
      ))}
    </div>
  );
}
```

```jsx
// ✅ Better solution: Lift component declarations
// Separate component file or declaration
function ItemComponent({ item }) {
  return (
    <div className="item">
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </div>
  );
}

function ParentComponent({ items }) {
  return (
    <div className="parent">
      {items.map(item => (
        <ItemComponent key={item.id} item={item} />
      ))}
    </div>
  );
}
```

#### Anti-Pattern 6: Not Using Custom Hooks for Reused Logic

```jsx
// ❌ Anti-pattern: Duplicating logic across components
function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);
  
  // Render component
}

function TeamMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch('/api/team')
      .then(res => res.json())
      .then(data => {
        setMembers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);
  
  // Render component
}
```

```jsx
// ✅ Better solution: Custom hook for data fetching
function useFetch(url) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null
  });
  
  useEffect(() => {
    let isMounted = true;
    
    setState(prev => ({ ...prev, loading: true }));
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (isMounted) {
          setState({ data, loading: false, error: null });
        }
      })
      .catch(error => {
        if (isMounted) {
          setState({ data: null, loading: false, error });
        }
      });
      
    return () => {
      isMounted = false;
    };
  }, [url]);
  
  return state;
}

function UserProfile() {
  const { data: user, loading, error } = useFetch('/api/user');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return null;
  
  return (
    // Render user profile with user data
  );
}

function TeamMembers() {
  const { data: members, loading, error } = useFetch('/api/team');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!members) return null;
  
  return (
    // Render team members with members data
  );
}
```

These anti-patterns and their solutions directly relate to the SOLID principles:

1. Single Responsibility Principle - Breaking down large components
2. Open-Closed Principle - Making components extensible without modification
3. Liskov Substitution Principle - Creating proper component hierarchies
4. Interface Segregation Principle - Avoiding prop drilling
5. Dependency Inversion Principle - Abstracting services and using dependency injection

### React Project Architecture Approaches

Organizing your React project's structure is crucial for maintainability, scalability, and developer experience. Let's explore several approaches to project architecture, including Feature-Sliced Design (FSD) and other popular patterns.

#### Feature-Sliced Design (FSD)

Feature-Sliced Design is a methodology for organizing code in frontend applications, focusing on separation by business features and technical layers. FSD provides clear boundaries for code organization and follows a unidirectional dependency principle.

**Key Principles of FSD:**

1. **Slice by Features** - Code is primarily organized by business domains
2. **Layer Segregation** - Segments code by technical purpose
3. **Unidirectional Dependencies** - Higher layers can use lower layers, but not vice versa

**The Main Layers in FSD:**

- **app/** - Application initialization, global providers, styles
- **processes/** - Complex business processes spanning multiple entities
- **pages/** - Composition of widgets/features for specific routes
- **widgets/** - Complex UI blocks composed of features/entities
- **features/** - User interactions, business capabilities
- **entities/** - Business entities with their data models and operations
- **shared/** - Reusable infrastructure-level code

**Example FSD Structure:**

```
src/
  app/
    providers/       # Global providers (Store, Router, etc.)
    styles/          # Global styles
    index.tsx        # Entry point
    App.tsx          # Root component
  
  processes/
    authentication/  # Complex flow spanning multiple features
    payment/         # Multi-step payment process
  
  pages/
    dashboard/
      ui/            # Page components
      model/         # Page-specific state/logic
      index.ts       # Public API
    profile/
    settings/
  
  widgets/
    header/
    sidebar/
    user-card/
      ui/            # Widget components
      model/         # Widget-specific state/logic
      lib/           # Helper functions
      index.ts       # Public API
  
  features/
    auth/
      login/
        ui/          # Feature components
        model/       # Feature-specific state/logic
        lib/         # Helper functions
        index.ts     # Public API
      register/
    theme-switcher/
    language-selector/
  
  entities/
    user/
      ui/            # Entity components
      model/         # Entity state/logic/types
      api/           # Entity-related API calls
      lib/           # Entity-specific utility functions
      index.ts       # Public API
    product/
    order/
  
  shared/
    api/             # API client, request methods
    config/          # Configuration constants
    lib/             # Utility functions
    ui/              # UI kit components
```

**Real-World Example:**

```jsx
// entities/user/model/types.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// entities/user/api/userApi.ts
import { User } from '../model/types';

export const fetchUser = async (id: string): Promise<User> => {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
};

// entities/user/ui/UserBadge.tsx
import { User } from '../model/types';

interface UserBadgeProps {
  user: User;
}

export const UserBadge = ({ user }: UserBadgeProps) => (
  <div className="user-badge">
    <span className="user-badge__name">{user.name}</span>
    <span className="user-badge__role">{user.role}</span>
  </div>
);

// features/user-profile/ui/UserProfileCard.tsx
import { useEffect, useState } from 'react';
import { User } from 'entities/user/model/types';
import { fetchUser } from 'entities/user/api/userApi';
import { UserBadge } from 'entities/user/ui/UserBadge';

interface UserProfileCardProps {
  userId: string;
  onEdit: () => void;
}

export const UserProfileCard = ({ userId, onEdit }: UserProfileCardProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchUser(userId)
      .then(userData => {
        setUser(userData);
        setLoading(false);
      });
  }, [userId]);
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;
  
  return (
    <div className="user-profile-card">
      <UserBadge user={user} />
      <div className="user-profile-card__details">
        <p>Email: {user.email}</p>
      </div>
      <button onClick={onEdit}>Edit Profile</button>
    </div>
  );
};

// pages/profile/ui/ProfilePage.tsx
import { UserProfileCard } from 'features/user-profile/ui/UserProfileCard';
import { Header } from 'widgets/header';

export const ProfilePage = () => {
  const userId = '123'; // In real app, likely from router params or auth context
  
  const handleEditProfile = () => {
    // Navigation or modal logic
  };
  
  return (
    <div className="profile-page">
      <Header />
      <main>
        <h1>User Profile</h1>
        <UserProfileCard userId={userId} onEdit={handleEditProfile} />
      </main>
    </div>
  );
};
```

**Benefits of FSD:**
- Clear boundaries between business domains
- Explicit dependencies between layers
- Easier to understand the business domain
- Improved maintainability for large teams
- Makes feature refactoring and removal safer

#### Atomic Design

Atomic Design is a methodology for creating design systems developed by Brad Frost. It breaks down interfaces into fundamental building blocks and then combines them to form more complex components.

**Hierarchical Structure:**
1. **Atoms** - Basic UI elements like buttons, inputs, labels
2. **Molecules** - Simple component groups (e.g., search form)
3. **Organisms** - Complex UI components (e.g., header)
4. **Templates** - Page layouts without content
5. **Pages** - Specific instances of templates with real content

**Example Atomic Design Structure:**

```
src/
  components/
    atoms/
      Button/
      Input/
      Label/
    molecules/
      SearchForm/
      FormField/
      Card/
    organisms/
      Header/
      Footer/
      ProductList/
    templates/
      HomeTemplate/
      DashboardTemplate/
    pages/
      HomePage/
      DashboardPage/
  contexts/
  hooks/
  services/
  utils/
```

#### Domain-Driven Design (DDD)

Domain-Driven Design focuses on modeling software based on the business domain. For React applications, this often means organizing code by business domains rather than technical concerns.

**Example DDD Structure:**

```
src/
  domains/
    users/
      components/
      hooks/
      services/
      types.ts
    products/
      components/
      hooks/
      services/
      types.ts
    orders/
      components/
      hooks/
      services/
      types.ts
  shared/
    components/
    hooks/
    utils/
  app/
    App.tsx
    routes.tsx
```

#### Module Pattern (by Function)

This approach organizes code by technical function rather than business domain. It's simpler to understand for developers coming from traditional frameworks but can lead to challenges as the application grows.

**Example Module Pattern Structure:**

```
src/
  components/     # All React components
    common/
    layout/
    pages/
  hooks/          # Custom React hooks
  services/       # API and other services
  store/          # State management
  utils/          # Utility functions
  assets/         # Static assets
```

#### Vertical Slices

Vertical slices architecture organizes code by user-facing features, cutting across all technical layers. It's similar to FSD but with less formal layering within features.

**Example Vertical Slices Structure:**

```
src/
  features/
    authentication/
      components/
      hooks/
      services/
      utils/
      types.ts
    dashboard/
      components/
      hooks/
      services/
      utils/
      types.ts
    user-management/
      components/
      hooks/
      services/
      utils/
      types.ts
  shared/
    components/
    hooks/
    services/
  app/
    App.tsx
    routes.tsx
```

### Choosing the Right Approach

When deciding on a project structure:

1. **Consider Team Size and Experience** - More formal structures like FSD work better for larger teams
2. **Project Scale** - Simple projects can use simpler structures
3. **Business Complexity** - Complex domains benefit from domain-focused structures
4. **Development Velocity** - Choose a structure that helps your team deliver efficiently
5. **Evolvability** - The structure should adapt as your application grows

The most effective approach often combines elements from multiple patterns, tailored to your specific project needs. Start with a simpler structure and evolve toward more formal organization as complexity increases.

For most React applications, Feature-Sliced Design offers a good balance of clarity, scalability, and business domain focus, but don't hesitate to adapt it to your specific requirements.

### In the End, It's About Adaptability

No one gets the design perfect at the start. Software design is a journey of continuous refinement. Requirements change, technology evolves, and new team members join. Good design isn't static—it's about making it easy to tweak, refactor, and extend without your code falling apart.

By keeping things simple initially, applying principles like SOLID when they make sense, modularizing to contain complexity, and always staying open to change, you'll be in a much better place to deliver solid, maintainable software over time.