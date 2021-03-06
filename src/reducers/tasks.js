import * as types from  './../constants/ActionType';

var dataLocalStorage = JSON.parse(localStorage.getItem('tasks'));
var initialState = dataLocalStorage ? dataLocalStorage : [];

var s4=()=>{
	return Math.floor((1+Math.random()) *0x10000).toString(16).substring(1);
};
var generateID=()=>{
	return s4() + '-' + s4() + s4() +s4() + '-' + s4() + s4() +s4();
};

var myReducer = (state = initialState, action) => {
	var index = -1;
	switch (action.type) {
		case types.LIST_ALL:
			return state;  
		case types.SAVE_TASK:
			if(!action.task.id){//add
				action.task.id = generateID();
				state.push(action.task);
			}else{//edit
				index = state.findIndex(task => task.id === action.task.id);
				state[index] = action.task;
			}
			localStorage.setItem('tasks', JSON.stringify(state));
			return [...state];
		case types.DELETE_TASK:
			index = state.findIndex(task => task.id === action.id);
			if(index !== -1){
				state.splice(index, 1);
				localStorage.setItem('tasks', JSON.stringify(state));
			}
			return [...state];
		case types.UPDATE_STATUS_TASK:
			index = state.findIndex(task => task.id === action.id);
			if(index !== -1){
				state[index] = {
					...state[index],
					status : !state[index].status
				};
				localStorage.setItem('tasks', JSON.stringify(state));
			}
			return [...state];
		default: 
			return state;
	}
}

export default myReducer;