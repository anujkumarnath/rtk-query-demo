import { useState } from 'react';
import { useGetProductsQuery } from './services/products';
import { Table } from 'antd'

function App() {
	const pageSize = 10;
	const [currentPage, setCurrentPage] = useState(1);
	const { data, isLoading, isFetching, error } = useGetProductsQuery({
		skip: pageSize * (currentPage - 1),
		limit: pageSize,
	});

	const totalProducts = data?.total; 

	const columns = [
		{
			title: 'Title',
			dataIndex: 'title',
			key: 'title',
			ellipsis: true,
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
			loading={isLoading || isFetching}
			rowKey='id'
			pagination={{
				total: totalProducts,
				current: currentPage,
				onChange: (page) => setCurrentPage(page),
				showSizeChanger: false,
			}}
		/>
  );
}

export default App
