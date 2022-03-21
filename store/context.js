import React, { createContext, useState } from "react";

const DataContext = createContext();

function Store(props) {
	const [data, setData] = useState({
		token: "",
		userData: [],
		isLogged: false,
		isRegistered: false,
		err: false,
	});

	let value = { data, setData };

	return (
		<DataContext.Provider value={value}>{props.children}</DataContext.Provider>
	);
}

export { Store };
export default DataContext;
