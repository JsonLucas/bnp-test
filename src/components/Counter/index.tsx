import { useEffect, useState } from 'react';

type CounterProps = {
	initialCount: number;
};

export function Counter({ initialCount }: CounterProps) {
	const [count, setCount] = useState(initialCount);

	useEffect(() => {
		const mountEvent = new CustomEvent('onCounterMount');
		window.dispatchEvent(mountEvent);

		return () => {
			const unmountEvent = new CustomEvent('onCounterUnmount');
			window.dispatchEvent(unmountEvent);
		};
	}, []);

	useEffect(() => {
		const updateEvent = new CustomEvent('onCounterUpdate', { detail: { count } });
		window.dispatchEvent(updateEvent);

		if (count >= 10) {
			setCount(0);
		}
	}, [count]);

	return (
		<div>
			<p>Count: {count}</p>
			<button onClick={() => setCount(count + 1)}>Increment</button>
		</div>
	);
}
