import { useEffect, useState } from 'react';
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

	const onPageChange = (page) => {
		setPagination(prev => ({ ...prev, current: page }));
	}

	const onPageSizeChange = (_, size) => {
		setPagination(prev => ({ ...prev, size }));
	}

	useEffect(() => {
		setPagination(prev => ({ ...prev, current: 1 }));
	}, [pagination.size])

  return (
		<Table
			dataSource={data?.products}
			columns={columns}
			loading={isLoading}
			rowKey='id'
			pagination={{
				defaultPageSize,
				total: totalProducts,
				current: pagination.current,
				pageSize: pagination.size,
				pageSizeOptions: [5, 10, 25, 50, 100],
				onChange: onPageChange,
				onShowSizeChange: onPageSizeChange,
			}}
		/>
  );
}

export default App
