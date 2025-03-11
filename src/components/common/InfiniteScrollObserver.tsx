import { useEffect, useRef } from "react";

interface InfiniteScrollObserverProps {
	onIntersect: () => void;
	options?: IntersectionObserverInit;
}

export default function InfiniteScrollObserver({ onIntersect, options }: InfiniteScrollObserverProps) {
	const infiniteScrollRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const node = infiniteScrollRef.current;
		if (!node) return;
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) onIntersect();
		}, options);
		observer.observe(node);
		return () => observer.disconnect();
	}, [onIntersect, options]);

	return <div className="h-1" ref={infiniteScrollRef} />;
}
