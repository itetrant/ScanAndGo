// action.js
const updateArray = (content) => {
	return {
		type: "PLUS",
		id: content.id,
		content: content.element
	}
}

const updateData = (obj) => {
	return (dispatch) => {
		dispatch(updateArray(obj));
	}
}

export {
	updateData
}