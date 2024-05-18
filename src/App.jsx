import { useState } from 'react';
import { useGetProductsQuery } from './services/products';
import { Table } from 'antd'

function App() {
	const defaultPageSize = 5;

	const [pagination, setPagination] = useState({
		current: 1,
		size: defaultPageSize,
	});

	const { data, isLoading, error } = useGetProductsQuery({
		skip: pagination.size * (pagination.current - 1),
		limit: pagination.size,
	});

	const totalProducts = data?.total; 

	const columns = [
		{
			title: 'Title',
			dataIndex: 'title',
			key: 'title',
		},
		{
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
			ellipsis: true,
		},
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
			align: 'right',
		},
	];

  return (
		<Table
			dataSource={data?.products}
			columns={columns}
			loading={isLoading}
			rowKey='id'
			pagination={{
				total: totalProducts,
				current: pagination.current,
				defaultPageSize,
				onChange: (page) => setPagination(prev => ({ ...prev, current: page })),
				onShowSizeChange: (current, size) => setPagination( prev => ({ ...prev, size, current: 1 }) ),
			}}
		/>
  );
}

export default App
