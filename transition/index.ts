import { calling, memo_, type memo_T, sig_ } from 'ctx-core/rmemo'
export function transition_pair_(enter$__new:(el:HTMLElement)=>memo_T<boolean>) {
	const enter$_a1$ = sig_<memo_T<boolean>[]>([])
	const transition$_a1$ = sig_<memo_T<boolean>[]>([])
	return [
		enter_el__add,
		transition_el__add,
	]
	function enter_el__add(el:HTMLElement) {
		enter$_a1$._ = [...enter$_a1$(), enter$__new(el)]
	}
	function transition_el__add(el:HTMLElement) {
		transition$_a1$._ = [...transition$_a1$(), transition$__new(el)]
	}
	function transition$__new(el:HTMLElement) {
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
							el.classList.remove('leave')
							el.classList.add('enter')
							setTimeout(()=>{
								el.classList.toggle('enter-go', enter)
							})
						} else if (!transition) {
							el.classList.remove('leave')
						}
					} else {
						if (enter$.val !== enter) {
							el.classList.remove('enter-go')
							el.classList.add('leave')
							setTimeout(()=>{
								el.classList.toggle('leave-go', enter)
							})
						} else if (!transition) {
							el.classList.remove('enter')
						}
					}
					return enter
				}))
			})
		)
	}
}
export function hover__enter$__new(el:HTMLElement) {
	return calling(memo_<boolean>($=>{
		el.addEventListener('mouseenter', ()=>{
			$._ = true
		})
		el.addEventListener('mouseleave', ()=>{
			$._ = false
		})
		return false
	}))
}
