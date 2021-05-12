import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper } from '@material-ui/core';
import { SearchState, IntegratedFiltering, SortingState, IntegratedSorting } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, SearchPanel, Toolbar } from '@devexpress/dx-react-grid-material-ui';

import { updatePostsRequest } from '../redux/ducks/posts';
import { IpostsList } from '../redux/ducks/posts';
import { RootState } from '../redux';

const Posts: React.FC = () => {
	const columns = [
		{ name: 'id', title: 'ID' },
		{ name: 'title', title: 'Title' },
		{ name: 'body', title: 'Body' },
	];

	const { postsList }: IpostsList = useSelector((state: RootState) => state.postsList);
	const [searchValue, setSearchState] = useState('');
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(updatePostsRequest());
	}, [dispatch]);
	return (
		<Paper>
			<Grid rows={postsList} columns={columns}>
				<SearchState value={searchValue} onValueChange={setSearchState} />
				<IntegratedFiltering />
				<SortingState defaultSorting={[{ columnName: 'id', direction: 'asc' }]} />
				<IntegratedSorting />
				<Table />
				<TableHeaderRow showSortingControls/>
				<Toolbar />
				<SearchPanel />
			</Grid>
		</Paper>
	);
};

export default Posts;
