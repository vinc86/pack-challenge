<script>
	// @ts-nocheck

	import Portrait from '#static/img/portrait-placeholder.png';
	import USFlag from '#static/img/us-flag.jpg';
	import Logo from '#static/img/pack-logo.png';
	import { navlinks } from './navlinks';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import clsx from 'clsx';
</script>

<nav class="flex h-14 items-center justify-around border-b border-b-gray-300 shadow">
	<img alt="pack-logo" src={Logo} class="h-full" aria-label="pack logo" />
	<ul class="flex gap-5">
		{#each navlinks as link (link.name)}
			<li>
				<a
					class={clsx(
						page.url.pathname === link.path && 'border-b-2 border-orange-500 text-orange-500',
						'p-4 font-medium text-gray-500'
					)}
					href={resolve(link.path)}
				>
					{link.name}
				</a>
			</li>
		{/each}
	</ul>

	<div class="flex w-20 gap-5">
		<button class="flex-1">
			<img alt="us-flag" src={USFlag} />
		</button>
		<button class="flex-1 overflow-hidden rounded-full border border-orange-500">
			<img alt="user-profile" src={Portrait} />
		</button>
	</div>
</nav>
