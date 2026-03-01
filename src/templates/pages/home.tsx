import { Html } from '@elysiajs/html';

const daffodilsImage = '/static/images/daffodils_wallpaper_gpt.png';

export const homePage = () => (
	<>
		<div class="hero-parallax">
			<div class="hero-parallax-bg"></div>
			<div class="hero-content">
				<h1>
					<i data-lucide="sparkles" class="icon-inline"></i> Welcome to March
				</h1>
				<p>Discover the joy, celebrations, and activities that make this month truly special</p>
			</div>
		</div>
		<div class="about-card">
			<a href={daffodilsImage}>
				<img
					src={daffodilsImage}
					alt="Field of daffodils - Mathew Kennedy-Brewer's March celebration"
					data-title="Field of daffodils - Mathew Kennedy-Brewer's March celebration"
					class="float-img clickable-image"
				/>
			</a>
			<h2>
				<i data-lucide="flower-2" class="icon-inline icon-primary"></i> About March
			</h2>
			<p class="text-lg">
				March slips in like a quiet promise: frost retreating, light stretching, earth waking under
				your feet. Once dedicated to Mars, the spear-wielding god of war, it now carries gentler
				banners—celebration, renewal, the hush of seedlings pushing through thawed soil.
			</p>
			<p class="text-lg">
				Walk through these thirty-one days and you'll bump into toasts everywhere. Green rivers of
				parades honor Irish ancestry; brilliant voices rise for International Women's Day; math
				geeks circle their favorite constant on Pi Day; and somewhere a fresh tray of cookies cools
				beside a glass of milk, because even dessert deserves its own holiday.
			</p>
			<p> (Rewritten with Kimi K2, 0905 release.) </p>
		</div>
	</>
);
