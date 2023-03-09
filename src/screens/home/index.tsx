import React, { useState, useEffect } from "react";
import "./style.css";
import { Card, CardProps } from "../components/card";

type APIResponse = {
	name: string;
	avatar_url: string;
};

type User = {
	name: string;
	avatar: string;
};

export function Home() {
	const [name, setName] = useState<string>();
	const [list, setList] = useState<CardProps[]>([]);
	const [user, setUser] = useState<User>({} as User);

	// Função para adicionar nomes na lista
	function handleAdd() {
		const newItem = {
			name: name,
			time: new Date().toLocaleDateString("pt-br", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
			}),
		};
		setList((prevState) => [...prevState, newItem]);
	}
	// useEffect é executado sempre que a interface é carregada, o array vazio é executado somente uma vez
	useEffect(() => {
		async function fetchData() {
			let response = await fetch("https://api.github.com/users/Andreymcortez");
			let data = (await response.json()) as APIResponse;
			setUser({ name: data.name, avatar: data.avatar_url });
		}
		fetchData();
	}, []);

	return (
		<div className="container">
			<header>
				<h1>Lista de Presença</h1>
				<div>
					<strong>{user.name}</strong>
					<img src={user.avatar} alt="profile photo"></img>
				</div>
			</header>
			<input type="text" placeholder="Digite um nome" onChange={(e) => setName(e.target.value)}></input>
			<button onClick={handleAdd}>Adicionar presença</button>

			{list.map((item) => (
				<Card key={item.time} name={item.name} time={item.time} />
			))}
			<footer>
				<a href="https://github.com/Andreymcortez">GitHub</a>
				<a href="https://www.linkedin.com/in/andreydson-cortez-922bb212b/">LinkedIn</a>
			</footer>
		</div>
	);
}
