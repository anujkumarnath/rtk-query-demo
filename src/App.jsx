import { useState } from 'react';
import { useGetProductsQuery } from './services/products';
import { Table } from 'antd'

function App() {
	const pageSize = 10;
	const [currentPage, setCurrentPage] = useState(1);
	const { data, isLoading, error } = useGetProductsQuery({
		skip: pageSize * (currentPage - 1),
		limit: pageSize,
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
			style={{ width: '100vw' }}
			dataSource={data?.products}
			columns={columns}
			loading={isLoading}
			rowKey='id'
			pagination={{
				total: totalProducts,
				current: currentPage,
				onChange: (page) => setCurrentPage(page),
			}}
		/>
  );
}

export default App
