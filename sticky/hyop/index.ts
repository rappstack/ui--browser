/// <reference lib="dom" />
export function sticky_stuck__hyop(el:Element) {
	let io = new IntersectionObserver(entry_a1=>{
		for (const entry of entry_a1) {
			entry.target.classList.toggle('stuck', entry.intersectionRatio < 1.0)
		}
	})
	if (el.classList.contains('sticky')) {
		io.observe(el)
	}
	for (const _el of Array.from(el.querySelectorAll('.sticky'))) {
		io.observe(_el)
	}
}
