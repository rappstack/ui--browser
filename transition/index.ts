import { calling, memo_, type memo_T, sig_ } from 'ctx-core/rmemo'
import { el_setAttribute__set_memo } from '../el/index.js'
export type transition_pair_T = [
	enter_el__add:(el:Element)=>void,
	transition_el__add:(el:Element)=>void,
]
export function transition_pair_(enter$__new:(el:Element)=>memo_T<boolean>):transition_pair_T {
	const enter$_a1$ = sig_<memo_T<boolean>[]>([])
	const transition$_a1$ = sig_<memo_T<boolean>[]>([])
	return [
		enter_el__add,
		transition_el__add,
	]
	function enter_el__add(el:Element) {
		enter$_a1$._ = [...enter$_a1$(), enter$__new(el)]
	}
	function transition_el__add(el:Element) {
		transition$_a1$._ = [...transition$_a1$(), transition$__new(el)]
	}
	function transition$__new(el:Element) {
		return calling(memo_<boolean>($=>{
				el.addEventListener('transitionstart', ()=>{
					$._ = true
				})
				el.addEventListener('transitioncancel', ()=>{
					$._ = false
				})
				el.addEventListener('transitionend', ()=>{
					$._ = false
				})
				return false
			}).add(()=>{
				return memo_<[enter:boolean, transition:boolean]>(()=>{
					return [enter$_a1$().some(enter$=>enter$()), transition$_a1$().some(transition$=>transition$())]
				}).add(enter_transition_pair$=>memo_<boolean>(enter$=>{
					const [enter, transition] = enter_transition_pair$()
					if (enter) {
						if (enter$.val !== enter) {
							el.classList.remove('leave-done')
							el.classList.remove('leave-go')
							el.classList.add('enter')
							setTimeout(()=>{
								el.classList.toggle('enter-go', enter)
							}, 30)
						} else if (!transition) {
							el.classList.remove('leave')
							el.classList.add('enter-done')
						}
					} else {
						if (enter$.val !== enter) {
							el.classList.remove('enter-done')
							el.classList.remove('enter-go')
							el.classList.add('leave')
							setTimeout(()=>{
								el.classList.toggle('leave-go', enter)
							}, 30)
						} else if (!transition) {
							el.classList.remove('enter')
							el.classList.add('leave-done')
						}
					}
					return enter
				}))
			})
		)
	}
}
export function aria_expanded__transition_pair_(enter$__new:(el:Element)=>memo_T<boolean>) {
	return transition_pair_(el=>el_setAttribute__set_memo(el, 'aria-expanded', enter$__new(el)))
}
export function hover__enter$__new(el:Element) {
	return calling(memo_<boolean>($=>{
		el.addEventListener('mouseenter', ()=>{
			$._ = true})
		el.addEventListener('mouseleave', ()=>{
			$._ = false
		})
		return el.parentElement?.querySelector(':hover') === el
	}))
}
export function click__enter$__new(el:Element) {
	return calling(memo_<boolean>($=>{
		el.addEventListener('click', ()=>{
			$._ = !$()
		})
		return false
	}))
}
