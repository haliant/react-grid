import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper } from '@material-ui/core';
import { SearchState, IntegratedFiltering, SortingState, IntegratedSorting } from '@devexpress/dx-react-grid';
import {
	Grid,
	Table,
	TableHeaderRow,
	SearchPanel,
	Toolbar,
	DragDropProvider,
	TableColumnReordering,
	TableColumnResizing,
} from '@devexpress/dx-react-grid-material-ui';

import { updatePostsRequest } from '../redux/ducks/posts';
import { IpostsList } from '../redux/ducks/posts';
import { RootState } from '../redux';

const Posts: React.FC = () => {
	const [columns] = useState([
		{ name: 'id', title: 'ID' },
		{ name: 'title', title: 'Title' },
		{ name: 'body', title: 'Body' },
	]);

	const { postsList }: IpostsList = useSelector((state: RootState) => state.postsList);
	const [searchValue, setSearchState] = useState('');
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(updatePostsRequest());
	}, [dispatch]);
	const [columnOrder, setColumnOrder] = useState(['id', 'title', 'body']);

	const [columnWidths] = useState([
		{ columnName: 'id', width: 100 },
		{ columnName: 'title', width: 500 },
		{ columnName: 'body', width: 800 },
	]);

	return (
		<Paper variant="outlined">
			<Grid rows={postsList} columns={columns}>
				<DragDropProvider />
				<SearchState value={searchValue} onValueChange={setSearchState} />
				<IntegratedFiltering />
				<SortingState defaultSorting={[{ columnName: 'id', direction: 'asc' }]} />
				<IntegratedSorting />
				<Table />
				<TableColumnResizing columnWidths={columnWidths} />
				<TableHeaderRow showSortingControls />
				<Toolbar />
				<SearchPanel />
				<TableColumnReordering order={columnOrder} onOrderChange={setColumnOrder} />
			</Grid>
		</Paper>
	);
};

export default Posts;
