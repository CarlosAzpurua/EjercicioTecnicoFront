import React, { useState } from 'react';

function RegisterForm({ Register, error }) {
	const [details, setDetails] = useState({
		name: '',
		lastName: '',
		username: '',
		password: '',
	});

	const submitHandlerRegister = (e) => {
		e.preventDefault();

		Register(details);
	};

	return (
		<form className="form-inner-register" onSubmit={submitHandlerRegister}>
			<div className="form-inner-register">
				<h2>Registro</h2>
				{error ? <div className="error">{error}</div> : ''}
				<div className="form-group-register">
					<label htmlFor="name">Nombre:</label>
					<input
						type="text"
						name="name"
						id="name"
						onChange={(e) => setDetails({ ...details, name: e.target.value })}
						value={details.name}
					/>
				</div>
				<div className="form-group-register">
					<label htmlFor="lastName">Apellido:</label>
					<input
						type="text"
						name="lastName"
						id="lastName"
						onChange={(e) => setDetails({ ...details, lastName: e.target.value })}
						value={details.lastName}
					/>
				</div>
				<div className="form-group-register">
					<label htmlFor="username">Username:</label>
					<input
						type="string"
						name="username"
						id="username"
						onChange={(e) => setDetails({ ...details, username: e.target.value })}
						value={details.username}
					/>
				</div>
				<div className="form-group-register">
					<label htmlFor="password">Contraseña:</label>
					<input
						type="password"
						name="password"
						id="password"
						onChange={(e) => setDetails({ ...details, password: e.target.value })}
						value={details.password}
					/>
				</div>
				<input type="submit" value="REGISTRO" id="login" />
			</div>
		</form>
	);
}

//export default RegisterForm;
