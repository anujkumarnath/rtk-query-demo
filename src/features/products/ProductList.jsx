import { useEffect, useState } from 'react';
import { useGetProductsQuery } from '../../services/products';
import { Rate, Table } from 'antd'

function ProductList () {
	const defaultPageSize = 5;

	const [pagination, setPagination] = useState({
		current: 1,
		size: defaultPageSize,
	});

	const { data, isLoading, isFetching, error } = useGetProductsQuery({
		skip: pagination.size * (pagination.current - 1),
		limit: pagination.size,
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
			render: rating => <Rate allowHalf disabled value={rating}/>,
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
			loading={isLoading || isFetching}
			rowKey='id'
			size='middle'
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

export default ProductList;
