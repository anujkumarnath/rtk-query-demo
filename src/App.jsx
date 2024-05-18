import { useState } from 'react';
import { useGetProductsQuery } from './services/products';
import { Rate, Table } from 'antd'

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
			width: '20%',
		},
		{
			title: 'Brand',
			dataIndex: 'brand',
			key: 'brand',
			width: '15%',
		},
		{
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
			ellipsis: true,
			width: '30%',
		},
		{
			title: 'Rating',
			dataIndex: 'rating',
			key: 'rating',
			render: rating => <Rate allowHalf value={rating}/>,
			align: 'center',
		},
		{
			title: 'Stock',
			dataIndex: 'stock',
			key: 'stock',
			align: 'right',
			width: '10%',
		},
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
			align: 'right',
			width: '10%',
		},
	];

  return (
		<Table
			dataSource={data?.products}
			columns={columns}
			loading={isLoading || isFetching}
			rowKey='id'
			size='middle'
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
