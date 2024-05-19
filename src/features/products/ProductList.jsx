import { useEffect, useState } from 'react';
import { useGetProductsQuery } from '../../services/products';
import { List } from 'antd';
import { Link } from 'react-router-dom';

function ProductList() {
	const { data, isLoading, isFetching, error } = useGetProductsQuery({
		skip: 0,
		limit: 0,
	});

	return (
		<List
			style={{ height: '100%', overflowY: 'scroll' }}
			dataSource={data?.products}
			itemLayout='horizontal'
			loading={isLoading}
			renderItem={(item, index) => (
				<Link to={`/products/${item.id}`}>
					<List.Item style={{ padding: '8px 16px' }}>
						<List.Item.Meta
							title={item.title}
							description={`₹${item.price}`}
						/>
					</List.Item>
				</Link>
			)}
		/>
	);
}

export default ProductList;
