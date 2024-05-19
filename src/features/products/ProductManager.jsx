import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';

const { Sider, Header, Content } = Layout;

function ProductManager () {

	const { path } = useRouteMatch();

	return (
		<Layout style={{ height: '100vh' }}>
			<Header
				style={{
					textAlign: 'center',
					color: 'white',
				}}
			>Manage Products</Header>
			<Layout>
				<Sider style={{background: 'transparent' }} width='25%'>
					<ProductList />
				</Sider>
				<Content>
					<Switch>
						<Route path={`${path}/:id`} component={ProductDetail} />
						<Route component={() => (
							<Row justify='center' align='middle' style={{ height: '100%' }}>
								<Col>Select a product to edit!</Col>
							</Row>
						)} />
					</Switch>
				</Content>
			</Layout>
		</Layout>
	);
}

export default ProductManager;
