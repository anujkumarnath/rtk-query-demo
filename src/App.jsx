import { Switch, Route, Link } from 'react-router-dom';
import ProductManager from './features/products/ProductManager';

function Home () {
	return (
		<>
			<h1>Home</h1>
			<Link to='/products'>Products</Link>
		</>
	);
}

function App() {
	return (
		<Switch>
			<Route path="/products">
				<ProductManager />
			</Route>
			<Route path="/">
				<Home />
			</Route>
		</Switch>
	);
}

export default App
