import { calling, memo_, type memo_T } from 'ctx-core/rmemo'
const wm = new WeakMap<Element, Record<string, memo_T<any>>>
export function el_setAttribute__set_memo<
	M extends memo_T<any>
>(_el:Element, attribute:string, memo$:M) {
	const el = <Element&{ [key:string]:memo_T<unknown> }>_el
	wm.set(el, {
		...wm.get(el), [attribute]: calling(memo_(()=>{
			const val = memo$()
			if (val == null) {
				el.removeAttribute(attribute)
			} else {
				el.setAttribute(attribute, val + '')
			}
		}))
	})
	return memo$
}
