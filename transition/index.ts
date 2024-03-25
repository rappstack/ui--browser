import { calling, memo_, type memo_T, sig_, type sig_T } from 'ctx-core/rmemo'
import { el_setAttribute__set_memo } from '../el/index.js'
export type seq_034521_class_tup_T = [
	seq_enter_el__add:(el:Element)=>void,
	seq_el__add:(el:Element)=>sig_T<seq_034521_val_T>,
	enter$__add:(_enter$:memo_T<boolean>)=>void,
	seq$__add:(_transition$:memo_T<boolean>)=>void,
	enter$:memo_T<boolean>,
]
export type seq_034521_class_tupo_T = {
	seq_enter_el__add:(el:Element)=>void
	seq_el__add:(el:Element)=>sig_T<seq_034521_val_T>
	seq_enter$__add:(_enter$:memo_T<boolean>)=>void
	seq$__add:(_transition$:memo_T<boolean>)=>void
	seq_enter$:memo_T<boolean>
}&seq_034521_class_tup_T
export function seq_034521_class_tupo_(enter$__new:(el:Element)=>memo_T<boolean>):seq_034521_class_tupo_T {
	const transition_o_key_R_transition_tup_idx = <Record<keyof seq_034521_class_tupo_T, keyof seq_034521_class_tup_T>>{
		seq_enter_el__add: 0,
		seq_el__add: 1,
		seq_enter$__add: 2,
		seq$__add: 3,
		seq_enter$: 4,
	}
	return new Proxy(seq_034521_class_tup_(enter$__new), {
		get(transition_tup, _prop) {
			const prop = <keyof seq_034521_class_tupo_T|keyof seq_034521_class_tup_T>_prop
			return (
				transition_o_key_R_transition_tup_idx[prop] != null
					? transition_tup[transition_o_key_R_transition_tup_idx[prop]]
					: transition_tup[prop as number]
			)
		}
	}) as seq_034521_class_tupo_T
}
export type seq_034521_T = [0, 3, 4, 5, 2, 1]
export type seq_034521_val_T = seq_034521_T[number]
const seq_034521 = <seq_034521_T>[0, 3, 4, 5, 2, 1]
export function seq_034521_class_tup_(entry$__new:(el:Element)=>memo_T<boolean>):seq_034521_class_tup_T {
	const enter$_a1$ = sig_<memo_T<boolean>[]>([])
	const transition$_a1$ = sig_<memo_T<boolean>[]>([])
	const seq_enter$ = memo_(()=>enter$_a1$().some(enter$=>enter$()))
	return [
		seq_enter_el__add,
		seq_el__add,
		seq_enter$__add,
		seq$__add,
		seq_enter$,
	]
	function seq_enter_el__add(el:Element) {
		seq_enter$__add(entry$__new(el))
	}
	function seq_enter$__add(_enter$:memo_T<boolean>) {
		enter$_a1$._ = [...enter$_a1$(), _enter$]
	}
	function seq_el__add(el:Element) {
		const seq_eq$ = sig_<seq_034521_val_T>(seq_enter$() ? 5 : 0)
		seq$__add(seq$__new(el, seq_eq$))
		return seq_eq$
	}
	function seq$__add(_transition$:memo_T<boolean>) {
		transition$_a1$._ = [...transition$_a1$(), _transition$]
	}
	function seq$__new(_el:Element, seq_eq$:sig_T<seq_034521_val_T>) {
		const el = <Element&{ seq_eq$_effect$:memo_T<unknown> }>_el
		el.seq_eq$_effect$ = calling(memo_(()=>{
			const seq_eq = seq_eq$()
			el.classList.add('seq-034521-on')
			for (const seq of seq_034521) {
				el.classList.toggle('seq-034521-eq-' + seq, seq_eq === seq)
				el.classList.toggle('seq-034521-gte-' + seq, seq_eq >= seq)
				el.classList.toggle('seq-034521-lt-' + seq, seq_eq < seq)
			}
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
					if (seq_eq$() === 4) {
						seq_eq$._ = 5
					} else if (seq_eq$() === 1) {
						seq_eq$._ = 0
					}
				})
				return false
			}).add(()=>{
				return memo_<boolean>($=>{
					const enter = seq_enter$()
					if ($.val != null) {
						if (enter) {
							if ($.val !== enter) {
								seq_eq$._ = 3
								setTimeout(()=>{
									seq_eq$._ = 4
								}, 30)
							}
						} else {
							if ($.val !== enter) {
								seq_eq$._ = 2
								setTimeout(()=>{
									seq_eq$._ = 1
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
