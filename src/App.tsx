import { useEffect } from 'react';
import { useState } from 'react';
import { MapPage } from './pages/MapPage/MapPage';
import { StartPage } from './pages/StartPage/StartPage';
import { WorldPage } from './pages/WorldPage/WorldPage';

export const WORLD_COUNT = 6;
const SEED_LENGTH = 8;

export interface IWorldData {
	seed: string;
	// name: string | null;
	imageSet: boolean;
}

function App() {
	const [currentPage, changeCurrentPage] = useState('start');
	const [worldsData, updateWorldsData] = useState<IWorldData[]>([]);
	const [availableWorldCount, setAvailableWorldCount] = useState<number>(0);
	const [currentWorld, setCurrentWorld] = useState<number>(0);

	useEffect(() => {
		const data = localStorage.getItem('TinyData');
		updateWorldsData(data === null ? generateWorldsData() : JSON.parse(data));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setAvailableWorldCount(
			worldsData.reduce((count, current) => {
				if (current.imageSet) {
					return count + 1;
				}
				return count;
			}, 0)
		);
	}, [worldsData]);

	function generateWorldsData(): IWorldData[] {
		let worlds: IWorldData[] = [];
		for (let i = 0; i < WORLD_COUNT; i++) {
			const seed = generateSeed(SEED_LENGTH);
			worlds = [...worlds, { seed, imageSet: false }];
		}
		localStorage.setItem('TinyData', JSON.stringify(worlds));
		return worlds;
	}

	function generateSeed(length: number): string {
		let result = '';
		let characters =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}

	function returnToMap() {
		if (availableWorldCount === WORLD_COUNT && currentWorld === WORLD_COUNT - 1) {
			changeCurrentPage('start');
			return;
		}
		const data = localStorage.getItem('TinyData');
		if (data !== null) {
			const parsedData: IWorldData[] = JSON.parse(data);
			if (
				availableWorldCount < WORLD_COUNT &&
				parsedData[availableWorldCount].imageSet
			) {
				setAvailableWorldCount(availableWorldCount + 1);
				if (availableWorldCount + 1 === WORLD_COUNT) {
					changeCurrentPage('start');
					return;
				}
			}
		}

		changeCurrentPage('map');
	}

	function startNewGame() {
		updateWorldsData(generateWorldsData());
		changeCurrentPage('map');
		setAvailableWorldCount(0);
		setCurrentWorld(0);
	}

	if (worldsData.length === 0) {
		// [TODO]: Add component with loading animation
		return <div>LOADING...</div>;
	}

	if (currentPage === 'start') {
		return (
			<StartPage
				changeCurrentPage={(destination: string) =>
					changeCurrentPage(destination)
				}
				startNewGame={() => startNewGame()}
				availableWorldCount={availableWorldCount}
			/>
		);
	}

	return (
		<div className="h-screen">
			{currentPage === 'map' ? (
				<MapPage
					changeCurrentPage={(destination: string) =>
						changeCurrentPage(destination)
					}
					setCurrentWorld={(index: number) => setCurrentWorld(index)}
					worlds={worldsData}
					availableWorldCount={availableWorldCount}
					currentWorld={currentWorld}
				/>
			) : (
				<WorldPage
					currentWorld={currentWorld}
					seed={worldsData[currentWorld].seed}
					returnToMap={returnToMap}
				/>
			)}
		</div>
	);
}

export default App;
