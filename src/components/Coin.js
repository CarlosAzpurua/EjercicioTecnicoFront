import React, { useState } from 'react';
import '../style/Coin.css';

const Coin = ({ name, image, symbol, price, volume, priceChange, lastUpdate }) => {
	const [preferences, setPreferences] = useState([]);
	const actual = new Date();
	const comes = new Date(lastUpdate);

	const handleChangeCheckBox = (e) => {
		console.log(preferences, name);
		setPreferences(e.target.value);
	};

	return (
		<div className="coin-container">
			<div className="coin-row">
				<div className="coin">
					<img src={image} alt="crypto" />
					<h1>{name}</h1>
					<p className="coin-symbol">{symbol}</p>
				</div>
				<div className="coin-data">
					<p className="coin-price">${price}</p>
					<p className="coin-volume">${volume.toLocaleString()}</p>
					{priceChange < 0 ? (
						<p className="coin-percent red">{priceChange.toFixed(3)}%</p>
					) : (
						<p className="coin-percent green">{priceChange.toFixed(3)}%</p>
					)}
					<p className="coin-marketcap">
						{' Actualizado: '}
						{actual.getDay() === comes.getDay()
							? lastUpdate.split('T')[1]
							: lastUpdate.split('T')[0]}
					</p>
					<input
						type="checkbox"
						id={'box' + name}
						value={name}
						onClick={handleChangeCheckBox}
					/>
				</div>
			</div>
		</div>
	);
};

export default Coin;
