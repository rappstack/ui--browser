import { calling, memo_, type memo_T, sig_, sig_T } from 'ctx-core/rmemo'
import { el_setAttribute__set_memo } from '../el/index.js'
export type transition_tup_T = [
	enter_el__add:(el:Element)=>void,
	transition_el__add:(el:Element)=>sig_T<transition_state_T>,
	enter$__add:(_enter$:memo_T<boolean>)=>void,
	transition$__add:(_transition$:memo_T<boolean>)=>void,
	enter$:memo_T<boolean>,
	transition$:memo_T<boolean>,
]
export type transition_tupo_T = {
	enter_el__add:(el:Element)=>void
	transition_el__add:(el:Element)=>sig_T<transition_state_T>
	enter$__add:(_enter$:memo_T<boolean>)=>void
	transition$__add:(_transition$:memo_T<boolean>)=>void
	enter$:memo_T<boolean>
	transition$:memo_T<boolean>
}&transition_tup_T
export function transition_tupo_(enter$__new:(el:Element)=>memo_T<boolean>):transition_tupo_T {
	const transition_o_key_R_transition_tup_idx = <Record<keyof transition_tupo_T, keyof transition_tup_T>>{
		enter_el__add: 0,
		transition_el__add: 1,
		enter$__add: 2,
		transition$__add: 3,
		enter$: 4,
		transition$: 5,
	}
	return new Proxy(transition_tup_(enter$__new), {
		get(transition_tup, _prop) {
			const prop = <keyof transition_tupo_T|keyof transition_tup_T>_prop
			return (
				transition_o_key_R_transition_tup_idx[prop] != null
					? transition_tup[transition_o_key_R_transition_tup_idx[prop]]
					: transition_tup[prop as number]
			)
		}
	}) as transition_tupo_T
}
export type transition_state_T = 'enter'|'enter-go'|'enter-done'|'leave'|'leave-go'|'leave-done'
export const transition_state_R_level = <Record<transition_state_T, number>>{
	'leave-done': -3,
	'leave-go': -2,
	leave: -1,
	enter: 1,
	'enter-go': 2,
	'enter-done': 3
}
export function transition_tup_(enter$__new:(el:Element)=>memo_T<boolean>):transition_tup_T {
	const enter$_a1$ = sig_<memo_T<boolean>[]>([])
	const transition$_a1$ = sig_<memo_T<boolean>[]>([])
	const enter$ = memo_(()=>enter$_a1$().some(enter$=>enter$()))
	const transition$ = memo_(()=>transition$_a1$().some(transition$=>transition$()))
	return [
		enter_el__add,
		transition_el__add,
		enter$__add,
		transition$__add,
		enter$,
		transition$,
	]
	function enter_el__add(el:Element) {
		enter$__add(enter$__new(el))
	}
	function enter$__add(_enter$:memo_T<boolean>) {
		enter$_a1$._ = [...enter$_a1$(), _enter$]
	}
	function transition_el__add(el:Element) {
		const transition_state$ = sig_<transition_state_T>(enter$() ? 'enter-done' : 'leave-done')
		transition$__add(transition$__new(el, transition_state$))
		return transition_state$
	}
	function transition$__add(_transition$:memo_T<boolean>) {
		transition$_a1$._ = [...transition$_a1$(), _transition$]
	}
	function transition$__new(_el:Element, transition_state$:sig_T<transition_state_T>) {
		const el = <Element&{ transition_tup_effect$:memo_T<unknown> }>_el
		el.transition_tup_effect$ = calling(memo_(()=>{
			const level = transition_state_R_level[transition_state$()]
			el.classList.add('listen')
			el.classList.toggle('leave-done', level <= transition_state_R_level['leave-done'])
			el.classList.toggle('leave-go', level <= transition_state_R_level['leave-go'])
			el.classList.toggle('leave', level <= transition_state_R_level['leave'])
			el.classList.toggle('enter', level >= transition_state_R_level['enter'])
			el.classList.toggle('enter-go', level >= transition_state_R_level['enter-go'])
			el.classList.toggle('enter-done', level >= transition_state_R_level['enter-done'])
		}))
		return calling(memo_<boolean>($=>{
				el.addEventListener('transitionstart', ()=>{
					$._ = true
				})
				el.addEventListener('transitioncancel', ()=>{
					$._ = false
				})
				el.addEventListener('transitionend', ()=>{
					$._ = false
					if (transition_state$() === 'enter-go') {
						transition_state$._ = 'enter-done'
					} else if (transition_state$() === 'leave-go') {
						transition_state$._ = 'leave-done'
					}
				})
				return false
			}).add(()=>{
				return memo_<boolean>($=>{
					const enter = enter$()
					if ($.val != null) {
						if (enter) {
							if ($.val !== enter) {
								transition_state$._ = 'enter'
								setTimeout(()=>{
									transition_state$._ = 'enter-go'
								}, 30)
							}
						} else {
							if ($.val !== enter) {
								transition_state$._ = 'leave'
								setTimeout(()=>{
									transition_state$._ = 'leave-go'
								}, 30)
							}
						}
					}
					return enter
				})
			})
		)
	}
}
export function aria_expanded__enter$__new_(enter$__new:(el:Element)=>memo_T<boolean>) {
	return (el:Element)=>el_setAttribute__set_memo(el, 'aria-expanded', enter$__new(el))
}
export function hover__enter$__new(el:Element) {
	return calling(memo_<boolean>($=>{
		el.addEventListener('mouseenter', ()=>{
			$._ = true
		})
		el.addEventListener('mouseleave', ()=>{
			$._ = false
		})
		return el.parentElement?.querySelector(':hover') === el
	}))
}
export function toggle_click__enter$__new(el:Element) {
	return calling(memo_<boolean>($=>{
		el.addEventListener('click', ()=>{
			$._ = !$()
		})
		return false
	}))
}
