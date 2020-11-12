import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/App.css';
import Coin from './components/Coin';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/registerForm';
import { getSomething, getCoins, userRegister } from './services/connect.routes';

const keysOptions = [
	{
		sortType: 'Descendente',
		value: 'desc',
	},
	{
		sortType: 'Ascendente',
		value: 'asc',
	},
];

const moneyOptions = [
	{
		moneyType: 'Dolar',
		value: 'usd',
	},
	{
		moneyType: 'Peso Argentino',
		value: 'ars',
	},
	{
		moneyType: 'Euro',
		value: 'eur',
	},
	{
		moneyType: 'Dolar Canadiense',
		value: 'cad',
	},
];

const adminUser = {
	email: 'admin@admin.com',
	password: 'admin123',
};

function App() {
	const [coins, setCoins] = useState([]);
	const [search, setSearch] = useState('');
	const [sort, setOptionsSort] = useState('desc');
	const [currency, setOptionsCurrency] = useState('usd');
	const [number, setNumber] = useState(25);
	const [user, setUser] = useState({ name: '', email: '' });
	const [error, setError] = useState('');

	const searchInAxios = async () => {
		await axios
			.get(
				`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_${sort}&per_page=${number}&page=1&sparkline=false`
			)
			.then((res) => {
				setCoins(res.data);
			})
			.catch((error) => console.log(error));
	};

	const searchUserInfo = async () => {
		try {
			const user = await getSomething({ id: 'ID' });
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		searchInAxios();
		searchUserInfo();
	}, []);

	const handlerChangeOptionsSort = ({ target: { value } }) => {
		if (value === sort) return '';
		const newSort = value;
		setOptionsSort(newSort);
		console.log(newSort);
	};

	const handlerChangeOptionsCurrency = ({ target: { value } }) => {
		if (value === currency) return '';
		const newCurrency = value;
		setOptionsCurrency(newCurrency);
		console.log(newCurrency);
	};

	const handleChangeNumber = ({ target: { value } }) => {
		if (value > 25 || value < 0)
			return alert('Disculpe \n Por favor intente con un numero entre el 0 y el 25');
		setNumber(value);
	};

	const handleChange = ({ target: { value } }) => setSearch(value);

	const submitHandlerOptions = (e) => {
		e.preventDefault();
		console.log(e);
	};

	const login = (details) => {
		if (details.email === adminUser.email && details.password === adminUser.password) {
			console.log('Logged in');
			setUser({
				name: details.name,
				email: details.email,
			});
		} else {
			setError('Details do not match');
		}
	};

	const register = (details) => {
		if (details.email === adminUser.email && details.password === adminUser.password) {
			console.log('Logged in');
			setUser({
				name: details.name,
				email: details.email,
			});
		} else {
			setError('Details do not match');
		}
	};

	const logout = () => setUser({ name: '', email: '' });

	const filterCoins = coins.filter((coin) =>
		coin.name.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className="coin-app">
			{user.email ? (
				<div className="welcome">
					<h1 className="coin-text"> Busque su moneda</h1>
					<h2>
						Welcome, <span>{user.name}, </span>
					</h2>
					<h3>
						con esta app podra indentificar como se maneja en mercado de las
						criptomonedas, guardar sus preferencias y buscar la moneda que desea segun lo
						necesite.
					</h3>
					<div className="coin-search">
						<form className="form-options" onSubmit={submitHandlerOptions}>
							<select
								name="sortOptions"
								className="sort-options"
								id="sortOptions"
								onClick={handlerChangeOptionsSort}>
								{keysOptions.map((item, i) => (
									<option id={'option' + i} key={item.value} value={item.value}>
										{`${item.sortType}`}
									</option>
								))}
							</select>
							<select
								name="currencyOptions"
								className="currency-options"
								id="currencyOptions"
								onClick={handlerChangeOptionsCurrency}>
								{moneyOptions.map((item, i) => (
									<option id={'option' + i} key={item.value} value={item.value}>
										{` ${item.moneyType}`}
									</option>
								))}
							</select>

							<input
								type="number"
								placeholder="Limite de monedas"
								className="number-input"
								min="1"
								max="25"
								onChange={handleChangeNumber}
							/>
							<submit type="submit" value="save" id="save-info">
								{' Guardar para continuar'}
							</submit>
							<input
								type="text"
								placeholder="Buscar"
								className="coin-input"
								onChange={handleChange}
							/>
						</form>
					</div>
					{filterCoins.map(
						({
							id,
							name,
							image,
							symbol,
							current_price,
							total_volume,
							price_change_percentage_24h,
							last_updated,
						}) => {
							return (
								<Coin
									key={id}
									name={name}
									image={image}
									symbol={symbol}
									price={current_price}
									volume={total_volume}
									priceChange={price_change_percentage_24h}
									lastUpdate={last_updated}
								/>
							);
						}
					)}
					<button onClick={logout}>Logout</button>
				</div>
			) : (
				<div className="App">
					<h2 className="subtitle"> Herramienta de prueba </h2>
					<h4 className="info">
						Por favor ingrese sus datos para ingresar de manera exitosa a la app.
					</h4>
					<LoginForm Login={login} error={error} />
					<h4 className="info">
						{'Si por lo contrario aun no tiene una cuenta oficial, por favor registrese.'}
					</h4>
					{/**<RegisterForm Register={register} error={error} />*/}
				</div>
			)}
		</div>
	);
}

export default App;
