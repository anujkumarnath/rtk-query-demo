import { useParams, useRouteMatch } from "react-router-dom";
import { useGetProductByIdQuery } from "../../services/products";
import { Typography, Row, Col, Space, Layout, Image } from 'antd';

const { Text, Title } = Typography;
const { Header, Content } = Layout;

function ProductDetail () {
	const { id } = useParams();
	const { data, error, isLoading } = useGetProductByIdQuery(id);

	if (isLoading)
		return null;

	return (
		<Layout>
			<Header
				style={{
					textAlign: 'center',
					background: 'transparent',
					fontWeight: 'bold'
			}}>
				{data.title}
			</Header>
			<Content>
				<Row style={{ padding: '32px' }}>
					<Col>
						<Space direction="vertical">
							<Text strong>{data?.title}</Text>
							<Text>{data?.description}</Text>
							<Text>₹{data?.price}/-</Text>
						</Space>
					</Col>
				</Row>
			</Content>
		</Layout>
	);
}

export default ProductDetail;
