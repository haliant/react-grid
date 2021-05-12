import { put, takeEvery, call } from 'redux-saga/effects';
import api from '../../api';

//Actions Names
const UPDATE_POSTS_REQUEST = 'react-grid/posts/UPDATE_POSTS_REQUEST';
const UPDATE_POSTS_SUCCESS = 'react-grid/posts/UPDATE_POSTS_SUCCES';

//ActionTypes

interface Ipost {
	userId: number;
	id: number;
	title: string;
	body: string;
}

export interface IpostsList {
	postsList: Array<Ipost>;
	loading: boolean;
}

interface IupdatePostsListRequest {
	type: string;
	payload?: {};
}

interface IupdatePostsListSuccess {
	type: string;
	payload: IpostsList;
}

//Actios
export const updatePostsRequest = () => ({
	type: UPDATE_POSTS_REQUEST,
	payload: {},
});

export const updatePostsSuccess = (postsList: IpostsList) => ({
	type: UPDATE_POSTS_SUCCESS,
	payload: postsList,
});

//ReducerTypes
type Action = IupdatePostsListSuccess | IupdatePostsListRequest;

//Reducer
export const initialState = { postsList: [], loading: false };

const postsListReducer = (state = initialState, action: Action) => {
	switch (action.type) {
		case UPDATE_POSTS_REQUEST:
			return { ...state, loading: true };
		case UPDATE_POSTS_SUCCESS:
			return action.payload;
		default: {
			return state;
		}
	}
};

//Saga
function* workerListUpdate() {
	const postsList: Array<Ipost> = yield call(api.getInstance().getPosts);
	yield put(updatePostsSuccess({ postsList, loading: false }));
}

export function* watchListUpdate() {
	yield takeEvery(UPDATE_POSTS_REQUEST, workerListUpdate);
}

//Export
export default postsListReducer;
